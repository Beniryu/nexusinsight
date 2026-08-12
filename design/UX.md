# UX — nexusinsight.io

> Validé par Kaan le 2026-08-12 (architecture multi-page). Contenu source : `brand/OFFERS.md` + `brand/BRAND.md`.

## Sitemap

```
/            Home (EN, x-default)          /fr/            Accueil
/sprint      Product Discovery Sprint      /fr/sprint
/build       End-to-end Build              /fr/build
/delivery    Product Delivery (monthly)    /fr/delivery
/method      How we work                   /fr/methode
/founder     Founder                       /fr/fondateur
/contact     Book a call                   /fr/contact
/legal       Legal notice                  /fr/mentions-legales
```

- EN par défaut (`x-default` → EN), FR en pair idiomatique — jamais de traduction littérale (règle VOICE).
- `hreflang` croisés sur chaque paire, sitemap.xml, OG par page.
- Sélecteur EN/FR dans la nav (persistant sur la page équivalente).

## Home — ordre des sections (wireframe validé)

1. **Nav** : nom en toutes lettres · Offers · Method · Founder · EN/FR · CTA « Book a call »
2. **Hero** : « Products shipped, not days billed. » + une phrase (cadrage, build, pilotage — périmètre écrit, prix connu d'avance) + 2 CTA (Book a call / See the offers)
3. **Les 3 packages** : cards avec prix affichés (9 500 € · from 25 000 € · 3 900/7 500 €mois ; $ sur la version EN), chaque card → sa page
4. **Le mécanisme** : 3 étapes — Sprint → périmètre gelé → prix ferme du Build (« personne ne signe un gros chiffre à l'aveugle — nous non plus »)
5. **Preuves sobres** : fondateur en mission CAC40 (data governance, « plus de 80 000 utilisateurs, une centaine de pays ») · produits livrés en propre · lien /founder
6. **Pour qui** : 4 entrées — startup · PME/ETI · grand compte · US remote (chacune → sa porte : Sprint/Build/Delivery)
7. **FAQ** : 4-5 objections majeures (périmètre qui bouge, sprint payant vs devis gratuit, IP, qui travaille)
8. **CTA contact** + footer (mentions légales NexusEvo SARL, lien kaankarabulut.com « founder's personal site »)

## Pages package (/sprint /build /delivery) — gabarit commun

1. Hero : nom, une phrase de promesse factuelle, **prix**, durée
2. « What you get » : les livrables numérotés (depuis OFFERS.md)
3. Déroulé / timeline (semaines ou jalons)
4. **« What's not included »** : les exclusions, assumées — c'est l'argument de confiance du prix fixe
5. Prérequis client
6. FAQ propre au package
7. CTA (Book a call) + cross-link vers le package suivant logique (Sprint→Build, Build→Delivery)

## /method

Jalons de 2 semaines, démo à chaque jalon, règle d'avenant 48 h, recette continue, stack type et propriété du code, fonctionnement remote/async US (recouvrement EU/US East).

## /founder

L'honnêteté structurelle (§4 brand/BRAND.md) : NexusInsight est porté par son fondateur + partenaires identifiés par projet — « celui qui cadre est celui qui construit ». Preuves : TotalEnergies (sobre, faits publics), The Node (associé), Drift (PO), Rémunet (construit en propre). Lien vers kaankarabulut.com. Photo : non (géométrie, pas de portrait corporate — à confirmer en phase UI).

## /contact

Mailto kaan@nexusinsight.io au lancement (+ éventuel lien calendrier plus tard). Pas de formulaire en V1 (pas de backend).

## Parcours cibles (rappel)

- Startup : Home → /sprint → /build
- PME/ETI : Home → /build ou /delivery
- Grand compte : Home → /delivery (ou /sprint pré-appel d'offres)
- US : version EN, prix $, /method (async remote) → n'importe quel package

## Contraintes transverses

- Zéro emoji, pas de stock photos, pas de fausse équipe. Chiffres : un par contexte, fondu dans la phrase.
- Prix toujours HT / excl. VAT, mention explicite.
- Statique pur (pas de backend V1), Lighthouse ≥ 90, OG images par page.
