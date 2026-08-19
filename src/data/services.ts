/**
 * PAGE SERVICES — trois prestations, les huit étapes d’une commande, le
 * tableau des prix et des délais, les garanties, le travail avec une agence.
 *
 * Prix, délais, garanties : docs/PRD.md § 2.5, 2.6 et 2.7. Aucune valeur
 * n’est recalculée ici. Les questions fréquentes vivent dans faq.ts.
 */

export interface Service {
  id: 'creation' | 'restauration' | 'conseil';
  /** Ancre de page, pour les liens entrants (/services#creation). */
  ancre: string;
  titre: string;
  /** Une phrase d’attaque, affichée sous le titre. */
  accroche: string;
  /** Deux à trois paragraphes. */
  corps: string[];
  inclus: string[];
  /** Toujours au moins une ligne : ce que l’atelier ne fait pas. */
  nonInclus: string[];
  fourchette: string;
  delai: string;
  /** Ce que le client prépare avant le premier rendez-vous (création). */
  aPreparer?: string[];
  /** Les quatre photos demandées avant un devis de restauration. */
  photosAEnvoyer?: string[];
  /** Ce que le client reçoit à la fin d’un conseil. */
  livrable?: string;
  /** Slugs de fiches à montrer avec la prestation. */
  piecesLiees: string[];
}

export const servicesEnTete = {
  titre: 'Ce que nous faisons',
  chapo:
    'On entre ici de trois façons. La plus fréquente : une pièce à dessiner et à fabriquer. Vient ensuite la restauration d’un luminaire ancien. Et parfois il n’y a pas encore d’objet, seulement un logement à éclairer et un plan à faire.',
};

export const services: Service[] = [
  {
    id: 'creation',
    ancre: 'creation',
    titre: 'Créer une pièce',
    accroche: 'Un dessin fait pour un endroit, fabriqué à l’établi, réglé chez vous.',
    corps: [
      'Tout part d’une visite. Nous mesurons la hauteur sous plafond, repérons les points existants, et nous vous demandons à quelle heure vous vivez vraiment dans cette pièce. Le dessin vient après, à l’échelle 1 sur papier kraft, avec un gabarit de carton quand la pièce est grande.',
      'Vous validez un plan coté, par écrit, avant que le premier morceau de laiton soit coupé. C’est le moment où tout se décide : proportions, matière, finition, hauteur de suspension, teinte de la lumière. Nous prêtons des ampoules d’essai pour que vous tranchiez chez vous, le soir.',
      'Ensuite la fabrication suit son cours et vous n’en verrez pas grand-chose, deux ou trois photos si vous les demandez. La pièce reste allumée vingt-quatre heures avant de partir.',
    ],
    inclus: [
      'la visite et le relevé sur place',
      'le plan coté et le choix des matières',
      'le prêt d’ampoules d’essai chez vous',
      'la fabrication et l’essai de vingt-quatre heures',
      'la pose sur un point existant, ou l’expédition en caisse bois sur mesure',
      'un passage de réglage dans les trois mois',
    ],
    nonInclus: [
      'les travaux électriques : tirer une ligne, déplacer une boîte de sortie, reprendre un tableau',
      'la reprise des peintures et des enduits autour des perçages',
      'les séries au-delà d’une vingtaine de pièces identiques',
    ],
    fourchette:
      'D’une applique à 380 € à une grande pièce de cage d’escalier à 6 500 €, le détail figure au tableau plus bas. Acompte de 40 % à la commande, solde à la livraison.',
    delai:
      '6 à 10 semaines, trois de plus quand un verre est soufflé pour vous. Une série de trois à huit appliques demande 8 à 12 semaines.',
    aPreparer: [
      'deux ou trois photos de la pièce, prises de jour',
      'la hauteur sous plafond',
      'la position des points lumineux existants',
    ],
    piecesLiees: ['imposte', 'encorbellement'],
  },
  {
    id: 'restauration',
    ancre: 'restauration',
    titre: 'Remettre en lumière une pièce ancienne',
    accroche: 'La patine reste, le circuit repart à neuf.',
    corps: [
      'On nous apporte surtout des suspensions d’atelier, des lustres de famille et des appliques trouvées en brocante. La première question n’est pas esthétique, elle est électrique. Le câblage textile d’origine ne repart jamais avec la pièce, sans exception : un coton de quatre-vingts ans sur du 230 V finit par se fendre là où personne ne le voit.',
      'Ce qui se restaure : la tôle et le laiton se redressent et se repolissent, une molette manquante se refait au tour, un verre cassé se remplace en deux à quatre semaines. La patine d’origine reste en place, et les éclats d’émail sont stabilisés au vernis mat plutôt que repeints.',
      'Ce qui ne se restaure pas : un verre sur mesure qu’on ne retrouve nulle part, un transformateur d’origine qu’on ne peut ni ouvrir ni remplacer. Nous le disons sur photos, avant tout démontage.',
    ],
    inclus: [
      'le diagnostic sur photos, puis sur la pièce à l’atelier',
      'la dépose complète de l’ancien circuit',
      'douille neuve, câble à trois conducteurs, mise à la terre',
      'nettoyage, redressage et reprise des finitions d’origine',
      'essai en charge de vingt-quatre heures avant le retour',
    ],
    nonInclus: [
      'le remplacement d’un verre sur mesure introuvable',
      'le repeint d’un émail ou d’une laque d’origine',
      'la conservation du câblage ancien, jamais réutilisé, même en bon état apparent',
    ],
    fourchette:
      'Remise aux normes seule : 180 à 350 €. Restauration complète : 450 à 2 500 €, selon l’état de la monture et le verre à refaire.',
    delai:
      '2 à 3 semaines pour une remise aux normes, 6 à 12 semaines pour une restauration complète.',
    photosAEnvoyer: [
      'le dessus de la pièce, là où le câble entre dans la monture',
      'la douille, de près',
      'le câble et son passage dans la tige ou la potence',
      'les marques, plaques ou numéros s’il y en a',
    ],
    piecesLiees: ['suspension-1930'],
  },
  {
    id: 'conseil',
    ancre: 'conseil',
    titre: 'Décider où mettre la lumière',
    accroche: 'Décider où va la lumière quand cela ne coûte encore que du crayon.',
    corps: [
      'Il arrive qu’on nous appelle sans projet d’objet. Un appartement en travaux, six pièces, et la question de savoir où placer les points lumineux avant que tout soit refermé. C’est le meilleur moment pour nous appeler, et souvent le dernier.',
      'La visite dure deux heures. Nous regardons l’orientation, la couleur des murs, la hauteur sous plafond, et surtout ce que vous faites dans chaque pièce une fois la nuit tombée. Un couloir qu’on traverse et un couloir où les enfants s’assoient ne s’éclairent pas de la même façon.',
      'Vous recevez ensuite un plan pièce par pièce : implantation des points, températures, intensité attendue à chaque foyer, culot, type de source et emplacement des variateurs. Un architecte d’intérieur le transmet tel quel à son électricien.',
    ],
    inclus: [
      'la visite et le relevé, deux heures sur place',
      'le plan d’éclairage pièce par pièce',
      'les références de sources et de variateurs compatibles',
      'une relecture du devis de votre électricien',
    ],
    nonInclus: [
      'la fourniture des ampoules et des variateurs',
      'le suivi de chantier et la coordination des autres corps de métier',
    ],
    fourchette:
      'Visite et relevé : 180 €, déduits en cas de commande. Plan d’éclairage d’un logement : 650 à 1 400 €.',
    delai: '2 à 3 semaines après le relevé.',
    livrable:
      'Un plan pièce par pièce, remis en PDF.',
    piecesLiees: ['cerce', 'larmier'],
  },
];

export interface EtapeCommande {
  numero: number;
  titre: string;
  texte: string;
}

/** Les huit étapes, du premier appel au réglage. docs/PRD.md § D5. */
export const etapesCommande: EtapeCommande[] = [
  {
    numero: 1,
    titre: 'Premier contact',
    texte:
      'Vous décrivez l’endroit, si possible avec deux photos prises de jour. Nous répondons sous deux jours ouvrés.',
  },
  {
    numero: 2,
    titre: 'Visite et relevé',
    texte:
      'Une heure ou deux sur place : hauteurs, points existants, couleur des murs, usages du soir.',
  },
  {
    numero: 3,
    titre: 'Croquis et devis',
    texte:
      'Sous 5 à 10 jours ouvrés, avec la fourchette de prix, le délai et les matières proposées.',
  },
  {
    numero: 4,
    titre: 'Acompte',
    texte:
      '40 % à la commande. C’est ce qui déclenche l’achat de la matière et réserve la place au planning.',
  },
  {
    numero: 5,
    titre: 'Dessin d’exécution',
    texte: 'Un plan coté, validé par écrit. Rien n’est coupé avant votre retour.',
  },
  {
    numero: 6,
    titre: 'Fabrication et essai',
    texte:
      'Six à dix semaines à l’établi, puis vingt-quatre heures allumée avant de quitter l’atelier.',
  },
  {
    numero: 7,
    titre: 'Pose ou expédition',
    texte:
      'Pose sur point existant à 120 € le point dans la métropole, ou caisse bois sur mesure par transporteur.',
  },
  {
    numero: 8,
    titre: 'Réglage',
    texte:
      'Un passage dans les trois mois, sans frais dans la métropole.',
  },
];

export interface LigneTarif {
  prestation: string;
  fourchette: string;
  delai: string;
}

/** docs/PRD.md § 2.5 et 2.6, sans arrondi ni recalcul. */
export const tarifs: LigneTarif[] = [
  { prestation: 'Applique sur mesure', fourchette: '380 à 900 €', delai: '6 à 10 semaines' },
  { prestation: 'Série de 6 appliques identiques', fourchette: '2 200 €', delai: '8 à 12 semaines' },
  {
    prestation: 'Suspension en laiton et verre soufflé',
    fourchette: '750 à 1 800 €',
    delai: '6 à 10 semaines, +3 avec du verre soufflé',
  },
  {
    prestation: 'Grande suspension d’escalier',
    fourchette: '2 400 à 6 500 €',
    delai: '6 à 10 semaines, +3 avec du verre soufflé',
  },
  { prestation: 'Lampe à poser', fourchette: '450 à 1 100 €', delai: '6 à 10 semaines' },
  { prestation: 'Lampadaire ou liseuse', fourchette: '900 à 2 200 €', delai: '6 à 10 semaines' },
  { prestation: 'Plafonnier', fourchette: '650 à 1 100 €', delai: '6 à 10 semaines' },
  { prestation: 'Restauration, remise aux normes', fourchette: '180 à 350 €', delai: '2 à 3 semaines' },
  { prestation: 'Restauration complète', fourchette: '450 à 2 500 €', delai: '6 à 12 semaines' },
  {
    prestation: 'Visite et relevé',
    fourchette: '180 €, déduits en cas de commande',
    delai: 'devis sous 5 à 10 jours ouvrés',
  },
  {
    prestation: 'Plan d’éclairage d’un logement',
    fourchette: '650 à 1 400 €',
    delai: '2 à 3 semaines après le relevé',
  },
  { prestation: 'Pose sur point existant', fourchette: '120 € par point', delai: 'à la livraison' },
];

/** docs/PRD.md § 2.7, en phrases. */
export const garanties: string[] = [
  'Deux ans sur toute la partie électrique, cinq ans sur la structure et les finitions. L’usure normale et la patine qui fonce ne sont pas des défauts : c’est le comportement attendu d’un laiton nu, et le devis le dit.',
  'Nous gardons dix ans les verres, douilles, câbles et molettes de chaque modèle. Un verre brisé se refait sans toucher au reste de la pièce, et une retouche part sous dix jours.',
  'Dans les trois mois qui suivent la pose, nous repassons une fois régler ce qui a bougé : hauteur, aplomb, intensité. Sans frais dans la métropole.',
];

export const avecUnArchitecte = {
  titre: 'Travailler avec une agence',
  texte: [
    'Avec un architecte d’intérieur, nous travaillons sur plan. Chaque pièce part avec un dessin coté et une fiche technique : poids, entraxe de fixation, culot, température, classe électrique, indice de protection. De quoi remplir une pièce écrite sans nous rappeler.',
    'Le planning se cale sur celui du chantier et nous livrons groupé, à la semaine demandée. La facturation se fait au client final ou par l’agence, comme vous préférez. Les échantillons de finition circulent en rendez-vous client : laiton brossé, poli, patiné, tôle thermolaquée.',
  ],
};

export const appelServices = {
  texte:
    'Le plus simple, c’est un coup de téléphone. Sinon, écrivez-nous trois lignes sur la pièce et sa hauteur sous plafond.',
  bouton: 'Prendre rendez-vous',
  href: '/contact',
};
