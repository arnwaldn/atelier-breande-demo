# Référence d'animation : qiqiglobal.com

**Origine** : désignée par Arnaud le 2026-08-19 à 10h42, en réponse au constat
« je ne vois aucune des animations impressionnantes ». C'est LA référence de
calibrage du lot d'animations du 19/08.

**Examen sur pièces** le 19/08 (Playwright, 1440x900, sondes JavaScript sur le
site en ligne — mesures, pas souvenirs). Captures : `qiqi-1-hero.jpeg`
(flottaison), `qiqi-2-s900.jpeg`, `qiqi-3-s2000.jpeg`, `qiqi-4-s3400.jpeg`.

## Ce qui a été mesuré

| Constat | Preuve relevée |
|---|---|
| Un ruban de panneaux pleine hauteur coulisse HORIZONTALEMENT au fil du défilement vertical | conteneur `sticky top-0 flex`, largeur 4 320 px, `translateX` de -2 878 px à 3 400 px de scroll — environ 1 px de scroll = 1 px de translation |
| Parallax interne à deux vitesses | les fenêtres internes (720 px) portent leur PROPRE translation X : +208, +114, +200 px relevés simultanément |
| Défilement lissé | Lenis présent dans la page |
| Socle | Next.js, GSAP encapsulé dans le bundle |
| Hauteur de page | 4 320 px — courte : tout le budget de défilement passe dans le geste |
| Le texte | grande serif blanche posée, immobile — aucun texte qui gesticule |
| La vie des panneaux | vidéos plein cadre et médaillons circulaires vidéo |

## La leçon de conception

Ce qui impressionne chez Qiqi n'est PAS une accumulation d'effets : c'est **UN
grand geste de scène** (le ruban à deux vitesses, lissé) et de la **sobriété
absolue autour**. Le diagnostic du 19/08 sur notre site en découle : notre
défaut n'était pas d'animer trop peu partout, c'était de n'avoir **aucun
moment où le défilement déplace la scène entière**.

## Ce qu'on transpose, ce qu'on refuse

**Transposé** : le ruban horizontal sticky (sur la travée des trois gestes de
l'accueil, sens droite-vers-gauche pour épouser « la lumière tourne »), le
parallax interne à deux vitesses, le lissage Lenis en molette seule.

**Refusé, et pourquoi** :
- les vidéos plein cadre — notre CSP porte `media-src 'none'`, et nous n'avons
  rien à y gagner : notre vie vient de la scène 3D interactive, que Qiqi n'a
  pas ;
- les médaillons circulaires — un seul suffit, et c'est notre globe de verre ;
- le fond clair et le registre cosmétique — contraire à la direction
  « nuit d'atelier » (ADR-002), qui n'est pas rediscutée.

## Les invariants que cette référence ne renverse PAS

Rien n'anime l'image du hero (LCP). `prefers-reduced-motion` reste digne et
sans un octet téléchargé. CLS 0,000. Plancher de performance 95 en ligne. La
scène 3D reste à 2 400 px minimum sous la flottaison.

**Le seul renversement acté** : Lenis, retiré au chantier initial (« il casse
le défilement Android »), revient — parce que sa configuration par défaut ne
lisse QUE la molette et le trackpad, le tactile restant natif. L'objection
d'origine ne portait donc pas. Tracé dans `socle.ts` à l'endroit du code.
