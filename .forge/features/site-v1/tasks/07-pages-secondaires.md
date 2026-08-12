---
id: "07"
titre: "Pages method, founder, contact, legal (×2) + 404"
statut: pending
tentatives: 0
depends_on: ["03", "04"]
ears: [EARS-31, EARS-32, EARS-33, EARS-34, EARS-35, EARS-36, EARS-38, EARS-39, EARS-40, EARS-41, EARS-42, EARS-49, EARS-50]
---

## Objectif

Les huit pages restantes + la 404, sur le contenu de `site[locale].pages.*` : méthode (jalons, stack, async US), fondateur (honnêteté structurelle, preuves autorisées), contact (mailto seul), mentions légales (bloc NexusEvo complet, noindex), 404 stylée E3.

## Fichiers concernés

- Créer : `src/pages/method.astro` + `src/pages/fr/methode.astro` — jalons 2 semaines avec démo (`data-section="milestones"`), règle d'avenant 48 h, recette continue ; stack coût de possession (TypeScript, Vue/React, Node, Swift si justifié, cloud managé) + propriété du code au paiement complet (`data-section="stack"`) ; remote async US : jalons/démos asynchrones + créneau de recouvrement hebdo EU/US East (`data-section="remote"`).
- Créer : `src/pages/founder.astro` + `src/pages/fr/fondateur.astro` — honnêteté structurelle (« celui qui cadre est celui qui construit », fondateur + partenaires identifiés par projet), preuves LIMITÉES aux faits autorisés : TotalEnergies sobre, associé The Node, PO Drift, Rémunet « réalisation du fondateur » (jamais « service NexusInsight ») ; lien `https://kaankarabulut.com` ; aucune balise `<img>` de portrait.
- Créer : `src/pages/contact.astro` + `src/pages/fr/contact.astro` — `mailto:kaan@nexusinsight.io` unique action, aucun `<form>`.
- Créer : `src/pages/legal.astro` + `src/pages/fr/mentions-legales.astro` — bloc éditeur complet (NexusEvo SARL, capital 1 000 €, 45 rue de la Capsulerie 93170 Bagnolet, SIREN 928 581 545, RCS Bobigny, TVA FR95 928 581 545, directeur de publication Kaan Karabulut, hébergeur Google Cloud) + phrase « NexusInsight est le nom commercial de NexusEvo SARL » / « NexusInsight is the trade name of NexusEvo SARL » ; Layout avec `noindex` (déjà déclaré dans routes.ts).
- Créer : `src/pages/404.astro` — style E3, liens de reprise vers `/` et `/fr/`.
- Modifier : `tests/pages.test.ts` — suite « pages secondaires ».

## Test d'abord

```ts
it('EARS-31/32/33 : method expose jalons, stack et remote async', () => {
  const html = lirePage('method/index.html');
  for (const s of ['milestones', 'stack', 'remote']) expect(html).toContain(`data-section="${s}"`);
  expect(html).toMatch(/two(-|\s)week/i);
  expect(html).toMatch(/48\s?h/i);
});

it('EARS-34/35/36 : founder — honnêteté structurelle, preuves autorisées, lien perso', () => {
  const html = lirePage('founder/index.html');
  expect(html).toMatch(/kaankarabulut\.com/);
  expect(html).toMatch(/The Node/);
  expect(html).toMatch(/Drift/);
  expect(html).not.toMatch(/<img[^>]*(portrait|team|photo)/i);
});

it('EARS-38/39 : contact = mailto seul, aucun <form> sur tout le site', () => {
  expect(lirePage('contact/index.html')).toContain('mailto:kaan@nexusinsight.io');
  for (const f of toutesLesPagesHtml()) {
    expect(lirePage(f), `<form> trouvé dans ${f}`).not.toMatch(/<form[\s>]/i);
  }
});

it('EARS-40/41 : bloc légal NexusEvo complet + nom commercial', () => {
  for (const p of ['legal/index.html', 'fr/mentions-legales/index.html']) {
    const html = lirePage(p);
    expect(html).toMatch(/928 581 545/);
    expect(html).toMatch(/RCS Bobigny/);
    expect(html).toMatch(/FR95 928 581 545/);
    expect(html).toMatch(/Capsulerie/);
    expect(html).toMatch(/NexusEvo/);
    expect(html).toMatch(/nom commercial|trade name/);
  }
});

it('EARS-42 : noindex sur les 2 pages légales et NULLE part ailleurs', () => {
  for (const f of toutesLesPagesHtml()) {
    const attendu = f === 'legal/index.html' || f === 'fr/mentions-legales/index.html';
    expect(/name="robots" content="noindex"/.test(lirePage(f)), f).toBe(attendu);
  }
});

it('EARS-49/50 : 404.html buildée avec liens de reprise', () => {
  const html = lirePage('404.html');
  expect(html).toMatch(/href="\/"/);
  expect(html).toMatch(/href="\/fr\/"/);
});
```

## Definition of done

- `npm test`, `npm run check`, `npm run build` verts ; Dockerfile et nginx.conf INTOUCHÉS (NG-4).
- EARS-31..36, 38..42, 49, 50 verts sur le HTML buildé.
