/**
 * IDENTITÉ DE L’ATELIER — source unique.
 *
 * Toute valeur d’identité ou de contact affichée sur le site part d’ici :
 * si le téléphone change, il change à un seul endroit. La formule de fiction
 * est elle aussi canonique — elle vit dans ce fichier et nulle part ailleurs,
 * et se réemploie telle quelle au pied de page.
 *
 * Chiffres et coordonnées : docs/PRD.md § 2.1 (référentiel gelé).
 * Le numéro appartient à la plage 04 65 71 XX XX que l’ARCEP réserve aux
 * œuvres de fiction.
 */
export interface Identite {
  nom: string;
  ville: string;
  arrondissement: string;
  situation: string;
  anneeCreation: number;
  telephone: string;
  /** Valeur du href="tel:" — format international, sans espace. */
  telephoneLien: string;
  delaiReponse: string;
  reception: string;
  /** Mention de fiction du pied de page. Une seule formulation, partout. */
  formuleFiction: string;
}

export const identite: Identite = {
  nom: 'Atelier Bréande',
  ville: 'Lyon',
  arrondissement: 'Lyon 7e',
  situation: 'rive gauche du Rhône',
  anneeCreation: 2011,
  telephone: '04 65 71 08 42',
  telephoneLien: 'tel:+33465710842',
  delaiReponse: 'deux jours ouvrés',
  reception: 'sur rendez-vous',
  formuleFiction: 'Site fictif de démonstration — conçu et réalisé par Arnaud Porcel.',
};
