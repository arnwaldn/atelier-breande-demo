#!/usr/bin/env node
/**
 * GARDE DE LA FICTION — le site est la démonstration d'un atelier fictif ;
 * cette mention doit être impossible à manquer, et aucune marque réelle ne
 * doit s'y glisser.
 *
 * Sur chaque page de dist/**\/*.html (le site en gagnera d'autres — jamais
 * de liste en dur, tout part d'un parcours réel du dossier) :
 *   1. le pied de page contient la chaîne « fictif » ;
 *   2. le <title> contient « démonstration » ;
 *   3. la <meta name="description"> contient « fictif ».
 *
 * Sur TOUT dist/, fichiers texte quels qu'ils soient (HTML, CSS, JS, SVG,
 * XML du plan de site…) :
 *   4. le mot « lumen » (insensible à la casse) n'apparaît nulle part —
 *      c'est le nom d'une société réelle, banni du projet. La recherche
 *      est ancrée sur des limites de mot (\b) pour ne jamais confondre avec
 *      le français « absolument », qui contient la même suite de lettres.
 *
 * Usage : node scripts/verifier-fiction.mjs (chaîné dans `npm run gardes`).
 */

import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import {
  DOSSIER_DIST,
  EchecDeGarde,
  cheminRelatif,
  extrait,
  extraireAttributs,
  listerPagesHtml,
  listerTousLesFichiers,
  numeroDeLigne,
  verifierDistPresent,
} from './_lib-dist.mjs';

// Ce que le chantier de démonstration exige littéralement — pas des seuils
// numériques, mais nommés ici pour la même raison : un seul endroit à
// relire si la formulation change un jour.
const CHAINE_FICTIF = 'fictif';
const CHAINE_DEMONSTRATION = 'démonstration';
const MOT_BANNI = 'lumen'; // société réelle — nom interdit dans ce projet.

// Extensions binaires : illisibles en UTF-8, on ne les ouvre pas pour
// chercher un mot — ce serait du bruit, jamais une vraie détection.
const EXTENSIONS_BINAIRES = new Set([
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.ico',
  '.mp4',
  '.webm',
  '.pdf',
  '.zip',
]);

let controles = 0;
let echecsCount = 0;

function ok(texte) {
  controles += 1;
  console.log(`OK     ${texte}`);
}

function echecSimple(message) {
  controles += 1;
  echecsCount += 1;
  console.log(`ECHEC  ${message}`);
}

function echecAvecPosition(relatif, texte, position, message) {
  controles += 1;
  echecsCount += 1;
  const numLigne = numeroDeLigne(texte, position);
  console.log(`ECHEC  ${relatif}:${numLigne} — ${message} — extrait : « ${extrait(texte, position)} »`);
}

function controlerPage(cheminAbsolu) {
  const relatif = cheminRelatif(cheminAbsolu);
  const brut = readFileSync(cheminAbsolu, 'utf8');

  // 1. Pied de page.
  const mFooter = /<footer\b[^>]*>([\s\S]*?)<\/footer>/iu.exec(brut);
  if (!mFooter) {
    echecSimple(`${relatif} — aucun <footer> trouvé sur la page`);
  } else if (!mFooter[1].toLowerCase().includes(CHAINE_FICTIF)) {
    echecSimple(`${relatif} — le pied de page ne contient pas « ${CHAINE_FICTIF} »`);
  } else {
    ok(`${relatif} — le pied de page mentionne « ${CHAINE_FICTIF} »`);
  }

  // 2. <title>.
  const mTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/iu.exec(brut);
  if (!mTitle) {
    echecSimple(`${relatif} — aucune balise <title> trouvée`);
  } else if (!mTitle[1].toLowerCase().includes(CHAINE_DEMONSTRATION)) {
    echecSimple(`${relatif} — <title> ne contient pas « ${CHAINE_DEMONSTRATION} » (titre : « ${mTitle[1].trim()} »)`);
  } else {
    ok(`${relatif} — <title> mentionne « ${CHAINE_DEMONSTRATION} »`);
  }

  // 3. <meta name="description">.
  let metaTrouvee = null;
  for (const m of brut.matchAll(/<meta\b[^>]*>/giu)) {
    const attributs = extraireAttributs(m[0]);
    if ((attributs.get('name') ?? '').toLowerCase() === 'description') {
      metaTrouvee = attributs.get('content') ?? '';
      break;
    }
  }
  if (metaTrouvee === null) {
    echecSimple(`${relatif} — aucune <meta name="description"> trouvée`);
  } else if (!metaTrouvee.toLowerCase().includes(CHAINE_FICTIF)) {
    echecSimple(`${relatif} — <meta name="description"> ne contient pas « ${CHAINE_FICTIF} » (contenu : « ${metaTrouvee} »)`);
  } else {
    ok(`${relatif} — <meta name="description"> mentionne « ${CHAINE_FICTIF} »`);
  }
}

/** Le mot banni, cherché dans tout fichier texte de dist/, pas seulement le HTML. */
function controlerMotBanni() {
  const motif = new RegExp(`\\b${MOT_BANNI}\\b`, 'giu');
  let trouve = false;
  for (const chemin of listerTousLesFichiers(DOSSIER_DIST)) {
    if (EXTENSIONS_BINAIRES.has(extname(chemin).toLowerCase())) continue;
    let texte;
    try {
      texte = readFileSync(chemin, 'utf8');
    } catch {
      continue; // fichier illisible en texte : hors périmètre de ce contrôle.
    }
    for (const m of texte.matchAll(motif)) {
      trouve = true;
      echecAvecPosition(cheminRelatif(chemin), texte, m.index, `mot banni « ${MOT_BANNI} » trouvé`);
    }
  }
  if (!trouve) ok(`dist/ — le mot banni « ${MOT_BANNI} » n'apparaît nulle part`);
}

try {
  verifierDistPresent();
  const pages = listerPagesHtml();
  if (pages.length === 0) {
    throw new EchecDeGarde(['ÉCHEC — aucune page HTML trouvée sous dist/.']);
  }
  for (const page of pages) controlerPage(page);
  controlerMotBanni();

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
