---
feature: site-v1
statut: validee
valide_par: kaan
base_produit_commit: d9855b66d184c6370fc5c4f3d6ee5a312d3574a8
---

# Spec — Site vitrine NexusInsight v1 (EN/FR)

## ADDED

### CAP-1 — Fonts self-hostées (Clash Display, Switzer, JetBrains Mono)
Existant : `src/styles/tokens.css` référence les trois familles mais aucun `@font-face` ni woff2 n'existe (pas de `public/`) — le site rend en `system-ui` ; les prototypes `design/ds/*.html` chargent Fontshare/Google Fonts et ne sont pas copiables tels quels (NG-2).

- EARS-1 [test: auto] : WHEN une page du site est servie THE SYSTEM SHALL charger Clash Display, Switzer et JetBrains Mono exclusivement depuis des fichiers `.woff2` committés dans `public/fonts/`.
- EARS-2 [test: auto] : WHEN les `@font-face` sont déclarées THE SYSTEM SHALL se limiter à deux graisses par famille en subset latin — Clash Display 500/600, Switzer 400/600, JetBrains Mono 400/500.
- EARS-3 [test: auto] : WHEN une `@font-face` est déclarée THE SYSTEM SHALL utiliser `font-display: swap`.
- EARS-4 [test: auto] : WHEN on analyse `src/` et le HTML buildé THE SYSTEM SHALL ne référencer aucun hôte externe de fonts ni aucun CDN (`fonts.googleapis.com`, `api.fontshare.com`, `cdn.jsdelivr`, `unpkg.com`).
- EARS-5 [test: auto] : WHEN les woff2 sont committés THE SYSTEM SHALL inclure dans `public/fonts/` un fichier de licence couvrant l'ITF Free Font License (Clash Display, Switzer — Fontshare) et l'OFL (JetBrains Mono).

### CAP-2 — Gabarit commun : navigation, footer, sélecteur EN/FR
Existant : `src/layouts/Layout.astro` gère `lang`, title/description, canonical, hreflang, OG partiel — mais aucun header, footer, sélecteur de langue ni favicon ; les ancres `#offers`/`#offres` du hero scaffold sont des cibles mortes.

- EARS-6 [test: auto] : WHEN une page quelconque est rendue THE SYSTEM SHALL afficher une nav contenant le nom « NexusInsight » en toutes lettres sans logo, les liens Offers/Method/Founder (FR : Offres/Méthode/Fondateur), le sélecteur EN/FR et un CTA « Book a call » (FR : « Prendre un call »).
- EARS-7 [test: auto] : WHEN l'utilisateur active le sélecteur de langue THE SYSTEM SHALL le mener à la page équivalente dans l'autre langue (ex. `/method` ↔ `/fr/methode`), jamais à la home par défaut.
- EARS-8 [test: auto] : WHEN l'utilisateur clique un CTA « Book a call » (nav, hero ou bande CTA de pied de page) THE SYSTEM SHALL le mener à la page contact de sa locale.
- EARS-9 [test: auto] : WHEN l'utilisateur clique « Offers/Offres » dans la nav THE SYSTEM SHALL le mener à la section des 3 packages de la home de sa locale (ancres `#offers`/`#offres` désormais résolues).
- EARS-10 [test: auto] : WHEN une page quelconque est rendue THE SYSTEM SHALL afficher un footer avec la mention NexusEvo SARL, le lien vers les mentions légales de la locale, le contact kaan@nexusinsight.io et le lien kaankarabulut.com libellé « founder's personal site ».

### CAP-3 — Modèle de contenu bilingue étendu (`src/content/site.ts`)
Existant : `site.ts` n'expose que `meta` + `hero` (7 clés/locale) ; le test de parité `tests/i18n.test.ts` aplatit l'objet entier et couvrira mécaniquement toute extension.

- EARS-11 [test: auto] : WHEN `site.ts` est étendu à l'ensemble des pages (nav, footer, packages, mécanisme, preuves, cibles, FAQ, method, founder, contact, legal) THE SYSTEM SHALL conserver vert le test de parité existant — mêmes clés `en`/`fr`, aucune valeur vide.
- EARS-12 [test: auto] : WHEN la copy FR est écrite THE SYSTEM SHALL différer du EN sur `meta.title` et `meta.description` de chaque page (pair idiomatique — extension du test existant, aujourd'hui limité à 2 chemins).
- EARS-13 [test: auto] : WHEN un prix est affiché THE SYSTEM SHALL reprendre à l'identique les montants de `brand/OFFERS.md` — 9 500 € / $11,000 (Sprint), à partir de 25 000 € / from $29,000 (Build), 3 900 € et 7 500 €/mois / $4,500 et $8,500 (Delivery) — en EUR sur les pages FR et en USD sur les pages EN.
- EARS-14 [test: auto] : WHEN un prix est affiché THE SYSTEM SHALL l'accompagner d'une mention explicite « HT » (FR) ou « excl. VAT » (EN).
- EARS-15 [test: auto] : WHEN le contenu rendu du site est analysé THE SYSTEM SHALL ne contenir aucun emoji.
- EARS-16 [test: auto] : WHEN la copy des offres est analysée THE SYSTEM SHALL ne contenir ni le mot « audit », ni les termes interdits de `brand/BRAND.md` §4 (« passionate », « expert », « seasoned », « world-class », « results-driven »), ni promesse chiffrée de résultat client.
- EARS-17 [test: manual] : WHEN la copy EN et FR est relue THE SYSTEM SHALL parler en « nous » (jamais « je »), en registre pro sobre, phrases déclaratives, sentence case, sans point final aux titres.

### CAP-4 — Home complète (`/` et `/fr/`)
Existant : les deux pages home ne rendent que le hero E3 (scaffold explicitement minimal) ; les 6 autres sections du wireframe validé (`design/UX.md`) manquent.

- EARS-18 [test: auto] : WHEN la home est rendue THE SYSTEM SHALL présenter dans l'ordre validé : hero, 3 cards packages, mécanisme, preuves, « pour qui », FAQ, CTA contact + footer.
- EARS-19 [test: auto] : WHEN la section packages est rendue THE SYSTEM SHALL afficher 3 cards indexées 01/02/03 (la vraie séquence Sprint→Build→Delivery) avec nom, durée, prix et lien vers la page package correspondante de la locale.
- EARS-20 [test: auto] : WHEN la section mécanisme est rendue THE SYSTEM SHALL exposer les 3 étapes Sprint → périmètre gelé → prix ferme du Build, y compris l'idée « personne ne signe un gros chiffre à l'aveugle — nous non plus ».
- EARS-21 [test: auto] : WHEN la section preuves est rendue THE SYSTEM SHALL mentionner la mission CAC40 du fondateur avec le seul chiffre autorisé (« plus de 80 000 utilisateurs, une centaine de pays ») et lier vers la page fondateur.
- EARS-22 [test: auto] : WHEN la section « pour qui » est rendue THE SYSTEM SHALL proposer 4 entrées — startup, PME/ETI, grand compte, US remote — menant chacune à son package porte d'entrée (Sprint, Build ou Delivery).
- EARS-23 [test: auto] : WHEN la FAQ de la home est rendue THE SYSTEM SHALL reprendre 4 à 5 objections de `brand/OFFERS.md` (périmètre qui bouge, sprint payant vs devis gratuit, propriété du code, qui travaille).

### CAP-5 — Pages package `/sprint`, `/build`, `/delivery` (+ paires FR)
Existant : aucune de ces 6 routes n'existe ; gabarit commun défini page par page dans `design/UX.md`, fond dans `brand/OFFERS.md`.

- EARS-24 [test: auto] : WHEN on requête `/sprint`, `/build`, `/delivery`, `/fr/sprint`, `/fr/build` et `/fr/delivery` THE SYSTEM SHALL servir six pages statiques construites sur le gabarit commun — hero (nom, promesse factuelle, prix, durée), livrables numérotés, déroulé, exclusions, prérequis, FAQ, CTA.
- EARS-25 [test: auto] : WHEN une page package affiche ses livrables THE SYSTEM SHALL reprendre le fond exact de `brand/OFFERS.md` (5 livrables Sprint, 5 livrables Build, inclusions comparées des 2 intensités Delivery) sans réécrire le fond.
- EARS-26 [test: auto] : WHEN la section « What's not included » est rendue THE SYSTEM SHALL lister les exclusions explicites d'`OFFERS.md` du package concerné.
- EARS-27 [test: auto] : WHEN `/sprint` est rendue THE SYSTEM SHALL afficher le prix fixe, la durée de 3 semaines, les prérequis client (décideur 2 h/semaine, réponse sous 48 h) et la validité 60 jours de la proposition de Build.
- EARS-28 [test: auto] : WHEN `/build` est rendue THE SYSTEM SHALL exposer la règle de périmètre gelé avec avenant chiffré en 48 h et la garantie corrective de 4 semaines.
- EARS-29 [test: auto] : WHEN `/delivery` est rendue THE SYSTEM SHALL présenter les deux intensités Pilotage / Pilotage + build avec leur comparatif d'inclusions et l'engagement mensuel résiliable à 30 jours des deux côtés.
- EARS-30 [test: auto] : WHEN le lecteur atteint le pied d'une page package THE SYSTEM SHALL proposer le cross-link logique (Sprint → Build, Build → Delivery) en plus du CTA contact.

### CAP-6 — Page méthode (`/method`, `/fr/methode`)
Existant : route absente ; contenu cadré par `design/UX.md` §/method et `brand/OFFERS.md`.

- EARS-31 [test: auto] : WHEN la page méthode est rendue THE SYSTEM SHALL décrire les jalons de 2 semaines avec démo à chaque jalon, la recette continue et la règle d'avenant 48 h.
- EARS-32 [test: auto] : WHEN la page méthode aborde la stack THE SYSTEM SHALL reprendre la position d'`OFFERS.md` — stack au coût de possession minimal (TypeScript, Vue/React, Node, Swift si justifié, cloud managé) et code propriété du client au paiement complet.
- EARS-33 [test: auto] : WHEN la page méthode aborde le remote THE SYSTEM SHALL décrire le fonctionnement async US : jalons et démos asynchrones, un créneau de recouvrement hebdomadaire EU/US East.

### CAP-7 — Page fondateur (`/founder`, `/fr/fondateur`)
Existant : route absente ; cadrage « honnêteté structurelle » dans `brand/BRAND.md` §4 et `design/UX.md` §/founder.

- EARS-34 [test: auto] : WHEN la page fondateur est rendue THE SYSTEM SHALL assumer l'honnêteté structurelle — fondateur + partenaires identifiés par projet, « celui qui cadre est celui qui construit », sans fausse équipe.
- EARS-35 [test: auto] : WHEN les preuves sont listées THE SYSTEM SHALL se limiter aux faits autorisés par `brand/BRAND.md` : TotalEnergies en faits publics sobres, associé The Node, PO Drift, Rémunet cité comme réalisation du fondateur et jamais comme service NexusInsight.
- EARS-36 [test: auto] : WHEN la page fondateur est rendue THE SYSTEM SHALL lier vers kaankarabulut.com.
- EARS-37 [test: manual] : WHEN la page fondateur est revue visuellement THE SYSTEM SHALL n'afficher ni portrait corporate ni stock photo — géométrie seulement.

### CAP-8 — Page contact (`/contact`, `/fr/contact`)
Existant : route absente ; V1 = mailto uniquement (pitch), aucun backend (NG-3).

- EARS-38 [test: auto] : WHEN la page contact est rendue THE SYSTEM SHALL proposer `mailto:kaan@nexusinsight.io` comme unique action de contact.
- EARS-39 [test: auto] : WHEN le HTML buildé du site est analysé THE SYSTEM SHALL ne contenir aucun élément `<form>`.

### CAP-9 — Mentions légales (`/legal`, `/fr/mentions-legales`, noindex)
Existant : routes absentes alors que le filtre sitemap de `astro.config.mjs` les exclut déjà ; aucun mécanisme noindex dans `Layout.astro` ; bloc légal de référence dans `brand/BRAND.md` §7.

- EARS-40 [test: auto] : WHEN la page légale est rendue THE SYSTEM SHALL afficher le bloc éditeur complet : NexusEvo SARL, capital 1 000 €, 45 rue de la Capsulerie 93170 Bagnolet, SIREN 928 581 545, RCS Bobigny, TVA FR95 928 581 545, directeur de publication Kaan Karabulut, hébergeur Google Cloud.
- EARS-41 [test: auto] : WHEN la page légale est rendue THE SYSTEM SHALL préciser que NexusInsight est le nom commercial de NexusEvo SARL.
- EARS-42 [test: auto] : WHEN `/legal` ou `/fr/mentions-legales` est rendue THE SYSTEM SHALL émettre `<meta name="robots" content="noindex">` sans qu'aucune autre page ne l'émette.

### CAP-10 — SEO bilingue : hreflang, canonical, sitemap, OG, robots, favicon
Existant : `Layout.astro` émet canonical + hreflang + OG sans `og:image` ; sitemap configuré ; ni `robots.txt`, ni favicon, ni `public/` ; le test i18n ne vérifie pas la parité des routes.

- EARS-43 [test: auto] : WHEN chacune des 16 pages est rendue THE SYSTEM SHALL déclarer canonical et hreflang croisés en/fr avec x-default vers la version EN, en respectant les slugs FR idiomatiques (`/method`↔`/fr/methode`, `/founder`↔`/fr/fondateur`, `/legal`↔`/fr/mentions-legales`).
- EARS-44 [test: auto] : WHEN le site est buildé THE SYSTEM SHALL générer un `sitemap` contenant les 14 pages indexables et excluant `/legal` et `/fr/mentions-legales`.
- EARS-45 [test: auto] : WHEN une page est rendue THE SYSTEM SHALL émettre `og:title`, `og:description`, `og:url` propres à la page et un `og:image` en URL absolue pointant vers un asset committé dans `public/` (aucun hôte externe).
- EARS-46 [test: auto] : WHEN `/robots.txt` est requêté THE SYSTEM SHALL servir un `robots.txt` statique autorisant le crawl et référençant le sitemap.
- EARS-47 [test: auto] : WHEN une page est rendue THE SYSTEM SHALL référencer une favicon servie depuis `public/`.
- EARS-48 [test: auto] : WHEN la suite de tests tourne THE SYSTEM SHALL vérifier que chaque page EN a sa paire FR et réciproquement (extension de `tests/i18n.test.ts` à la parité des routes, absente aujourd'hui).

### CAP-11 — Page 404
Existant : `nginx.conf` (gelé, NG-4) déclare déjà `error_page 404 /404.html` mais aucun `src/pages/404.astro` n'existe — la directive pointe dans le vide.

- EARS-49 [test: auto] : WHEN le site est buildé THE SYSTEM SHALL produire `dist/404.html` via `src/pages/404.astro`, sans modifier `Dockerfile` ni `nginx.conf`.
- EARS-50 [test: auto] : WHEN la page 404 est rendue THE SYSTEM SHALL proposer des liens de reprise vers `/` et `/fr/` dans le style E3.

### CAP-12 — Conformité design E3 et qualité
Existant : tokens complets dans `src/styles/tokens.css` ; aucune media query `prefers-reduced-motion` ; contraintes E3 et Lighthouse ≥ 90 validées dans `design/DESIGN.md` et `design/UX.md`.

- EARS-51 [test: auto] : WHEN les pages sont stylées THE SYSTEM SHALL n'utiliser que les variables de `src/styles/tokens.css` pour couleurs, typographie, rayons et transitions — aucune valeur hex hors `tokens.css`.
- EARS-52 [test: auto] : WHEN une transition ou animation est déclarée THE SYSTEM SHALL être neutralisée sous `prefers-reduced-motion: reduce`.
- EARS-53 [test: manual] : WHEN chaque page est revue visuellement THE SYSTEM SHALL respecter les règles E3 — cuivre en accent seulement (jamais en fond de section), au plus un bouton cuivre plein par écran, le hover discret des cards (graphite-2 + lift 3 px, 160 ms) comme seul moment expressif.
- EARS-54 [test: manual] : WHEN la home est affichée sous 900 px THE SYSTEM SHALL passer hero split et grilles en 1 colonne sans débordement horizontal (gutter 20 px mobile).
- EARS-55 [test: manual] : WHEN un audit Lighthouse est passé sur la home buildée THE SYSTEM SHALL atteindre un score ≥ 90 en performance, accessibilité et SEO.
