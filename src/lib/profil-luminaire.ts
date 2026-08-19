/**
 * LE PROFIL DU LUMINAIRE — module PUR : des nombres, pas de Three, pas de DOM.
 *
 * La suspension de la scène 3D est une surface de révolution : un globe de
 * verre soufflé légèrement piriforme (plus étroit au col, ventru aux deux
 * tiers), tenu par une couronne et une tige de laiton. Un verre soufflé EST
 * un LatheGeometry — c'est le métier qui le dit : la pièce tourne.
 *
 * Pourquoi un module pur : ces points décident d'une FORME montrée au
 * visiteur, et une courbe fausse ne se verrait nulle part ailleurs que dans
 * le rendu. Les tests unitaires vérifient la monotonie du profil, ses rayons
 * et sa hauteur — pas l'esthétique, sa cohérence.
 *
 * Unités : mètres de scène. Le globe fait ~24 cm de diamètre au ventre,
 * fidèle à la pièce « doucine » du référentiel (globe Ø 24 cm).
 */

export interface PointProfil {
  /** Rayon depuis l'axe de révolution. */
  x: number;
  /** Hauteur, 0 = bas du globe. */
  y: number;
}

/** Le profil extérieur du globe, du bas (fermé) au col (ouvert vers la
 *  monture). L'échelle 0,94 du même profil donne la coque intérieure. */
export function profilGlobe(): PointProfil[] {
  return [
    { x: 0.0, y: 0.0 },
    { x: 0.045, y: 0.004 },
    { x: 0.082, y: 0.018 },
    { x: 0.105, y: 0.042 },
    { x: 0.118, y: 0.072 },
    { x: 0.12, y: 0.1 },   // le ventre — rayon maximal, Ø 24 cm
    { x: 0.112, y: 0.132 },
    { x: 0.094, y: 0.16 },
    { x: 0.07, y: 0.182 },
    { x: 0.05, y: 0.196 },
    { x: 0.04, y: 0.204 }, // le col
    { x: 0.041, y: 0.214 }, // léger évasement de lèvre — la trace du soufflage
  ];
}

/** Rayon maximal du globe (le ventre). */
export const RAYON_VENTRE = 0.12;
/** Hauteur totale du globe. */
export const HAUTEUR_GLOBE = 0.214;
/** Rayon du col (où la couronne de laiton serre le verre). */
export const RAYON_COL = 0.04;

/** La couronne : un tore aplati au col, la bague qui serre le verre. */
export const COURONNE = {
  rayon: RAYON_COL + 0.006,
  section: 0.008,
} as const;

/** La tige : du col au plafond de la scène. */
export const TIGE = {
  rayon: 0.004,
  longueur: 0.42,
} as const;

/** Position du filament dans le globe (fraction de la hauteur). */
export const FILAMENT_HAUTEUR = 0.55;
