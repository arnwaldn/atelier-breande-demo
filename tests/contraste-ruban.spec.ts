import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { attendreImmobilite } from './utils';

/**
 * LA PREUVE DÉPLACÉE — garde permanente du voile du ruban des gestes.
 *
 * `.ruban-gestes__voile` est exempté d'axe-core dans violationsAxeAExiger()
 * (voir utils.ts) : un texte posé sur une photographie n'a pas UN fond, axe
 * ne peut mathématiquement pas en calculer un et répond « indéterminable ».
 * L'exemption ne fait pas disparaître la preuve, elle la déplace ICI : on
 * mesure le contraste sur les pixels RÉELLEMENT RENDUS d'une capture, avec
 * scripts/mesurer-contraste-capture.mjs (voir son en-tête pour la leçon du
 * 19/08 : un rapport annonçait ~7:1 quand la capture montrait 63,8 % de la
 * zone du texte sous 4,5:1 — la mesure d'origine portait sur autre chose que
 * l'endroit où le texte est réellement posé).
 *
 * LA ZONE MESURÉE EST RESTREINTE AU TITRE + AU CORPS, LE LIEN EXCLU (recette
 * du 19/08, second tour) : le lien (`.ruban-gestes__lien`) est une étiquette
 * ambre posée tout en bas de la légende, sur la partie la plus opaque du
 * socle — l'inclure dans la zone mesurée dilue la moyenne avec des pixels
 * déjà sûrs. Mesuré sur le panneau « Conseiller » à 360 px : la légende
 * ENTIÈRE (titre + corps + lien) donnait 4,1 % (passait) là où TITRE + CORPS
 * SEULS donnent 9,1 % (échoue) — c'est la seconde mesure qui dit la vérité,
 * puisque c'est elle qui porte sur l'endroit où l'inquiétude porte réellement
 * (le haut du socle, juste sous le titre, où la photo est la moins voilée).
 *
 * Le panneau « Conseiller » est visé délibérément : légende la plus haute
 * (trois lignes), et son socle mobile est celui qui laisse le plus de photo
 * nue derrière le texte. Un seul test réel sur pixels, à 360 ET 1440
 * (indépendant des deux profils du harnais, mobile-360/desktop-1280 : voir
 * playwright.config.ts) — d'où le browser.newContext() explicite plutôt que
 * la fixture `page`.
 */
const COULEUR_TEXTE = '#f4ecdd'; // --color-breande-paper (voir global.css)
const SCRIPT_MESURE = join(process.cwd(), 'scripts', 'mesurer-contraste-capture.mjs');

test.describe('contraste du ruban des gestes — preuve sur pixels', () => {
  test('le titre + corps du panneau « Conseiller » tient 4,5:1 sur au moins 95 % de sa zone, à 360 comme à 1440', async ({
    browser,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-1280',
      'un seul passage suffit : ce test ouvre ses deux largeurs (360 et 1440) lui-même'
    );
    const dossier = mkdtempSync(join(tmpdir(), 'breande-contraste-'));
    try {
      for (const largeur of [1440, 360] as const) {
        const contexte = await browser.newContext({ viewport: { width: largeur, height: largeur === 360 ? 740 : 900 } });
        const page = await contexte.newPage();
        await page.goto('/');
        await attendreImmobilite(page);

        // Amène le panneau « Conseiller » (dernier des trois) dans la fenêtre —
        // scrub GSAP à 1440 (desktop, mouvement permis), glissement natif de
        // la bande à 360 (sous 64 rem, aucun scrub n'y est jamais posé).
        const zone = await page.evaluate(async (estMobile) => {
          const panneaux = Array.from(document.querySelectorAll<HTMLElement>('.ruban-gestes__panneau'));
          const dernier = panneaux[panneaux.length - 1];
          if (estMobile) {
            // Amène d'abord la SECTION dans la fenêtre verticalement (elle
            // est loin sous la flottaison), puis glisse la bande au sein de
            // sa propre fenêtre horizontale — deux axes indépendants.
            document.querySelector<HTMLElement>('[data-ruban]')!.scrollIntoView();
            const fenetre = document.querySelector<HTMLElement>('[data-ruban-fenetre]')!;
            fenetre.scrollLeft = dernier.offsetLeft;
          } else {
            // ON MESURE L'ÉTAT QUE LE VISITEUR LIT, PAS UNE FRACTION DE LA
            // COURSE. Le repère « 98 % de la section » était arbitraire : depuis
            // l'ajout du palier d'entrée (les 500 premiers pixels où le ruban
            // ne bouge pas encore), ce point tombe en pleine transition, sur
            // une légende à demi effacée. Mesurer là revient à juger la
            // lisibilité d'un état fugace que personne ne lit.
            // On cherche donc la position où la légende du panneau est
            // PLEINEMENT opaque, et on mesure celle-là. Le seuil de 5 %
            // reste intact : on corrige le point de vue, pas l'exigence.
            const section = document.querySelector<HTMLElement>('[data-ruban]')!;
            const r = section.getBoundingClientRect();
            const haut = window.scrollY + r.top;
            const bas = haut + r.height - window.innerHeight;
            const legende = dernier.querySelector<HTMLElement>('.ruban-gestes__legende') ?? dernier;
            let trouve = false;
            for (let f = 1; f >= 0.7 && !trouve; f -= 0.02) {
              window.scrollTo(0, bas * f);
              await new Promise((r2) => setTimeout(r2, 220));
              if (Number.parseFloat(getComputedStyle(legende).opacity) >= 0.98) trouve = true;
            }
            if (!trouve) {
              // Aucun point pleinement lisible : c'est un vrai défaut, on le
              // laisse échouer sur la mesure plutôt que de le masquer ici.
              window.scrollTo(0, bas * 0.98);
            }
          }
          // Laisse Lenis/ScrollTrigger (desktop) ou le défilement natif
          // (mobile) digérer la position avant de mesurer.
          await new Promise((r) => setTimeout(r, 500));
          // Zone restreinte : union des rectangles du TITRE et du CORPS,
          // le lien (`.ruban-gestes__lien`) volontairement exclu — voir
          // l'en-tête de ce fichier.
          const titre = dernier.querySelector<HTMLElement>('.ruban-gestes__titre')!;
          const corps = dernier.querySelector<HTMLElement>('.ruban-gestes__texte')!;
          const rt = titre.getBoundingClientRect();
          const rc = corps.getBoundingClientRect();
          const gauche = Math.min(rt.left, rc.left);
          const haut = Math.min(rt.top, rc.top);
          const droite = Math.max(rt.right, rc.right);
          const bas = Math.max(rt.bottom, rc.bottom);
          return {
            x: Math.round(gauche),
            y: Math.round(haut),
            w: Math.round(droite - gauche),
            h: Math.round(bas - haut),
          };
        }, largeur === 360);

        expect(zone.w, 'zone de légende introuvable ou nulle').toBeGreaterThan(0);
        expect(zone.h, 'zone de légende introuvable ou nulle').toBeGreaterThan(0);

        const capture = join(dossier, `${largeur}.png`);
        await page.screenshot({ path: capture });
        await contexte.close();

        const geometrie = `${zone.w}x${zone.h}+${Math.max(zone.x, 0)}+${Math.max(zone.y, 0)}`;
        let sortie = '';
        let echec: unknown = null;
        try {
          sortie = execFileSync(
            'node',
            [SCRIPT_MESURE, capture, geometrie, COULEUR_TEXTE],
            { encoding: 'utf8' }
          );
        } catch (e) {
          echec = e;
          sortie = String((e as { stdout?: string }).stdout ?? e);
        }

        expect(echec, `mesure de contraste échouée à ${largeur}px :\n${sortie}`).toBeNull();
      }
    } finally {
      rmSync(dossier, { recursive: true, force: true });
    }
  });
});
