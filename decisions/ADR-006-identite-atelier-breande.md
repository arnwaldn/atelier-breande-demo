# ADR-006 — La démonstration s'appelle Atelier Bréande

- **Date** : 2026-08-19
- **Statut** : accepté, appliqué le jour même
- **Décision d'Arnaud** sur dossier de trois candidats vérifiés

## Le fait

La démonstration s'appelait « Atelier Lumen ». **C'est le nom d'une société
réelle** : PROLUM ATELIER LUMEN, SIREN 847 633 195, RCS Lyon, 39 rue Ambroise
Paré à Genas, commerce de gros de matériel d'éclairage. Son site déclare
travailler pour « architectes, électriciens, bureaux d'études, agenceurs,
magasins, collectivités locales, hôtels, restaurants » — la clientèle que notre
atelier fictif revendiquait mot pour mot — et affiche comme références les
boutiques Rolex et Cartier de Lyon.

Notre démonstration publique portait ce nom, se disait « artisanat lyonnais »,
montrait des réalisations inventées, et nommait Arnaud en pied de page comme
auteur. Elle a vécu ainsi environ trois semaines. L'adresse de contact fictive
du site était `contact@atelier-lumen.fr` : à un tiret près, le domaine de la
société réelle.

Deux vérifications indépendantes ont trouvé le conflit séparément le même jour.

## Pourquoi personne ne l'avait vu

La règle de la maison du 18/08 — « étiqueter *fictif* ne suffit pas si le nom
est réel » — avait été écrite pour les **jeux de données** d'une capture
d'écran. Personne ne l'avait repassée sur le **nom des démonstrations
elles-mêmes**, qui est pourtant le nom le plus exposé de tous : il est dans
l'URL, dans le titre, dans les métadonnées de partage, et dans le portfolio qui
le vend.

Le protocole de vérification à six canaux existait déjà, dans la décision 000 de
Maison Vaubrune, datée du 06/08. **Atelier Lumen avait simplement été nommé
avant lui**, le 20/07, quand ce projet n'était encore qu'un banc d'essai interne
que personne n'imaginait publier.

Une règle écrite pour un cas ne se généralise pas toute seule.

## La décision

**Atelier Bréande**, retenu sur trois candidats. Contrôles passés : recherche
web (aucun résultat, aucun secteur) ; annuaire des entreprises (142 entités
portent le patronyme « Bréand » — éleveurs, médecins, commerçants — **aucune
dans l'éclairage**) ; domaines `.fr` et `.com` libres.

Réserve consignée, parce qu'elle doit être connue : au pluriel, « Les
Bréandes » est un lieu-dit de Perrigny, dans l'Yonne, où opèrent des ateliers de
loisirs créatifs. Autre métier, autre région à 350 km, autre forme. Sans commune
mesure avec un conflit de même métier dans la même ville.

Restent à faire avant de considérer le nom définitivement gravé : marques
France et UE via TMview, en classes 11, 20 et 35, et réseaux sociaux.

## Ce qui a été fait, et l'ordre compte

1. **Purge avant publication.** 132 occurrences dans 17 fichiers, jetons CSS et
   classes compris. Publier d'abord un dépôt public puis purger aurait figé le
   nom d'une société réelle dans un historique consultable.
2. **Dépôt neuf, historique reparti de zéro** après audit de secrets
   (`git log -p -S`), par branche orpheline — le garde du poste refuse
   `rm -rf .git`, à juste titre, et `git checkout --orphan` obtient le même
   résultat sans rien détruire. `validation-agence` est archivé, pas renommé :
   un renommage GitHub installe une redirection permanente qui aurait fait
   survivre l'ancien nom.
3. **Projet Vercel neuf**, et l'ancien **supprimé** — décision d'Arnaud. C'est
   le seul geste qui retire les déploiements historiques : sur Vercel, supprimer
   un alias ne supprime pas les déploiements, chacun garde une URL immuable qui
   continue de servir le contenu.
4. **Le sous-domaine repris aussitôt.** Supprimer le projet libère
   `atelier-lumen-demo.vercel.app`, reprenable par un tiers sur un nom que les
   archives associent au travail d'Arnaud. Un projet vide du même nom le
   réserve et redirige en 308 vers la nouvelle adresse.

## Conséquence permanente

**Aucun nom de démonstration, de produit ou de marque ne se publie sans le
protocole des six canaux** : recherche web contextualisée (métier + ville),
marques France, marques UE, entreprises actives (au singulier ET au pluriel),
domaines, réseaux sociaux. Trois candidats testés, pas un. Et une requête de
contrôle positive accompagne chaque zéro, pour prouver que l'absence de résultat
n'est pas un faux négatif de l'outil.
