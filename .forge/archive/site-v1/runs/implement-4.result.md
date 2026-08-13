---
statut: passed
resume: >-
  Kit E3 partagé créé (Nav, Footer, CtaBand, OfferCard, FactCard — tokens uniquement, zéro hex),
  Nav/Footer intégrés au Layout ; TDD rouge→vert : EARS-6/7/8/10 sur le HTML buildé +
  EARS-51/52 dans tests/design.test.ts. 21 tests verts, astro check 0 erreur, build OK.
---

# Run implement-4 — tâche 04 (composants communs E3)

## Ce qui a été fait

- **RED** : `tests/design.test.ts` créé par extraction du bloc « Test d'abord » de la tâche (EARS-51 aucun hex hors tokens.css/fonts.css, EARS-52 garde reduced-motion) ; `tests/pages.test.ts` étendu d'un bloc CAP-2 sur le HTML buildé — EARS-6 (nav : « NexusInsight » en toutes lettres, liens localisés, sélecteur, CTA), EARS-7 (sélecteur → page équivalente via le registre des routes), EARS-8 (tout `data-cta="contact"` → page contact de la locale), EARS-10 (footer : NexusEvo SARL, mentions légales de la locale, mailto, kaankarabulut.com). Rouge confirmé : 4 échecs. Commit `34af280`.
- **GREEN** : 5 composants créés sous `src/components/` — `Nav.astro` (props `{locale, path}`, sélecteur via `paire(path)[autreLocale]`), `Footer.astro`, `CtaBand.astro` (bande graphite D3, bouton cuivre = exception bouton), `OfferCard.astro` (tag mono cuivre `0X · durée`, prix Clash 27px, hover graphite-2 + lift 3px 160ms sous `prefers-reduced-motion: no-preference`), `FactCard.astro` (lignes k/v, prop `copper` par ligne). `Layout.astro` rend Nav avant le slot et Footer après. Commit `438cb7e`.
- Vérification : `npm test` 21/21 verts, `npm run check` 0 erreur, `npm run build` OK (2 pages), hero des deux homes intact. No-gos NG-1/NG-2/NG-4 revérifiés (deps inchangées, aucun hôte externe dans src/, Dockerfile/nginx.conf intouchés).

## Hypothèses retenues (headless)

- Sélecteur de langue : un seul lien libellé avec le code de l'autre locale (« FR » sur les pages EN, « EN » sur les pages FR), attribut `data-lang-switch`, cible `paire(path)[autreLocale]` — jamais la home par défaut.
- `OfferCard` : prop optionnelle `linkLabel` (défaut « Details → » comme dans la tâche) pour que les pages FR passent leur pair idiomatique en tâche 05 sans étendre `site.ts` hors périmètre.
- `FactCard` : contrat `rows: {k, v, copper?}[]` — le contenu des lignes arrive avec la home (tâche 05) ; la règle « une seule valeur cuivre » est documentée dans le composant, appliquée à l'usage.
- `CtaBand` n'est pas rendu par le Layout (la tâche ne l'y met pas) : les pages l'insèrent elles-mêmes (tâches 05-07) ; son texte vient de `home.ctaBand`.
- Le CTA primaire du hero scaffold (mailto) est laissé tel quel : la home est refaite en tâche 05, EARS-8 est testé sur le contrat `data-cta` et confirmé de bout en bout en tâche 08.
- EARS-51/52 verts dès la phase rouge (tests d'absence sur un `src/` alors sans transition ni hex) — ils sont devenus contraignants avec les composants et restent verts.

## EARS posés pour la tâche 08

EARS-6/7/8/10 sont testés ici sur les pages déjà buildées (les deux homes) via `pagesBuildees()` : le harnais couvrira mécaniquement les 14 autres pages dès que les tâches 05-07 les créeront, confirmation de bout en bout en tâche 08.
