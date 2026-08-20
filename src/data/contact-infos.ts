/**
 * PAGE CONTACT — chapô, mentions du formulaire, champs, horaires, zone,
 * ce qui se passe après un message.
 *
 * Ni adresse postale, ni carte : l’atelier se visite sur rendez-vous et la
 * rue se donne au téléphone. Le numéro et les délais viennent d’identite.ts.
 */

/**
 * Composé à la main, une ligne par retour, comme titreSeuil (accueil.ts) —
 * le découpage se fait ici, au build, jamais à l'exécution (geste du 19/08 :
 * trois lignes montantes en entrée de page, voir .titre-contact__ligne dans
 * global.css). Le gabarit ne coupe rien.
 */
export const titreContact: string[] = ['Contacter', 'l’atelier,', 'à Lyon 7e.'];

export const contactEnTete = {
  chapo:
    'Le plus utile, pour commencer, c’est de décrire l’endroit plutôt que l’objet. Une photo prise de jour, la hauteur sous plafond et l’emplacement des points existants nous en disent plus que trois paragraphes.',
};

/**
 * MENTIONS DU FORMULAIRE — déjà en ligne, reprises telles quelles.
 * `avantFormulaire` et `sansJavascript` sont verrouillées par les tests
 * (tests/contact.spec.ts). `apresTentative` est reprise sans sa seconde
 * phrase : le commentaire de méthode qu’elle portait est un interdit
 * éditorial (docs/PRD.md § 1.3) ; l’expression que le test recherche,
 * « envoi est volontairement désactivé », est conservée intacte.
 */
export const mentionsFormulaire = {
  avantFormulaire:
    'Formulaire de démonstration : l’envoi est désactivé sur ce site fictif — aucun message n’est transmis.',
  sansJavascript:
    'Ce formulaire est désactivé sur la démonstration : rien n’est transmis, avec ou sans JavaScript.',
  apresTentative:
    'Formulaire de démonstration — l’envoi est volontairement désactivé sur ce site fictif.',
  libelleBouton: 'Envoi désactivé',
};

/* champsFormulaire (onze champs) et son interface ChampFormulaire ont ete
   retires le 20/08/2026. Ils n'ont jamais ete lus : ContactForm.astro cable
   trois champs a la main et explique pourquoi dans son en-tete — « ajouter
   des champs supplementaires sans les cabler a sa logique de validation
   aurait produit des champs inertes ». Ce n'etait donc pas un oubli mais une
   decision, et la donnee qui restait derriere laissait croire l'inverse a
   quiconque relisait ce fichier. Un formulaire de demonstration a trois
   champs qui marchent vaut mieux qu'un formulaire de onze qui n'existe que
   dans un tableau. */

export const autresMoyens = {
  titre: 'Autrement qu’en écrivant',
  texte:
    'Le téléphone marche mieux que l’écrit pour un premier échange : plutôt en fin de matinée ou après 16 h, parce que le reste du temps nous sommes à l’établi et la machine couvre la sonnerie. Les messages reçoivent une réponse sous deux jours ouvrés. Un rendez-vous à l’atelier se prend par téléphone.',
};

export interface EtapeSuite {
  numero: number;
  texte: string;
}

export const ceQuiSePasseEnsuite: EtapeSuite[] = [
  { numero: 1, texte: 'Un accusé de réception sous deux jours ouvrés, écrit par quelqu’un qui a lu votre message.' },
  { numero: 2, texte: 'Deux ou trois questions de cadrage : hauteur, points existants, usage du soir, ordre de budget.' },
  { numero: 3, texte: 'Une visite sur place, ou un appel d’une demi-heure si le projet est simple.' },
  { numero: 4, texte: 'Un croquis et un devis chiffré, cinq à dix jours ouvrés après la visite.' },
];

export const venirALAtelier = {
  titre: 'Venir à l’atelier',
  texte:
    'On nous trouve dans le 7e, côté rive gauche ; la rue vous est donnée quand le rendez-vous est pris. Il n’y a pas de showroom : vous verrez des établis occupés, des chutes de laiton et le tour à repousser. Comptez une heure, et évitez les chaussures neuves.',
};

export const horaires = {
  semaine: 'du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h',
  samedi: 'le samedi matin, sur rendez-vous',
  fermeture: 'fermé trois semaines en août',
  reception: 'réception sur rendez-vous, jamais à l’improviste',
};

export const zone = {
  titre: 'Où nous intervenons',
  texte:
    'Toute la métropole, et une couronne de 60 km autour. Plus loin, la pièce voyage en caisse bois par transporteur, et le devis l’annonce avant la commande.',
  incluse: [
    'Lyon',
    'Villeurbanne',
    'Caluire-et-Cuire',
    'Écully',
    'Tassin',
    'Sainte-Foy-lès-Lyon',
    'Bron',
    'Oullins',
  ],
  etendue: ['Vienne', 'Villefranche-sur-Saône', 'Bourgoin-Jallieu', 'Ambérieu-en-Bugey'],
  auDela: 'Au-delà de 60 km, sur devis : Grenoble, Saint-Étienne, Chambéry. Expédition partout en France.',
  deplacement: 'Compris dans la métropole ; ensuite 0,60 € par kilomètre passé 30 km, ou 90 € au forfait.',
};
