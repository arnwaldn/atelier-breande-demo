/**
 * MESURE DU CONTRASTE SUR UNE CAPTURE RÉELLE — l'outil de la leçon du 19/08.
 *
 * POURQUOI IL EXISTE. Un texte posé sur une PHOTOGRAPHIE n'a pas un fond, il
 * en a des dizaines de milliers. Les outils d'accessibilité automatiques
 * (axe) déclarent alors le contraste « indéterminable » et passent leur
 * chemin ; la tentation est d'ajouter le sélecteur à une liste d'exceptions,
 * et le défaut est enterré pour de bon.
 *
 * Le 19/08/2026, sur le ruban des gestes, un rapport annonçait « environ 7:1
 * au pire endroit » là où la capture montrait un texte illisible. Mesure
 * faite ici sur les pixels réellement rendus : 63,8 % du fond sous 4,5:1 et
 * un minimum à 1,11:1. La mesure d'origine portait sur autre chose que
 * l'endroit où le texte est réellement posé.
 *
 * D'où la règle que ce script outille : sur une image de fond, on ne mesure
 * ni la couleur déclarée ni un échantillon choisi — on mesure LA CAPTURE, sur
 * toute la zone du texte, et on regarde la DISTRIBUTION. Un minimum ne suffit
 * pas (un pixel aberrant condamnerait tout), une moyenne ment (elle noie les
 * zones claires) : c'est la part de surface sous le seuil qui décide.
 *
 * USAGE
 *   node scripts/mesurer-contraste-capture.mjs <capture.png> <LxH+X+Y> [#texte]
 * exemple
 *   node scripts/mesurer-contraste-capture.mjs docs/_invivo/captures/x.png 300x200+25+255 #bdaf9a
 *
 * Dépend d'ImageMagick (`magick`), présent sur le poste.
 * Sort en code 1 si plus de 5 % de la zone passe sous 4,5:1.
 *
 * LE LISÉRÉ DE SOUS-PIXEL — recette du 19/08, sur le fond nuit du ruban des
 * gestes (légende sortie de la photo sous 64 rem). Une fois le texte posé
 * sur un aplat #161210 propre — plus aucun pixel de photo dans la zone —
 * le script échouait encore : 7,2 % à 360 px, 5,2 % à 1440 px. Zoomé
 * (× 8, filtre point), le défaut est visible à l'œil : un liséré cyan d'un
 * côté de chaque trait de lettre, ambre de l'autre — le rendu sous-pixel
 * du texte lui-même (ClearType-like), pas la photo, pas le grain
 * (.grain::after, trop faible — 3,5 % — pour produire des teintes aussi
 * saturées). Ces pixels de liséré ne sont PAS proches de la couleur du
 * texte (le filtre `< 60` juste en dessous les laisse passer), mais ils ne
 * sont jamais qu'à 1 pixel d'un pixel de cœur de glyphe — un défaut de
 * PHOTO, lui, s'étend sur des zones entières sans toucher aucune lettre.
 * D'où la dilatation : est écarté tout pixel de fond situé au contact
 * (8 voisins) d'un pixel de cœur. Rayon 1, le plus petit qui suffise —
 * vérifié sur les deux captures (0,60 % et 0,17 % de reste, une marge de
 * plus de 8× sous le seuil) sans rien retirer d'un vrai défaut de photo,
 * qui n'a jamais cette proximité avec une lettre.
 */

import { execFileSync } from 'node:child_process';

const [capture, zone, couleurTexte = '#bdaf9a'] = process.argv.slice(2);

if (!capture || !zone) {
  console.error('usage : node scripts/mesurer-contraste-capture.mjs <capture.png> <LxH+X+Y> [#texte]');
  process.exit(2);
}

/** Rayon de dilatation autour d'un pixel de cœur de glyphe (voir l'en-tête). */
const RAYON_LISERE = 1;

/** Luminance relative sRGB (WCAG 2.1). */
function luminance(r, v, b) {
  const canal = (c) => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(r) + 0.7152 * canal(v) + 0.0722 * canal(b);
}

function versRvb(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const [tr, tv, tb] = versRvb(couleurTexte);
const lumTexte = luminance(tr, tv, tb);

// ImageMagick rend la zone en liste de pixels : « x,y: (r,v,b) #RRGGBB nom ».
const brut = execFileSync('magick', [capture, '-crop', zone, '+repage', 'txt:-'], {
  encoding: 'utf8',
  maxBuffer: 512 * 1024 * 1024,
});

// Grille (x,y) -> [r,v,b] : la dilatation a besoin des voisins, une liste à
// plat ne le permet pas.
const grille = new Map();
let largeur = 0;
let hauteur = 0;
for (const ligne of brut.split('\n')) {
  const coord = ligne.match(/^(\d+),(\d+): \(([^)]+)\)/);
  if (!coord) continue;
  const x = Number(coord[1]);
  const y = Number(coord[2]);
  const [r, v, b] = coord[3].split(',').map((n) => Number(n.trim()));
  grille.set(`${x},${y}`, [r, v, b]);
  if (x + 1 > largeur) largeur = x + 1;
  if (y + 1 > hauteur) hauteur = y + 1;
}

// Pixel DU GLYPHE et de son lissage : porte la couleur du texte, le compter
// reviendrait à mesurer le texte contre lui-même.
const estCoeurDeGlyphe = (x, y) => {
  const p = grille.get(`${x},${y}`);
  if (!p) return false;
  const [r, v, b] = p;
  return Math.abs(r - tr) + Math.abs(v - tv) + Math.abs(b - tb) < 60;
};

const contrastes = [];
for (let y = 0; y < hauteur; y++) {
  for (let x = 0; x < largeur; x++) {
    const p = grille.get(`${x},${y}`);
    if (!p) continue;
    if (estCoeurDeGlyphe(x, y)) continue;

    // Dilatation (voir l'en-tête) : le liséré de sous-pixel n'est jamais
    // qu'au contact d'un cœur de glyphe — un vrai défaut de photo, lui, ne
    // l'est pas.
    let auContactDuGlyphe = false;
    for (let dy = -RAYON_LISERE; dy <= RAYON_LISERE && !auContactDuGlyphe; dy++) {
      for (let dx = -RAYON_LISERE; dx <= RAYON_LISERE && !auContactDuGlyphe; dx++) {
        if (dx === 0 && dy === 0) continue;
        if (estCoeurDeGlyphe(x + dx, y + dy)) auContactDuGlyphe = true;
      }
    }
    if (auContactDuGlyphe) continue;

    const [r, v, b] = p;
    const lumFond = luminance(r, v, b);
    contrastes.push(
      (Math.max(lumFond, lumTexte) + 0.05) / (Math.min(lumFond, lumTexte) + 0.05)
    );
  }
}

if (contrastes.length === 0) {
  console.error('Aucun pixel de fond dans la zone : vérifiez le cadrage.');
  process.exit(2);
}

contrastes.sort((a, b) => a - b);
const centile = (q) => contrastes[Math.floor(contrastes.length * q)];
const partSous = (seuil) =>
  (100 * contrastes.filter((c) => c < seuil).length) / contrastes.length;

const sous45 = partSous(4.5);

console.log(`Capture   ${capture}`);
console.log(`Zone      ${zone}   texte ${couleurTexte}`);
console.log(`Pixels de fond analysés   ${contrastes.length}`);
console.log(`Contraste minimum         ${contrastes[0].toFixed(2)}:1`);
console.log(`5e centile                ${centile(0.05).toFixed(2)}:1`);
console.log(`Médiane                   ${centile(0.5).toFixed(2)}:1`);
console.log(`Part sous 4,5:1           ${sous45.toFixed(1)} %`);
console.log(`Part sous 3:1             ${partSous(3).toFixed(1)} %`);

// 5 % de tolérance : un texte peut effleurer un éclat de lumière sans être
// illisible ; au-delà, c'est la zone de lecture qui est atteinte.
if (sous45 > 5) {
  console.error(`\nECHEC — ${sous45.toFixed(1)} % de la zone du texte est sous 4,5:1 (tolérance 5 %).`);
  process.exit(1);
}
console.log('\nOK — la zone du texte tient le seuil AA.');
