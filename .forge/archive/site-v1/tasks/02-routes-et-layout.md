---
id: "02"
titre: "Registre des routes EN↔FR + Layout enrichi (hreflang par paire, og:image, noindex, favicon)"
statut: passed
tentatives: 0
depends_on: []
ears: [ EARS-43, EARS-47, EARS-48 ]
---

## Objectif

Une source de vérité unique des paires de routes (`src/content/routes.ts`) consommée par le Layout (canonical/hreflang/x-default), le sélecteur de langue (tâche 04) et les tests de parité. Layout complété : `og:image` absolu, prop `noindex`, favicon.

## Fichiers concernés

- Créer : `src/content/routes.ts` — le registre :

```ts
// Paires de routes EN↔FR — source de vérité unique (Layout, Nav, tests).
export interface RoutePair {
  en: string;
  fr: string;
  noindex?: boolean;
}

export const routes: RoutePair[] = [
  { en: '/', fr: '/fr/' },
  { en: '/sprint/', fr: '/fr/sprint/' },
  { en: '/build/', fr: '/fr/build/' },
  { en: '/delivery/', fr: '/fr/delivery/' },
  { en: '/method/', fr: '/fr/methode/' },
  { en: '/founder/', fr: '/fr/fondateur/' },
  { en: '/contact/', fr: '/fr/contact/' },
  { en: '/legal/', fr: '/fr/mentions-legales/', noindex: true },
];

export function paire(path: string): RoutePair {
  const r = routes.find((p) => p.en === path || p.fr === path);
  if (!r) throw new Error(`route inconnue : ${path}`);
  return r;
}
```

- Modifier : `src/layouts/Layout.astro` — remplacer les props `path`/`altPath` par `path` seul (la paire vient de `paire(path)`), ajouter `noindex` (émet `<meta name="robots" content="noindex">` si la route l'exige), `og:image` en URL absolue `https://nexusinsight.io/og/og-<locale>.png`, `<link rel="icon" href="/favicon.svg">`.
- Créer : `public/favicon.svg` — lettre « N » géométrique : rect fond `#1E2126`, « N » en path `#F5F6F8`, point cuivre `#C97E48` en bas à droite (SVG écrit à la main, aucune image externe).
- Créer : `public/og/og-en.png` et `public/og/og-fr.png` — 1200×630, fond graphite `#1E2126`, « NexusInsight » + thèse (EN/FR) en clair, filet cuivre (générables via un script Node ponctuel avec le canvas du CI ? NON — aucune dépendance ajoutée : produire les PNG hors pipeline n'est pas possible pour l'agent → solution retenue : SVG statiques convertis à la main sont hors budget ; on committe des PNG générés par `npx --yes @resvg/resvg-cli` sur un SVG temporaire, sans ajouter de dépendance au package.json — `npx` ponctuel au moment de l'implémentation uniquement ; le SVG source est committé sous `public/og/src/` pour régénération).
- Modifier : `src/pages/index.astro` et `src/pages/fr/index.astro` — adapter à la nouvelle signature du Layout (prop `path` seule).
- Modifier : `tests/i18n.test.ts` — ajouter la parité des routes :

```ts
import { routes } from '../src/content/routes';

describe('parité des routes EN/FR', () => {
  it('EARS-48 : chaque page EN a sa paire FR et réciproquement, préfixes cohérents', () => {
    for (const r of routes) {
      expect(r.en.startsWith('/fr/')).toBe(false);
      expect(r.fr.startsWith('/fr/')).toBe(true);
    }
    expect(new Set(routes.map((r) => r.en)).size).toBe(routes.length);
    expect(new Set(routes.map((r) => r.fr)).size).toBe(routes.length);
  });
});
```

## Test d'abord

Le bloc de test ci-dessus (ajouté à `tests/i18n.test.ts`) échoue tant que `routes.ts` n'existe pas ; les assertions hreflang/canonical/noindex/favicon sur le HTML buildé arrivent en tâche 08 (mêmes EARS, vérification de bout en bout).

## Definition of done

- `npm test`, `npm run check`, `npm run build` verts.
- `routes.ts` est la SEULE définition des slugs FR idiomatiques (`/fr/methode/`, `/fr/fondateur/`, `/fr/mentions-legales/`).
- Layout : canonical + hreflang croisés + x-default EN dérivés de `paire(path)` ; `og:image` absolu ; noindex uniquement si la route le déclare ; favicon référencée.
- EARS-43/47/48 couverts (43 et 47 confirmés de bout en bout en tâche 08).
