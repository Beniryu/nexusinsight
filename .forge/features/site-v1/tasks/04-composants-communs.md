---
id: "04"
titre: "Composants communs E3 : Nav, Footer, CtaBand, OfferCard, FactCard (tokens uniquement)"
statut: passed
tentatives: 0
depends_on: [ "01", "02", "03" ]
ears: [ EARS-6, EARS-7, EARS-8, EARS-10, EARS-51, EARS-52 ]
---

## Objectif

Les cinq composants partagés du design E3, stylés exclusivement via les variables de `src/styles/tokens.css`, intégrés au Layout (nav en haut, footer en bas de chaque page). Le sélecteur EN/FR mène à la page équivalente via `paire(path)` (jamais à la home par défaut).

## Fichiers concernés

- Créer : `src/components/Nav.astro` — props `{locale, path}` ; nom « NexusInsight » en toutes lettres (Clash 600, pas de logo), liens Offers/Method/Founder (FR : Offres/Méthode/Fondateur) depuis `site[locale].nav`, sélecteur de langue (lien vers `paire(path)[autreLocale]`), CTA « Book a call »/« Prendre un call » vers la page contact de la locale.
- Créer : `src/components/Footer.astro` — mention NexusEvo SARL, lien mentions légales de la locale, `kaan@nexusinsight.io`, lien `https://kaankarabulut.com` libellé « founder's personal site » (FR : même libellé, nom propre du site).
- Créer : `src/components/CtaBand.astro` — bande graphite de pied de page (texte + bouton cuivre vers contact, hérité du design D3 retenu dans E3).
- Créer : `src/components/OfferCard.astro` — props `{index, name, duration, price, priceMeta, blurb, href}` : card graphite radius 6, tag mono cuivre `0X · durée`, h3 Clash, prix Clash 27px + small mono cuivre, « Details → », hover graphite-2 + lift 3px 160ms.
- Créer : `src/components/FactCard.astro` — la carte de faits du hero (lignes k/v, clé mono uppercase, une seule valeur cuivre).
- Modifier : `src/layouts/Layout.astro` — rendre Nav avant `<slot />` et Footer après (toutes les pages en héritent).
- Créer : `tests/design.test.ts`

Contraintes E3 : cuivre en accent seulement (jamais un fond de section — le bouton plein cuivre de CtaBand est l'exception bouton, pas un fond), transitions neutralisées sous `prefers-reduced-motion: reduce`, aucune valeur hex hors `tokens.css`.

## Test d'abord

```ts
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function fichiersSous(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? fichiersSous(join(dir, e.name)) : [join(dir, e.name)],
  );
}

describe('CAP-12 — conformité design E3', () => {
  it('EARS-51 : aucune valeur hex hors tokens.css et fonts.css', () => {
    const fautifs = fichiersSous('src')
      .filter((f) => !f.endsWith('tokens.css') && !f.endsWith('fonts.css'))
      .filter((f) => /#[0-9a-fA-F]{3,8}\b/.test(readFileSync(f, 'utf8').replace(/#offers|#offres/g, '')));
    expect(fautifs).toEqual([]);
  });

  it('EARS-52 : toute transition/animation est neutralisée sous prefers-reduced-motion', () => {
    for (const f of fichiersSous('src')) {
      const contenu = readFileSync(f, 'utf8');
      if (/transition:|animation:/.test(contenu)) {
        expect(contenu, `${f} déclare une transition sans garde reduced-motion`).toMatch(
          /prefers-reduced-motion/,
        );
      }
    }
  });
});
```

Les assertions de rendu (nav présente partout, footer NexusEvo, sélecteur vers la page équivalente, CTA vers contact) se vérifient sur le HTML buildé en tâche 08 — mêmes EARS 6/7/8/10, confirmés de bout en bout là-bas.

## Definition of done

- `npm test`, `npm run check`, `npm run build` verts.
- Les deux pages home existantes rendent nav + footer sans régression du hero.
- EARS-51/52 verts en auto ; EARS-6/7/8/10 posés (confirmation buildée en tâche 08).
