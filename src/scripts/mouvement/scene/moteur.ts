/**
 * LA SCÈNE — un luminaire de verre soufflé et de laiton qui s'allume.
 *
 * IMPORTS NOMMÉS, jamais `import * as THREE` : three@0.185 déclare ses effets
 * de bord limités aux nœuds, Rollup a donc le droit d'élaguer tout ce qui
 * n'est pas nommé ici. C'est le levier qui fait passer le fragment de
 * 181 Ko gzip (mesuré sur le projet frère) sous le budget de 140.
 * ZÉRO module additionnel : pas de RoomEnvironment (l'environnement est
 * fabriqué à la main), pas d'EffectComposer (le halo est un sprite), pas de
 * chargeur glTF (géométrie procédurale — et la CSP l'impose de toute façon :
 * worker-src 'none' refuse les décodeurs).
 *
 * LE VERRE N'A PAS DE TRANSMISSION, et c'est la décision la plus lourde de la
 * scène : `transmission > 0` fait rendre la scène UNE SECONDE FOIS par image
 * dans une cible dédiée — le doublement du coût de remplissage, précisément
 * le facteur limitant d'un téléphone. Le volume s'obtient par DOUBLE COQUE :
 * la coque extérieure porte le reflet (clearcoat), la coque intérieure en
 * BackSide montre la paroi lointaine à travers la proche. Une passe, deux
 * tirages de géométrie.
 *
 * LE REFUS DE DÉMARRER EST PROPRE : WebGL2 exigé, try/catch autour de tout,
 * `data-scene-refusee` écrit dans le document, et JAMAIS un message de
 * console — la note « bonnes pratiques » les compte, et elle est publiée.
 * L'état d'attente du bloc est son image peinte, qui est le DÉFAUT : il n'y a
 * jamais de trou à couvrir.
 */

import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Group,
  HemisphereLight,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
} from 'three';
import { gsap, ScrollTrigger } from '../socle';
import { rendreLaMain } from '../attente';
import {
  CONTRATS,
  Gouverneur,
  jugerNiveau,
  ratioDePixels,
  type ContratQualite,
} from './qualite';
import {
  COURONNE,
  FILAMENT_HAUTEUR,
  HAUTEUR_GLOBE,
  profilGlobe,
  TIGE,
} from '../../../lib/profil-luminaire';

interface EtatScene {
  rendu: WebGLRenderer;
  liberer: () => void;
}

/** Le halo du filament : un dégradé radial peint UNE FOIS dans un canvas en
 *  mémoire — zéro fichier, zéro data:, la CSP ne voit rien passer. */
function textureHalo(): CanvasTexture {
  const canevas = document.createElement('canvas');
  canevas.width = 128;
  canevas.height = 128;
  const ctx = canevas.getContext('2d');
  if (ctx) {
    const d = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    // Douze arrets sur une decroissance quadratique : quatre arrets se
    // lisaient en anneaux durs sous l'accumulation additive.
    for (let i = 0; i <= 11; i++) {
      const p = i / 11;
      const a = 0.55 * (1 - p) * (1 - p);
      d.addColorStop(p, 'rgba(255, 169, 88, ' + a.toFixed(3) + ')');
    }
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new CanvasTexture(canevas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** La boîte d'atelier : trois panneaux émissifs (verrière froide au zénith,
 *  lampe chaude à gauche, rebond du sol), filtrés UNE FOIS par PMREM.
 *  Sans carte d'environnement, un métal est une tache grise morte. */
function environnementAtelier(rendu: WebGLRenderer): ReturnType<PMREMGenerator['fromScene']>['texture'] {
  const boite = new Scene();
  const panneau = (couleur: number, intensite: number, x: number, y: number, z: number, ry: number, rx: number) => {
    const p = new Mesh(
      new PlaneGeometry(3, 3),
      new MeshBasicMaterial({ color: couleur })
    );
    p.material.color.multiplyScalar(intensite);
    p.position.set(x, y, z);
    p.rotation.set(rx, ry, 0);
    boite.add(p);
  };
  panneau(0xa8b6be, 1.4, 0, 2.4, 0, 0, Math.PI / 2); // verrière froide, zénith
  panneau(0xffa958, 1.1, -2.2, 0.4, 0, Math.PI / 2, 0); // lampe d'établi, gauche
  panneau(0x2a1f16, 0.7, 0, -2.2, 0, 0, -Math.PI / 2); // rebond du sol
  const pmrem = new PMREMGenerator(rendu);
  const cible = pmrem.fromScene(boite, 0.06);
  pmrem.dispose();
  return cible.texture;
}

export async function demarrerScene(hote: HTMLElement): Promise<void> {
  // Le diagnostic se déclare AVANT le contrôle de capacité : la recette peut
  // vérifier sur n'importe quel poste, y compris ceux qui refusent.
  const contratNom = jugerNiveau(
    window.innerWidth,
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  );
  hote.dataset.sceneQualite = contratNom;
  const contrat = CONTRATS[contratNom];

  const essai = document.createElement('canvas');
  if (!essai.getContext('webgl2')) {
    hote.dataset.sceneRefusee = 'contexte';
    return;
  }

  let etat: EtatScene | null = null;
  try {
    etat = await monterScene(hote, contrat);
  } catch {
    hote.dataset.sceneRefusee = 'machine';
    return;
  }

  // Fondu d'arrivée par-dessus l'image peinte — depuis une image identique,
  // aucune bascule visible.
  const canevas = etat.rendu.domElement;
  canevas.style.opacity = '0';
  canevas.style.transition = 'opacity 450ms ease-out';
  requestAnimationFrame(() => {
    canevas.style.opacity = '1';
  });
  hote.dataset.sceneActive = 'oui';
}

async function monterScene(
  hote: HTMLElement,
  contrat: ContratQualite
): Promise<EtatScene> {
  // La scene remplit la zone du repli (ou elle se substitue a l'image),
  // jamais l'hote entier — qui contient aussi la molette et le titre.
  const zoneMesure = hote.querySelector<HTMLElement>('.bande-scene__repli') ?? hote;
  const largeur = zoneMesure.clientWidth;
  const hauteur = zoneMesure.clientHeight;

  // --- Tranche 1 : le contexte graphique -------------------------------
  // ?scene-capture : outil de RECETTE — sans preserveDrawingBuffer, une
  // capture d'ecran headless rend un canevas vide (le tampon est recycle
  // apres composition). Le parametre n'existe que pour produire l'image de
  // repli depuis la vraie scene ; en usage normal il est absent et ne coute
  // rien.
  const capture = new URLSearchParams(window.location.search).has('scene-capture');
  const rendu = new WebGLRenderer({
    antialias: contrat.antialias,
    alpha: true,
    powerPreference: 'low-power',
    preserveDrawingBuffer: capture,
  });
  rendu.setSize(largeur, hauteur);
  rendu.setPixelRatio(
    ratioDePixels(window.devicePixelRatio, contrat, largeur, hauteur)
  );
  // Le canevas est transparent sur un fond peint : ACES écraserait les
  // hautes lumières, c'est-à-dire la matière même d'un site sur la lumière.
  rendu.toneMapping = NeutralToneMapping;
  if (contrat.ombres > 0) {
    rendu.shadowMap.enabled = true;
  }
  await rendreLaMain();

  // --- Tranche 2 : la scène et l'environnement -------------------------
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, largeur / hauteur, 0.1, 10);
  camera.position.set(0.32, 0.18, 0.85);
  camera.lookAt(0, 0.12, 0);
  scene.environment = environnementAtelier(rendu);
  scene.environmentIntensity = 0.55;
  await rendreLaMain();

  // --- Tranche 3 : le luminaire ----------------------------------------
  const groupe = new Group();
  const points = profilGlobe().map((p) => new Vector2(p.x, p.y));

  const verreExterieur = new MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.26,
    roughness: 0.08,
    metalness: 0,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.4,
    depthWrite: false,
  });
  const globe = new Mesh(new LatheGeometry(points, contrat.segments), verreExterieur);

  // La coque intérieure : le VOLUME. On voit la paroi lointaine à travers la
  // proche — l'astuce qui remplace la réfraction pour un tirage de géométrie.
  const verreInterieur = new MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.18,
    roughness: 0.12,
    metalness: 0,
    side: BackSide,
    depthWrite: false,
  });
  const globeInterieur = new Mesh(
    new LatheGeometry(points.map((p) => p.clone().multiplyScalar(0.94)), Math.max(24, contrat.segments / 2)),
    verreInterieur
  );

  // Le laiton « satiné » — jamais « brossé » : un métal brossé suppose une
  // anisotropie, donc une texture, donc des octets.
  const laiton = new MeshStandardMaterial({ metalness: 0.9, roughness: 0.34, color: 0xc7a377 });
  const couronne = new Mesh(
    new TorusGeometry(COURONNE.rayon, COURONNE.section, 12, Math.max(24, contrat.segments / 2)),
    laiton
  );
  couronne.rotation.x = Math.PI / 2;
  couronne.position.y = HAUTEUR_GLOBE + 0.002;
  const tige = new Mesh(
    new CylinderGeometry(TIGE.rayon, TIGE.rayon, TIGE.longueur, 10),
    laiton
  );
  tige.position.y = HAUTEUR_GLOBE + TIGE.longueur / 2;

  // Le filament : une petite sphère sans coût d'éclairage + sa lumière.
  const filament = new Mesh(
    new SphereGeometry(0.012, 12, 12),
    new MeshBasicMaterial({ color: 0x2a1a10 })
  );
  filament.position.y = HAUTEUR_GLOBE * FILAMENT_HAUTEUR;
  const lumiere = new PointLight(0xffd9a0, 0, 1.6, 2);
  lumiere.position.copy(filament.position);
  if (contrat.ombres > 0) {
    lumiere.castShadow = true;
    lumiere.shadow.mapSize.set(contrat.ombres, contrat.ombres);
  }

  // Le halo : un sprite additif orienté caméra — 90 % du bloom pour une
  // fraction de milliseconde, zéro module additionnel.
  const halo = new Sprite(
    new SpriteMaterial({
      map: textureHalo(),
      blending: AdditiveBlending,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  halo.scale.setScalar(0.5);
  halo.position.copy(filament.position);

  // Le sol : uniquement une ombre — la matière du fond, c'est la page.
  const sol = new Mesh(
    new PlaneGeometry(2.4, 2.4),
    new ShadowMaterial({ opacity: 0.35 })
  );
  sol.rotation.x = -Math.PI / 2;
  sol.position.y = -0.001;
  sol.receiveShadow = contrat.ombres > 0;

  groupe.add(globe, globeInterieur, couronne, tige, filament, lumiere, halo, sol);
  // La suspension pend : le groupe est posé pour que le globe flotte.
  groupe.position.y = 0;
  scene.add(groupe);
  scene.add(new HemisphereLight(0xa8b6be, 0x2a1f16, 0.35));
  await rendreLaMain();

  // --- Tranche 4 : l'allumage au défilement + l'horloge ------------------
  // Une progression 0→1 pilotée par le DÉFILEMENT (jamais une minuterie),
  // mappée sur cinq nombres. RÈGLE ABSOLUE de la boucle : ne jamais toucher
  // une propriété qui déclenche une recompilation de matériau (transparent,
  // side, envMap, blending). Couleur et intensité sont gratuites.
  const teinteEteinte = new Color(0x2a1a10);
  const teinteAllumee = new Color(0xffd9a0);
  const teinteCourante = new Color();
  // Les deux bouts de l'echelle de la molette, sur la courbe du corps noir.
  const teinte2200 = new Color(0xff9224);
  const teinte4000 = new Color(0xffd1a3);
  const allumage = { valeur: 0 };
  // 0..1 sur l'echelle 2200-4000 K ; 0,278 = 2700 K, la position de repos.
  const temperature = { valeur: 0.278 };
  const appliquer = () => {
    const t = allumage.valeur;
    // La teinte de la lampe suit la molette ; son intensite suit l'allumage.
    teinteCourante.copy(teinte2200).lerp(teinte4000, temperature.valeur);
    lumiere.intensity = t * 9;
    lumiere.color.copy(teinteCourante);
    (filament.material as MeshBasicMaterial).color
      .copy(teinteEteinte)
      .lerp(teinteCourante, t);
    verreExterieur.opacity = 0.22 + t * 0.08;
    // LE REGLAGE DOIT SE VOIR — correction du 19/08/2026, sur signalement
    // d'Arnaud (« aucun effet lorsque je bouge »). La teinte n'atteignait que
    // la lumiere ponctuelle et le filament : un point de 20 px changeait de
    // couleur, et rien d'autre. Sur un site qui annonce « la lumiere se
    // regle », le geste ne se voyait pas.
    //
    // Deux surfaces recoivent desormais la teinte, choisies parce qu'elles
    // sont larges et lues comme de la lumiere, pas comme de la matiere :
    //   - le halo, dont la texture est peinte a 2 700 K ; la multiplier par la
    //     teinte courante la deplace sur l'echelle (le bleu de la texture est
    //     faible, il monte au froid et s'efface au chaud). L'opacite passe de
    //     0,40 a 0,46 pour compenser l'assombrissement du produit ;
    //   - le verre interieur, qui s'illumine de l'interieur — c'est ce que le
    //     brief appelait « le globe devient translucide par l'interieur ».
    //     `emissive` est un uniform : l'ecrire ne recompile aucun materiau,
    //     la regle absolue de la boucle est respectee.
    const materiauHalo = halo.material as SpriteMaterial;
    materiauHalo.opacity = t * 0.5;
    materiauHalo.color.copy(teinteCourante);
    verreInterieur.emissive.copy(teinteCourante).multiplyScalar(t * 0.8);
    scene.environmentIntensity = 0.55 + t * 0.45;
  };
  appliquer();

  const declencheur = ScrollTrigger.create({
    trigger: hote,
    start: 'top 80%',
    end: 'center 45%',
    scrub: 0.6,
    onUpdate: (auto) => {
      allumage.valeur = auto.progress;
      appliquer();
    },
  });

  // LA MOLETTE PREND LA MAIN. Le defilement amene l'allumage tout seul ;
  // des que le visiteur touche la molette, c'est LUI qui commande — le
  // variateur, litteralement. Le scrub est tue, sans retour : un reglage
  // qui se referait defaire par le defilement serait une main fantome.
  let mainAuVisiteur = false;
  const surReglage = (e: Event): void => {
    const detail = (e as CustomEvent<{ t: number }>).detail;
    if (!mainAuVisiteur) {
      mainAuVisiteur = true;
      // Le defilement ne reprend plus la main : un reglage que le scroll
      // referait defaire serait une main fantome.
      declencheur.kill();
    }
    // DEUX DEFAUTS CORRIGES ICI LE 19/08/2026, signales par Arnaud sur le
    // rendu — le second est le retour d'un defaut deja paye le matin meme.
    //
    // 1. L'ECOUTEUR NE SE RETIRE PLUS. Il etait supprime au premier reglage,
    //    en meme temps que le scrub : le premier geste passait, tous les
    //    suivants etaient ignores. Tuer le declencheur de defilement, oui ;
    //    tuer la molette, jamais — c'est le seul geste que le site demande.
    //
    // 2. LA MOLETTE REGLE UNE TEMPERATURE, PAS UNE INTENSITE. `allumage` etait
    //    ecrase par la position de la molette, si bien que la teinte
    //    (`temperature.valeur`, lue par appliquer()) ne bougeait jamais : la
    //    lampe changeait de luminosite au lieu de changer de couleur, en
    //    contradiction avec ce que la page annonce — « la lumiere se regle ».
    //    Toucher la molette ALLUME (le visiteur veut voir), et deplace la
    //    teinte entre 2 200 et 4 000 K sur la courbe du corps noir.
    allumage.valeur = 1;
    temperature.valeur = detail.t;
    appliquer();
  };
  hote.addEventListener('breande-reglage', surReglage);

  // Une seule horloge : gsap.ticker. Hors du champ ou onglet caché : rien ne
  // tourne. Le gouverneur juge sur le 95e centile — voir qualite.ts.
  const gouverneur = new Gouverneur();
  let visible = true;
  let precedent = performance.now();
  const boucle = () => {
    if (!visible) return;
    const maintenant = performance.now();
    const duree = maintenant - precedent;
    precedent = maintenant;
    const cran = gouverneur.observer(duree);
    if (cran === 1) {
      rendu.setPixelRatio(rendu.getPixelRatio() * 0.85);
    } else if (cran === 2 && rendu.shadowMap.enabled) {
      rendu.shadowMap.enabled = false;
      lumiere.castShadow = false;
    }
    // légère respiration du filament allumé — la vie d'une lampe réelle
    if (allumage.valeur > 0.6) {
      const respiration = 1 + Math.sin(maintenant / 480) * 0.015;
      lumiere.intensity = allumage.valeur * 9 * respiration;
    }
    rendu.render(scene, camera);
  };
  gsap.ticker.add(boucle);

  const veille = new IntersectionObserver((entrees) => {
    visible = entrees[0]?.isIntersecting ?? false;
    precedent = performance.now();
  });
  veille.observe(hote);
  const surVisibilite = () => {
    visible = document.visibilityState === 'visible';
    precedent = performance.now();
  };
  document.addEventListener('visibilitychange', surVisibilite);

  const surRedimension = () => {
    const l = zoneMesure.clientWidth;
    const h = zoneMesure.clientHeight;
    camera.aspect = l / h;
    camera.updateProjectionMatrix();
    rendu.setSize(l, h);
    rendu.setPixelRatio(ratioDePixels(window.devicePixelRatio, contrat, l, h));
  };
  window.addEventListener('resize', surRedimension, { passive: true });

  const canevas = rendu.domElement;
  canevas.style.position = 'absolute';
  canevas.style.inset = '0';
  canevas.style.pointerEvents = 'none';
  canevas.setAttribute('aria-hidden', 'true');
  // Dans la ZONE DU REPLI, jamais sur l'hote entier : sur mobile le bloc est
  // vertical et un canevas plein hote passait PAR-DESSUS la molette.
  const zone = hote.querySelector<HTMLElement>('.bande-scene__repli') ?? hote;
  zone.appendChild(canevas);

  return {
    rendu,
    liberer: () => {
      gsap.ticker.remove(boucle);
      declencheur.kill();
      veille.disconnect();
      document.removeEventListener('visibilitychange', surVisibilite);
      window.removeEventListener('resize', surRedimension);
      rendu.dispose();
      canevas.remove();
    },
  };
}
