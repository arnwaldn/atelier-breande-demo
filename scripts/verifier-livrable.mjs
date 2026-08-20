#!/usr/bin/env node
/**
 * GARDE DU LIVRABLE — contrôle structurel du HTML produit dans `dist/`.
 *
 * Le site publie une politique de sécurité stricte (`script-src 'self'`,
 * `style-src 'self'`, sans `'unsafe-inline'`) : tout script ou style EN
 * LIGNE serait tout simplement REFUSÉ par le navigateur, en production
 * seulement — jamais en développement, où rien ne bloque l'inline. Cette
 * garde attrape la régression avant la mise en ligne, pas après.
 *
 * Contrôlé sur chaque page de `dist/**\/*.html` (le site en gagnera d'autres
 * plus tard — jamais de liste de pages en dur, tout part d'un parcours réel
 * du dossier) :
 *   1. aucun <script> en ligne (sans `src`) ;
 *   2. aucune balise <style> ;
 *   3. aucun attribut style="" ;
 *   4. tout <img> porte un attribut alt (alt="" vide accepté : décoratif) ;
 *   5. <html lang="fr"> présent ;
 *   6. <link rel="canonical"> présent ;
 *   7. exactement un <h1> ;
 *   8. aucune chaîne oubliée : TODO, FIXME, lorem ipsum.
 *
 * Usage : node scripts/verifier-livrable.mjs (chaîné dans `npm run gardes`).
 */

import { readFileSync } from 'node:fs';
import {
  EchecDeGarde,
  cheminRelatif,
  extrait,
  extraireAttributs,
  listerPagesHtml,
  neutraliserBlocs,
  numeroDeLigne,
  verifierDistPresent,
} from './_lib-dist.mjs';

import { createHash } from 'node:crypto';

/**
 * Hashes de scripts autorises par la CSP de production (vercel.json).
 * Lu une seule fois. Si le fichier devient illisible, l'ensemble reste vide :
 * aucun script en ligne ne passe, ce qui est le bon sens de l'echec.
 */
let _hashesCsp = null;
function hashesAutorises() {
  if (_hashesCsp) return _hashesCsp;
  _hashesCsp = new Set();
  try {
    const conf = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
    for (const entree of conf.headers ?? []) {
      for (const en of entree.headers ?? []) {
        if (String(en.key).toLowerCase() !== 'content-security-policy') continue;
        for (const m of String(en.value).matchAll(/'sha256-([A-Za-z0-9+/=]+)'/g)) _hashesCsp.add(m[1]);
      }
    }
  } catch {
    /* ensemble vide : on refuse tout script en ligne */
  }
  return _hashesCsp;
}

/** Oublis de rédaction qui n'ont rien à faire dans un site publié. */
const CHAINES_INTERDITES = [
  { motif: /\bTODO\b/giu, nom: 'TODO' },
  { motif: /\bFIXME\b/giu, nom: 'FIXME' },
  { motif: /lorem ipsum/giu, nom: 'lorem ipsum' },
];

const REGEX_SCRIPT_BLOC = /<script\b([^>]*)>([\s\S]*?)<\/script>/giu;
const REGEX_STYLE_BLOC = /<style\b[^>]*>[\s\S]*?<\/style>/giu;
// Balise ouvrante générique, pour retrouver un attribut style="" quel que
// soit l'élément qui le porte.
const REGEX_BALISE_QUELCONQUE = /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*)?)\/?>/gu;

let controles = 0;
let echecsCount = 0;

function ok(texte) {
  controles += 1;
  console.log(`OK     ${texte}`);
}

function echec(fichierRelatif, position, texteComplet, message) {
  controles += 1;
  echecsCount += 1;
  const numLigne = position === null ? '?' : numeroDeLigne(texteComplet, position);
  const bout = position === null ? '' : ` — extrait : « ${extrait(texteComplet, position)} »`;
  console.log(`ECHEC  ${fichierRelatif}:${numLigne} — ${message}${bout}`);
}

function controlerFichier(cheminAbsolu) {
  const relatif = cheminRelatif(cheminAbsolu);
  const brut = readFileSync(cheminAbsolu, 'utf8');

  // 1. Scripts en ligne (sans `src`).
  //
  // Refuses par defaut : script-src 'self' ne les autorise pas. UNE exception
  // depuis le 20/08/2026 : un contenu en ligne dont le hash SHA-256 figure
  // dans la CSP de vercel.json. Le fichier separe qu'il remplace
  // (detection-js.js) coutait un aller-retour reseau BLOQUANT mesure a 451 ms
  // chez PageSpeed, pour 120 octets utiles.
  //
  // La garde ne se contente pas de TOLERER les scripts en ligne : elle
  // recalcule le hash du contenu reellement produit et exige qu'il soit
  // declare. C'est le seul moyen d'attraper le piege de cette technique --
  // retoucher le script d'un seul espace invalide le hash, et la page casse
  // en production sans que rien ne le signale avant.
  let trouveScriptEnLigne = false;
  for (const m of brut.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributs = extraireAttributs(m[1]);
    if (attributs.has('src')) continue;
    trouveScriptEnLigne = true;
    const empreinte = createHash('sha256').update(m[2], 'utf8').digest('base64');
    if (hashesAutorises().has(empreinte)) {
      ok(`${relatif} — script en ligne autorisé par son hash CSP`);
    } else {
      echec(
        relatif,
        m.index,
        brut,
        `script en ligne dont le hash n'est pas déclaré dans la CSP de vercel.json — ajouter 'sha256-${empreinte}' à script-src, ou remettre ce script dans un fichier`
      );
    }
  }
  if (!trouveScriptEnLigne) ok(`${relatif} — aucun script en ligne`);

  // 2. Balises <style> — refusées par style-src 'self'.
  let trouveBaliseStyle = false;
  for (const m of brut.matchAll(REGEX_STYLE_BLOC)) {
    trouveBaliseStyle = true;
    echec(relatif, m.index, brut, 'balise <style> présente (refusée par style-src \'self\')');
  }
  if (!trouveBaliseStyle) ok(`${relatif} — aucune balise <style>`);

  // 3. Chaînes interdites — recherchées dans le fichier BRUT en entier :
  // un TODO oublié peut se cacher n'importe où, y compris hors texte visible.
  let trouveChaineInterdite = false;
  for (const { motif, nom } of CHAINES_INTERDITES) {
    for (const m of brut.matchAll(motif)) {
      trouveChaineInterdite = true;
      echec(relatif, m.index, brut, `chaîne interdite trouvée : « ${nom} »`);
    }
  }
  if (!trouveChaineInterdite) {
    ok(`${relatif} — aucune chaîne interdite (TODO/FIXME/lorem ipsum)`);
  }

  // Le reste des contrôles porte sur le texte NETTOYÉ : le contenu de
  // <script>/<style> est neutralisé (espaces, sauts de ligne conservés) pour
  // qu'un `style=` ou un `<img>` écrit dans du JavaScript ne soit jamais
  // confondu avec du HTML réel. Numéros de ligne inchangés sur le fichier
  // d'origine.
  const nettoye = neutraliserBlocs(neutraliserBlocs(brut, REGEX_SCRIPT_BLOC), REGEX_STYLE_BLOC);

  // 4. Attribut style="" sur un élément quelconque.
  let trouveAttributStyle = false;
  for (const m of nettoye.matchAll(REGEX_BALISE_QUELCONQUE)) {
    const attributs = extraireAttributs(m[2] ?? '');
    if (attributs.has('style')) {
      trouveAttributStyle = true;
      echec(relatif, m.index, brut, `attribut style="" sur <${m[1]}> (refusé par style-src 'self')`);
    }
  }
  if (!trouveAttributStyle) ok(`${relatif} — aucun attribut style=""`);

  // 5. <img> sans alt (alt="" vide accepté : image décorative).
  let trouveImgSansAlt = false;
  for (const m of nettoye.matchAll(/<img\b[^>]*>/giu)) {
    const attributs = extraireAttributs(m[0]);
    if (!attributs.has('alt')) {
      trouveImgSansAlt = true;
      echec(relatif, m.index, brut, 'balise <img> sans attribut alt');
    }
  }
  if (!trouveImgSansAlt) ok(`${relatif} — tous les <img> ont un attribut alt`);

  // 6. lang="fr" sur <html>.
  const mHtml = /<html\b[^>]*>/u.exec(nettoye);
  if (!mHtml) {
    echec(relatif, null, brut, 'balise <html> introuvable');
  } else {
    const attributs = extraireAttributs(mHtml[0]);
    if (attributs.get('lang') !== 'fr') {
      echec(relatif, mHtml.index, brut, `<html lang="fr"> absent (lang="${attributs.get('lang') ?? ''}")`);
    } else {
      ok(`${relatif} — <html lang="fr"> présent`);
    }
  }

  // 7. <link rel="canonical">.
  let trouveCanonical = false;
  for (const m of nettoye.matchAll(/<link\b[^>]*>/giu)) {
    const attributs = extraireAttributs(m[0]);
    if ((attributs.get('rel') ?? '').toLowerCase().split(/\s+/u).includes('canonical')) {
      trouveCanonical = true;
    }
  }
  if (trouveCanonical) ok(`${relatif} — <link rel="canonical"> présent`);
  else echec(relatif, null, brut, '<link rel="canonical"> absent');

  // 8. Exactement un <h1>.
  const h1s = [...nettoye.matchAll(/<h1\b[^>]*>/giu)];
  if (h1s.length === 1) {
    ok(`${relatif} — un seul <h1>`);
  } else {
    const position = h1s.length > 1 ? h1s[1].index : null;
    echec(relatif, position, brut, `${h1s.length} <h1> trouvé(s), 1 attendu`);
  }
}

try {
  verifierDistPresent();
  const pages = listerPagesHtml();
  if (pages.length === 0) {
    throw new EchecDeGarde(['ÉCHEC — aucune page HTML trouvée sous dist/.']);
  }
  for (const page of pages) controlerFichier(page);

  console.log('');
  if (echecsCount > 0) {
    console.log(`ECHEC — ${echecsCount}/${controles} contrôle(s) en échec sur ${pages.length} page(s).`);
    process.exitCode = 1;
  } else {
    console.log(`OK — ${controles} contrôle(s) passés sur ${pages.length} page(s).`);
  }
} catch (erreur) {
  console.log('');
  if (erreur instanceof EchecDeGarde) {
    for (const l of erreur.lignes) console.log(l);
  } else {
    console.log(`ECHEC — erreur inattendue : ${erreur?.stack ?? erreur}`);
  }
  process.exitCode = 1;
}
