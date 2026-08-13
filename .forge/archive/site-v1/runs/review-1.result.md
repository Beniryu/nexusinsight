---
feature: site-v1
etape: review
run: review-1
statut: passed
verdict: changements_demandes
findings:
  - severite: majeure
    fichier: public/fonts/JetBrainsMono-Regular.woff2
    description: >-
      EARS-2 non satisfait : les deux woff2 JetBrains Mono (Regular + Medium) sont les
      fichiers complets v2.304 — 1 743 glyphes, 1 363 codepoints dont 122 cyrilliques et
      79 grecs, ~93 Ko chacun (vérifié via fontTools) — et non un subset latin comme
      l'exige « deux graisses par famille en subset latin ». Clash Display (380 codepoints)
      et Switzer (385) sont latin-only et conformes. tests/fonts.test.ts ne vérifie que les
      noms de fichiers et le nombre de @font-face : il reste vert alors que le critère
      [test: auto] est violé. Scénario d'échec : chaque première visite télécharge
      ~120 Ko de glyphes jamais rendus (impact budget perf / EARS-55 Lighthouse).
      Correctif attendu : subsetter les deux woff2 en latin (pyftsubset
      --unicodes=U+0000-00FF,U+0100-017F,U+2000-206F,U+20AC + ponctuation utilisée) ou
      idéalement renforcer fonts.test.ts pour plafonner la taille ou le nombre de glyphes.
  - severite: mineure
    fichier: tests/pages.test.ts
    description: >-
      EARS-18/19/20/21/22/23 ne sont assertés que sur la home EN (index.html) ; la home FR
      n'est couverte que par ricochet (ancre #offres, nav/footer, lang-switch, SEO), et
      method/founder/contact FR ne sont jamais lus par les tests de contenu (EARS-31/32/33
      testés sur method/index.html seul). L'implémentation actuelle est conforme à la
      lecture (fr/index.astro miroir strict, composants partagés + parité site.ts), mais le
      scénario d'échec existe : supprimer la section proof de fr/index.astro → suite
      verte, EARS-18 violé en FR.
  - severite: mineure
    fichier: tests/pages.test.ts
    description: >-
      Le test EARS-24 annonce « les 7 sections du gabarit » mais n'en vérifie que 6 :
      data-section="timeline" (le déroulé, exigé par EARS-24) est absent des assertions.
      La section est bien rendue sur les 6 pages (steps Sprint/Build, commitment Delivery),
      mais la retirer de PackagePage.astro laisserait la suite verte.
resume: >-
  Relecture adversariale complète : spec + plan relus, diff intégral parcouru
  (composants, pages, contenu, tests), suite rejouée réellement (44/44 verts, dist
  rebuildé), npm run check 0 erreur, no-gos vérifiés (package.json/Dockerfile/nginx.conf
  intouchés, aucun hôte externe, statique pur), fond strictement conforme à
  brand/OFFERS.md et brand/BRAND.md (prix EUR/USD + HT, chiffre CAC40 autorisé seul,
  vocabulaire interdit absent, Rémunet cité en réalisation du fondateur), SEO bilingue
  conforme (canonical/hreflang/x-default, sitemap 14 URLs exact, noindex légales seules,
  OG absolu local, robots, favicon), fontes authentiques aux bons poids et familles
  alignées avec tokens.css. Un écart objectif confirmé bloque l'approbation : JetBrains
  Mono committé en fichiers complets (cyrillique+grec) au lieu du subset latin exigé par
  EARS-2, invisible pour fonts.test.ts — plus deux trous de couverture mineurs (home FR
  et section déroulé non assertées). Hypothèses acceptées : 404 bilingue hors registre
  sans nav/footer (liens de reprise EARS-50 présents, choix documenté) ; modification
  .forge/config.yml (budget orchestrateur, hors périmètre de la spec).
---

# Review 1 — site-v1

Verdict : **changements_demandes** — 1 finding majeur (EARS-2, subset latin JetBrains
Mono), 2 findings mineurs (couverture de tests). Tout le reste de la spec est satisfait
et vérifié par exécution réelle. Détail des findings et scénarios d'échec dans le
frontmatter ci-dessus.
