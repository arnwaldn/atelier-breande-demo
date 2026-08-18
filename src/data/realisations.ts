export interface Realisation {
  titre: string;
  description: string; // courte, 1 phrase
  image: string;       // chemin public, ex. '/images/realisation-suspension.webp'
  alt: string;         // texte alternatif descriptif en français
  matieres: string[];  // vocabulaire d'atelier, affiché en ligne de specs
  ratio: 'paysage' | 'portrait';
}

export const realisations: Realisation[] = [
  {
    titre: 'Suspension laiton — appartement haussmannien',
    description: 'Une suspension en laiton brossé dessinée pour un salon haussmannien, entre lignes classiques et lumière contemporaine.',
    image: '/images/realisation-suspension.webp',
    alt: 'Suspension en laiton allumée dans un salon haussmannien au crépuscule, parquet en point de Hongrie éclairé par sa lumière ambrée',
    matieres: ['laiton brossé', 'verre ambré', '2700 K'],
    ratio: 'paysage',
  },
  {
    titre: 'Lampe de table en verre soufflé',
    description: 'Un globe de verre soufflé à la main, posé sur un socle de noyer huilé, pour une lumière douce de fin de journée.',
    image: '/images/realisation-lampe.webp',
    alt: 'Lampe de table au globe de verre soufflé lumineux sur socle en noyer, dans un coin lecture sombre',
    matieres: ['verre soufflé', 'noyer huilé', '2700 K'],
    ratio: 'portrait',
  },
  {
    titre: 'Appliques murales sur mesure — boutique',
    description: 'Une série d’appliques orientables créées pour mettre en valeur les vitrines d’une boutique lyonnaise.',
    image: '/images/realisation-appliques.webp',
    alt: 'Trois appliques murales en laiton éclairant des boiseries vert profond et des étagères de céramiques',
    matieres: ['laiton poli', 'orientable', 'série de 3'],
    ratio: 'paysage',
  },
];
