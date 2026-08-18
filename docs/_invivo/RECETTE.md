Scénarios in-vivo exécutés le 2026-07-20 (recette T5) :
- Beta-tester (Playwright MCP) : S1 golden path PASSE (preuve : 2026-07-20-s1-confirmation-golden-path.png), S2-S6+S8 PASSE, bonus XSS adversarial PASSE.
- Session principale (Chrome DevTools MCP, emulation 375x812) : S7 mobile PASSE sur les 3 pages (zero debordement, empilement OK, bouton 48px, golden path re-valide en mobile).
- Lighthouse mobile : Accessibilite 100, Best Practices 100, SEO 100 (47 audits, 0 echec). Performance non chiffree par l'outil : acquise par construction (statique, SVG locaux, polices systeme).
- QA statique : 0 bloquant. Security-review : SUR (1 finding MOYEN documentaire, corrige par amendement ADR-001 §11bis).

## Recette du 2026-07-31 — correctif mobile + en-tetes de securite

Declencheur : bêta test du 31/07. Sur 360x740 (Pixel 5, iPhone 13), le titre du
hero passait sous l'en-tete superpose et sa premiere ligne etait rognee. La
recette mobile du 20/07 avait ete faite en 375x812, AVANT la refonte visuelle
du 29/07 qui a introduit le hero en position absolue : le defaut n'existait pas
encore au moment du test.

Preuves : `2026-07-31-bug-hero-mobile-360x740-avant.png` (defaut) et
`2026-07-31-hero-mobile-360x740-apres.png` (production corrigee).

- Mesures Playwright, 3 pages x 6 largeurs (360, 390, 412, 768, 1280, 1440) sur
  la PRODUCTION : 18 combinaisons, chevauchement titre/en-tete 0 px partout
  (136 px avant sur 360), aucun titre rogne, aucun defilement horizontal,
  console vide, aucune requete en echec.
- Formulaire de contact re-teste sous la CSP reelle : 3 messages d'erreur sur
  envoi vide, aucune confirmation abusive, confirmation affichee sur envoi
  valide, formulaire masque. Zero erreur console.
- Lighthouse 12.8.2 en ligne, mobile : accueil 99/100/100/100 (LCP 2,1 s,
  CLS 0, TBT 0 ms) · services 100/100/100/100 · contact 100/100/100/100.
  Desktop accueil : 100/100/100/100 (LCP 0,5 s). Poids accueil 304 Ko.
  Progression de la performance mobile : 97 -> 99.
- En-tetes verifies en ligne sur les 3 pages : CSP stricte, HSTS 2 ans,
  nosniff, Referrer-Policy, X-Frame-Options DENY, COOP, CORP,
  Permissions-Policy, X-Permitted-Cross-Domain-Policies.
- Piege attrape en cours de route : `connect-src 'none'` bloque le fetch que
  Lighthouse execute depuis la page pour lire /robots.txt -> note SEO 100 -> 92.
  Corrige en `connect-src 'self'` (mesure A/B sur le meme build).
