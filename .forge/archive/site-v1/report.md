---
feature: site-v1
statut: ready_for_promotion
branche: forge/site-v1
base_sha: d9855b66d184c6370fc5c4f3d6ee5a312d3574a8
head_sha: ec4df941e12cc25c30d10a09f3f632e6a91b53c9
cibles:
  - type: cloud-run
    artefact: "europe-west1-docker.pkg.dev/kaan-personal-system/forge/nexusinsight@sha256:e1ab12531766f1f7a59457ad95984f045c6796f80e519194ed180fc08fd45b05"
    acces_test: "https://nexusinsight-test-d6kia6goga-ew.a.run.app"
    run_id: "31750031518"
    commande_promotion: "gh workflow run forge-promote-prod.yml -R Beniryu/nexusinsight -f digest=sha256:e1ab12531766f1f7a59457ad95984f045c6796f80e519194ed180fc08fd45b05 -f confirm=nexusinsight"
tests:
  total: 45
  pass: 45
  fail: 0
  criteres_ears: { total: 55, pass: 50, manual: 5 }
no_gos:
  - { id: NG-1, resultat: pass }
  - { id: NG-2, resultat: pass }
  - { id: NG-3, resultat: pass }
  - { id: NG-4, resultat: pass }
diff: { fichiers: 75, plus: 4611, moins: 34 }
couts_externes_usd: 0
commande_promotion: "forge promote site-v1"
---

# Rapport — Site vitrine NexusInsight v1 (EN/FR)

## Résumé

Le site vitrine bilingue de NexusInsight est construit, testé et déployé en environnement de
test : 17 pages statiques Astro buildées (16 pages du registre EN/FR + 404), EN à la racine et
FR sous `/fr/`, dont la home 7 sections, les 3 pages package (`/sprint`, `/build`, `/delivery`
et paires FR), `/method`, `/founder`, `/contact` (mailto uniquement) et les mentions légales en
noindex. Les fonts Clash Display, Switzer et JetBrains Mono sont self-hostées en woff2 subsets
latin dans `public/fonts/` (licences ITF/OFL committées), le SEO bilingue est complet
(canonical, hreflang croisés + x-default, sitemap de 14 URLs indexables, OG par page avec image
locale absolue, robots.txt, favicon) et le design n'utilise que les tokens E3 de
`src/styles/tokens.css`. Les 8 tâches du plan ont été implémentées en TDD strict : la suite
finale sort 45/45 tests verts, `npm run check` à 0 erreur, et les 4 no-gos du pitch sortent en
`pass` (zéro dépendance runtime ajoutée, zéro requête réseau au rendu, aucun backend,
`Dockerfile`/`nginx.conf` intouchés). L'image a été déployée sur Cloud Run test via le run
GitHub 31556917649 : https://nexusinsight-test-d6kia6goga-ew.a.run.app. Aucun coût externe
nouveau : le ledger de ressources créées par la feature est vide (services Cloud Run
provisionnés à l'onboarding, prévision pitch ≈ 1 USD/mois pour un plafond de 10).

## Écarts vs spec

Aucun critère `[test: auto]` n'est en écart : les 50 critères automatisables des 12 capabilities
sont couverts par la suite (45 tests) et verts. Trois hypothèses assumées en cours de run,
documentées et acceptées par les deux revues :

- **404 hors registre bilingue** : `404.astro` est une page unique bilingue sans nav ni footer
  (EARS-6/10 non appliqués à cette page), hors registre de routes ; les liens de reprise vers
  `/` et `/fr/` exigés par EARS-50 sont présents et testés.
- **`.forge/config.yml` modifié** : uniquement `caps.max_heures_total` 8 → 24, à la demande de
  Kaan (budget orchestrateur), hors périmètre produit de la spec.
- **Critères manuels reportés à la revue humaine** : EARS-17 (registre de la copy « nous »,
  sentence case), EARS-37 (aucun portrait/stock photo), EARS-53 (règles E3 du cuivre),
  EARS-54 (responsive < 900 px), EARS-55 (Lighthouse ≥ 90) — soit 5 critères sur 55 (~9 %,
  sous le plafond de ~20 %), à vérifier avant promotion (voir dernière section).

## Revue adversariale

Deux passes en contexte frais, un cycle de corrections (`cycles: 1`, verdict final `approuve`) :

- **review-1 — `changements_demandes`** : relecture spec + plan + diff intégral, suite rejouée
  réellement (44/44 à ce stade), conformité de fond vérifiée contre `brand/OFFERS.md` et
  `brand/BRAND.md`. 1 finding **majeur** : EARS-2 violé — les deux woff2 JetBrains Mono étaient
  les fichiers complets (1 363 codepoints dont cyrillique et grec, ~93 Ko chacun) au lieu du
  subset latin, invisible pour `fonts.test.ts`. 2 findings **mineurs** de couverture : la home FR
  n'était pas assertée directement (CAP-4 testé sur la home EN seule) et le test EARS-24 ne
  vérifiait pas la section `data-section="timeline"`.
- **fix-1** : les 3 findings corrigés, un commit chacun — subset latin via pyftsubset
  (~32 Ko et 361 codepoints par fichier contre ~92 Ko/1 363) avec plafond de 40 Ko ajouté à
  `fonts.test.ts` (vérifié rouge sur les fichiers complets) et modification OFL documentée dans
  `LICENSES.md` ; bloc CAP-4 paramétré sur les deux homes EN + FR ; assertion timeline ajoutée.
- **review-2 — `approuve`, 0 finding** : corrections contre-vérifiées par exécution indépendante
  (subsets authentifiés via fontTools, glyphes critiques présents), re-vérification globale
  rejouée : 45/45 verts sur build réel, check 0 erreur/0 warning, no-gos intacts, prix EUR/USD
  exacts avec mention HT / excl. VAT, vocabulaire interdit absent, sitemap 14 URLs, SEO dérivé
  du registre de routes.

## Comment vérifier à la main

1. Ouvrir l'environnement de test : https://nexusinsight-test-d6kia6goga-ew.a.run.app
2. **EARS-17 (copy)** : relire quelques pages EN et FR — voix « nous » (jamais « je »), registre
   pro sobre, sentence case, pas de point final aux titres.
3. **EARS-53 (design E3)** : sur chaque page, cuivre en accent seulement (jamais en fond de
   section), au plus un bouton cuivre plein par écran, hover discret des cards comme seul
   moment expressif.
4. **EARS-54 (mobile)** : réduire la fenêtre sous 900 px sur la home — hero split et grilles en
   1 colonne, aucun débordement horizontal.
5. **EARS-37 (fondateur)** : `/founder` et `/fr/fondateur` — géométrie seulement, ni portrait
   corporate ni stock photo.
6. **EARS-55 (Lighthouse)** : audit Lighthouse sur la home de test — performance, accessibilité
   et SEO ≥ 90.
7. Parcours fonctionnels rapides : sélecteur EN/FR sur `/method` → `/fr/methode` (jamais la
   home), ancre nav Offers → `#offers`/`#offres`, CTA « Book a call » → page contact (mailto),
   `/legal` en noindex, une URL inexistante → 404 avec liens de reprise.
8. Si tout est conforme, promouvoir depuis la racine du repo : `forge promote site-v1`
