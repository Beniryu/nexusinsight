---
projet: nexusinsight
mis_a_jour_le: 2026-08-14T01:10:11+02:00
derniere_feature_fusionnee: site-v1
---

# Spec de base — NexusInsight

> Referentiel anti-drift. Une capability = un ID stable `CAP-<n>`, ses criteres EARS, et le
> test qui les couvre. Les IDs `EARS-<n>` sont uniques DANS CE FICHIER : /forge:archive
> renumerote les criteres importes d'une feature et note leur origine.

## CAP-1 — Fonts self-hostees (Clash Display, Switzer, JetBrains Mono)

Le site rend sa typographie sans jamais dependre d'un hote externe : les trois familles sont
servies depuis des woff2 committes dans le depot.

- EARS-1 [test: auto] : WHEN une page du site est servie THE SYSTEM SHALL charger Clash Display, Switzer et JetBrains Mono exclusivement depuis des fichiers `.woff2` committes dans `public/fonts/`.
  - couvert par : `tests/fonts.test.ts` (origine : site-v1)
- EARS-2 [test: auto] : WHEN les `@font-face` sont declarees THE SYSTEM SHALL se limiter a deux graisses par famille en subset latin — Clash Display 500/600, Switzer 400/600, JetBrains Mono 400/500.
  - couvert par : `tests/fonts.test.ts` (origine : site-v1)
- EARS-3 [test: auto] : WHEN une `@font-face` est declaree THE SYSTEM SHALL utiliser `font-display: swap`.
  - couvert par : `tests/fonts.test.ts` (origine : site-v1)
- EARS-4 [test: auto] : WHEN on analyse `src/` et le HTML builde THE SYSTEM SHALL ne referencer aucun hote externe de fonts ni aucun CDN (`fonts.googleapis.com`, `api.fontshare.com`, `cdn.jsdelivr`, `unpkg.com`).
  - couvert par : `tests/fonts.test.ts` (origine : site-v1)
- EARS-5 [test: auto] : WHEN les woff2 sont committes THE SYSTEM SHALL inclure dans `public/fonts/` un fichier de licence couvrant l'ITF Free Font License (Clash Display, Switzer — Fontshare) et l'OFL (JetBrains Mono).
  - couvert par : `tests/fonts.test.ts` (origine : site-v1)

## CAP-2 — Gabarit commun : navigation, footer, selecteur EN/FR

Toute page du registre de routes EN/FR porte la meme navigation, le meme footer et un selecteur
de langue qui conserve la page courante.

- EARS-6 [test: auto] : WHEN une page du registre de routes est rendue THE SYSTEM SHALL afficher une nav contenant le nom « NexusInsight » en toutes lettres sans logo, les liens Offers/Method/Founder (FR : Offres/Methode/Fondateur), le selecteur EN/FR et un CTA « Book a call » (FR : « Prendre un call »).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-7 [test: auto] : WHEN l'utilisateur active le selecteur de langue THE SYSTEM SHALL le mener a la page equivalente dans l'autre langue (ex. `/method` ↔ `/fr/methode`), jamais a la home par defaut.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-8 [test: auto] : WHEN l'utilisateur clique un CTA « Book a call » (nav, hero ou bande CTA de pied de page) THE SYSTEM SHALL le mener a la page contact de sa locale.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-9 [test: auto] : WHEN l'utilisateur clique « Offers/Offres » dans la nav THE SYSTEM SHALL le mener a la section des 3 packages de la home de sa locale (ancres `#offers`/`#offres`).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-10 [test: auto] : WHEN une page du registre de routes est rendue THE SYSTEM SHALL afficher un footer avec la mention NexusEvo SARL, le lien vers les mentions legales de la locale, le contact kaan@nexusinsight.io et le lien kaankarabulut.com libelle « founder's personal site ».
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-3 — Modele de contenu bilingue (`src/content/site.ts`)

Tout le texte du site vit dans un modele unique EN/FR, testable sans build, dont le fond est
repris de `brand/OFFERS.md` et `brand/BRAND.md`.

- EARS-11 [test: auto] : WHEN `site.ts` couvre l'ensemble des pages (nav, footer, packages, mecanisme, preuves, cibles, FAQ, method, founder, contact, legal) THE SYSTEM SHALL conserver la parite EN/FR — memes cles `en`/`fr`, aucune valeur vide.
  - couvert par : `tests/i18n.test.ts` (origine : site-v1)
- EARS-12 [test: auto] : WHEN la copy FR est ecrite THE SYSTEM SHALL differer du EN sur `meta.title` et `meta.description` de chaque page (pair idiomatique).
  - couvert par : `tests/i18n.test.ts` (origine : site-v1)
- EARS-13 [test: auto] : WHEN un prix est affiche THE SYSTEM SHALL reprendre a l'identique les montants de `brand/OFFERS.md` — 9 500 € / $11,000 (Sprint), a partir de 25 000 € / from $29,000 (Build), 3 900 € et 7 500 €/mois / $4,500 et $8,500 (Delivery) — en EUR sur les pages FR et en USD sur les pages EN.
  - couvert par : `tests/content.test.ts` (origine : site-v1)
- EARS-14 [test: auto] : WHEN un prix est affiche THE SYSTEM SHALL l'accompagner d'une mention explicite « HT » (FR) ou « excl. VAT » (EN).
  - couvert par : `tests/content.test.ts` (origine : site-v1)
- EARS-15 [test: auto] : WHEN le contenu rendu du site est analyse THE SYSTEM SHALL ne contenir aucun emoji.
  - couvert par : `tests/content.test.ts` (origine : site-v1)
- EARS-16 [test: auto] : WHEN la copy des offres est analysee THE SYSTEM SHALL ne contenir ni le mot « audit », ni les termes interdits de `brand/BRAND.md` §4 (« passionate », « expert », « seasoned », « world-class », « results-driven »), ni promesse chiffree de resultat client.
  - couvert par : `tests/content.test.ts` (origine : site-v1)
- EARS-17 [test: manual] : WHEN la copy EN et FR est relue THE SYSTEM SHALL parler en « nous » (jamais « je »), en registre pro sobre, phrases declaratives, sentence case, sans point final aux titres.
  - verifie a la main : relire plusieurs pages EN et FR — voix « nous », registre sobre, sentence case, aucun point final aux titres (origine : site-v1)

## CAP-4 — Home complete (`/` et `/fr/`)

La home deroule les 7 sections du wireframe valide, de l'accroche au CTA contact.

- EARS-18 [test: auto] : WHEN la home est rendue THE SYSTEM SHALL presenter dans l'ordre valide : hero, 3 cards packages, mecanisme, preuves, « pour qui », FAQ, CTA contact + footer.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-19 [test: auto] : WHEN la section packages est rendue THE SYSTEM SHALL afficher 3 cards indexees 01/02/03 (sequence Sprint→Build→Delivery) avec nom, duree, prix et lien vers la page package correspondante de la locale.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-20 [test: auto] : WHEN la section mecanisme est rendue THE SYSTEM SHALL exposer les 3 etapes Sprint → perimetre gele → prix ferme du Build, y compris l'idee « personne ne signe un gros chiffre a l'aveugle — nous non plus ».
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-21 [test: auto] : WHEN la section preuves est rendue THE SYSTEM SHALL mentionner la mission CAC40 du fondateur avec le seul chiffre autorise (« plus de 80 000 utilisateurs, une centaine de pays ») et lier vers la page fondateur.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-22 [test: auto] : WHEN la section « pour qui » est rendue THE SYSTEM SHALL proposer 4 entrees — startup, PME/ETI, grand compte, US remote — menant chacune a son package porte d'entree (Sprint, Build ou Delivery).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-23 [test: auto] : WHEN la FAQ de la home est rendue THE SYSTEM SHALL reprendre 4 a 5 objections de `brand/OFFERS.md` (perimetre qui bouge, sprint payant vs devis gratuit, propriete du code, qui travaille).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-5 — Pages package `/sprint`, `/build`, `/delivery` (+ paires FR)

Chaque package a sa page dediee dans les deux langues, batie sur un gabarit commun et sur le fond
exact de `brand/OFFERS.md`.

- EARS-24 [test: auto] : WHEN on requete `/sprint`, `/build`, `/delivery`, `/fr/sprint`, `/fr/build` et `/fr/delivery` THE SYSTEM SHALL servir six pages statiques construites sur le gabarit commun — hero (nom, promesse factuelle, prix, duree), livrables numerotes, deroule, exclusions, prerequis, FAQ, CTA.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-25 [test: auto] : WHEN une page package affiche ses livrables THE SYSTEM SHALL reprendre le fond exact de `brand/OFFERS.md` (5 livrables Sprint, 5 livrables Build, inclusions comparees des 2 intensites Delivery) sans reecrire le fond.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-26 [test: auto] : WHEN la section « What's not included » est rendue THE SYSTEM SHALL lister les exclusions explicites d'`OFFERS.md` du package concerne.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-27 [test: auto] : WHEN `/sprint` est rendue THE SYSTEM SHALL afficher le prix fixe, la duree de 3 semaines, les prerequis client (decideur 2 h/semaine, reponse sous 48 h) et la validite 60 jours de la proposition de Build.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-28 [test: auto] : WHEN `/build` est rendue THE SYSTEM SHALL exposer la regle de perimetre gele avec avenant chiffre en 48 h et la garantie corrective de 4 semaines.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-29 [test: auto] : WHEN `/delivery` est rendue THE SYSTEM SHALL presenter les deux intensites Pilotage / Pilotage + build avec leur comparatif d'inclusions et l'engagement mensuel resiliable a 30 jours des deux cotes.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-30 [test: auto] : WHEN le lecteur atteint le pied d'une page package THE SYSTEM SHALL proposer le cross-link logique (Sprint → Build, Build → Delivery) en plus du CTA contact.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-6 — Page methode (`/method`, `/fr/methode`)

La page methode explique comment le travail est conduit : jalons, recette, stack et remote.

- EARS-31 [test: auto] : WHEN la page methode est rendue THE SYSTEM SHALL decrire les jalons de 2 semaines avec demo a chaque jalon, la recette continue et la regle d'avenant 48 h.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-32 [test: auto] : WHEN la page methode aborde la stack THE SYSTEM SHALL reprendre la position d'`OFFERS.md` — stack au cout de possession minimal (TypeScript, Vue/React, Node, Swift si justifie, cloud manage) et code propriete du client au paiement complet.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-33 [test: auto] : WHEN la page methode aborde le remote THE SYSTEM SHALL decrire le fonctionnement async US : jalons et demos asynchrones, un creneau de recouvrement hebdomadaire EU/US East.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-7 — Page fondateur (`/founder`, `/fr/fondateur`)

La page fondateur assume l'honnetete structurelle et ne montre que des preuves autorisees.

- EARS-34 [test: auto] : WHEN la page fondateur est rendue THE SYSTEM SHALL assumer l'honnetete structurelle — fondateur + partenaires identifies par projet, « celui qui cadre est celui qui construit », sans fausse equipe.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-35 [test: auto] : WHEN les preuves sont listees THE SYSTEM SHALL se limiter aux faits autorises par `brand/BRAND.md` : TotalEnergies en faits publics sobres, associe The Node, PO Drift, Remunet cite comme realisation du fondateur et jamais comme service NexusInsight.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-36 [test: auto] : WHEN la page fondateur est rendue THE SYSTEM SHALL lier vers kaankarabulut.com.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-37 [test: manual] : WHEN la page fondateur est revue visuellement THE SYSTEM SHALL n'afficher ni portrait corporate ni stock photo — geometrie seulement.
  - verifie a la main : ouvrir `/founder` et `/fr/fondateur` — geometrie seulement, aucune photo (origine : site-v1)

## CAP-8 — Page contact (`/contact`, `/fr/contact`)

Le contact passe uniquement par mailto : aucun formulaire, aucun backend.

- EARS-38 [test: auto] : WHEN la page contact est rendue THE SYSTEM SHALL proposer `mailto:kaan@nexusinsight.io` comme unique action de contact.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-39 [test: auto] : WHEN le HTML builde du site est analyse THE SYSTEM SHALL ne contenir aucun element `<form>`.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-9 — Mentions legales (`/legal`, `/fr/mentions-legales`, noindex)

Les mentions legales sont completes, bilingues et exclues de l'indexation.

- EARS-40 [test: auto] : WHEN la page legale est rendue THE SYSTEM SHALL afficher le bloc editeur complet : NexusEvo SARL, capital 1 000 €, 45 rue de la Capsulerie 93170 Bagnolet, SIREN 928 581 545, RCS Bobigny, TVA FR95 928 581 545, directeur de publication Kaan Karabulut, hebergeur Google Cloud.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-41 [test: auto] : WHEN la page legale est rendue THE SYSTEM SHALL preciser que NexusInsight est le nom commercial de NexusEvo SARL.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-42 [test: auto] : WHEN `/legal` ou `/fr/mentions-legales` est rendue THE SYSTEM SHALL emettre `<meta name="robots" content="noindex">` sans qu'aucune autre page ne l'emette.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-10 — SEO bilingue : hreflang, canonical, sitemap, OG, robots, favicon

Le SEO est derive du registre de routes : chaque page declare sa paire, le sitemap n'expose que
les pages indexables et aucun asset n'est charge depuis un hote externe.

- EARS-43 [test: auto] : WHEN chacune des 16 pages du registre est rendue THE SYSTEM SHALL declarer canonical et hreflang croises en/fr avec x-default vers la version EN, en respectant les slugs FR idiomatiques (`/method`↔`/fr/methode`, `/founder`↔`/fr/fondateur`, `/legal`↔`/fr/mentions-legales`).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-44 [test: auto] : WHEN le site est builde THE SYSTEM SHALL generer un `sitemap` contenant les 14 pages indexables et excluant `/legal` et `/fr/mentions-legales`.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-45 [test: auto] : WHEN une page est rendue THE SYSTEM SHALL emettre `og:title`, `og:description`, `og:url` propres a la page et un `og:image` en URL absolue pointant vers un asset committe dans `public/` (aucun hote externe).
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-46 [test: auto] : WHEN `/robots.txt` est requete THE SYSTEM SHALL servir un `robots.txt` statique autorisant le crawl et referencant le sitemap.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-47 [test: auto] : WHEN une page est rendue THE SYSTEM SHALL referencer une favicon servie depuis `public/`.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-48 [test: auto] : WHEN la suite de tests tourne THE SYSTEM SHALL verifier que chaque page EN a sa paire FR et reciproquement (parite des routes).
  - couvert par : `tests/i18n.test.ts` (origine : site-v1)

## CAP-11 — Page 404

Une URL inexistante tombe sur une page 404 statique bilingue, hors registre de routes, qui offre
des liens de reprise.

- EARS-49 [test: auto] : WHEN le site est builde THE SYSTEM SHALL produire `dist/404.html` via `src/pages/404.astro`, sans modifier `Dockerfile` ni `nginx.conf`.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)
- EARS-50 [test: auto] : WHEN la page 404 est rendue THE SYSTEM SHALL proposer des liens de reprise vers `/` et `/fr/` dans le style E3.
  - couvert par : `tests/pages.test.ts` (origine : site-v1)

## CAP-12 — Conformite design E3 et qualite

Le rendu respecte le systeme E3 graphite/cuivre : tokens uniquement, animations neutralisables,
responsive et scores Lighthouse tenus.

- EARS-51 [test: auto] : WHEN les pages sont stylees THE SYSTEM SHALL n'utiliser que les variables de `src/styles/tokens.css` pour couleurs, typographie, rayons et transitions — aucune valeur hex hors `tokens.css`.
  - couvert par : `tests/design.test.ts` (origine : site-v1)
- EARS-52 [test: auto] : WHEN une transition ou animation est declaree THE SYSTEM SHALL etre neutralisee sous `prefers-reduced-motion: reduce`.
  - couvert par : `tests/design.test.ts` (origine : site-v1)
- EARS-53 [test: manual] : WHEN chaque page est revue visuellement THE SYSTEM SHALL respecter les regles E3 — cuivre en accent seulement (jamais en fond de section), au plus un bouton cuivre plein par ecran, le hover discret des cards (graphite-2 + lift 3 px, 160 ms) comme seul moment expressif.
  - verifie a la main : parcourir chaque page — cuivre en accent seul, un bouton cuivre plein maximum par ecran, hover de card comme unique effet (origine : site-v1)
- EARS-54 [test: manual] : WHEN la home est affichee sous 900 px THE SYSTEM SHALL passer hero split et grilles en 1 colonne sans debordement horizontal (gutter 20 px mobile).
  - verifie a la main : reduire la fenetre sous 900 px sur la home — 1 colonne, aucun debordement horizontal (origine : site-v1)
- EARS-55 [test: manual] : WHEN un audit Lighthouse est passe sur la home buildee THE SYSTEM SHALL atteindre un score ≥ 90 en performance, accessibilite et SEO.
  - verifie a la main : audit Lighthouse sur la home buildee — performance, accessibilite et SEO ≥ 90 (origine : site-v1)
