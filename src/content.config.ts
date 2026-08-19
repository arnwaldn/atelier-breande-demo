import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * LE CONTRAT D'INTERFACE du site. Trois équipes travaillent en parallèle :
 * le rédacteur écrit les fiches (src/content/pieces/), le graphiste livre les
 * visuels (src/assets/pieces/<slug>/), le webdesigner construit les gabarits
 * qui consomment ce schéma. Personne ne modifie ce fichier sans passer par
 * l'orchestrateur : c'est lui qui rend les périmètres disjoints.
 *
 * Gabarit issu du PRD (docs/PRD.md, § fiche de pièce — 17 champs).
 */
const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
  schema: ({ image }) =>
    z.object({
      nom: z.string(),
      typologie: z.enum([
        'suspension',
        'applique',
        'lampe-a-poser',
        'lampadaire',
        'plafonnier',
        'restauration',
      ]),
      annee: z.number().int().min(2022).max(2026),
      /** L'image principale — obligatoire, traitée par astro:assets. */
      image: image(),
      imageAlt: z.string().min(10),
      galerie: z
        .array(
          z.object({
            fichier: image(),
            alt: z.string().min(10),
          })
        )
        .default([]),
      /** 35-55 mots : d'où vient la demande, pour quel endroit. */
      chapo: z.string(),
      matieres: z.array(z.string()).min(2).max(6),
      finition: z.string(),
      dimensions: z.string(),
      /** Sources, culot, équivalent d'ampoule, kelvins, IRC, variation.
          JAMAIS le mot « lumen » — même comme unité (nom banni du projet). */
      lumiere: z.string(),
      /** Durée + gestes marquants, 45-70 mots. */
      fabrication: z.string(),
      /** Pièce, hauteur sous plafond, contrainte rencontrée et solution. */
      contexteDePose: z.string(),
      prix: z.string(),
      declinaisons: z.string().optional(),
      delaiCourant: z.string(),
      /** Slugs de deux pièces voisines. */
      piecesVoisines: z.array(z.string()).length(2),
      serviceLie: z.enum(['creation', 'restauration', 'conseil']),
      ordre: z.number().int(),
      vedette: z.boolean().default(false),
    }),
});

export const collections = { pieces };
