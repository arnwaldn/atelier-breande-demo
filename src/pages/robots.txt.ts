import type { APIRoute } from 'astro';

// Le site est indexable, et c'est une décision tranchée, pas un oubli.
//
// `noindex` supprimerait d'un coup le risque qu'un prospect tombe sur la démo
// en cherchant un vrai atelier lyonnais. Mais il fait tomber la note de
// référencement de Lighthouse de 100 à 66 — mesuré sur le projet voisin — et
// cette note est publiée comme preuve de l'offre « site vitrine ».
//
// La résolution qui satisfait les deux exigences : on indexe, et la mention de
// démonstration est portée par le <title>, la description et les métadonnées de
// partage. C'est précisément là qu'elle manquait, et c'était le seul canal par
// lequel la confusion pouvait naître.

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const corps = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
