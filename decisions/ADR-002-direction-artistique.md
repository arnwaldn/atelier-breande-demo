# ADR-002 — Direction artistique : « le site est un variateur, pas un interrupteur »

- **Date** : 2026-08-19
- **Statut** : accepté — remplace la v2 du 29/07 (« la lumière ne se révèle que dans l'obscurité »)
- **Autorité** : direction artistique (document intégral remis le 19/08) ; les jetons sont posés dans `src/styles/global.css`

## Le concept

Le jour s'en va pendant qu'on descend la page. Une seule variable,
`--part-de-jour` (1 en haut, 0 au pied), pilote la teinte de la lumière, la
longueur et la direction des ombres, l'intensité des halos, la saturation des
images et la couleur des filets. En bas de page il ne reste que 2 700 K —
l'échelle intime — au moment précis où l'on demande au visiteur d'écrire.
L'arc lumineux et l'entonnoir commercial coïncident.

Le verbe « allumer » est RATIONNÉ : une seule fois dans tout le site, sur la
molette de la pièce 3D. La rareté fait l'effet.

Sans mouvement (`prefers-reduced-motion`), la variable est fixée PAR SECTION :
l'arc subsiste en paliers, la version accessible n'est pas mutilée.

## Ce qui nous rend étranger à la démo sœur (Maison Vaubrune)

Cinq marqueurs INTERDITS sans exception — chacun, seul, ferait dire qu'Arnaud
fait deux fois le même site : monospace · capitales interlettrées en registre ·
cadre blanc autour des images · logotype monumental en pied · cotation en
tableau. Vaubrune est un catalogue imprimé en plein jour ; Bréande est une heure
de la journée. Vaubrune claque ; Bréande monte en régime.

## Le système (résumé exécutable — les valeurs vivent dans global.css)

- **Palette** : nuit d'atelier, jamais de noir pur (banding AMOLED). Une seule
  couleur froide, le gris-bleu de verrière, plafonnée à 12 % hors photos.
  Cinq températures de lumière (2 200 → 5 000 K), jamais en aplat ni en texte.
- **Halos** : `--halo-lisible: 0.18` plafond ABSOLU sous du texte (mesuré :
  à 0,30 le texte secondaire tombe à 4,20:1) ; `--halo-ambiance: 0.34` pour ce
  qu'aucun texte ne traverse. Quatre arrêts minimum par dégradé. Le flou se
  peint, jamais `filter: blur()` sur une grande surface, jamais `backdrop-filter`.
- **Le grain** : 3,5 %, fixe, posé PAR-DESSUS les halos — c'est lui qui casse
  le banding sur Android. Servi en fichier (`/grain.svg`), jamais en `data:`
  (refusé par `img-src 'self'`).
- **Typographie** : Fraunces (titres, axe WONK réservé aux corps > 40 px) +
  Archivo (texte). BAS DE CASSE partout, aucune capitale d'affiche. Étiquettes
  techniques en bas de casse précédées d'un filet de laiton — une étiquette
  d'établi, pas une ligne de catalogue.
- **Largeur** : on ne dilate pas la mesure (34 rem ≈ 62 signes), on PEUPLE la
  marge — images en plein-bord d'un seul côté, marge active, ancrage des blocs
  qui descend vers la droite au fil de la page (« la lumière tourne »).
- **Matière** : filets en dégradé de laiton à cinq arrêts ; cartes avec
  `--recoit-lumiere` en haut et rien en bas ; angles de 2 px (le laiton se
  plie, il ne s'arrondit pas) ; le bois n'existe qu'en photo.
- **Mouvement** : vocabulaire FERMÉ (5 durées, 3 courbes, aucun ease-in, aucun
  `transition: all`). Les révélations sont DÉFINITIVES (jamais de re-masquage
  en remontant). L'élément LCP ne porte JAMAIS d'animation.

## Les trois moments de bravoure

1. **Le lever de lampe** (accueil, 0→900 ms, zéro WebGL) : la photo est là dès
   la première image à 72 % de luminosité ; la lumière monte, DÉPASSE à 1,06,
   se pose à 1,00. Un filament dépasse réellement sa consigne : c'est le détail
   vrai qui fait croire à la lumière.
2. **Le variateur** (accueil, ≥ 2 400 px sous la flottaison) : la molette de
   laiton, 2 200 → 4 000 K, butée élastique à 2 700 K. La seule chose qu'on
   demande au visiteur. Sous 1024 px : chargement 3D sur bouton explicite
   uniquement.
3. **La coupe de matière** (page L'atelier) : un trait de laiton traverse la
   photo d'une suspension ; derrière lui, le dessin technique au trait, calé au
   pixel. Aller-retour à volonté. Deux images + un clip-path : le meilleur
   rapport effet/octet du site.

## Les refus (ne pas rouvrir sans fait nouveau)

Curseur personnalisé (sauf `ew-resize` système sur la molette) · préchargeur ·
défilement lissé (Lenis — casse le défilement natif Android) · kinetic
typography · parallaxe multi-couches (toléré 1× : plan unique, 6 %, seuil) ·
compteurs animés · faux témoignages · verre dépoli/backdrop-filter · vidéo de
fond de hero · bascule clair/sombre (le site EST une nuit d'atelier) · marquee ·
textures bois/métal en CSS · rayons d'angle > 2 px.

## Recette (juger à l'écran, aux 4 largeurs + Samsung réel)

1. Le seuil occupe 100svh plein, le titre ne touche aucun visage.
2. À 1440 : aucune bande verticale vide de plus de 120 px hors marges.
3. Pipette au point le plus clair de chaque halo sous texte : ≥ 7:1.
4. Note perf mobile accueil ≥ 96 avec 3D non chargée sur écran étroit.
5. Comparaison côte à côte avec Vaubrune : AUCUN rapprochement possible.
6. Le bloc 3D est beau avec WebGL désactivé — sinon on ne livre pas.
