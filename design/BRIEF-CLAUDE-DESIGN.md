# Brief design — nexusinsight.io (pour propositions de nouvelles interfaces)

> Rédigé le 2026-08-14. Site en production : https://nexusinsight.io (16 pages EN/FR + 404).
> Objet : donner tout le contexte contenu + technique pour proposer de NOUVELLES interfaces.
> Ce qui est figé vs ouvert est explicité en fin de brief — le contenu est figé, l'interface est ouverte.

## 1. Ce qu'est NexusInsight

Studio produit (nom commercial de NexusEvo SARL, France) qui vend des **packages à prix fixes
affichés** au lieu de jours-homme. Cible : founders US/UK early-stage non techniques, agences en
overflow, PME. Le site est la seule surface où la marque parle — voix « nous », registre pro
international sobre (ni corporate, ni casual).

**Thèse (hero)** : *Products shipped, not days billed.* / FR : *Des produits livrés, pas des jours
facturés.*

**Le mécanisme central (à mettre en scène — c'est LE différenciateur)** : le petit package price le
gros. Un Discovery Sprint à prix fixe verrouille le périmètre et produit un devis ferme pour le
Build. Punchline officielle : *« Nobody signs a big number blind. Neither do we. »*

**Les 3 offres (prix exacts, non négociables dans la copy)** :
| Offre | Durée | Prix pages FR | Prix pages EN |
|---|---|---|---|
| Product Discovery Sprint | 3 semaines | 9 500 € HT fixe | $11,000 fixed, excl. VAT |
| End-to-end Build (MVP → prod) | 6-10 semaines | à partir de 25 000 € HT | from $29,000 |
| Product Delivery (mensuel, résiliable 30 j) | abonnement | 3 900 € ou 7 500 €/mois HT | $4,500 or $8,500/mo |

## 2. Architecture et contenu, page par page

**Sitemap** (EN à la racine = x-default, FR en miroir) :
`/` ↔ `/fr/` · `/sprint` ↔ `/fr/sprint` · `/build` ↔ `/fr/build` · `/delivery` ↔ `/fr/delivery` ·
`/method` ↔ `/fr/methode` · `/founder` ↔ `/fr/fondateur` · `/contact` ↔ `/fr/contact` ·
`/legal` ↔ `/fr/mentions-legales` (noindex) · `/404`.

**Gabarit commun** : nav (nom « NexusInsight » en toutes lettres — PAS de logo, liens
Offers/Method/Founder, sélecteur EN↔FR vers la page équivalente, CTA « Book a call ») ; footer
(mention légale NexusEvo SARL, contact kaan@nexusinsight.io, lien kaankarabulut.com « founder's
personal site ») ; bande CTA graphite avant le footer (« Tell us what you need shipped »).

**Home (7 sections, ordre validé)** :
1. Hero split : thèse + lead + 2 CTA, et à droite la **carte de faits** (5 lignes clé/valeur :
   Scope → in writing, frozen · Price → known upfront (seule valeur en accent) · Deliverable →
   verifiable · Code → yours, repo included · Engagement → no day rates).
2. Les 3 packages en cards indexées 01/02/03 (vraie séquence Sprint→Build→Delivery), prix affichés,
   chaque card → sa page.
3. Le mécanisme en 3 étapes numérotées (Sprint → périmètre gelé → prix ferme du Build) + punchline.
4. Preuves sobres : le fondateur pilote un programme data governance dans un groupe CAC40 (« more
   than 80,000 users across a hundred countries » — SEUL chiffre autorisé) → lien /founder.
5. « Pour qui » : 4 entrées (startup → /sprint · SMB → /build · enterprise → /delivery · US remote
   → /method).
6. FAQ : 4-5 objections (périmètre qui bouge → avenant 48 h ; sprint payant vs devis gratuit ;
   propriété du code ; qui travaille réellement).
7. Bande CTA + footer.

**Pages package (gabarit ×3, EN+FR)** : hero (nom, promesse factuelle, prix, durée) → livrables
numérotés (5 pour Sprint : cadrage, backlog priorisé, prototype navigable, reco d'architecture,
proposition de Build à prix ferme valable 60 j ; 5 pour Build : produit en prod, CI/CD, code
transféré, doc de reprise, garantie 4 semaines ; Delivery : comparatif 2 intensités) → déroulé/
timeline → **« What's not included »** (les exclusions publiées — argument de confiance central,
à ne surtout pas cacher) → prérequis client → FAQ propre → cross-link (Sprint→Build→Delivery) + CTA.

**/method** : jalons de 2 semaines avec démo, recette continue, règle d'avenant 48 h ; stack au
coût de possession minimal (TypeScript, Vue/React, Node, Swift si justifié, cloud managé) ; code
propriété du client au paiement complet ; remote async US (« your morning is our afternoon »,
un créneau de recouvrement hebdo EU/US East).

**/founder** : l'« honnêteté structurelle » — porté par le fondateur Kaan Karabulut + partenaires
identifiés par projet, « celui qui cadre est celui qui construit », jamais de fausse équipe. Faits :
programme CAC40 (chiffre autorisé uniquement), associé The Node, PO de Drift, « builds and runs his
own products end to end ». Lien kaankarabulut.com. **Aucun portrait, aucune photo** — géométrie.

**/contact** : mailto kaan@nexusinsight.io comme unique action (« a direct email to the founder »).
Aucun formulaire sur tout le site. (Cal.com prévu prochainement — prévoir l'emplacement d'un
bouton « Book a 20-min scoping call ».)

**/legal** : bloc NexusEvo SARL complet + « NexusInsight is the trade name of NexusEvo SARL ». noindex.

**/404** : bilingue, liens de reprise vers / et /fr/.

## 3. Design system actuel (« E3 » — v1 en prod, remplaçable)

- **Couleurs** : graphite `#1E2126` (fonds sombres, cards) · graphite-2 `#282C33` (hover) · papier
  froid `#F5F6F8` (fond de page) · blanc `#FFFFFF` · cuivre `#C97E48` (accent sur sombre) ·
  cuivre profond `#A45F2E` (accent sur clair) · muted `#5F6570`/`#A9ADB5` · lignes `#DDE0E6` /
  `rgba(245,246,248,.14)`.
- **Typo** : display **Clash Display** (500/600) · body **Switzer** (400/600) · mono **JetBrains
  Mono** (400/500, labels uppercase letter-spacing 0.13-0.16em). Self-hostées woff2 subsets latin.
- **Échelle** : hero clamp(34→56px)/1.08 · titres de section = labels mono 12.5px uppercase ·
  h3 cards 21px · prix 27px · body 16.5/1.6 · desc 14/1.55.
- **Règles E3** : le cuivre est un accent (jamais un fond de section) ; max 1 bouton cuivre plein
  par écran ; cards graphite sur page claire, radius 6, hover = graphite-2 + lift 3px 160ms (seul
  moment expressif) ; boutons radius 4 ; page-max 1120, gutter 40 (20 mobile), breakpoint 900px →
  tout passe en 1 colonne.
- **Historique** : direction retenue après 3 rounds (structure « prix monumental » conservée de la
  piste Klein ; le beige et le bleu Klein ont été rejetés par Kaan ; il aime les cards).
- Le projet Claude Design « NexusInsight » contient déjà les cards du système actuel
  (foundations/colors, foundations/type, components/buttons, offer-card, fact-card,
  sections/hero-split).

## 4. Stack technique et contraintes d'implémentation

- **Astro 5 SSG** (`output: 'static'`, build format directory), i18n `defaultLocale: en`,
  FR sous `/fr/` — 17 pages statiques buildées.
- **Tout le texte** vit dans `src/content/site.ts` (objet bilingue typé — parité de clés EN/FR
  testée) ; **tous les slugs** dans `src/content/routes.ts` (registre des paires EN↔FR, source des
  hreflang/canonical/sélecteur de langue).
- **Tous les styles** dérivent de `src/styles/tokens.css` (variables CSS `--nxi-*`) — un test
  échoue si un hex apparaît hors tokens. Transitions neutralisées sous `prefers-reduced-motion`.
- **Zéro requête réseau au rendu** : fonts locales, pas de CDN, pas de scripts tiers (un Umami
  self-hosted arrivera, seule exception prévue). **Zéro backend, zéro `<form>`**. Zéro dépendance
  runtime hors `astro` + `@astrojs/sitemap`.
- **Contrat de testabilité** : le HTML porte des attributs stables (`data-section`,
  `data-card-index`, `data-deliverable`, `data-exclusion`, `data-tier`, `data-audience`,
  `data-faq-item`, `data-component="nav|footer"`, `data-lang-switch`, `data-cta`) — 45 tests
  Vitest les vérifient sur le build (parité i18n, prix exacts, zéro emoji, vocabulaire interdit,
  SEO/hreflang/sitemap/OG, noindex légal seul).
- **Servi par** nginx (Docker multi-stage) sur Cloud Run — Dockerfile/nginx figés. Lighthouse ≥ 90
  (perf, a11y, SEO) exigé. Déploiement par pipeline autonome (Forge) : toute évolution redevient
  une feature testée.

## 5. Figé vs ouvert (pour les nouvelles propositions)

**Figé (ne pas y toucher dans les propositions)** :
- Le contenu : textes, prix, structure d'information des pages (les sections listées §2), l'ordre
  Home, les exclusions publiées, la carte de faits.
- Les interdits de marque : **zéro emoji, zéro stock photo, zéro fausse équipe/portrait corporate**,
  sobriété (géométrie avant illustration), pas de logo (le nom en toutes lettres).
- Les invariants techniques : statique, tokens-driven (tout doit rester exprimable en variables),
  bilingue EN/FR symétrique, breakpoint mobile propre, reduced-motion, budget perf (pas de lib
  d'animation, pas de vidéo lourde).

**Ouvert (là où on attend des propositions)** :
- Direction visuelle complète : palette, typographies, ambiance clair/sombre, textures — E3
  (graphite/cuivre) est la v1, pas un dogme. Seule préférence connue de Kaan : les **cards** lui
  plaisent, les prix doivent rester très visibles, ni beige ni bleu Klein.
- Layout et compositions : hero, mise en scène du mécanisme en 3 étapes, traitement des pages
  packages, navigation, footer, 404.
- Micro-interactions (dans le budget perf et reduced-motion), traitement des labels mono,
  iconographie géométrique éventuelle, OG images.

**Format de livraison idéal** : des cards dans le projet Claude Design « NexusInsight » (nouvelles
sections par direction proposée — ex. `proposals/<nom>/hero.html`, `offer-card.html`,
`colors.html`), self-contained, avec les vraies copies du §2 — pas de lorem ipsum, pas de faux prix.
