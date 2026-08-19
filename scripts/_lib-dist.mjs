#!/usr/bin/env node
/**
 * Utilitaires partagés par les gardes du livrable (verifier-livrable,
 * verifier-poids, verifier-typographie, verifier-fiction).
 *
 * Fichier préfixé « _ » : ce n'est pas une garde en soi, seulement du code
 * commun. Rien ici ne dépend d'un paquet npm — que des modules natifs de
 * Node — pour rester exécutable en intégration continue sans installation.
 *
 * RÈGLE STRUCTURANTE DU PROJET : le site aura d'autres pages plus tard.
 * Aucune fonction ici ne connaît la liste des pages — tout part d'un
 * parcours réel de `dist/`.
 */

import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Racine du projet : `scripts/` est toujours un niveau sous la racine. */
export const RACINE = fileURLToPath(new URL('..', import.meta.url));
export const DOSSIER_DIST = join(RACINE, 'dist');
export const DOSSIER_ASTRO = join(DOSSIER_DIST, '_astro');

/**
 * Erreur de garde : porte un message multi-lignes prêt à afficher.
 * Chaque script l'attrape à la racine et sort en code 1.
 */
export class EchecDeGarde extends Error {
  constructor(lignes) {
    super(Array.isArray(lignes) ? lignes[0] : lignes);
    this.lignes = Array.isArray(lignes) ? lignes : [lignes];
  }
}

/**
 * Vérifie que `dist/` existe et contient au moins une page, avec un message
 * qui dit le geste à faire — jamais seulement « dist introuvable ».
 */
export function verifierDistPresent() {
  let infos;
  try {
    infos = statSync(DOSSIER_DIST);
  } catch {
    throw new EchecDeGarde([
      'ÉCHEC — le dossier « dist/ » est introuvable.',
      'Construisez le livrable avant de lancer cette garde : npm run build:nu',
    ]);
  }
  if (!infos.isDirectory()) {
    throw new EchecDeGarde([
      'ÉCHEC — « dist/ » existe mais n’est pas un dossier.',
    ]);
  }
}

/**
 * Liste tous les fichiers HTML de `dist/`, à n'importe quelle profondeur.
 * Jamais de liste de pages en dur : le site en gagnera d'autres.
 */
export function listerPagesHtml() {
  return listerTousLesFichiers().filter((chemin) => chemin.endsWith('.html'));
}

/** Liste tous les fichiers de `dist/`, quel que soit leur type. */
export function listerTousLesFichiers(dossier = DOSSIER_DIST) {
  const entrees = readdirSync(dossier, { recursive: true, withFileTypes: true });
  return entrees
    .filter((entree) => entree.isFile())
    .map((entree) => join(entree.parentPath ?? entree.path ?? dossier, entree.name))
    .sort();
}

/** Chemin relatif à la racine du projet, en slashs, pour un affichage stable. */
export function cheminRelatif(cheminAbsolu) {
  return relative(RACINE, cheminAbsolu).split(sep).join('/');
}

/** Numéro de ligne (base 1) d'une position dans un texte. */
export function numeroDeLigne(texte, position) {
  let compte = 1;
  for (let i = 0; i < position && i < texte.length; i += 1) {
    if (texte[i] === '\n') compte += 1;
  }
  return compte;
}

/**
 * Court extrait autour d'une position, sur une seule ligne, pour les
 * messages d'échec. Un message qui dit seulement « échec » oblige à refaire
 * la recherche — celui-ci montre le texte fautif.
 */
export function extrait(texte, position, rayon = 40) {
  const debut = Math.max(0, position - rayon);
  const fin = Math.min(texte.length, position + rayon);
  const brut = texte.slice(debut, fin).replace(/\s+/gu, ' ').trim();
  return (debut > 0 ? '…' : '') + brut + (fin < texte.length ? '…' : '');
}

/**
 * Neutralise les blocs capturés par `regex` (globale) : chaque caractère du
 * bloc devient une espace, SAUF les sauts de ligne — conservés pour que la
 * numérotation des lignes reste juste sur tout ce qui suit. Sert à retirer
 * le contenu de `<script>`/`<style>` avant d'analyser le reste de la page,
 * sans décaler aucune ligne.
 */
export function neutraliserBlocs(texte, regex) {
  return texte.replace(regex, (bloc) => bloc.replace(/[^\n]/gu, ' '));
}

/**
 * Attributs d'une balise ouvrante (le texte ENTRE `<nom` et `>`, guillemets
 * compris), en Map minuscule → valeur (chaîne vide pour un attribut booléen
 * sans valeur). Tolère guillemets doubles, simples, ou valeur non quotée.
 */
export function extraireAttributs(texteDeBalise) {
  const attributs = new Map();
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/gu;
  let m;
  while ((m = re.exec(texteDeBalise)) !== null) {
    const nom = m[1].toLowerCase();
    if (nom === 'doctype') continue;
    const valeur = m[2] ?? m[3] ?? m[4] ?? '';
    attributs.set(nom, valeur);
  }
  return attributs;
}

/** Formate un nombre d'octets en kilooctets décimaux, deux décimales. */
export function enKo(octets) {
  return octets / 1024;
}

export function formaterKo(octets, decimales = 2) {
  return `${enKo(octets).toFixed(decimales)} Ko`;
}
