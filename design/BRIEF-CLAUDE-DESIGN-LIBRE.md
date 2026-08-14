# Brief design — nexusinsight.io (exploration libre, sans système existant)

> Version « feuille blanche » du 2026-08-14 : ce brief décrit le contenu et les contraintes, PAS le
> design actuel. **Ignore les cards existantes du projet (elles documentent la v1 en prod) — l'objet
> est de proposer des directions entièrement neuves.** Site live : https://nexusinsight.io.

## 1. Ce qu'est NexusInsight

Studio produit (France) qui vend des **packages à prix fixes affichés** au lieu de jours-homme.
Cible : founders US/UK early-stage non techniques, agences en overflow, PME. Le site parle en
« nous », registre pro international sobre — ni corporate, ni casual. Bilingue EN (défaut) / FR.

**Thèse (hero)** : *Products shipped, not days billed.* / *Des produits livrés, pas des jours facturés.*

**Le différenciateur à mettre en scène** : le petit package price le gros. Un Discovery Sprint à
prix fixe verrouille le périmètre et produit un devis ferme pour le Build. Punchline officielle :
*« Nobody signs a big number blind. Neither do we. »* La transparence radicale (prix publics,
exclusions publiées) est LE positionnement — le design doit la faire sentir, pas juste l'afficher.

**Les 3 offres (prix exacts, non négociables)** :
| Offre | Durée | FR | EN |
|---|---|---|---|
| Product Discovery Sprint | 3 semaines | 9 500 € HT fixe | $11,000 fixed, excl. VAT |
| End-to-end Build (MVP → prod) | 6-10 semaines | à partir de 25 000 € HT | from $29,000 |
| Product Delivery (mensuel, résiliable 30 j) | abonnement | 3 900 € ou 7 500 €/mois HT | $4,500 or $8,500/mo |

## 2. Architecture et contenu, page par page

**Sitemap** (EN racine, FR miroir) : `/` ↔ `/fr/` · `/sprint` · `/build` · `/delivery` ·
`/method` ↔ `/fr/methode` · `/founder` ↔ `/fr/fondateur` · `/contact` · `/legal` (noindex) · `404`.

**Gabarit commun** : nav (le nom « NexusInsight » en toutes lettres — pas de logo — liens
Offers/Method/Founder, sélecteur EN↔FR, CTA « Book a call ») ; footer (NexusEvo SARL, contact
kaan@nexusinsight.io, lien « founder's personal site ») ; une bande CTA avant le footer
(« Tell us what you need shipped »).

**Home — 7 blocs de contenu (ordre imposé, mise en scène libre)** :
1. Thèse + lead + 2 CTA, accompagnés des **5 faits** : Scope → in writing, frozen · Price → known
   upfront · Deliverable → verifiable · Code → yours, repo included · Engagement → no day rates.
2. Les 3 offres avec prix, séquence 01→02→03 (Sprint→Build→Delivery), chacune → sa page.
3. Le mécanisme en 3 étapes (Sprint → périmètre gelé → prix ferme du Build) + punchline.
4. Preuve sobre : le fondateur pilote un programme data governance dans un groupe CAC40 (« more
   than 80,000 users across a hundred countries » — seul chiffre autorisé) → lien /founder.
5. « Pour qui » : startup → /sprint · SMB → /build · enterprise → /delivery · US remote → /method.
6. FAQ : 4-5 objections (périmètre qui bouge → avenant 48 h ; sprint payant vs devis gratuit ;
   propriété du code ; qui travaille réellement).
7. Bande CTA + footer.

**Pages package (gabarit ×3)** : hero (nom, promesse, prix, durée) → livrables numérotés (5/5/
comparatif 2 intensités) → déroulé → **« What's not included »** (les exclusions publiées — argument
de confiance central, à valoriser visuellement, pas à cacher) → prérequis client → FAQ → cross-link
(Sprint→Build→Delivery) + CTA.

**/method** : jalons 2 semaines avec démo, avenant 48 h, stack au coût de possession minimal, code
propriété du client, remote async US (« your morning is our afternoon »).

**/founder** : « celui qui cadre est celui qui construit » — fondateur + partenaires identifiés,
jamais de fausse équipe. Faits : CAC40 (chiffre autorisé), associé The Node, PO de Drift, construit
ses propres produits. Lien kaankarabulut.com. **Aucun portrait, aucune photo.**

**/contact** : mailto unique (« a direct email to the founder »), aucun formulaire ; prévoir
l'emplacement d'un futur bouton « Book a 20-min scoping call ».

**/legal** : bloc société complet. **/404** : bilingue, liens de reprise.

## 3. Contraintes (dures) et libertés

**Interdits de marque, non négociables** :
- Zéro emoji. Zéro stock photo, zéro portrait/fausse équipe. Pas de logo — le nom en toutes lettres.
- Sobriété : la géométrie avant l'illustration. Pas de jargon marketing (« expert », « passionate »,
  « world-class », promesses chiffrées).
- Les prix restent très visibles — c'est le positionnement, pas un détail de pricing page.

**Invariants techniques (l'implémentation suivra ce cadre)** :
- Astro 5 100 % statique, 17 pages, bilingue symétrique EN/FR ; tout le texte vit dans un fichier
  de contenu unique, tout style dans des design tokens (variables CSS) — toute proposition doit
  rester exprimable en tokens.
- Zéro requête réseau au rendu (fonts self-hostées woff2 — toute typo proposée doit exister en
  webfont libre), zéro backend, zéro formulaire, aucune lib JS d'animation ; micro-interactions en
  CSS, neutralisées sous `prefers-reduced-motion`.
- Responsive propre (breakpoint mobile), Lighthouse ≥ 90 (perf, accessibilité, SEO) — contrastes AA.

**Tout le reste est ouvert — et c'est l'objet de la demande** : palette, typographies, clair/sombre,
ambiance, textures, layouts (hero, mise en scène du mécanisme, pages packages, nav, 404),
iconographie géométrique, OG images. Proposer **2-3 directions tranchées et assumées** plutôt qu'une
synthèse prudente ; chaque direction avec les vraies copies de ce brief (pas de lorem ipsum, pas de
faux prix).

**Format de livraison** : des cards self-contained dans ce projet, par direction —
`proposals/<nom>/colors.html`, `type.html`, `hero.html`, `offer-card.html` (ou équivalents).
