export interface Service {
  titre: string;       // « Création sur mesure » | « Restauration » | « Conseil éclairage »
  description: string; // ce que c'est
  apport: string;      // ce que ça apporte au client (CA-SERV-2)
}

export const services: Service[] = [
  {
    titre: 'Création sur mesure',
    description: 'Nous concevons avec vous un luminaire unique, du premier croquis à la pose : choix des matières, proportions, teinte de la lumière.',
    apport: 'Vous obtenez une pièce qui n’existe nulle part ailleurs, exactement adaptée à votre intérieur et à vos usages.',
  },
  {
    titre: 'Restauration',
    description: 'Nous remettons en état les luminaires anciens : électrification aux normes, nettoyage des laitons, remplacement des pièces fatiguées, dans le respect de la pièce d’origine.',
    apport: 'Votre luminaire de famille retrouve sa lumière et sa sécurité, sans perdre son âme ni sa valeur.',
  },
  {
    titre: 'Conseil éclairage',
    description: 'Nous accompagnons particuliers et architectes d’intérieur pour composer une ambiance lumineuse cohérente, pièce par pièce : intensités, températures, implantations.',
    apport: 'Vous évitez les erreurs coûteuses et obtenez un plan d’éclairage qui met réellement votre espace en valeur.',
  },
];
