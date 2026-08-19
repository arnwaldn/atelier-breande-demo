/*
  Comportement du formulaire de contact.
  Fichier séparé (et non `<script>` inline dans le composant) : Astro inline les
  scripts de moins de 4 Ko, or un script inline est refusé par la directive
  `script-src 'self'` de la CSP (voir vercel.json).
*/
const form = document.getElementById('contact-form') as HTMLFormElement;
const etatDemo = document.getElementById('contact-demo-etat') as HTMLElement;

type Regle = { valide: (v: string) => boolean; message: (v: string) => string };
const regles: Record<string, Regle> = {
  nom: {
    valide: (v) => v.trim().length > 0,
    message: () => 'Le nom est obligatoire.',
  },
  email: {
    valide: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    // Champ vide et champ mal rempli sont deux fautes différentes : la
    // première dit qu'il manque quelque chose, la seconde qu'il faut
    // corriger ce qui a été saisi — même distinction que le champ nom.
    message: (v) => (v.trim().length === 0 ? "L'adresse email est obligatoire." : "L'adresse email n'est pas valide."),
  },
  message: {
    valide: (v) => v.trim().length >= 10,
    message: () => 'Le message est requis (10 caractères minimum).',
  },
};

function setErreur(id: string, actif: boolean, texte: string) {
  const champ = form.querySelector('#' + id) as HTMLElement;
  const erreur = form.querySelector('#' + id + '-erreur') as HTMLElement;
  erreur.textContent = actif ? texte : '';
  erreur.hidden = !actif;
  champ.setAttribute('aria-invalid', actif ? 'true' : 'false');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validation champ par champ
  let premierFautif: HTMLElement | null = null;
  for (const id of ['nom', 'email', 'message']) {
    const champ = form.querySelector('#' + id) as HTMLInputElement | HTMLTextAreaElement;
    const ok = regles[id]!.valide(champ.value);
    setErreur(id, !ok, regles[id]!.message(champ.value));
    if (!ok && !premierFautif) premierFautif = champ;
  }
  if (premierFautif) {
    premierFautif.focus(); // bloque (CA-CONT-6/7/8/10)
    return;
  }

  /*
    3) Saisie valide : on affiche l'état de démonstration, jamais une confirmation
    d'envoi. Ce site est fictif et n'a aucun destinataire — annoncer « message envoyé »
    serait un faux succès (amendement §11ter de l'ADR-001, 2026-07-31). Le formulaire
    reste visible et réutilisable : rien n'est mis en scène.
  */
  etatDemo.hidden = false;
  etatDemo.focus();
});
