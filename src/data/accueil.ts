/**
 * PAGE D’ACCUEIL — le seuil, les repères, les trois entrées de métier, le
 * chantier raconté, l’établi, la zone, l’appel final.
 *
 * Aucune légende ne commente les images ni le statut de la page : la seule
 * mention de démonstration vit au pied de page. Les trois pièces montrées
 * sont tirées de la collection (champ `vedette`), pas recopiées ici.
 */

/** Composé à la main, une ligne par retour. Le gabarit ne coupe rien. */
export const titreSeuil: string[] = ['Un luminaire', 'n’éclaire bien', 'qu’un seul endroit.'];

export const chapeau =
  'Atelier de luminaires à Lyon 7e, ouvert en 2011. Nous dessinons et fabriquons chaque pièce à l’établi, pour une table, une cage d’escalier ou un couloir précis. Création, restauration, conseil d’éclairage.';

export interface Repere {
  valeur: string;
  libelle: string;
}

export const reperes: Repere[] = [
  { valeur: '2011', libelle: 'l’atelier a ouvert' },
  { valeur: 'Lyon 7e', libelle: 'tout est fabriqué ici, rive gauche du Rhône' },
  { valeur: '6 à 10 semaines', libelle: 'entre le dessin validé et la pose' },
  { valeur: '5 à 10 jours', libelle: 'entre la visite et le devis' },
];

export interface EntreeMetier {
  titre: string;
  /** Une phrase, posée sous le titre du panneau du ruban. */
  accroche: string;
  texte: string;
  lienTexte: string;
  lienHref: string;
}

/** Trois amorces volontairement dissemblables. */
export const entreesMetier: EntreeMetier[] = [
  {
    titre: 'Créer',
    accroche:
      'On prête des ampoules d’essai : la teinte se choisit chez vous, le soir.',
    texte:
      'Tout commence par un relevé et un dessin à l’échelle 1 sur papier kraft. Vous choisissez la matière, la teinte de la lumière, la hauteur ; nous nous occupons du reste, jusqu’à l’essai en charge la veille du départ. Comptez six à dix semaines.',
    lienTexte: 'La création en détail',
    lienHref: '/services#creation',
  },
  {
    titre: 'Restaurer',
    accroche:
      'Deux à trois semaines pour un circuit neuf sous une patine qu’on ne touche pas.',
    texte:
      'Une suspension d’atelier, un lustre de famille, une applique trouvée en brocante : le circuit se refait entièrement, la patine reste. Aucun câblage textile ancien ne ressort d’ici, même intact. Deux à trois semaines pour une remise aux normes.',
    lienTexte: 'La restauration en détail',
    lienHref: '/services#restauration',
  },
  {
    titre: 'Conseiller',
    accroche:
      'Parfois il n’y a rien à fabriquer, juste un plan avant de refermer les murs.',
    texte:
      'Avant d’acheter quoi que ce soit, il arrive qu’on ait surtout besoin d’un plan : combien de foyers, à quelle hauteur, à quelle température, sur quel variateur. La visite coûte 180 €, déduits si une commande suit.',
    lienTexte: 'Le conseil en détail',
    lienHref: '/services#conseil',
  },
];

export const titrePiecesRecentes = 'Sorties de l’atelier';

/** Slugs affichés en page d’accueil, dans cet ordre. */
export const piecesMisesEnAvant: string[] = ['imposte', 'larmier', 'suspension-1930'];

export interface ChantierRaconte {
  titre: string;
  paragraphes: string[];
  lienTexte: string;
  lienHref: string;
}

export const chantier: ChantierRaconte = {
  titre: 'Une salle à manger sous verrière',
  paragraphes: [
    'Plafond à 3,10 m, une table de huit, et une pièce qui devenait triste à quatre heures l’hiver. À cette hauteur, une seule ampoule au centre creuse un anneau d’ombre autour du plateau : les convives des extrémités mangent dans le gris.',
    'Nous avons dessiné un cercle de laiton de 90 cm portant huit foyers bas, de l’ordre de 25 W chacun, à 2 400 K, réglables au variateur. La lumière se répartit sur toute la longueur de la table.',
    'L’alimentation, elle, tombait à 40 cm de l’axe. Plutôt que d’ouvrir le plafond, un bras coudé rattrape la distance et devient le troisième point d’accroche. C’était nécessaire : un cercle suspendu montre le moindre défaut d’aplomb.',
    'Le premier a été refondu. Quatre millimètres de faux-rond, qu’on ne voit pas sur l’établi et qu’on ne voit que trop une fois la pièce allumée sous la verrière.',
  ],
  lienTexte: 'La fiche de cette suspension',
  lienHref: '/collections/cerce',
};

/** Bloc 2 : une phrase seule, sans voisinage. */
export const phraseSeule =
  'Nous ne savons pas dessiner un luminaire sans savoir où il ira.';

/** Bandeau de basculement jour / nuit. */
export const bandeauBasculement =
  'Une pièce se juge deux fois : éteinte au jour, allumée le soir.';

export interface BlocTexte {
  titre: string;
  texte: string;
  lienTexte?: string;
  lienHref?: string;
}

export const etabli: BlocTexte = {
  titre: 'La matière et l’établi',
  texte:
    'Le sol est couvert de copeaux de laiton qui accrochent la lumière ; on les balaie le vendredi. Sur l’établi du fond, le tour à repousser tourne trois ou quatre fois par semaine : c’est lui qui donne aux réflecteurs leur galbe, à la main, en une passe. À côté, le chalumeau de brasure et les baguettes d’argent, rangées par diamètre dans un bocal à confiture. L’odeur, c’est le décapant et la cire chaude ; on ne s’y habitue jamais tout à fait.',
  lienTexte: 'Voir l’atelier',
  lienHref: '/latelier',
};

export const ouEtRythme: BlocTexte = {
  titre: 'Où, et à quel rythme',
  texte:
    'On vient à l’atelier sur rendez-vous, dans le 7e. Le déplacement est sans frais dans la métropole, jusqu’à 60 km au-delà, et sur devis plus loin. En ce moment, comptez six à dix semaines entre le devis signé et la pose. Une remise aux normes de pièce ancienne, elle, tient en deux à trois semaines.',
};

export const ceQueNousNeFaisonsPas: BlocTexte = {
  titre: 'Ce que nous ne faisons pas',
  texte:
    'Nous n’avons pas de boutique et rien n’est en stock : chaque pièce se fabrique après la commande, ce qui prend des semaines. L’installation électrique du logement ne nous appartient pas non plus. Nous posons sur un point existant, votre électricien fait le reste.',
};

export const appelFinal = {
  texte:
    'Dites-nous où la lumière manque : la pièce, sa hauteur, ce que vous y faites une fois la nuit tombée. Nous répondons sous deux jours ouvrés.',
  bouton: 'Parler de votre projet',
  href: '/contact',
  boutonSecondaire: 'Voir les pièces',
  hrefSecondaire: '/collections',
};
