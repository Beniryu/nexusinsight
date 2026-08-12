---
id: "05"
titre: "Home complète EN + FR (7 sections du wireframe validé)"
statut: pending
tentatives: 0
depends_on: ["03", "04"]
ears: [EARS-9, EARS-18, EARS-19, EARS-20, EARS-21, EARS-22, EARS-23]
---

## Objectif

`/` et `/fr/` complètes, dans l'ordre validé (design/UX.md) : hero split (existant) + FactCard, section packages (`id="offers"` / `id="offres"` — les ancres de la nav se résolvent), mécanisme en 3 étapes, preuves sobres, « pour qui » (4 entrées), FAQ, CtaBand + footer.

## Fichiers concernés

- Modifier : `src/pages/index.astro` — composer les 7 sections depuis `site.en.home` avec `OfferCard` ×3 (index 01/02/03 → `/sprint/`, `/build/`, `/delivery/`), `FactCard` dans le hero (grid 1.5fr/1fr, gap 48, 1 colonne < 900px), section mécanisme (3 étapes numérotées : Sprint → périmètre gelé → prix ferme du Build + punchline « nobody signs a big number blind — neither do we »), preuves (mission CAC40, « more than 80,000 users across a hundred countries », lien `/founder/`), 4 audiences (startup→`/sprint/`, SMB→`/build/`, enterprise→`/delivery/`, US remote→`/method/`), FAQ (4-5 objections de `site.en.home.faq`), CtaBand.
- Modifier : `src/pages/fr/index.astro` — miroir FR (`site.fr.home`, liens `/fr/...`, ancre `id="offres"`).
- Modifier : `tests/pages.test.ts` (créé en tâche 08 si exécutée avant — sinon créer ici le squelette avec les assertions home ci-dessous ; les deux tâches complètent le même fichier).

## Test d'abord

Assertions à poser dans `tests/pages.test.ts` (suite « home », sur le HTML buildé — le fichier exécute `astro build` une fois en `beforeAll`, voir tâche 08 pour le harnais complet) :

```ts
it('EARS-18/19 : la home EN rend les 7 sections dans l\'ordre et 3 cards indexées', () => {
  const html = lirePage('index.html');
  const ordre = ['hero', 'offers', 'mechanism', 'proof', 'audiences', 'faq', 'cta-band'];
  const positions = ordre.map((id) => html.indexOf(`data-section="${id}"`));
  expect(positions.every((p, i) => p >= 0 && (i === 0 || p > positions[i - 1]))).toBe(true);
  for (const idx of ['01', '02', '03']) expect(html).toContain(`data-card-index="${idx}"`);
  expect(html).toMatch(/href="\/sprint\/"/);
  expect(html).toMatch(/href="\/build\/"/);
  expect(html).toMatch(/href="\/delivery\/"/);
});

it('EARS-20 : le mécanisme expose les 3 étapes et la punchline', () => {
  const html = lirePage('index.html');
  expect(html).toMatch(/frozen scope/i);
  expect(html).toMatch(/nobody signs a big number blind/i);
});

it('EARS-21 : la preuve mentionne le seul chiffre autorisé et lie vers founder', () => {
  const html = lirePage('index.html');
  expect(html).toMatch(/80,000 users/);
  expect(html).toMatch(/href="\/founder\/"/);
});

it('EARS-22 : 4 entrées audience avec leur porte d\'entrée', () => {
  const html = lirePage('index.html');
  expect((html.match(/data-audience=/g) ?? []).length).toBe(4);
});

it('EARS-23 : la FAQ home compte 4 ou 5 entrées', () => {
  const n = (lirePage('index.html').match(/data-faq-item/g) ?? []).length;
  expect(n).toBeGreaterThanOrEqual(4);
  expect(n).toBeLessThanOrEqual(5);
});

it('EARS-9 : l\'ancre offers/offres existe sur chaque home', () => {
  expect(lirePage('index.html')).toContain('id="offers"');
  expect(lirePage('fr/index.html')).toContain('id="offres"');
});
```

Convention structurante : chaque section porte `data-section="<nom>"`, chaque card `data-card-index="0X"`, chaque audience `data-audience="<clé>"`, chaque item FAQ `data-faq-item` — c'est le contrat de testabilité du HTML (aucun test fragile sur du texte stylé).

## Definition of done

- `npm test`, `npm run check`, `npm run build` verts ; les deux homes complètes et symétriques.
- EARS-9, 18..23 verts sur le HTML buildé.
