#!/usr/bin/env node
/**
 * GARDE DE LA TYPOGRAPHIE FRANÇAISE — contrôle le TEXTE VISIBLE de chaque
 * page de dist/**\/*.html (jamais le HTML brut : le contenu de <script>,
 * de <style>, les commentaires et les valeurs d'attributs sont retirés
 * avant toute analyse).
 *
 * Trois règles :
 *   1. apostrophe droite ' interdite — seule l'apostrophe typographique
 *      ’ (U+2019) est admise ;
 *   2. ?, !, ; ou : collé à un caractère non blanc (sans la moindre espace)
 *      doit être précédé d'une espace insécable (U+00A0 ou U+202F) — les
 *      URL (https://) et les heures (9:30) sont ignorées ;
 *   3. guillemets droits " interdits — guillemets français « » attendus.
 *
 * TOLÉRANT AUX FAUX POSITIFS, STRICT SUR LE RESTE (consigne du chantier) :
 * la règle 2 ne se déclenche QUE quand le signe est directement collé au
 * mot précédent, sans aucune espace. Un signe précédé d'une espace
 * ORDINAIRE (au lieu d'une insécable) n'est PAS signalé ici — distinguer
 * « espace ordinaire » d'« espace insécable manquante » produirait trop de
 * faux positifs sur du texte copié depuis des sources variées, et une garde
 * qui crie à tort finit désactivée. Mieux vaut rater ce cas que rendre la
 * garde inutilisable.
 *
 * PIÈGE CONNU DE CE POSTE : les caractères invisibles (espaces insécables,
 * apostrophe typographique) ne se tapent jamais en littéral dans le code —
 * une relecture ou un outil d'édition les mange en silence. Ils sont donc
 * écrits ici en échappements explicites ('\u00A0', '\u202F', '\u2019'),
 * jamais copiés-collés.
 *
 * Usage : node scripts/verifier-typographie.mjs (chaîné dans `npm run gardes`).
 */

import { readFileSync } from 'node:fs';
import {
  EchecDeGarde,
  cheminRelatif,
  extrait,
  listerPagesHtml,
  neutraliserBlocs,
  numeroDeLigne,
  verifierDistPresent,
} from './_lib-dist.mjs';

const ESPACE_INSECABLE = '\u00A0';
const ESPACE_INSECABLE_ETROITE = '\u202F';
const APOSTROPHE_TYPOGRAPHIQUE = '\u2019';

const REGEX_SCRIPT_BLOC = /<script\b[^>]*>[\s\S]*?<\/script>/giu;
const REGEX_STYLE_BLOC = /<style\b[^>]*>[\s\S]*?<\/style>/giu;
const REGEX_COMMENTAIRE = /<!--[\s\S]*?-->/gu;
const REGEX_BALISE = /<[^>]*>/gu;

/** Entités HTML utiles à la typographie — le reste est neutralisé (espace). */
const TABLE_ENTITES = new Map([
  ['nbsp', ESPACE_INSECABLE],
  ['rsquo', APOSTROPHE_TYPOGRAPHIQUE],
  ['lsquo', '‘'],
  ['laquo', '«'],
  ['raquo', '»'],
  ['quot', '"'],
  ['apos', "'"],
  ['amp', '&'],
  ['lt', '<'],
  ['gt', '>'],
]);

/**
 * Décode les entités HTML pertinentes pour la typographie. Toute entité
 * NON reconnue est neutralisée en une espace plutôt que retirée : cela
 * évite qu'un `;` de fin d'entité (ex. `&eacute;`) ne soit pris pour de la
 * ponctuation française par la règle 2.
 */
function decoderEntites(texte) {
  return texte.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/gu, (_entite, corps) => {
    if (corps[0] === '#') {
      const estHex = corps[1] === 'x' || corps[1] === 'X';
      const code = estHex ? Number.parseInt(corps.slice(2), 16) : Number.parseInt(corps.slice(1), 10);
      if (!Number.isFinite(code)) return ' ';
      try {
        return String.fromCodePoint(code);
      } catch {
        return ' ';
      }
    }
    return TABLE_ENTITES.get(corps.toLowerCase()) ?? ' ';
  });
}

/** Le texte visible d'une page : sans script, sans style, sans balise. */
function texteVisibleDe(brut) {
  let texte = neutraliserBlocs(brut, REGEX_SCRIPT_BLOC);
  texte = neutraliserBlocs(texte, REGEX_STYLE_BLOC);
  texte = neutraliserBlocs(texte, REGEX_COMMENTAIRE);
  texte = neutraliserBlocs(texte, REGEX_BALISE); // retire aussi les valeurs d'attributs.
  return decoderEntites(texte);
}

let controles = 0;
let echecsCount = 0;

function ok(texte) {
  controles += 1;
  console.log(`OK     ${texte}`);
}

function echec(relatif, texteVisible, position, message) {
  controles += 1;
  echecsCount += 1;
  const numLigne = numeroDeLigne(texteVisible, position);
  console.log(`ECHEC  ${relatif}:${numLigne} — ${message} — extrait : « ${extrait(texteVisible, position)} »`);
}

/** Règle 2 : ?, !, ; ou : collé à un mot, sans insécable devant. */
function ponctuationSansInsecable(texteVisible, idx, caractere) {
  const precedent = texteVisible[idx - 1];
  if (precedent === undefined) return false;
  if (precedent === ESPACE_INSECABLE || precedent === ESPACE_INSECABLE_ETROITE) return false; // correct.
  if (/\s/u.test(precedent)) return false; // espace ordinaire : hors périmètre (tolérance).
  if (caractere === ':') {
    if (texteVisible.slice(idx + 1, idx + 3) === '//') return false; // URL (https://…).
    const suivant = texteVisible[idx + 1];
    if (/\d/u.test(precedent) && suivant !== undefined && /\d/u.test(suivant)) return false; // heure (9:30).
  }
  return true;
}

function controlerFichier(cheminAbsolu) {
  const relatif = cheminRelatif(cheminAbsolu);
  const brut = readFileSync(cheminAbsolu, 'utf8');
  const texteVisible = texteVisibleDe(brut);

  // 1. Apostrophe droite.
  let apostropheTrouvee = false;
  for (const m of texteVisible.matchAll(/'/gu)) {
    apostropheTrouvee = true;
    echec(relatif, texteVisible, m.index, `apostrophe droite trouvée (attendu : ${APOSTROPHE_TYPOGRAPHIQUE})`);
  }
  if (!apostropheTrouvee) ok(`${relatif} — aucune apostrophe droite dans le texte visible`);

  // 2. Guillemets droits.
  let guillemetTrouve = false;
  for (const m of texteVisible.matchAll(/"/gu)) {
    guillemetTrouve = true;
    echec(relatif, texteVisible, m.index, 'guillemet droit " trouvé (attendu : « … »)');
  }
  if (!guillemetTrouve) ok(`${relatif} — aucun guillemet droit dans le texte visible`);

  // 3. Ponctuation haute sans espace insécable.
  let ponctuationTrouvee = false;
  for (const m of texteVisible.matchAll(/[!?;:]/gu)) {
    if (ponctuationSansInsecable(texteVisible, m.index, m[0])) {
      ponctuationTrouvee = true;
      echec(
        relatif,
        texteVisible,
        m.index,
        `« ${m[0]} » collé au mot précédent, sans espace insécable devant`,
      );
    }
  }
  if (!ponctuationTrouvee) {
    ok(`${relatif} — ponctuation haute (?!;:) correctement espacée`);
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
