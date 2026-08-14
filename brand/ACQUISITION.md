# Plan d'acquisition — NexusInsight

> Créé le 2026-08-14. Exécution via `hub-distribution/` (sujet à créer), mesure UTM → Umami.
> Contraintes de départ assumées : mission CAC40 en journée (quelques heures/semaine), zéro réseau US,
> zéro case study, marque neuve (SEO = investissement long). Atouts : marque perso FR qui performe
> (LinkedIn 155 k impressions), preuves CAC40 + produits livrés en propre, site productisé avec prix
> affichés (rare), chaîne Forge (vélocité de production).

## 0. La thèse d'acquisition (avant les POV)

On ne « se fait pas connaître des US » en général — on choisit un **beachhead** étroit et on y devient
reconnaissable. Deux segments accessibles sans réseau :

- **B1 — Founders early-stage non techniques (US), pre-seed/seed** : trop petits pour les agences US
  (80-150 k$ le MVP), assez financés pour 30-40 k$. Notre pitch : *fixed scope, prices on the page,
  the founder who scopes is the one who builds, EU timezone = your morning is our afternoon.*
- **B2 — Agences US en surcharge (design/produit sans delivery)** : partenaire overflow EU, marge
  d'arbitrage prix évidente, cycle de vente plus court que le client final, volume récurrent.

Règle : on teste B1 en direct (contenu + communautés) ET B2 en outbound doux (20 conversations), on
laisse la donnée trancher au verdict 90 jours. **Qui parle : Kaan en « je »** (X, LinkedIn,
communautés — la locomotive) ; la marque n'a pas de compte social pour l'instant, le site est sa
seule voix « nous ». Conforme à l'architecture des marques.

---

## 1. POV Marketer (demand gen, contenu, mesure)

**Le message qui différencie** (à marteler partout, jamais reformulé à chaque post) :
1. Prices on the page — personne ne fait ça dans le custom dev.
2. The small package prices the big one — nobody signs a big number blind.
3. Celui qui cadre est celui qui construit — zéro perte en ligne, zéro effet agence.

**Canaux, par ordre de priorité :**

| Canal | Rôle | Cadence (hub) | Langue |
|---|---|---|---|
| **X** | Build in public EN, replies utiles aux comptes makers/founders US | 3 posts/sem + replies quotidiennes 10 min | EN (bascule actée VOICE.md) |
| **kaankarabulut.com/notes** | Notes EN de fond (la locomotive SEO + crédibilité), recyclées via /distrib-crosspost | 1 note/2 sem | EN d'abord |
| **LinkedIn perso** | Audience chaude FR : raconter le lancement, la méthode, les jalons — draine du FR ET crédibilise | 1 post/sem | FR (canal-test EN au cas par cas) |
| **Communautés** (2 max : Indie Hackers + r/SaaS ou HN) | Présence 80/20 CHARTE : contribuer, jamais pitcher ; Show HN au premier vrai jalon | 3 contributions/sem | EN |
| **SEO intentionnel** (pas programmatique) | Les pages packages ciblent déjà « fixed price MVP development », « product discovery sprint » ; ajouter 3-4 pages comparatives (« vs hiring an agency », « vs freelancer ») | 1 page/mois | EN |

**Contenus à fabriquer en priorité** (chaque pièce sert 3 canaux via crosspost) :
1. **La méta-preuve** : « This site was scoped, built, reviewed and deployed by our own pipeline in
   48 h » — le récit Forge du site nexusinsight.io, avec les vrais artefacts (spec EARS, review
   adversariale). C'est LA pièce de lancement : différenciante, vérifiable, article + thread.
2. **Le mécanisme** : « Why we publish our prices » / « The sprint prices the build » — 2 notes.
3. **Lead magnet actionnable** : le **template de périmètre gelé** (Scope Doc) en page publique —
   pas d'ebook, un outil qu'un founder utilise et qui montre notre façon de travailler.

**Mesure** (rien sans elle) : UTM par canal → Umami mutualisé ; métrique de décision = **calls
réservés** (pas les visites) ; verdict go/pivot/kill à 90 jours par canal, seuils déclarés dans le
test hub AVANT de commencer.

## 2. POV Business Developer (outbound doux, partenariats, prescripteurs)

L'inbound seul mettra 6 mois à produire. En parallèle, sans jamais violer la CHARTE (zéro DM froid
de masse, transparence totale) :

1. **20 conversations B2** (agences US design/produit, no-code shops qui butent sur le custom) :
   approche par contribution — commenter leur travail, proposer UNE idée utile, puis un call
   « overflow partnership » ; objectif : 3 calls, 1 pilote white-label. Le pitch B2 tient en une
   ligne : *your capacity problem is our timezone arbitrage.*
2. **Prescripteurs** : fractional CTOs/CPOs US (ils cadrent, ne construisent pas — on est leur bras
   armé) ; proposer un fee d'apport simple (10 %) ; 10 contacts, via leurs contenus.
3. **Réseau existant** : The Node (clients early-stage refusés/hors périmètre ?), diaspora
   TotalEnergies/consulting partie aux US, anciens contacts Malt internationaux. Une intro chaude
   vaut 50 posts.
4. **Accélérateurs/communautés de founders** (plus tard, avec un case study) : proposer un atelier
   « scope your MVP in 90 minutes » — le Sprint en format gratuit court, générateur de calls.

## 3. POV Fondateur/Produit (la preuve avant tout)

Le trou béant du funnel : **zéro case study client**. Trois parades, dans l'ordre :
1. **La méta-preuve Forge** (§1) — disponible dès maintenant, coût nul.
2. **1-2 missions lighthouse** : prix réduit EXPLICITE (« founding client pricing », -30 % affiché
   comme tel, jamais caché) contre témoignage + case study détaillé. Cibler B1 via les communautés.
   Un lighthouse converti paie tout le plan.
3. **Produits en propre comme démos** : l'app Shopify UE pourra devenir une preuve nommée quand tu
   le décideras (décision en attente, BRAND.md §2) ; en attendant « we ship our own products » +
   le pipeline suffisent.

**Friction à lever côté offre** : le mailto seul est une friction US — ajouter un **Cal.com**
(gratuit) « Book a 20-min scoping call » sur /contact et les CTA. Et préparer les **CGV/contrat
US-friendly** (déjà au reste-à-faire BRAND §6) avant le premier closing — pas après.

## 4. POV Sales (process, pour ne pas gâcher les leads)

- **Pipeline minimal** : `hub-distribution` pour la traction, + un `pipeline.md` simple dans
  nexusinsight/brand/ (stade, source, prochain pas, montant) — pas de CRM tant qu'il y a < 20 deals.
- **SLA réponse < 24 h** (c'est un argument de vente en soi face aux agences).
- **Call de qualification 20 min scripté** : problème, timing, budget-fit, décideur → si fit, la
  seule proposition est LE SPRINT (jamais de devis gratuit du Build — c'est la doctrine OFFERS.md,
  elle se défend d'elle-même en call).
- **Suivi de perte** : chaque « non » documenté en une ligne (raison) — c'est la matière des
  itérations de pitch du trimestre suivant.

## 5. Séquencement 90 jours

**S1-S2 — Fondations (≈ 6 h)**
- Créer le sujet `nexusinsight` dans hub-distribution (brief, voix, seuils) + `/distrib-scan
  nexusinsight` (canaux US scorés) + test `t01-lancement-us` déclaré avec seuils.
- Cal.com branché sur /contact (petite retouche site).
- Basculer le profil X en EN (bio déjà prête VOICE.md), soumettre le sitemap à Search Console.
- Post LinkedIn FR de lancement (en « je » : « j'ai monté une marque de prestation, voilà pourquoi
  les prix sont publics ») + note méta-preuve Forge en rédaction.

**S3-S6 — Test t01 (≈ 4 h/sem)**
- X : 3/sem build in public + 10 min de replies/jour (les replies font l'audience, pas les posts).
- 1 note EN/2 sem (méta-preuve, puis mécanisme) recyclée via /distrib-crosspost.
- Communautés : 3 contributions/sem, 80/20 strict.
- BD : 10 premières conversations B2/prescripteurs (pas de pitch, découverte).
- Lead magnet Scope Doc publié.

**S7-S12 — Data et double-down (≈ 4 h/sem)**
- `/distrib-report t01` à S8 : couper le canal mort, doubler le canal qui produit des calls.
- Closer 1 lighthouse (objectif unique du trimestre côté revenu).
- 10 conversations B2 restantes → 3 calls partenariat → 1 pilote.
- Case study #1 publié → Show HN / relance communautés.

**KPIs du trimestre** : ≥ 8 calls réservés · ≥ 1 lighthouse signé · ≥ 1 pilote agence · ≥ 500
visites US (Umami) · temps ≤ 4 h/sem tenu. Seuils de verdict déclarés dans le test hub.

## 6. Ce qu'on ne fait PAS maintenant (et pourquoi)

- **Google Ads** : CPC 15-40 $ sur ces requêtes, funnel sans preuve sociale = brûler du cash.
- **Cold email de masse** : CHARTE + délivrabilité d'un domaine neuf + ça contredit le positionnement.
- **Compte social « NexusInsight »** : la locomotive est Kaan ; un compte marque sans audience
  diluerait l'effort. Révision quand il y aura 3 case studies.
- **Embauche/sous-traitance marketing** : rien à déléguer tant que le message n'est pas validé par
  des calls réels.
- **Multi-segments simultanés** : PME/ETI FR et grands comptes attendront le T2 — le trimestre 1
  est B1/B2 US + le flux FR gratuit de LinkedIn.
