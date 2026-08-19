/**
 * LE CONTRAT DE QUALITÉ DE LA SCÈNE — module PUR, sans DOM, sans Three.
 * Il porte toutes les décisions chiffrées : c'est lui qu'on teste, parce
 * qu'un chiffre faux ici ne serait visible nulle part ailleurs.
 *
 * Table reprise du projet frère (socle éprouvé sur six variantes), avec UNE
 * correction : le plafond de densité du niveau `compact` monte de 1,5 à 2,0 —
 * c'est la parade au rendu crénelé constaté sur le Samsung réel d'Arnaud
 * (`antialias: false` y est un choix de coût ; le budget de pixels borne de
 * toute façon la dépense).
 */

export type NiveauQualite = 'atelier' | 'compact' | 'esquisse';

export interface ContratQualite {
  /** Plafond du ratio de pixels (dpr effectif). */
  plafondDensite: number;
  /** Budget de TRAVAIL par image, en pixels rendus — pas une taille d'écran. */
  budgetPixels: number;
  antialias: boolean;
  /** Taille de la carte d'ombre (0 = pas d'ombre). */
  ombres: 0 | 512 | 1024;
  /** Segments de la carène du globe (LatheGeometry). */
  segments: 24 | 48 | 96;
}

export const CONTRATS: Record<NiveauQualite, ContratQualite> = {
  atelier: { plafondDensite: 1.75, budgetPixels: 2_600_000, antialias: true, ombres: 1024, segments: 96 },
  compact: { plafondDensite: 2.0, budgetPixels: 900_000, antialias: false, ombres: 512, segments: 48 },
  esquisse: { plafondDensite: 1.5, budgetPixels: 480_000, antialias: false, ombres: 0, segments: 24 },
};

/**
 * Le niveau se juge sur la LARGEUR D'ÉCRAN et la mémoire déclarée — jamais
 * promu `atelier` sous 1024 px (critère de recette, testé par la campagne).
 */
export function jugerNiveau(largeurEcran: number, memoireGo: number | undefined): NiveauQualite {
  if (largeurEcran < 1024) return memoireGo !== undefined && memoireGo <= 4 ? 'esquisse' : 'compact';
  if (memoireGo !== undefined && memoireGo <= 4) return 'compact';
  return 'atelier';
}

/**
 * ratio = min(dpr, plafond, racine(budget / (largeur × hauteur))).
 * Le budget est une contrainte de travail par image : une bande mobile de
 * 360 × 166 à dpr 2 demande ~240 000 pixels, un demi-hero de bureau
 * 1 600 000. La 3D de téléphone est sept fois moins chère que celle de bureau.
 */
export function ratioDePixels(
  dpr: number,
  contrat: ContratQualite,
  largeur: number,
  hauteur: number
): number {
  const surface = Math.max(largeur * hauteur, 1);
  return Math.min(dpr, contrat.plafondDensite, Math.sqrt(contrat.budgetPixels / surface));
}

/**
 * LE GOUVERNEUR — trois crans irréversibles, jugés sur le 95e CENTILE et le
 * taux d'images manquées, jamais sur la seule médiane.
 *
 * Le projet frère jugeait sur la médiane et son ADR constate lui-même le
 * trou : « la médiane vaut 16,7 ms sur tous les relevés, y compris ceux qui
 * manquent une image sur cinq. Le défaut est entièrement dans la queue de la
 * distribution — là où le visiteur le ressent, là où la médiane est aveugle
 * par construction. » C'est la correction documentée là-bas sans y avoir été
 * prise.
 *
 * Sans retour en arrière : une scène qui reprendrait ses dépenses dès que la
 * mesure s'améliore oscillerait sous les yeux du visiteur — pire que le
 * défaut qu'on corrige.
 */
export class Gouverneur {
  private durees: number[] = [];
  private cran = 0;
  /** Fenêtre glissante de 90 images. */
  private static readonly FENETRE = 90;
  private static readonly SEUIL_MEDIANE_MS = 22;
  private static readonly SEUIL_P95_MS = 28;
  /** 60 fps = 16,7 ms ; on compte manquée toute image au-delà de 34 ms (2 tics). */
  private static readonly IMAGE_MANQUEE_MS = 34;
  private static readonly TAUX_MANQUEES_MAX = 0.1;

  /** Enregistre la durée d'une image ; rend le cran de dégradation à
   *  appliquer (0 = rien, 1 = densité, 2 = ombres, 3 = degrader()). */
  observer(dureeMs: number): number {
    this.durees.push(dureeMs);
    if (this.durees.length < Gouverneur.FENETRE) return this.cran;
    if (this.durees.length > Gouverneur.FENETRE) this.durees.shift();

    const triees = [...this.durees].sort((a, b) => a - b);
    const mediane = triees[Math.floor(triees.length / 2)] ?? 0;
    const p95 = triees[Math.floor(triees.length * 0.95)] ?? 0;
    const manquees =
      this.durees.filter((d) => d > Gouverneur.IMAGE_MANQUEE_MS).length /
      this.durees.length;

    const enSouffrance =
      mediane > Gouverneur.SEUIL_MEDIANE_MS ||
      p95 > Gouverneur.SEUIL_P95_MS ||
      manquees > Gouverneur.TAUX_MANQUEES_MAX;

    if (enSouffrance && this.cran < 3) {
      this.cran += 1;
      this.durees = []; // repartir sur une fenêtre propre après chaque cran
    }
    return this.cran;
  }

  get cranActuel(): number {
    return this.cran;
  }
}
