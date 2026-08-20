#!/usr/bin/env node
/**
 * GARDE DE COMPOSITION — outille ADR-002 § Recette, point 2 : « À 1440 :
 * aucune bande verticale vide de plus de 120 px hors marges. »
 *
 * Le défaut visé : un texte enfermé dans .mesure (34 rem ≈ 544 px) au milieu
 * d'une zone de contenu de ~1330 px, laissant une bande morte de l'un ou
 * l'autre côté. La règle existait depuis le 19/08 dans l'ADR ; elle n'avait
 * jamais été outillée — un jugement à l'œil, jamais rejoué automatiquement.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  MÉCANIQUE
 *
 *  1. Le livrable `dist/` est servi en préproduction (même serveur que
 *     `npm run preview`, même convention que verifier-notes-lighthouse.mjs),
 *     ou bien la base est reçue en argument si un serveur tourne déjà.
 *  2. La liste des pages est DÉRIVÉE d'un parcours réel de `dist/**\/*.html`
 *     (via _lib-dist.mjs, déjà utilisé par les trois autres gardes) — jamais
 *     une liste codée en dur : une garde qui ne connaît que les pages
 *     d'aujourd'hui rate la page de demain.
 *  3. Chaque page est ouverte en 1440×900, SOUS PRÉFÉRENCE DE MOUVEMENT
 *     RÉDUITE (raison détaillée plus bas — c'est le point qui évite les
 *     faux positifs en cascade).
 *  4. Pour chaque <section>, on mesure la largeur utile de la zone de page
 *     et la largeur réellement occupée par le contenu visible, puis on en
 *     déduit la bande vide de chaque côté, hors marges.
 *  5. Bande > 120 px : échec, avec la page, la section et la largeur en
 *     cause. Un tableau s'affiche dans tous les cas, y compris au vert.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  POURQUOI « PRÉFÉRENCE DE MOUVEMENT RÉDUITE » ET NON UN DÉFILEMENT COMPLET
 *
 *  La couche de révélation au scroll (src/scripts/mouvement/revelations.ts)
 *  pose `opacity: 0` sur tout [data-revelation] tant que la section n'a pas
 *  été vue — mais SEULEMENT sous la classe html.mouvement, posée par
 *  demarrerSocle(). Et orchestration.ts ne charge JAMAIS demarrerSocle()
 *  quand `prefers-reduced-motion: reduce` est actif : « pas un octet ne
 *  part ». Sous cette préférence, html.mouvement n'existe jamais, la règle
 *  CSS qui cache le contenu ne s'applique jamais, et tout le contenu de
 *  CHAQUE section est visible dès le premier rendu — sans avoir à faire
 *  défiler la page pour déclencher les révélations une par une. C'est aussi
 *  l'état que l'ADR-002 lui-même désigne comme la vérité de la mise en page
 *  (« l'arc du jour subsiste en paliers, la version accessible n'est pas
 *  mutilée ») : la mesure porte sur la même géométrie, seule l'animation
 *  diffère. Sans ce choix, toute section sous la ligne de flottaison
 *  rendrait un « contenu occupé » de largeur nulle et la garde échouerait
 *  partout, pour la mauvaise raison.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  POURQUOI LA ZONE UTILE SE LIT SUR .entete__cadre, PAS SUR UNE SONDE
 *
 *  Une sonde DOM créée à la volée avec un style en ligne (`el.style.width =
 *  'var(--marge-page)'`) se heurterait à `style-src 'self'` sans
 *  'unsafe-inline' (vercel.json) le jour où cette garde pointe vers un URL
 *  déployé plutôt que la préproduction locale — `astro preview` n'envoie
 *  pas cet en-tête, mais rien ne garantit que ce script ne servira qu'à ça.
 *  `.entete__cadre` (dans <EnTete>, rendu sur CHAQUE page via BaseLayout)
 *  porte déjà, par une feuille de style réelle, exactement les mêmes jetons
 *  que .bandeau et .contenant (`max-width: var(--page-max); margin-inline:
 *  auto; padding-inline: var(--marge-page)` — global.css) : on lit son
 *  rectangle et son remplissage calculé, sans écrire une seule règle.
 *
 * Usage :
 *   node scripts/verifier-composition.mjs                    (démarre son propre serveur, port 4341)
 *   node scripts/verifier-composition.mjs http://localhost:4341/   (réutilise un serveur déjà lancé)
 */

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { promisify } from 'node:util';
import {
  DOSSIER_DIST,
  EchecDeGarde,
  RACINE,
  listerPagesHtml,
  verifierDistPresent,
} from './_lib-dist.mjs';

const executer = promisify(execFile);

const PORT_PAR_DEFAUT = 4341;
const LARGEUR_VIEWPORT = 1440;
const HAUTEUR_VIEWPORT = 900;
const BANDE_VIDE_MAX_PX = 120; // ADR-002 § Recette, point 2 — appliqué à la lettre.

/*
 * EXCEPTIONS — sections volontairement centrées et étroites (un appel à
 * l'action, une phrase seule), où une bande vide symétrique EST le parti
 * pris, pas un oubli. Chaque entrée DOIT porter sa raison : une exception
 * sans motif écrit n'a pas sa place ici.
 *
 * Clé de correspondance : (chemin de page, cle de section), où « cle » est
 * l'id, sinon l'aria-labelledby, sinon l'aria-label brut de la <section> ;
 * à défaut (aucun des trois), le texte propre de la section, préfixé
 * « texte: » — repli utilisé par la garde elle-même pour cibler les courts
 * moments éditoriaux sans identifiant (voir cleDeSection côté navigateur).
 * JAMAIS l'étiquette affichée en tableau, qui peut porter un suffixe de
 * regroupement.
 */
const EXCEPTIONS = [
  {
    page: '/',
    cle: 'texte:Une pièce se juge deux fois : éteinte au jour, allumée le soir.',
    raison:
      'Bandeau de basculement : une phrase seule, délibérément CENTRÉE (.bandeau-basculement — ' +
      'display:flex, justify-content:center — et .bandeau-basculement__texte — text-align:center, ' +
      'max-width:var(--mesure)), pas un oubli de mise en page. Bandes symétriques (392 px des deux ' +
      'côtés au premier relevé, 2026-08-20) : la preuve d\'un centrage voulu, jamais d\'une dérive.',
  },
  {
    page: '/',
    cle: 'Repères de l’atelier',
    raison:
      'LIMITE DE LA MESURE, pas un vide de composition — vérifié à la capture ET au relevé ' +
      'de géométrie le 20/08/2026. La grille .grille-reperes occupe 1 328 px, soit la zone ' +
      'utile ENTIÈRE, en quatre colonnes strictement égales de 314 px. Les 134 px relevés à ' +
      'droite sont la fin de la dernière LÉGENDE (« entre la visite et le devis », plus ' +
      'courte que sa colonne), et cette garde mesure le texte rendu, jamais la boîte qui le ' +
      'contient — c\'est ce choix qui la rend fiable partout ailleurs. Allonger ce libellé ' +
      'pour satisfaire une mesure serait écrire pour la garde et non pour le lecteur. ' +
      'ATTENTION : cette exception vaut pour un dépassement de 14 px sur un seuil de 120. ' +
      'Si le chiffre s\'éloigne, ce n\'est plus le même cas — il faut re-mesurer, pas ' +
      'étendre l\'exception.',
  },
  // Exemple de forme attendue pour une future exception, laissé en
  // commentaire pour ne pas être pris pour une exception active :
  // { page: '/contact/', cle: 'titre-faq-contact', raison: 'Bloc de question unique, centré à dessein — direction artistique du 19/08.' },
];

function estExempte(cheminPage, cle) {
  if (!cle) return null;
  return EXCEPTIONS.find((e) => e.page === cheminPage && e.cle === cle) ?? null;
}

/**
 * URL de site (chemin absolu, toujours préfixé « / ») pour un fichier de
 * dist/. SANS BARRE OBLIQUE FINALE sur les routes de répertoire — constaté
 * au premier lancement de cette garde (2026-08-20) : astro.config.mjs pose
 * `trailingSlash: 'never'`, et le serveur de preview le fait RESPECTER
 * jusque dans sa résolution de fichiers statiques. `/collections/cerce/`
 * (barre finale) rend 404 ; `/collections/cerce` (sans elle) rend 200 et
 * sert bien collections/cerce/index.html. Une garde qui ignorerait cette
 * politique échouerait sur TOUTES les pages sauf la racine — pour la
 * mauvaise raison (page introuvable), jamais celle qu'elle doit surveiller.
 */
function urlDepuisFichier(cheminAbsolu) {
  const rel = relative(DOSSIER_DIST, cheminAbsolu).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`;
  return `/${rel}`;
}

/**
 * Sert dist/ comme `npm run preview` (même mécanique que
 * verifier-notes-lighthouse.mjs). Construit le livrable s'il manque.
 * Si le port par défaut est déjà occupé — cas courant d'un
 * `npm run preview` lancé à la main pendant qu'on développe cette garde —
 * on suppose que c'est LUI et on s'y connecte, sans en prendre la charge.
 */
async function servirLeLivrable() {
  if (!existsSync(join(DOSSIER_DIST, 'index.html'))) {
    console.log('  « dist/ » est absent — construction du livrable avant la mesure…');
    const cliAstro = join(RACINE, 'node_modules/astro/bin/astro.mjs');
    await executer(process.execPath, [cliAstro, 'build'], { cwd: RACINE, maxBuffer: 32 * 1024 * 1024 });
  }

  const { preview } = await import('astro');
  const serveur = await preview({ root: RACINE, logLevel: 'error', server: { port: PORT_PAR_DEFAUT } });
  /*
   * LE PORT RÉELLEMENT LIÉ N'EST PAS FORCÉMENT PORT_PAR_DEFAUT — constaté au
   * premier lancement de cette garde (2026-08-20) : le serveur de preview
   * d'Astro (Vite dessous) N'ÉCHOUE PAS sur un port occupé, il en cherche un
   * AUTRE en silence (« Port 4341 is in use, trying another one… » sur
   * stderr) et le rend dans l'objet retourné. Construire l'URL sur
   * PORT_PAR_DEFAUT sans relire `serveur.port` aurait fait naviguer TOUTES
   * les pages vers un serveur qui n'écoute pas — chaque page « ne charge
   * pas », jamais une bande vide mesurée. Le port qui compte est celui que
   * le serveur a réellement pris.
   */
  return { base: `http://${serveur.host ?? 'localhost'}:${serveur.port}/`, arreter: () => serveur.stop() };
}

/**
 * Fonction exécutée DANS la page (Playwright page.evaluate) : mesure toutes
 * les sections d'un coup, un seul aller-retour navigateur ↔ Node par page.
 */
function mesurerLesSectionsDeLaPage(bandeVideMaxPx) {
  /** Visible au sens de la garde : ni caché, ni décoratif hors flux. */
  function estVisible(el) {
    if (typeof el.checkVisibility === 'function') {
      // opacityProperty + visibilityProperty + contentVisibilityAuto : les
      // trois motifs de disparition que la mission demande d'ignorer, en un
      // seul appel natif — plus fiable qu'une relecture manuelle de style.
      return el.checkVisibility({
        opacityProperty: true,
        visibilityProperty: true,
        contentVisibilityAuto: true,
      });
    }
    // Repli si checkVisibility manque (navigateur ancien) : approximation
    // raisonnable, jamais utilisée sur le Chromium de Playwright en usage
    // normal — gardée pour ne pas planter plutôt que pour être exacte.
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (parseFloat(style.opacity) === 0) return false;
    return true;
  }

  /** Élément « purement décoratif en position fixed » — exclu quel que
   * soit son contenu (.grain, .lueur-verriere et tout ce qui leur ressemble :
   * la mission les cite comme EXEMPLES d'une catégorie, pas comme la liste
   * complète — la catégorie qu'ils illustrent est « position: fixed »). */
  function estDecoratifHorsFlux(el) {
    return getComputedStyle(el).position === 'fixed';
  }

  /** Un élément-image compte pour son propre rectangle (son rendu EST son
   * étendue visuelle — contrairement au texte, voir plus bas). */
  function estElementImage(el) {
    /*
     * .toLowerCase() : PAS un simple confort de comparaison — sans lui,
     * aucun <svg> inline n'est jamais détecté. tagName n'est mis en
     * MAJUSCULES que pour les éléments de l'espace de noms HTML (<img>,
     * <video>…) ; un <svg> vit dans l'espace de noms SVG, où tagName garde
     * la casse d'origine (« svg », en minuscules). `tag === 'SVG'` ne
     * matche donc JAMAIS un <svg> réel — trouvé au premier relevé
     * (2026-08-20) : les dessins techniques au trait de la marge active
     * comptaient pour zéro contenu, sur tout le site, jusqu'à cette ligne.
     */
    const tag = el.tagName.toLowerCase();
    return tag === 'img' || tag === 'picture' || tag === 'svg' || tag === 'video' || tag === 'canvas';
  }

  /**
   * Identifiant technique stable (pour les exceptions) — jamais l'étiquette
   * affichée. id, puis aria-labelledby, puis aria-label ; à défaut, un
   * repli sur le texte propre de la section (tronqué) : ces sections sans
   * identifiant sont, dans les faits, de courts moments éditoriaux isolés
   * (une phrase, un appel à l'action) — leur texte est un identifiant plus
   * stable qu'un rang dans le DOM, qui bougerait au moindre ajout de
   * section plus haut dans la page.
   */
  function cleDeSection(section) {
    if (section.id) return section.id;
    const labelledby = section.getAttribute('aria-labelledby');
    if (labelledby) return labelledby;
    const ariaLabel = section.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    const texte = section.textContent.replace(/\s+/gu, ' ').trim();
    if (texte) return `texte:${texte.slice(0, 80)}`;
    return null;
  }

  /** Étiquette lisible pour les messages — la clé technique si elle existe,
   * sinon le premier titre trouvé, sinon un numéro d'ordre. */
  function etiquetteDeSection(section, index) {
    if (section.id) return section.id;
    const labelledby = section.getAttribute('aria-labelledby');
    if (labelledby) return labelledby;
    const ariaLabel = section.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    const titre = section.querySelector('h1, h2, h3, h4');
    if (titre && titre.textContent.trim()) return titre.textContent.trim();
    return `section n°${index + 1} (sans id ni aria-label)`;
  }

  // La zone utile de page : lue sur un élément RÉEL déjà stylé par la
  // feuille du site (.entete__cadre, présent sur chaque page via
  // <EnTete>/BaseLayout), jamais recopiée en dur ni recalculée depuis les
  // valeurs de global.css — si les jetons --page-max/--marge-page changent,
  // cette garde suit sans retouche. Repli sur .contenant puis .bandeau au
  // cas où la structure de l'en-tête changerait un jour.
  const porteurDeZone = document.querySelector('.entete__cadre, .contenant, .bandeau');
  if (!porteurDeZone) {
    return {
      erreur:
        'aucun élément .entete__cadre, .contenant ni .bandeau trouvé sur la page — impossible de lire la zone utile.',
    };
  }
  const rectZone = porteurDeZone.getBoundingClientRect();
  const styleZone = getComputedStyle(porteurDeZone);
  const zoneGauche = rectZone.left + parseFloat(styleZone.paddingLeft || '0');
  const zoneDroite = rectZone.right - parseFloat(styleZone.paddingRight || '0');

  /**
   * Union des rectangles du contenu visible SOUS `racine` (bornes incluses).
   *
   * LE TEXTE SE MESURE PAR UN RANGE SUR LE NŒUD, JAMAIS PAR LE RECTANGLE DE
   * L'ÉLÉMENT — la correction la plus importante de cette garde, trouvée à
   * sa propre contre-épreuve (2026-08-20). Un <h2> ou un <p> sans classe de
   * largeur (.mesure, .mesure-large…) est un bloc CSS ordinaire : son
   * rectangle vaut la largeur de SA COLONNE (width:auto remplit le
   * parent), pas celle de son texte. Preuve : une colonne rétrécie à
   * 300 px de force continuait de mesurer 1 328 px de contenu occupé,
   * parce qu'un <h2> voisin sans largeur propre remplissait sa section
   * entière — la garde n'aurait vu la moitié des vides qu'elle doit
   * précisément détecter. `Range.getClientRects()` sur le NŒUD DE TEXTE
   * rend le tracé RÉEL des lignes rendues (chaque ligne d'un texte qui
   * s'enroule est un rectangle séparé) — c'est ce que voit l'œil, pas la
   * boîte qui l'entoure. Les images gardent leur propre rectangle : leur
   * rendu EST leur étendue visuelle, aucune boîte parente ne s'interpose.
   */
  function occupationSous(racine) {
    let occupeGauche = Infinity;
    let occupeDroit = -Infinity;
    let compte = 0;
    const grandir = (gauche, droite) => {
      compte += 1;
      if (gauche < occupeGauche) occupeGauche = gauche;
      if (droite > occupeDroit) occupeDroit = droite;
    };

    for (const el of racine.querySelectorAll('*')) {
      if (estDecoratifHorsFlux(el)) continue;
      if (!estVisible(el)) continue;

      if (estElementImage(el)) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) grandir(rect.left, rect.right);
        continue;
      }

      /*
       * PICTOGRAMME CSS (::before/::after avec un `content`) SUR UNE
       * FEUILLE SANS ENFANT — le chevron « + / − » de l'accordéon
       * (.accordeon-item__icone) n'a NI texte NI balise <svg> : le signe
       * est dessiné par deux pseudo-éléments (barres en `background`), et
       * il est plaqué au bord droit de sa ligne par `justify-content:
       * space-between`. Sans cette règle, la garde ne voit RIEN à cet
       * endroit alors que l'œil y voit un repère jusqu'au bord de la
       * marge — trouvé à la contre-épreuve du 20/08/2026 sur la FAQ.
       * Restreint aux éléments SANS enfant élément : un <h2> a des
       * enfants (ou du texte propre déjà mesuré ci-dessus), jamais de
       * pseudo-contenu seul à représenter — cette règle ne le concerne
       * donc jamais, et ne réintroduit pas le défaut corrigé plus haut
       * (le rectangle d'un bloc qui remplit sa colonne par défaut).
       */
      if (el.children.length === 0) {
        const styleAvant = getComputedStyle(el, '::before').content;
        const styleApres = getComputedStyle(el, '::after').content;
        if (styleAvant !== 'none' || styleApres !== 'none') {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 || rect.height > 0) grandir(rect.left, rect.right);
        }
      }

      for (const noeud of el.childNodes) {
        if (noeud.nodeType !== Node.TEXT_NODE) continue;
        if (noeud.textContent.trim().length === 0) continue;
        const intervalle = document.createRange();
        intervalle.selectNodeContents(noeud);
        for (const ligne of intervalle.getClientRects()) {
          if (ligne.width === 0 && ligne.height === 0) continue;
          grandir(ligne.left, ligne.right);
        }
      }
    }
    return { occupeGauche, occupeDroit, compte };
  }

  const sections = Array.from(document.querySelectorAll('section'));

  /*
   * REGROUPEMENT .marge-active — le patron qui « peuple la marge » (voir
   * MargeActive.astro) place le ou les <section> narratifs dans la colonne
   * 1 d'une grille CSS et l'ornement qui comble la marge (une élévation au
   * trait) dans la colonne 2, EN DEHORS de ces <section> : un frère qui
   * couvre leur hauteur combinée (grid-row: 1 / -1, sticky), jamais un
   * descendant de l'un d'eux. Mesuré au 20/08/2026 sur /collections/cerce :
   * chaque <Bandeau> de la grille s'arrête à x=1104 (bord de la colonne
   * récit), et l'ornement occupe x=1152→1440 — un vide qui, à l'écran, est
   * comblé, mais qu'une mesure section par section ne verrait jamais,
   * puisque l'ornement n'est descendant d'AUCUNE des deux sections. L'unité
   * de composition réelle est .marge-active tout entier ; le mesurer
   * section par section aurait produit ici un faux positif sur les sept
   * fiches de pièce du site — pas un défaut de composition, un angle mort
   * de la mesure. Généralisable à toute page future qui adopte ce patron :
   * rien n'est codé en dur sur les fiches de pièce, seule la classe compte.
   */
  const dejaTraitees = new Set();
  const unites = [];
  for (const section of sections) {
    if (dejaTraitees.has(section)) continue;
    const groupe = section.closest('.marge-active');
    if (groupe) {
      const membres = Array.from(groupe.querySelectorAll(':scope > section'));
      const membresReels = membres.length > 0 ? membres : [section];
      for (const m of membresReels) dejaTraitees.add(m);
      unites.push({ racineMesure: groupe, membres: membresReels });
    } else {
      dejaTraitees.add(section);
      unites.push({ racineMesure: section, membres: [section] });
    }
  }

  const resultats = [];
  for (const { racineMesure, membres } of unites) {
    const { occupeGauche, occupeDroit, compte } = occupationSous(racineMesure);
    const enGroupe = membres.length > 1;

    for (const section of membres) {
      const index = sections.indexOf(section);
      const suffixeGroupe = enGroupe ? ' (mesurée avec le groupe .marge-active)' : '';
      const base = {
        index,
        cle: cleDeSection(section),
        etiquette: `${etiquetteDeSection(section, index)}${suffixeGroupe}`,
      };
      if (compte === 0) {
        resultats.push({ ...base, contenuDetecte: false });
        continue;
      }
      // Un seul jeu de mesures pour tout le groupe (partagé entre ses
      // membres) : ce n'est pas plusieurs mesures identiques par hasard,
      // c'est UNE mesure sur l'unité de composition réelle, rapportée sur
      // chaque section qui la compose — jamais un contenu compté deux fois
      // dans le total, chaque bloc de contenu n'appartient qu'à une unité.
      const bandeGauche = Math.max(0, occupeGauche - zoneGauche);
      const bandeDroite = Math.max(0, zoneDroite - occupeDroit);
      resultats.push({
        ...base,
        contenuDetecte: true,
        zoneGauche,
        zoneDroite,
        largeurZoneUtile: zoneDroite - zoneGauche,
        occupeGauche,
        occupeDroit,
        largeurOccupee: occupeDroit - occupeGauche,
        bandeGauche,
        bandeDroite,
        conforme: bandeGauche <= bandeVideMaxPx && bandeDroite <= bandeVideMaxPx,
      });
    }
  }

  return { resultats };
}

const LARGEUR_PAGE_COL = 22;
const LARGEUR_SECTION_COL = 46;

function ligneEnTete() {
  console.log(
    `${'Statut'.padEnd(7)}${'Page'.padEnd(LARGEUR_PAGE_COL)}${'Section'.padEnd(LARGEUR_SECTION_COL)}` +
      `${'Bande G.'.padStart(9)}${'Bande D.'.padStart(9)}${'Seuil'.padStart(8)}`,
  );
  console.log('-'.repeat(7 + LARGEUR_PAGE_COL + LARGEUR_SECTION_COL + 9 + 9 + 8));
}

function tronque(texte, longueur) {
  if (texte.length <= longueur) return texte;
  return `${texte.slice(0, longueur - 1)}…`;
}

function ligneResultat(pageUrl, r) {
  const page = tronque(pageUrl, LARGEUR_PAGE_COL - 1).padEnd(LARGEUR_PAGE_COL);
  const section = tronque(r.etiquette, LARGEUR_SECTION_COL - 1).padEnd(LARGEUR_SECTION_COL);

  if (!r.contenuDetecte) {
    console.log(`${'IGNORÉ'.padEnd(7)}${page}${section}${'—'.padStart(9)}${'—'.padStart(9)}${'—'.padStart(8)}`);
    return { echec: false, ignore: true };
  }

  const exemption = estExempte(pageUrl, r.cle);
  const conforme = r.conforme || Boolean(exemption);
  const statut = conforme ? 'OK' : 'ECHEC';
  const bandeG = `${r.bandeGauche.toFixed(0)}px`.padStart(9);
  const bandeD = `${r.bandeDroite.toFixed(0)}px`.padStart(9);
  const seuil = `${BANDE_VIDE_MAX_PX}px`.padStart(8);
  console.log(`${statut.padEnd(7)}${page}${section}${bandeG}${bandeD}${seuil}`);
  if (exemption) {
    console.log(`       └ exemptée : ${exemption.raison}`);
  }
  return { echec: !conforme, ignore: false, exempte: Boolean(exemption) };
}

async function principal() {
  verifierDistPresent();
  const pages = listerPagesHtml();
  if (pages.length === 0) {
    throw new EchecDeGarde(['ÉCHEC — aucune page HTML trouvée sous dist/.']);
  }

  const baseFournie = process.argv[2];
  const service = baseFournie
    ? { base: baseFournie.endsWith('/') ? baseFournie : `${baseFournie}/`, arreter: async () => {} }
    : await servirLeLivrable();

  const { chromium } = await import('playwright');
  const navigateur = await chromium.launch();

  let echecs = 0;
  let exemptees = 0;
  const echecsDetail = [];

  try {
    // Préférence de mouvement réduite pour TOUTE la session de mesure — la
    // raison est développée dans l'en-tête du fichier : sans elle, le
    // contenu sous la ligne de flottaison n'est jamais révélé et la garde
    // se trompe de cible sur toutes les sections basses.
    const contexte = await navigateur.newContext({
      viewport: { width: LARGEUR_VIEWPORT, height: HAUTEUR_VIEWPORT },
      reducedMotion: 'reduce',
    });
    const page = await contexte.newPage();

    console.log(`  Composition mesurée en ${LARGEUR_VIEWPORT}×${HAUTEUR_VIEWPORT}, seuil ${BANDE_VIDE_MAX_PX} px.`);
    console.log('');
    ligneEnTete();

    for (const fichier of pages) {
      const urlPage = urlDepuisFichier(fichier);
      const reponse = await page.goto(new URL(urlPage, service.base).toString(), { waitUntil: 'load' });
      if (!reponse || !reponse.ok()) {
        echecs += 1;
        console.log(`${'ECHEC'.padEnd(7)}${tronque(urlPage, LARGEUR_PAGE_COL - 1).padEnd(LARGEUR_PAGE_COL)}` +
          `page non chargée (${reponse ? reponse.status() : 'aucune réponse'})`);
        continue;
      }

      const mesure = await page.evaluate(mesurerLesSectionsDeLaPage, BANDE_VIDE_MAX_PX);
      if (mesure.erreur) {
        echecs += 1;
        console.log(`${'ECHEC'.padEnd(7)}${tronque(urlPage, LARGEUR_PAGE_COL - 1).padEnd(LARGEUR_PAGE_COL)}${mesure.erreur}`);
        continue;
      }

      for (const r of mesure.resultats) {
        const { echec, exempte } = ligneResultat(urlPage, r);
        if (echec) {
          echecs += 1;
          echecsDetail.push({ page: urlPage, section: r.etiquette, bandeGauche: r.bandeGauche, bandeDroite: r.bandeDroite });
        }
        if (exempte) exemptees += 1;
      }
    }

    console.log('-'.repeat(7 + LARGEUR_PAGE_COL + LARGEUR_SECTION_COL + 9 + 9 + 8));
    if (echecs > 0) {
      const lignes = [`ÉCHEC — ${echecs} section(s) avec une bande vide de plus de ${BANDE_VIDE_MAX_PX} px :`, ''];
      for (const e of echecsDetail) {
        const cote = e.bandeGauche > e.bandeDroite ? 'gauche' : 'droite';
        const largeur = Math.round(Math.max(e.bandeGauche, e.bandeDroite));
        lignes.push(`  - ${e.page} — « ${e.section} » : bande vide à ${cote}, ${largeur} px.`);
      }
      lignes.push(
        '',
        'Rappel ADR-002 § Recette (2) : « on ne dilate pas la mesure, on peuple la marge » —',
        'le remède habituel est une image en plein-bord ou un déplacement de l’ancrage du',
        'bloc, jamais un simple élargissement de .mesure.',
      );
      throw new EchecDeGarde(lignes);
    }

    const suffixeExemptees = exemptees > 0 ? ` (dont ${exemptees} exemptée(s), voir EXCEPTIONS)` : '';
    console.log(`OK — aucune bande vide au-delà de ${BANDE_VIDE_MAX_PX} px sur ${pages.length} page(s)${suffixeExemptees}.`);
  } finally {
    await navigateur.close();
    await service.arreter();
  }
}

try {
  await principal();
} catch (erreur) {
  console.log('');
  if (erreur instanceof EchecDeGarde) {
    for (const l of erreur.lignes) console.log(l);
  } else {
    console.log(`ECHEC — erreur inattendue : ${erreur?.stack ?? erreur}`);
  }
  process.exitCode = 1;
}
