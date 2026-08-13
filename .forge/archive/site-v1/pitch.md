---
feature: site-v1
statut: final
appetite:
  duree: "2 jours"
couts_externes:
  plafond_usd: 10
  previsions:
    - { ressource: "Cloud Run nexusinsight-test (statique, min-instances 0)", usd_mois: 0.5 }
    - { ressource: "Cloud Run nexusinsight prod (statique, min-instances 0)", usd_mois: 0.5 }
  risque_depassement: false
no_gos:
  - id: NG-1
    regle: "Zéro dépendance npm runtime au-delà d'astro et @astrojs/sitemap (pas de framework UI, pas de lib d'animation)"
    verif: "python3 -c \"import json; deps=set(json.load(open('package.json'))['dependencies']); assert deps <= {'astro','@astrojs/sitemap'}, deps\""
  - id: NG-2
    regle: "Zéro requête réseau au rendu : fonts self-hostées en woff2 locaux, aucun CDN ni Google Fonts/Fontshare dans src/"
    verif: "! grep -rEq \"fonts\\.googleapis\\.com|api\\.fontshare\\.com|cdn\\.jsdelivr|unpkg\\.com\" src/"
  - id: NG-3
    regle: "Pas de backend : aucune route API, sortie 100 % statique"
    verif: "test ! -e src/pages/api && grep -q \"output: 'static'\" astro.config.mjs"
  - id: NG-4
    regle: "Infra gelée : Dockerfile et nginx.conf non modifiés par la feature (port 8080 et smoke test en dépendent)"
    verif: "test -z \"$(git diff --name-only origin/main -- Dockerfile nginx.conf)\""
---

## Problème

NexusInsight (marque commerciale de prestation de NexusEvo SARL) vend trois packages productisés — Discovery Sprint, Build bout en bout, Product Delivery mensuel — mais n'a aucune vitrine : `nexusinsight.io` est un domaine nu alors que `kaan@nexusinsight.io` est déjà l'adresse de contact conseil publique sur tous les canaux de Kaan (site perso, LinkedIn, mentions légales). Coût concret aujourd'hui : le flux de « conseil entrant » que la marque perso génère (LinkedIn = « crédibilité conseil », 155 k impressions sur li01) n'a aucune page où atterrir pour se convertir en prospect qualifié ; chaque conversation commerciale repart de zéro, sans offre ni prix opposables. La démarcation avec Malt (régie 750 €/j) n'existe nulle part publiquement.

## Appetite

**2 jours maximum**, caps orchestrateur inchangés (8 h, 3 tentatives par étape). Pour tenir ce budget on accepte de NE PAS faire : formulaire de contact (mailto uniquement), blog/notes, animations élaborées (un seul hover discret sur les cards), page équipe, versions de langue au-delà d'EN/FR, intégration analytics (ajout ultérieur).

## Solution esquissée

Site statique Astro bilingue, EN à la racine (x-default) et FR sous `/fr/`, conforme au sitemap validé (`design/UX.md`) : Home (hero split E3 avec carte de faits + 3 cards packages avec prix + mécanisme + preuves + FAQ), une page par package (`/sprint`, `/build`, `/delivery` — livrables, déroulé, exclusions « what's not included », prérequis, FAQ, prix affichés EUR/USD), `/method`, `/founder`, `/contact` (mailto), `/legal` (mentions NexusEvo SARL, noindex). Design system E3 « graphite/cuivre » (`design/DESIGN.md`, tokens dans `src/styles/tokens.css`), fonts Clash Display/Switzer/JetBrains Mono self-hostées. Contenu = `brand/OFFERS.md` et `brand/BRAND.md`, voix « nous », zéro emoji. hreflang croisés, sitemap.xml, OG par page.

## Rabbit holes

- **Fonts Fontshare self-hostées** : Clash Display et Switzer ne sont pas sur Google Fonts ; télécharger les woff2 depuis Fontshare (licence ITF gratuite) et les committer dans `public/fonts/` — décision prise d'avance pour ne pas y passer une demi-journée : subsets latin, 2 graisses max par famille (500/600 display, 400/600 body), licence ITF vérifiée avant commit.
- **Pixel-perfection du hero split** : le mockup E3 est la référence, pas un contrat au pixel — décision : on suit les tokens et la structure, on ne fait pas de va-et-vient visuel dans le pipeline autonome (les ajustements fins viendront en itération humaine post-v1).
- **Dérive de contenu** : réécrire les offres dans le pipeline serait une fuite de périmètre — décision : la copy vient de `brand/OFFERS.md` telle quelle (prix, exclusions, FAQ), le pipeline adapte la forme, jamais le fond.

## No-gos

- NG-1 — zéro dépendance runtime en plus (`astro`, `@astrojs/sitemap` seulement) ; vérif par lecture de `package.json`.
- NG-2 — zéro requête réseau au rendu (fonts locales, pas de CDN) ; vérif par grep des URLs externes dans `src/`.
- NG-3 — pas de backend (aucune route API, `output: 'static'`) ; vérif par test d'absence + grep de la config.
- NG-4 — infra gelée (`Dockerfile`, `nginx.conf` intouchés) ; vérif par `git diff` vide contre `origin/main` sur ces deux fichiers.

## Coûts externes

Deux ressources facturables, déjà provisionnées en placeholders par l'onboarding : Cloud Run `nexusinsight-test` et `nexusinsight` (prod), site statique derrière nginx, `min-instances 0` → trafic quasi nul attendu au lancement, prévision ≈ 0,5 USD/mois chacune, total ≈ 1 USD/mois pour un plafond de 10 USD/mois. `risque_depassement: false` — confirmé explicitement par Kaan le 2026-08-12 (« ≈ 0-1 $/mois, rien d'autre »). Le renouvellement du domaine IONOS est un coût préexistant du contrat 89666535, pas un coût créé par cette feature. Aucune base de données, aucune API tierce.
