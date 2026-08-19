/**
 * INDEX DES COLLECTIONS — chapô, entrées par typologie, relance, passerelle.
 *
 * Les cartes elles-mêmes sortent de la collection `pieces` (nom, prix,
 * délai, image) : rien n'est recopié ici, sous peine de voir un prix diverger
 * d'une page à l'autre.
 *
 * Les entrées de typologie ne listent que ce qui existe dans la collection.
 * Les plafonniers n'y figurent pas : aucune pièce publiée n'en est un.
 */

export const collectionsEnTete = {
  titre: 'Les pièces',
  chapo:
    'Elles ont toutes été faites pour un endroit précis : une table de deux mètres, une cage d’escalier de six, un couloir où six boîtiers étaient déjà posés. Chacune se refait, jamais tout à fait à l’identique — le verre soufflé et la patine s’en chargent.',
};

export interface EntreeTypologie {
  /** Valeur du champ `typologie` de la collection. */
  cle: 'suspension' | 'applique' | 'lampe-a-poser' | 'lampadaire' | 'restauration';
  libelle: string;
}

export const typologies: EntreeTypologie[] = [
  { cle: 'suspension', libelle: 'Suspensions' },
  { cle: 'applique', libelle: 'Appliques' },
  { cle: 'lampe-a-poser', libelle: 'Lampes à poser' },
  { cle: 'lampadaire', libelle: 'Lampadaires' },
  { cle: 'restauration', libelle: 'Restaurations' },
];

export const relance = {
  titre: 'Vous ne trouvez pas ce que vous cherchez',
  texte:
    'C’est plutôt bon signe. Tout part d’un dessin, et aucune de ces pièces n’existait avant qu’on nous la demande. Parlez-nous de la pièce à éclairer, de sa hauteur et de ce qui manque quand la nuit tombe.',
  bouton: 'Demander une pièce approchante',
  href: '/contact',
};

export const passerelleServices = {
  texte: 'Le déroulé d’une commande, du devis à la pose, est détaillé du côté des services.',
  bouton: 'Comment se passe une commande',
  href: '/services#etapes',
};
