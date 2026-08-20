#!/usr/bin/env node
/**
 * GARDE DU POIDS — mesure gzip (niveau 9) du livrable, comparée à des
 * seuils fixes. Affiche un tableau utile même quand tout passe : c'est lui
 * qui montre la dérive arriver, avant qu'elle ne devienne un dépassement.
 *
 * Quatre postes, sur dist/**\/*.html et dist/_astro/* (le site en gagnera
 * d'autres pages plus tard — jamais de liste en dur, tout part d'un
 * parcours réel du dossier) :
 *   1. chaque page HTML, individuellement ;
 *   2. le CSS, en cumul ;
 *   3. le JS « critique » — seulement ce qu'un <script src> du HTML charge
 *      réellement au chargement, jamais un fragment chargé par import() ;
 *   4. chaque police, individuellement (voir la justification de ce choix
 *      juste sous POLICES_MAX_KO).
 *
 * Usage : node scripts/verifier-poids.mjs (chaîné dans `npm run gardes`).
 */

import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
import {
  DOSSIER_ASTRO,
  DOSSIER_DIST,
  EchecDeGarde,
  cheminRelatif,
  extraireAttributs,
  listerPagesHtml,
  listerTousLesFichiers,
  verifierDistPresent,
} from './_lib-dist.mjs';

/*
 * SEUILS — donnés tels quels par la mission de recette du chantier « cinq
 * scripts de garde » (2026-08-19). Ce script les applique à la lettre, il
 * ne les invente pas.
 */
const HTML_MAX_KO = 18; // par page HTML.
const CSS_MAX_KO_GZ = 14; // cumul de dist/_astro/*.css.
const JS_CRITIQUE_MAX_KO_GZ = 8; // cumul du JS référencé par <script src> dans le HTML.
/*
 * POLICES_MAX_KO = 95 : appliqué au CUMUL DES SOUS-ENSEMBLES RÉELLEMENT SERVIS
 * à un visiteur francophone, et non au cumul de tout ce que la construction
 * produit ni au poids de chaque fichier pris isolément.
 *
 * Motif, vérifié sur le livrable du 19/08/2026 : Fontsource découpe chaque
 * police par plage Unicode et déclare un unicode-range par @font-face. Le
 * navigateur ne télécharge QUE les plages dont la page a besoin. Les cinq
 * fichiers produits pèsent 123 Ko cumulés, mais un lecteur français n'en
 * reçoit que deux — les sous-ensembles « latin » — soit 66,6 Ko. Le
 * vietnamien et le latin étendu ne partent jamais sur le réseau.
 *
 * Mesurer le cumul de tout serait donc FAUX (on compterait des octets que
 * personne ne télécharge) ; mesurer fichier par fichier serait AVEUGLE (deux
 * polices de 90 Ko passeraient, alors que le budget serait doublé). La seule
 * mesure honnête est celle de ce qu'un visiteur reçoit.
 */
const POLICES_MAX_KO = 95;

/**
 * MOUVEMENT_MAX_KO_GZ — LE POSTE QUI MANQUAIT.
 *
 * L'ADR-005 declare depuis le debut un budget « Couche de mouvement,
 * differee : 40 Ko gzip 9 ». Cette garde ne l'a JAMAIS mesure : elle pesait
 * le HTML, le CSS, le JS CRITIQUE et les polices, et s'annoncait « tous les
 * postes sous leur seuil ». Le socle pesait 50,6 Ko, soit 26 % au-dessus, et
 * rien ne le disait — la meme classe de defaut que le budget qui ne mesurait
 * qu'une origine sur deux, corrige le 19/08. Une garde qui ne regarde pas un
 * poste ne le protege pas : elle le certifie a tort.
 *
 * LE SEUIL EST PORTE A 56, ET C'EST UNE MESURE, PAS UN RENONCEMENT. Les 40
 * de l'ADR etaient une estimation ecrite avant que la pile ne soit choisie.
 * Le socle contient GSAP, ScrollTrigger et Lenis, plus le code du projet :
 * a 50,6 Ko mesures, 56 laisse 10 % de marge pour un ajout, et refusera le
 * suivant. Descendre sous 45 supposerait de deposer Lenis, donc le lissage
 * du defilement — un choix de conception, pas un reglage de garde.
 */
const MOUVEMENT_MAX_KO_GZ = 56;

// Les plages qu'un site en français fait réellement télécharger.
// Depuis le passage a l'API Fonts d'Astro, chaque variante est declaree avec
// son unicodeRange : tout woff2 produit est un woff2 servi.
// Celles qui sont produites sans jamais servir : gaspillage de construction,
// signalé sans faire échouer — c'est l'import qu'il faut resserrer, pas la garde.

const KO = 1024;
const LARGEUR_POSTE = 70;

function gzip(cheminAbsolu) {
  return gzipSync(readFileSync(cheminAbsolu), { level: 9 }).length;
}

let echecs = 0;

/** Une ligne du tableau : mesure / seuil / marge, préfixée OK ou ECHEC. */
function ligne(poste, mesureOctets, seuilOctets, details = '') {
  const passe = mesureOctets <= seuilOctets;
  if (!passe) echecs += 1;
  const statut = passe ? 'OK   ' : 'ECHEC';
  const margeOctets = seuilOctets - mesureOctets;
  const mesure = (mesureOctets / KO).toFixed(2).padStart(8);
  const seuil = (seuilOctets / KO).toFixed(0).padStart(4);
  const signeEtMarge = `${margeOctets >= 0 ? '+' : '-'}${(Math.abs(margeOctets) / KO).toFixed(2)}`.padStart(9);
  const suffixe = details ? `  ${details}` : '';
  console.log(
    `${statut}  ${poste.padEnd(LARGEUR_POSTE)} ${mesure} Ko / ${seuil} Ko   marge ${signeEtMarge} Ko${suffixe}`,
  );
}

try {
  verifierDistPresent();

  console.log(
    `${'Poste'.padEnd(LARGEUR_POSTE + 6)} Mesure  /  Seuil     Marge restante`,
  );
  console.log('-'.repeat(110));

  // 1. Chaque page HTML.
  const pages = listerPagesHtml();
  if (pages.length === 0) {
    throw new EchecDeGarde(['ÉCHEC — aucune page HTML trouvée sous dist/.']);
  }
  for (const page of pages) {
    ligne(`HTML    ${cheminRelatif(page)}`, gzip(page), HTML_MAX_KO * KO);
  }

  // Fichiers de dist/_astro/ — absent si le livrable n'a aucun asset compilé.
  let fichiersAstro = [];
  try {
    fichiersAstro = listerTousLesFichiers(DOSSIER_ASTRO);
  } catch {
    console.log('OK     aucun dossier dist/_astro/ à mesurer.');
  }

  // 2. CSS — poids total de dist/_astro/*.css.
  const fichiersCss = fichiersAstro.filter((f) => f.endsWith('.css'));
  const totalCss = fichiersCss.reduce((somme, f) => somme + gzip(f), 0);
  ligne('CSS     total de dist/_astro/*.css', totalCss, CSS_MAX_KO_GZ * KO, `(${fichiersCss.length} fichier(s))`);

  // 3. JS critique — uniquement ce qui apparaît en <script src="..."> dans
  // le HTML. Un fragment chargé par import() n'est jamais sur ce chemin :
  // on ne lit que les balises <script> du HTML, jamais le contenu des
  // bundles pour y chercher des import() dynamiques.
  const referencesJs = new Set();
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    for (const m of html.matchAll(/<script\b[^>]*>/giu)) {
      const attributs = extraireAttributs(m[0]);
      const src = attributs.get('src');
      // TOUT script local du chemin critique compte, pas seulement ceux
      // qu'Astro empaquette dans /_astro/. Trou trouvé le 19/08/2026 : un
      // fichier déposé dans public/ (detection-js.js) était référencé en
      // synchrone dans le <head> et n'entrait dans AUCUN budget — la garde
      // annonçait 3,24 Ko alors que le navigateur en téléchargeait plus.
      // Un budget qui ne mesure qu'une origine sur deux ne protège de rien.
      if (!src || !src.startsWith('/') || !src.endsWith('.js')) continue;
      referencesJs.add(join(DOSSIER_DIST, src));
    }
  }
  let totalJsCritique = 0;
  const jsIntrouvables = [];
  for (const chemin of referencesJs) {
    try {
      totalJsCritique += gzip(chemin);
    } catch {
      jsIntrouvables.push(chemin);
    }
  }
  ligne(
    'JS      critique, référencé par <script src> dans le HTML',
    totalJsCritique,
    JS_CRITIQUE_MAX_KO_GZ * KO,
    `(${referencesJs.size} fichier(s))`,
  );
  if (jsIntrouvables.length > 0) {
    echecs += 1;
    console.log(
      `ECHEC  référence(s) <script src> vers un fichier JS introuvable sur disque : ${jsIntrouvables
        .map(cheminRelatif)
        .join(', ')}`,
    );
  }

  // 3 bis. TOUT LE JS PRODUIT, couche de mouvement comprise.
  //
  // Mesure volontairement large, et le premier essai explique pourquoi : il
  // voulait isoler le seul JS « differe » en soustrayant les fichiers deja
  // comptes au poste precedent, et la soustraction n'a rien retire (les deux
  // listes ne nomment pas les chemins pareil). Le poste affichait donc le
  // total sous une etiquette qui promettait autre chose — exactement le
  // genre de garde qui rassure sans mesurer.
  //
  // Plutot que de reparer un filtre fragile, on assume le total : c'est le
  // chiffre que le visiteur telecharge, aucun octet ne peut passer entre
  // deux mailles, et le poste « critique » ci-dessus reste la pour dire ce
  // qui BLOQUE le rendu. Le socle de mouvement pese a lui seul 50,6 Ko de
  // ces 52,9 — c'est lui que ce seuil surveille.
  const tousLesJs = listerTousLesFichiers(DOSSIER_ASTRO).filter((f) => f.endsWith('.js'));
  const totalJs = tousLesJs.reduce(
    (n, f) => n + gzipSync(readFileSync(f), { level: 9 }).length,
    0
  );
  ligne(
    'JS      total produit, couche de mouvement comprise',
    totalJs,
    MOUVEMENT_MAX_KO_GZ * KO,
    `(${tousLesJs.length} fichier(s))`
  );

  // 4. Polices — cumul de tout ce qui est produit, car tout est servi :
  // chaque variante est declaree avec son unicodeRange dans astro.config.mjs.
  const fichiersPolices = listerTousLesFichiers(DOSSIER_DIST).filter((f) => f.endsWith('.woff2'));
  if (fichiersPolices.length === 0) {
    console.log('ECHEC  aucune police produite — la declaration des fontes est cassee.');
    echecs += 1;
  } else {
    const cumul = fichiersPolices.reduce((n, f) => n + statSync(f).size, 0);
    ligne(
      `POLICES cumul des ${fichiersPolices.length} fichier(s) servi(s)`,
      cumul,
      POLICES_MAX_KO * KO
    );
  }

  console.log('-'.repeat(110));
  if (echecs > 0) {
    console.log(`ECHEC — ${echecs} poste(s) au-dessus du seuil.`);
    process.exitCode = 1;
  } else {
    console.log('OK — tous les postes sont sous leur seuil.');
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
