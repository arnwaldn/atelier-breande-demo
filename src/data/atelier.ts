/**
 * PAGE L’ATELIER — le lieu, les matières, les procédés, la lumière, ce qui
 * se fait ailleurs, les horaires.
 *
 * Personne n’est nommé sur ce site : l’atelier parle au « nous ». Aucun
 * fournisseur n’est nommé non plus — seuls le métier et la région le sont.
 * Matières, procédés et températures : docs/PRD.md § 2.2, 2.3 et 2.4.
 */

export const enTete = {
  titre: 'L’atelier',
  chapo:
    'Soixante-dix mètres carrés dans le 7e arrondissement de Lyon, trois établis, un tour à repousser et une odeur de décapant. Un mardi ordinaire, on y débite du laiton le matin et on y câble l’après-midi.',
};

/** Le récit du lieu. Un paragraphe par idée, dans l’ordre de lecture. */
export const leLieu: string[] = [
  'Nous nous sommes installés ici en 2011, dans un ancien local d’imprimerie dont les murs gardent des traces d’encre sous la peinture. Au fond, une réserve de matière et un coin de bureau qui sert surtout à téléphoner. Nous sommes trois.',
  'Le tour à repousser a été acheté d’occasion en 2016, à un atelier qui fermait. Il est arrivé grippé et il a fallu tout l’hiver pour le remettre en marche, refaire les glissières, retrouver des mandrins. C’est aujourd’hui la machine qui sert le plus : tous nos réflecteurs sortent de là.',
  'Tout ne se fait pas sur place. Le verre soufflé vient d’un verrier de la vallée du Rhône, le thermolaquage d’un applicateur de l’est lyonnais. Nous savons ce que nous ne savons pas faire, et nous préférons le confier à des gens qui le font tous les jours.',
  'Une série de six appliques est repartie de chez un client pour revenir ici en 2023. La patine avait viré au rouge sur trois d’entre elles : mauvais bain, temps trop long, nous ne l’avons compris qu’après. Tout a été redécapé et repatiné. Le client a attendu cinq semaines de plus.',
];

export interface FamilleMatiere {
  titre: string;
  texte: string;
}

/** Quatre familles, et comment chacune se comporte dans le temps. */
export const familles: FamilleMatiere[] = [
  {
    titre: 'Laiton et cuivre',
    texte:
      'Brossé et verni mat, poli, patiné brun à la cire, étamé à l’intérieur des réflecteurs. Un laiton laissé nu fonce en six mois : il passe du jaune au miel, puis au brun. C’est prévu et c’est souvent pour cela qu’on le choisit. Qui veut garder l’éclat du premier jour prend le verni mat et le nettoie à l’eau savonneuse. Le cuivre rosé, lui, va plus vite encore. Le bronze d’ornement, nous ne le touchons qu’en restauration.',
  },
  {
    titre: 'Verre',
    texte:
      'Clair, ambré, fumé gris, opalin blanc ; strié, sablé ou gravé à l’acide. Tout est soufflé bouche, donc aucun globe n’est le jumeau d’un autre : l’épaisseur varie, une ligne d’air traverse parfois la paroi. Nous commandons systématiquement une pièce de plus que nécessaire. L’albâtre est réservé aux pièces d’exception, l’opaline ancienne aux restaurations.',
  },
  {
    titre: 'Bois',
    texte:
      'Noyer huilé, chêne massif brossé, frêne olivier, érable sycomore, hêtre étuvé pour tout ce qui doit se cintrer. Le bois travaille avec l’hygrométrie : un socle tourné en juillet dans un plateau mal sec fend en janvier près d’un radiateur. Nos plateaux sèchent au moins trois ans avant qu’on y touche.',
  },
  {
    titre: 'Acier et finitions',
    texte:
      'Acier thermolaqué noir texturé, blanc cassé ou vert profond ; fonte pour les bases de lampadaire, qui ont besoin de poids. Le grain texturé encaisse mieux les chocs qu’une laque lisse et se raccorde presque invisiblement en cas de retouche. Une teinte hors de ces trois-là se commande, avec quinze jours de plus au planning.',
  },
];

export interface Procede {
  numero: number;
  titre: string;
  texte: string;
}

export const procedesIntro =
  'Dans l’ordre, du papier kraft à la caisse d’emballage. Une pièce passe par les huit, même la plus simple.';

export const procedes: Procede[] = [
  {
    numero: 1,
    titre: 'Dessin',
    texte:
      'Tracé à l’échelle 1 sur papier kraft, punaisé au mur. Un gabarit de carton est découpé et présenté sur place quand la pièce est grande.',
  },
  {
    numero: 2,
    titre: 'Débit',
    texte:
      'Laiton coupé à la cisaille et à la scie à ruban métal, avec la marge de reprise que réclame chaque assemblage.',
  },
  {
    numero: 3,
    titre: 'Cintrage et roulage',
    texte:
      'Cintrage sur gabarit, roulage du tube et du plat au banc. Les cercles se ferment en dernier, après contrôle du faux-rond.',
  },
  {
    numero: 4,
    titre: 'Repoussage',
    texte:
      'Le réflecteur est formé à la main sur un mandrin de hêtre, à la molette, en une passe continue. C’est le geste le plus long à apprendre.',
  },
  {
    numero: 5,
    titre: 'Assemblage',
    texte:
      'Brasure à l’argent sur le laiton, soudure TIG sur l’acier. Les joints sont repris à la lime jusqu’à disparaître sous la finition.',
  },
  {
    numero: 6,
    titre: 'Satinage ou polissage',
    texte:
      'Toile abrasive grain 240 puis 320 pour un satiné régulier, ou touret pour les pièces qui doivent renvoyer la lumière.',
  },
  {
    numero: 7,
    titre: 'Patine',
    texte:
      'Bain de foie de soufre, arrêté à l’œil parce qu’il n’attend pas, rincé, séché, puis cire microcristalline passée au chiffon.',
  },
  {
    numero: 8,
    titre: 'Câblage et essai',
    texte:
      'Câble H05VV-F 3G0,75, douille porcelaine ou thermoplastique, mise à la terre, serre-câble. Vingt-quatre heures allumée avant l’emballage.',
  },
];

export interface LigneTemperature {
  piece: string;
  temperature: string;
  intensite: string;
}

export const laLumiere = {
  titre: 'La lumière',
  texte: [
    'Nous partons de 2 700 K à peu près partout, parce que c’est la couleur d’une ampoule à filament et que l’œil y est habitué depuis un siècle. On descend à 2 400 ou 2 200 K là où l’on ne fait rien d’exigeant : une chambre, un salon en fin de soirée. On monte à 3 000 K sur un plan de travail, jusqu’à 4 000 K sur un bureau où l’on lit des documents.',
    'L’indice de rendu des couleurs compte autant que la température. En dessous de 90, une peinture jaunit, un bois vire au gris et un teint devient malade. Nous livrons en IRC 90 au minimum, et en 95 devant un miroir de salle de bains.',
    'Les sources sont toujours remplaçables : culot E27, E14, G9, GU10, ou module LED qui se change avec un tournevis. Une diode collée dans la pièce transforme un luminaire en consommable, et nous n’en faisons pas.',
  ],
  /** docs/PRD.md § 2.4 — intensités en équivalent d’ampoule incandescente. */
  tableau: [
    { piece: 'Salon', temperature: '2 400 – 2 700 K', intensite: 'équivalent 40 à 50 W par point' },
    { piece: 'Salle à manger', temperature: '2 700 K', intensite: 'équivalent 50 W par point' },
    { piece: 'Cuisine, plan de travail', temperature: '3 000 K', intensite: 'équivalent 60 à 75 W' },
    { piece: 'Couloir', temperature: '2 700 K', intensite: 'équivalent 25 W par point' },
    { piece: 'Chambre', temperature: '2 200 – 2 400 K', intensite: 'équivalent 25 à 40 W' },
    { piece: 'Miroir de salle de bains', temperature: '3 000 K, IRC 95', intensite: 'équivalent 40 W' },
    { piece: 'Bureau', temperature: '3 000 – 4 000 K', intensite: 'équivalent 60 W' },
    { piece: 'Escalier', temperature: '2 700 K', intensite: 'équivalent 40 W par niveau' },
  ] as LigneTemperature[],
  note:
    'Variation par variateur mural compatible, avec des sources prévues pour, et passage de 2 700 vers 2 200 K en fin de soirée sur demande.',
};

export const ceQuOnNeFaitPasTitre = 'Ce qui se fait ailleurs';

/** Trois refus, en phrases pleines. Pas d’énumération négative. */
export const ceQuOnNeFaitPas: string[] = [
  'L’électricité du bâtiment n’est pas notre métier. Le luminaire se raccorde sur un point déjà en place ; tout ce qui touche aux lignes, aux boîtes et au tableau appartient à un électricien, et c’est très bien ainsi.',
  'La dorure à la feuille part dans un atelier qui ne fait que cela, à deux rues d’ici. Nous la commandons et nous la contrôlons ; la poser, c’est un autre métier.',
  'Au-delà d’une vingtaine de pièces identiques, nous ne sommes plus le bon atelier : le prix devient déraisonnable pour vous et le travail devient de la série pour nous. Nous le disons dès le premier rendez-vous.',
];

export const ouEtQuand = {
  titre: 'Venir',
  texte:
    'L’atelier occupe le fond d’une cour, dans le 7e. On y vient sur rendez-vous, du mardi au vendredi, et le samedi matin quand c’est le seul créneau possible. Nous fermons trois semaines en août. Ce que vous verrez en poussant la porte, ce sont des pièces en cours de montage, des chutes de laiton et de la poussière de ponçage : il n’y a rien à acheter sur place.',
};

export const appel = {
  texte:
    'Chaque pièce montrée dans les collections est partie chez quelqu’un, pour un endroit précis. Vous y verrez mieux qu’ici ce que nous savons faire.',
  bouton: 'Voir les pièces sorties d’ici',
  href: '/collections',
};
