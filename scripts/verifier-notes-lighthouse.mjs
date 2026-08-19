#!/usr/bin/env node
/**
 * GARDE DES NOTES LIGHTHOUSE — reprend la mécanique du script du même nom
 * du projet « Site web Freelance », adaptée à ce chantier : ici il n'y a
 * pas de notes PUBLIÉES à tenir (pas de panneau de preuves comparé à la
 * mesure), mais des SEUILS FIXES à atteindre.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  MÉCANIQUE, EN QUATRE TEMPS (identique au script d'origine)
 *
 *  1. Le livrable `dist/` est servi en préproduction sur un port libre, par
 *     le MÊME serveur que `npm run preview` : c'est le HTML réellement
 *     publié qui est mesuré, jamais celui du serveur de développement.
 *  2. Lighthouse — l'outil public de Google — mesure la page d'accueil.
 *  3. Chaque note mesurée est comparée à SEUIL_PAR_CATEGORIE ci-dessous.
 *  4. Une note sous son seuil arrête la garde (code de sortie 1).
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  UNE SEULE PAGE MESURÉE : l'accueil (dist/index.html), pas les
 *  dist/**\/*.html. Choix assumé, pas un oubli de la règle « jamais de
 *  liste de pages en dur » : cette garde n'est pas chaînée dans
 *  `npm run gardes` PRÉCISÉMENT parce qu'elle « demande un Chrome et une
 *  minute » (contrainte donnée par le chantier) — mesurer chaque page
 *  gagnée par le site, sur deux profils, avec trois tirages pour la
 *  performance, ferait exploser ce budget en quelques pages. L'accueil est
 *  la page la plus lourde du site (hero, image pleine largeur) : c'est
 *  donc le pire cas de performance, le point de mesure le plus utile pour
 *  un budget d'une minute.
 *
 *  DEUX PROFILS, comme le script d'origine (ADR-006 du projet voisin) :
 *  accessibilité / bonnes pratiques / référencement en `--preset=desktop`
 *  (structurelles, reproductibles, un seul tirage suffit) ; performance en
 *  mobile bridé, la seule note qui varie d'un tirage à l'autre — d'où les
 *  TROIS tirages consécutifs, et le PLANCHER retenu, jamais la médiane :
 *  une garde de performance qui se contenterait de la médiane laisserait
 *  passer un tirage bas sur deux, exactement l'inverse de ce qu'une garde
 *  de non-régression doit faire.
 *
 * Cette garde N'EST PAS dans `npm run gardes`. Elle s'appelle séparément :
 *     npm run verifier-notes
 *
 * SUR VERCEL, LA GARDE S'ANNONCE ET SORT SANS ÉCHOUER : le conteneur de
 * construction n'embarque pas de Chrome.
 */

import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const executer = promisify(execFile);

const RACINE = fileURLToPath(new URL('..', import.meta.url));
const DOSSIER_MESURES = join(RACINE, 'mesures');
const cliLighthouse = join(RACINE, 'node_modules/lighthouse/cli/index.js');
const cliAstro = join(RACINE, 'node_modules/astro/bin/astro.mjs');

/*
 * SEUILS — donnés tels quels par la mission de recette du chantier « cinq
 * scripts de garde » (2026-08-19) : « performance ≥ 95, les trois autres
 * = 100 ». Ce script les applique à la lettre, il ne les invente pas.
 */
const SEUIL_STRUCTUREL = 100; // accessibilité, bonnes pratiques, référencement.
const SEUIL_PERFORMANCE = 95; // performance mobile, plancher de 3 tirages.
const NOMBRE_DE_TIRAGES_PERFORMANCE = 3;

/** Les deux profils de mesure et les drapeaux qui les définissent. */
const PROFILS = {
  ordinateur: { intitule: 'ordinateur', drapeaux: ['--preset=desktop'] },
  mobile: {
    intitule: 'mobile bridé',
    drapeaux: ['--form-factor=mobile', '--screenEmulation.mobile', '--throttling-method=simulate'],
  },
};

/** Les quatre notes gardées : catégorie Lighthouse, profil, seuil, libellé. */
const NOTES_GARDEES = [
  { cle: 'accessibilite', categorie: 'accessibility', profil: 'ordinateur', seuil: SEUIL_STRUCTUREL, intitule: 'Accessibilité' },
  { cle: 'bonnesPratiques', categorie: 'best-practices', profil: 'ordinateur', seuil: SEUIL_STRUCTUREL, intitule: 'Bonnes pratiques' },
  { cle: 'referencement', categorie: 'seo', profil: 'ordinateur', seuil: SEUIL_STRUCTUREL, intitule: 'Référencement' },
  { cle: 'performance', categorie: 'performance', profil: 'mobile', seuil: SEUIL_PERFORMANCE, intitule: 'Performance' },
];

class EchecDeGarde extends Error {
  constructor(lignes) {
    super(lignes[0]);
    this.lignes = lignes;
  }
}

function echec(...lignes) {
  throw new EchecDeGarde(lignes);
}

/** Un port libre, demandé au système plutôt que choisi au hasard. */
function portLibre() {
  return new Promise((resoudre, rejeter) => {
    const sonde = createServer();
    sonde.unref();
    sonde.on('error', rejeter);
    sonde.listen(0, '127.0.0.1', () => {
      const { port } = sonde.address();
      sonde.close(() => resoudre(port));
    });
  });
}

/**
 * Sert `dist/` comme le ferait `npm run preview`. Construit le livrable
 * s'il manque, avec `astro build` SEUL (sans les autres gardes, déjà
 * chaînées dans `npm run build` — les appeler d'ici ferait tourner deux
 * fois le même contrôle).
 */
async function servirLeLivrable() {
  if (!existsSync(join(RACINE, 'dist', 'index.html'))) {
    console.log('  « dist/ » est absent — construction du livrable avant la mesure…');
    await executer(process.execPath, [cliAstro, 'build'], { cwd: RACINE, maxBuffer: 32 * 1024 * 1024 });
  }

  const port = await portLibre();
  const { preview } = await import('astro');
  const serveur = await preview({ root: RACINE, logLevel: 'error', server: { port } });

  // « localhost » et non « 127.0.0.1 » : Lighthouse ne reconnaît comme
  // contexte sécurisé QUE le nom d'hôte (core/lib/url-utils.js).
  return { serveur, adresse: `http://localhost:${port}/` };
}

/**
 * Le Chrome que Lighthouse doit piloter : priorité à CHROME_PATH, puis au
 * Chromium déjà installé par Playwright (celui des tests), sinon Lighthouse
 * cherche lui-même.
 */
async function navigateurDeMesure() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  try {
    const { chromium } = await import('playwright');
    const chemin = chromium.executablePath();
    if (chemin && existsSync(chemin)) return chemin;
  } catch {
    /* Playwright absent : Lighthouse cherchera lui-même. */
  }
  return null;
}

/** Une mesure Lighthouse. Rend le rapport JSON, déjà analysé. */
async function mesurer(adresse, categories, profil, dossierTemporaire, suffixe) {
  const fichierRapport = join(dossierTemporaire, `lighthouse-${profil.intitule.replace(/\W/gu, '-')}-${suffixe}.json`);
  const navigateur = await navigateurDeMesure();

  console.log(`  Mesure Lighthouse de ${adresse} (profil ${profil.intitule})…`);

  try {
    await executer(
      process.execPath,
      [
        cliLighthouse,
        adresse,
        `--only-categories=${categories.join(',')}`,
        ...profil.drapeaux,
        '--quiet',
        // En CI (runner Ubuntu conteneurisé), Chrome refuse son bac à sable
        // et « /dev/shm » est trop petit : remède canonique des CI.
        process.env.CI
          ? '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage'
          : '--chrome-flags=--headless',
        '--output=json',
        `--output-path=${fichierRapport}`,
      ],
      {
        cwd: RACINE,
        env: navigateur ? { ...process.env, CHROME_PATH: navigateur } : process.env,
        timeout: 300_000,
        maxBuffer: 64 * 1024 * 1024,
      },
    );
  } catch (erreur) {
    /*
     * LE RAPPORT FAIT FOI, PAS LE CODE DE SORTIE (constaté sur ce type de
     * poste Windows le 31/07/2026 sur le projet voisin) : Lighthouse écrit
     * son rapport puis échoue en supprimant le profil temporaire de Chrome
     * (EPERM, descripteurs pas encore rendus). On ne tolère l'échec que si
     * un rapport lisible existe malgré tout.
     */
    if (!existsSync(fichierRapport)) {
      const detail = (erreur.stderr || erreur.stdout || erreur.message || '')
        .toString()
        .trim()
        .split('\n')
        .slice(-6)
        .join('\n      ');
      echec(
        'ÉCHEC — Lighthouse n’a pas pu mesurer la page.',
        `      ${detail}`,
        '',
        'Pistes, dans l’ordre :',
        '  - Chrome introuvable ? installez-le, ou posez « CHROME_PATH », ou',
        '    installez le navigateur de test : npx playwright install chromium ;',
        '  - la préproduction ne répond pas ? essayez « npm run preview » à la main ;',
        '  - dépendance absente ? npm ci (lighthouse est en devDependency).',
      );
    }
    console.log('  Note : rapport écrit malgré une erreur de nettoyage du profil Chrome (connu sous Windows).');
  }

  try {
    return JSON.parse(readFileSync(fichierRapport, 'utf8'));
  } catch {
    echec('ÉCHEC — le rapport de Lighthouse est illisible.', `Fichier attendu : ${fichierRapport}`);
  }
}

function noteDe(rapport, categorie, intitule) {
  const brut = rapport.categories?.[categorie]?.score;
  if (typeof brut !== 'number') {
    echec(`ÉCHEC — Lighthouse n’a pas rendu de note pour « ${intitule} » (${categorie}).`);
  }
  return Math.round(brut * 100);
}

async function principal() {
  const dossierTemporaire = mkdtempSync(join(tmpdir(), 'notes-lighthouse-'));
  let serveur = null;
  const resultats = new Map(); // cle -> { profil, seuil, intitule, mesure|tirages/plancher, conforme }
  let versionLighthouse = null;

  try {
    const service = await servirLeLivrable();
    serveur = service.serveur;

    console.log('');
    console.log('  Note                Mesure   Seuil   Profil');
    console.log(`  ${'-'.repeat(56)}`);

    // 1. Les trois notes structurelles — un seul tirage, profil ordinateur.
    const categoriesStructurelles = NOTES_GARDEES.filter((n) => n.profil === 'ordinateur');
    const rapportOrdinateur = await mesurer(
      service.adresse,
      categoriesStructurelles.map((n) => n.categorie),
      PROFILS.ordinateur,
      dossierTemporaire,
      'ordinateur',
    );
    versionLighthouse = rapportOrdinateur.lighthouseVersion ?? versionLighthouse;

    for (const note of categoriesStructurelles) {
      const mesure = noteDe(rapportOrdinateur, note.categorie, note.intitule);
      const conforme = mesure >= note.seuil;
      resultats.set(note.cle, { ...note, mesure, conforme });
      console.log(
        `  ${note.intitule.padEnd(20)}${String(mesure).padStart(5)}   ${String(note.seuil).padStart(5)}   ${PROFILS[note.profil].intitule}`,
      );
    }

    // 2. Performance — TROIS tirages consécutifs, profil mobile bridé, et
    // c'est le PLANCHER qui est retenu, jamais la médiane (consigne du
    // chantier — une garde de performance doit réagir au pire tirage, pas
    // au tirage typique).
    const notePerformance = NOTES_GARDEES.find((n) => n.cle === 'performance');
    const tirages = [];
    for (let i = 0; i < NOMBRE_DE_TIRAGES_PERFORMANCE; i += 1) {
      const rapportMobile = await mesurer(
        service.adresse,
        [notePerformance.categorie],
        PROFILS.mobile,
        dossierTemporaire,
        `mobile-${i + 1}`,
      );
      versionLighthouse = rapportMobile.lighthouseVersion ?? versionLighthouse;
      tirages.push(noteDe(rapportMobile, notePerformance.categorie, notePerformance.intitule));
    }
    const plancher = Math.min(...tirages);
    const conformePerformance = plancher >= notePerformance.seuil;
    resultats.set('performance', { ...notePerformance, tirages, plancher, conforme: conformePerformance });
    console.log(
      `  ${notePerformance.intitule.padEnd(20)}${String(plancher).padStart(5)}   ${String(notePerformance.seuil).padStart(5)}   ${PROFILS.mobile.intitule}  (tirages : ${tirages.join(' · ')})`,
    );
    console.log('');

    // 3. Écrit le relevé — que la garde passe ou échoue : c'est un journal
    // de mesure, pas seulement une preuve de succès.
    mkdirSync(DOSSIER_MESURES, { recursive: true });
    const maintenant = new Date();
    const dateISO = maintenant.toISOString().slice(0, 10);
    const fichierMesure = join(DOSSIER_MESURES, `lighthouse-${dateISO}.json`);
    const toutConforme = [...resultats.values()].every((r) => r.conforme);
    const relevé = {
      date: dateISO,
      horodatage: maintenant.toISOString(),
      url: service.adresse,
      page: 'accueil (dist/index.html)',
      lighthouseVersion: versionLighthouse,
      seuils: { structurel: SEUIL_STRUCTUREL, performance: SEUIL_PERFORMANCE },
      profils: PROFILS,
      notes: Object.fromEntries(resultats),
      conforme: toutConforme,
    };
    writeFileSync(fichierMesure, `${JSON.stringify(relevé, null, 2)}\n`, 'utf8');
    console.log(`  Relevé écrit : ${fichierMesure.replace(RACINE, '.')}`);
    console.log('');

    // 4. Verdict.
    const echecsNotes = [...resultats.values()].filter((r) => !r.conforme);
    if (echecsNotes.length > 0) {
      const lignes = [`ÉCHEC — ${echecsNotes.length} note(s) sous leur seuil :`, ''];
      for (const r of echecsNotes) {
        const mesureAffichee = r.cle === 'performance' ? r.plancher : r.mesure;
        lignes.push(`  - ${r.intitule} (${PROFILS[r.profil].intitule}) : ${mesureAffichee} mesuré, ${r.seuil} attendu.`);
      }
      lignes.push(
        '',
        'Pour rejouer une mesure isolée et lire le détail :',
        '    npm run preview -- --port 4341',
        '    npx lighthouse http://localhost:4341/ --preset=desktop --view',
        '    npx lighthouse http://localhost:4341/ --form-factor=mobile \\',
        '        --screenEmulation.mobile --throttling-method=simulate --view',
      );
      echec(...lignes);
    }

    console.log(`  OK — les 4 notes tiennent leur seuil (Lighthouse ${versionLighthouse}).`);
  } finally {
    if (serveur) await serveur.stop();
    rmSync(dossierTemporaire, { recursive: true, force: true });
  }
}

// Vercel construit le site sans Chrome : la garde s'annonce et laisse
// passer. Aucun commit n'atteint la production sans passer par l'exécution
// manuelle (`npm run verifier-notes`) où Chrome, lui, est disponible.
if (process.env.VERCEL) {
  console.log('  IGNORÉ — Chrome est indisponible dans le conteneur de construction Vercel.');
  process.exit(0);
}

try {
  await principal();
} catch (erreur) {
  console.error('');
  if (erreur instanceof EchecDeGarde) {
    for (const l of erreur.lignes) console.error(`  ${l}`);
  } else {
    console.error('  ÉCHEC — la garde des notes n’a pas pu aller au bout :');
    console.error(`  ${erreur?.message ?? erreur}`);
    console.error('');
    console.error('  Vérifiez que « dist/ » est construit (npm run build:nu) et que la');
    console.error('  préproduction démarre (npm run preview).');
  }
  console.error('');
  process.exitCode = 1;
}
