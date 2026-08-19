/**
 * QUESTIONS FRÉQUENTES — douze questions, posées comme un client les pose.
 *
 * Huit sur la page Services, quatre sur la page Contact. Aucune n’est
 * reprise d’une page à l’autre. Chaque réponse porte au moins une valeur du
 * référentiel (docs/PRD.md § 2), et plusieurs disent franchement une limite.
 */

export interface QuestionFaq {
  /** Identifiant stable, utilisable en ancre (/services#faq-delai). */
  id: string;
  question: string;
  reponse: string;
  page: 'services' | 'contact';
}

export const faq: QuestionFaq[] = [
  {
    id: 'delai',
    question: 'Combien de temps avant d’avoir ma pièce ?',
    reponse:
      'Six à dix semaines à partir du dessin validé, trois de plus si un verre est soufflé pour vous. Ce qui allonge vraiment, ce n’est pas l’atelier : c’est l’hésitation sur le verre, les séries de plus de trois pièces, et les devis signés trois semaines après avoir été envoyés.',
    page: 'services',
  },
  {
    id: 'budget',
    question: 'Quel budget prévoir ?',
    reponse:
      'Une applique va de 380 à 900 €, une suspension de 750 à 1 800 €, une grande pièce de cage d’escalier de 2 400 à 6 500 €. Ce qui fait bouger le prix : le verre soufflé, le nombre de foyers, la finition et la longueur de descente. L’acompte est de 40 % à la commande.',
    page: 'services',
  },
  {
    id: 'commande',
    question: 'Comment se passe une commande ?',
    reponse:
      'Huit étapes, du premier appel au réglage dans les trois mois : visite, relevé, puis un devis chiffré dans les dix jours ouvrés, acompte de 40 %, dessin d’exécution validé par écrit, fabrication, vingt-quatre heures d’essai allumé, puis pose ou expédition.',
    page: 'services',
  },
  {
    id: 'normes',
    question: 'Est-ce aux normes, et qui raccorde ?',
    reponse:
      'La fabrication suit la NF C 15-100, avec des composants marqués CE, en classe I ou II selon la pièce, IP20 en intérieur sec et IP44 en volume 2 de salle de bains. Le luminaire se pose sur le point qui existe déjà. Le reste de l’installation revient à un électricien, et nous ne le faisons pas.',
    page: 'services',
  },
  {
    id: 'couleur-lumiere',
    question: 'Peut-on choisir la couleur de la lumière ?',
    reponse:
      'Entre 2 200 et 3 000 K en habitat, 2 700 K par défaut. Des ampoules d’essai sont prêtées avant de valider, pour juger à la nuit tombée dans la pièce concernée. L’indice de rendu des couleurs est d’au moins 90, et de 95 devant un miroir.',
    page: 'services',
  },
  {
    id: 'variation',
    question: 'Peut-on faire varier l’intensité ?',
    reponse:
      'C’est prévu dès le devis, à condition que le variateur mural et les sources soient compatibles. Les vieux variateurs à triac font grésiller ou clignoter les diodes, et les ampoules premier prix acceptent mal la variation. Nous indiquons une référence de variateur ; il faut parfois changer le vôtre.',
    page: 'services',
  },
  {
    id: 'recuperable',
    question: 'Mon ancien luminaire est-il récupérable ?',
    reponse:
      'Le plus souvent oui : la tôle se redresse, le laiton se repolit, une molette perdue se retaille dans une chute de laiton. Deux choses résistent : un verre sur mesure introuvable et certains transformateurs d’origine. Le câblage textile, lui, n’est jamais conservé, même en parfait état apparent.',
    page: 'services',
  },
  {
    id: 'casse',
    question: 'Et si quelque chose casse ?',
    reponse:
      'Deux ans sur l’électrique, cinq sur la structure et les finitions. Verres, douilles, câbles et molettes sont tenus dix ans : le verre repart chez le verrier et revient en deux à quatre semaines. Une retouche part sous dix jours. La patine qui fonce, en revanche, n’est pas un défaut couvert.',
    page: 'services',
  },
  {
    id: 'deplacement',
    question: 'Vous déplacez-vous chez moi ?',
    reponse:
      'Oui, sans frais dans la métropole et jusqu’à 60 km au-delà. Plus loin, c’est sur devis, ou 0,60 € du kilomètre au-delà de 30 km. Pendant la visite nous regardons les hauteurs, les points existants, l’orientation des fenêtres et la couleur des murs.',
    page: 'contact',
  },
  {
    id: 'hors-region',
    question: 'Livrez-vous hors région ?',
    reponse:
      'Partout en France, en caisse bois faite pour la pièce. Le plan de fixation part avec le colis, mais la pose revient à un électricien de chez vous : nous ne montons pas une suspension à 400 km sans pouvoir revenir la régler.',
    page: 'contact',
  },
  {
    id: 'urgence',
    question: 'J’ai une échéance serrée, c’est possible ?',
    reponse:
      'Parfois, en repartant d’une pièce déjà dessinée et d’une finition disponible : on descend alors autour de quatre semaines. Si votre date n’est pas tenable, nous le disons au téléphone le jour même. Nous préférons perdre la commande que la livrer en retard.',
    page: 'contact',
  },
  {
    id: 'samedi',
    question: 'Peut-on se voir un samedi ?',
    reponse:
      'Le samedi matin, sur rendez-vous. En semaine l’atelier tourne du mardi au vendredi, et ferme trois semaines en août. Un rendez-vous du samedi se cale la semaine d’avant, parce qu’il n’y a qu’une personne à venir ouvrir.',
    page: 'contact',
  },
];

export const faqServices: QuestionFaq[] = faq.filter((q) => q.page === 'services');
export const faqContact: QuestionFaq[] = faq.filter((q) => q.page === 'contact');
