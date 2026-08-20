/**
 * CHRONOMETRE DE REVELATION — au critere COMPLET.
 *
 * Le 20/08/2026, j'ai annonce une duree percue de 632 ms en ne chronometrant
 * que l'opacite. Au critere complet (opacite ET deplacement), c'etait 900 ms.
 * Le protocole ne se resume pas au nombre de tirages : il inclut CE QU'ON
 * REGARDE. Ce script regarde les deux, et releve en plus le moment du
 * declenchement — la deuxieme moitie du reproche d'Arnaud (« ca se declenche
 * trop rapidement ») est une question de POSITION dans l'ecran, pas de duree.
 *
 * Usage : node scripts/mesurer-revelation.mjs [base]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4341';

/** Blocs mesures : trois hauteurs differentes, deux pages. */
const CIBLES = [
  { page: '/latelier', selecteur: '#titre-lumiere', libelle: 'latelier / titre « La lumiere »' },
  { page: '/latelier', selecteur: '.tableau-lumiere', libelle: 'latelier / tableau (grand bloc)' },
  { page: '/services', selecteur: '.liste-tarifs', libelle: 'services / liste des tarifs' },
  { page: '/services', selecteur: '#titre-garanties', libelle: 'services / titre « Garanties »' },
  { page: '/', selecteur: '.phrase-seule', libelle: 'accueil / phrase seule' },
];

const SEUIL_OPACITE = 0.9;
const SEUIL_TY = 1.5;

function tyDepuisTransform(transform) {
  if (!transform || transform === 'none') return 0;
  const m = transform.match(/matrix\(([^)]+)\)/);
  if (m) return Number(m[1].split(',')[5]);
  const m3 = transform.match(/matrix3d\(([^)]+)\)/);
  if (m3) return Number(m3[1].split(',')[13]);
  return 0;
}

const navigateur = await chromium.launch();
const page = await navigateur.newPage({ viewport: { width: 1440, height: 900 } });

const resultats = [];

for (const cible of CIBLES) {
  await page.goto(BASE + cible.page, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Le porteur de l'animation est l'element lui-meme s'il porte
  // data-revelation, sinon son ancetre le plus proche qui le porte.
  const existe = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const porteur = el.closest('[data-revelation]');
    if (!porteur) return 'sans-revelation';
    porteur.setAttribute('data-chrono', '');
    return porteur.hasAttribute('data-revele') ? 'deja-revele' : 'ok';
  }, cible.selecteur);

  if (existe !== 'ok') {
    resultats.push({ ...cible, erreur: existe ?? 'introuvable' });
    continue;
  }

  // On se place de sorte que le bloc soit SOUS le pli, hors de portee.
  await page.evaluate(() => {
    const el = document.querySelector('[data-chrono]');
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, y - window.innerHeight * 1.6));
  });
  await page.waitForTimeout(900);

  const dejaParti = await page.evaluate(() =>
    document.querySelector('[data-chrono]').hasAttribute('data-revele')
  );
  if (dejaParti) {
    resultats.push({ ...cible, erreur: 'revele avant le defilement (place trop haut)' });
    continue;
  }

  // Enregistrement image par image pendant qu'on franchit la ligne.
  // L'enregistrement part MAINTENANT et on ne l'attend pas : le defilement
  // doit avoir lieu PENDANT, sinon on chronometre une page immobile.
  const enregistrement = page.evaluate(
    ({ seuilOpacite, seuilTy }) => {
      return new Promise((resoudre) => {
        const el = document.querySelector('[data-chrono]');
        const images = [];
        let tDeclenchement = null;
        let positionDeclenchement = null;
        const t0 = performance.now();

        const boucle = () => {
          const t = performance.now() - t0;
          const style = getComputedStyle(el);
          const boite = el.getBoundingClientRect();
          const revele = el.hasAttribute('data-revele');

          if (revele && tDeclenchement === null) {
            tDeclenchement = t;
            // Position du HAUT du bloc dans l'ecran, en % de la hauteur.
            positionDeclenchement = (boite.top / window.innerHeight) * 100;
          }
          if (tDeclenchement !== null) {
            images.push({
              t: t - tDeclenchement,
              opacite: Number(style.opacity),
              transform: style.transform,
            });
          }
          if (t > 6000 || (tDeclenchement !== null && t - tDeclenchement > 3000)) {
            resoudre({ images, tDeclenchement, positionDeclenchement });
            return;
          }
          requestAnimationFrame(boucle);
        };
        requestAnimationFrame(boucle);
      });
    },
    { seuilOpacite: SEUIL_OPACITE, seuilTy: SEUIL_TY }
  );

  // Defilement realiste, a la molette, pendant l'enregistrement.
  for (let i = 0; i < 30; i += 1) {
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(2500);

  const mesure = await enregistrement;
  const images = mesure.images.map((i) => ({
    t: i.t,
    opacite: i.opacite,
    ty: tyDepuisTransform(i.transform),
  }));

  const complet = images.find((i) => i.opacite >= SEUIL_OPACITE && Math.abs(i.ty) <= SEUIL_TY);
  const opaciteSeule = images.find((i) => i.opacite >= SEUIL_OPACITE);
  const fin = images.find((i) => i.opacite >= 0.999 && Math.abs(i.ty) < 0.05);

  resultats.push({
    ...cible,
    position: mesure.positionDeclenchement,
    dureeComplete: complet ? complet.t : null,
    dureeOpaciteSeule: opaciteSeule ? opaciteSeule.t : null,
    dureeTotale: fin ? fin.t : null,
    images: images.length,
  });

  await page.evaluate(() =>
    document.querySelector('[data-chrono]')?.removeAttribute('data-chrono')
  );
}

await navigateur.close();

console.log('');
console.log('CHRONOMETRAGE DES REVELATIONS — ' + BASE);
console.log('Critere complet : opacite >= 0,90 ET |translateY| <= 1,5 px');
console.log('Position : hauteur du bloc dans l ecran au declenchement (0 % = haut, 100 % = bas)');
console.log('');
console.log(
  'bloc'.padEnd(38) +
    'declenche a'.padStart(12) +
    'percue'.padStart(10) +
    '(opac.)'.padStart(10) +
    'totale'.padStart(10)
);
console.log('-'.repeat(80));
for (const r of resultats) {
  if (r.erreur) {
    console.log(r.libelle.padEnd(38) + ('  ERREUR : ' + r.erreur));
    continue;
  }
  console.log(
    r.libelle.padEnd(38) +
      (r.position === null ? '?' : r.position.toFixed(0) + ' %').padStart(12) +
      (r.dureeComplete === null ? '>3 s' : Math.round(r.dureeComplete) + ' ms').padStart(10) +
      (r.dureeOpaciteSeule === null ? '-' : Math.round(r.dureeOpaciteSeule) + ' ms').padStart(10) +
      (r.dureeTotale === null ? '-' : Math.round(r.dureeTotale) + ' ms').padStart(10)
  );
}
console.log('');
