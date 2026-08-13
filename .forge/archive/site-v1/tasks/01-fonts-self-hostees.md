---
id: "01"
titre: "Fonts self-hostées (Clash Display, Switzer, JetBrains Mono) + fonts.css + licences"
statut: passed
tentatives: 0
depends_on: []
ears: [ EARS-1, EARS-2, EARS-3, EARS-4, EARS-5 ]
---

## Objectif

Les trois familles typographiques du design E3 chargées exclusivement depuis `public/fonts/` (woff2 committés, 2 graisses par famille, subset latin), déclarées dans `src/styles/fonts.css` avec `font-display: swap`, licences incluses. Aucune référence à un hôte externe de fonts dans `src/`.

## Fichiers concernés

- Créer : `public/fonts/ClashDisplay-Medium.woff2`, `public/fonts/ClashDisplay-Semibold.woff2` (graisses 500/600)
- Créer : `public/fonts/Switzer-Regular.woff2`, `public/fonts/Switzer-Semibold.woff2` (graisses 400/600)
- Créer : `public/fonts/JetBrainsMono-Regular.woff2`, `public/fonts/JetBrainsMono-Medium.woff2` (graisses 400/500)
- Créer : `public/fonts/LICENSES.md` (ITF Free Font License pour Clash Display et Switzer, SIL OFL pour JetBrains Mono — textes complets copiés des archives officielles)
- Créer : `src/styles/fonts.css` (6 blocs `@font-face`, `font-display: swap`, `src: url('/fonts/…woff2') format('woff2')`)
- Modifier : `src/layouts/Layout.astro` (ajouter `import '../styles/fonts.css';` à côté de l'import tokens.css)
- Créer : `tests/fonts.test.ts`

Sources de téléchargement (réseau autorisé au moment de l'implémentation, PAS au rendu du site) :
- Clash Display : `https://api.fontshare.com/v2/fonts/download/clash-display` (zip — prendre `Fonts/WEB/fonts/ClashDisplay-Medium.woff2` et `ClashDisplay-Semibold.woff2` + la licence ITF du zip)
- Switzer : `https://api.fontshare.com/v2/fonts/download/switzer` (zip — `Switzer-Regular.woff2`, `Switzer-Semibold.woff2`)
- JetBrains Mono : `https://github.com/JetBrains/JetBrainsMono/releases/latest` (zip — `fonts/webfonts/JetBrainsMono-Regular.woff2`, `JetBrainsMono-Medium.woff2` + `OFL.txt`)

## Test d'abord

Écrire `tests/fonts.test.ts`, vérifier qu'il ÉCHOUE (public/fonts absent), puis implémenter jusqu'au vert :

```ts
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const WOFF2 = [
  'ClashDisplay-Medium.woff2', 'ClashDisplay-Semibold.woff2',
  'Switzer-Regular.woff2', 'Switzer-Semibold.woff2',
  'JetBrainsMono-Regular.woff2', 'JetBrainsMono-Medium.woff2',
];

function lireSrcRecursif(dir: string): string {
  let out = '';
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out += lireSrcRecursif(p);
    else out += readFileSync(p, 'utf8');
  }
  return out;
}

describe('CAP-1 — fonts self-hostées', () => {
  it('EARS-1/EARS-2 : exactement les 6 woff2 attendus dans public/fonts', () => {
    const files = readdirSync('public/fonts').filter((f) => f.endsWith('.woff2'));
    expect(files.sort()).toEqual([...WOFF2].sort());
  });

  it('EARS-3 : 6 @font-face, chacune avec font-display: swap et une src locale', () => {
    const css = readFileSync('src/styles/fonts.css', 'utf8');
    const faces = css.split('@font-face').slice(1);
    expect(faces).toHaveLength(6);
    for (const face of faces) {
      expect(face).toMatch(/font-display:\s*swap/);
      expect(face).toMatch(/url\('\/fonts\/[A-Za-z-]+\.woff2'\)/);
    }
  });

  it('EARS-4 : aucun hôte externe de fonts ni CDN dans src/', () => {
    const src = lireSrcRecursif('src');
    expect(src).not.toMatch(/fonts\.googleapis\.com|api\.fontshare\.com|cdn\.jsdelivr|unpkg\.com/);
  });

  it('EARS-5 : LICENSES.md couvre ITF et OFL', () => {
    const lic = readFileSync('public/fonts/LICENSES.md', 'utf8');
    expect(lic).toMatch(/ITF FREE FONT LICENSE/i);
    expect(lic).toMatch(/SIL OPEN FONT LICENSE|OFL/i);
  });
});
```

## Definition of done

- `npm test` vert (dont les 4 tests ci-dessus), `npm run check` vert, `npm run build` vert.
- Le HTML buildé référence les fonts via `/fonts/*.woff2` uniquement (vérifié mécaniquement en tâche 08).
- EARS-1..5 couverts.
