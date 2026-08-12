# Offres NexusInsight — catalogue et pricing

> Source de vérité des packages. Créé le 2026-08-12. Tout prix affiché sur nexusinsight.io vient d'ici.
> Modèle : packages productisés uniquement. La régie reste sur Malt (750 €/j), jamais ici.

---

## Vue d'ensemble

| # | Package | Durée | Prix (HT) | Prix US |
|---|---|---|---|---|
| 1 | **Product Discovery Sprint** | 3 semaines | **9 500 €** fixe | **$11,000** fixe |
| 2 | **Build bout en bout** (MVP → prod) | 6-10 semaines | **à partir de 25 000 €** — prix ferme fixé par le Sprint | from **$29,000** |
| 3 | **Product Delivery** (mensuel) | abonnement, résiliable | **3 900 €/mois** ou **7 500 €/mois** | **$4,500** / **$8,500** |

**Le mécanisme qui rend le prix fixe possible : le Sprint price le Build.**
Personne ne peut chiffrer honnêtement un développement complet sans cadrage — nous non plus. Donc on ne le fait pas : le Sprint (petit, prix fixe, 3 semaines) produit le périmètre écrit, le backlog priorisé et le prototype ; sur cette base, le Build reçoit **une proposition à prix ferme et à périmètre gelé**. Le client peut s'arrêter après le Sprint et partir avec tout le dossier — il est fait pour être exécutable par n'importe quelle équipe, pas seulement la nôtre. C'est ce qui rend la proposition de Build crédible : elle est comparable.

---

## 1. Product Discovery Sprint — 9 500 € HT fixe ($11,000)

**Pour qui** : une idée de produit, une refonte, ou un projet interne à cadrer — avant d'engager un budget de développement.

**Durée** : 3 semaines calendaires. Démarrage à date fixe, fin à date fixe.

**Livrables** (tous vérifiables, remis en fin de sprint) :
1. **Cadrage produit** : problème, utilisateurs cibles, parcours clés, périmètre V1 explicite (dedans / dehors / plus tard).
2. **Backlog initial priorisé** : user stories rédigées avec critères d'acceptation, découpées en jalons.
3. **Prototype navigable** : les parcours clés en maquette cliquable (pas du code — de quoi tester la proposition de valeur et aligner les parties prenantes).
4. **Recommandation d'architecture** : stack, hébergement, coûts d'infra estimés, risques techniques identifiés.
5. **Proposition de Build à prix ferme** : périmètre gelé, planning par jalons, prix. Valable 60 jours.

**Déroulé** : semaine 1 — immersion et entretiens (3 à 5 interlocuteurs côté client) ; semaine 2 — périmètre, backlog, prototype ; semaine 3 — itération sur le prototype, chiffrage, restitution (½ journée avec les décideurs).

**Prérequis client** : un décideur disponible 2 h/semaine, accès aux interlocuteurs métier, réponse sous 48 h pendant le sprint.

**Exclusions explicites** (ce qui n'est PAS dans le Sprint) :
- Pas de code de production, pas de POC technique (si un POC est indispensable pour lever un risque, il est chiffré à part avant de commencer).
- Pas d'étude de marché ni de benchmark concurrentiel formel — on cadre l'exécution, pas l'opportunité business.
- Pas de design system complet — le prototype valide les parcours, pas la direction artistique finale.
- Une seule idée/produit par sprint.

**Calcul du prix** (interne, ne pas publier) : ~11-12 jours de charge senior × 750 € = 8 250-9 000 € en équivalent régie + prime de productisation (démarrage à date fixe, livrables garantis, pas de dérive) → 9 500 €. USD : parité + prime marché US → $11,000.

---

## 2. Build bout en bout — à partir de 25 000 € HT (from $29,000)

**Pour qui** : un produit à construire jusqu'à la mise en production — après un Sprint (recommandé) ou sur la base d'un cadrage existant assez précis pour être chiffré (audité avant engagement, sans frais).

**Durée** : 6 à 10 semaines selon le périmètre gelé.

**Livrables** :
1. **Le produit en production** : web (et/ou iOS selon périmètre), déployé sur l'infrastructure du client ou provisionnée pour lui.
2. **CI/CD opérationnelle** : tests, build, déploiement automatisés — la même chaîne que celle qu'on utilise pour livrer.
3. **Le code, propriété du client** : repo transféré, licence claire, aucune dépendance cachée à nous.
4. **Documentation de reprise** : architecture, décisions, runbook de mise en production — écrite pour l'équipe qui prendra la suite (interne ou future embauche).
5. **4 semaines de garantie corrective** après la mise en production (bugs sur le périmètre livré).

**Déroulé** : jalons de 2 semaines, démo à chaque jalon, recette continue — le client voit le produit avancer, pas des slides d'avancement.

**Gestion du changement de périmètre** (la règle qui protège le prix fixe) : le périmètre du contrat est gelé. Toute demande nouvelle passe par un avenant chiffré en 48 h — acceptée, elle décale le planning d'autant ; refusée, elle va au backlog post-V1. Pas de zone grise.

**Exclusions explicites** :
- Le contenu (textes, visuels métier) est fourni par le client, sauf mention contraire au périmètre.
- Pas de maintenance évolutive après la garantie — c'est le rôle du package Delivery.
- Pas de reprise de code existant non audité (un existant s'audite pendant le Sprint, pas au milieu du Build).
- Les coûts d'infrastructure (cloud, services tiers, stores) sont au compte du client, estimés dès le Sprint.

**Calcul du prix** (interne) : plancher 25 000 € ≈ 30 jours × 750 € + prime forfait ; typique constaté attendu : 25-45 k€. Le prix ferme sort de la proposition post-Sprint, jamais d'une négociation au doigt mouillé.

---

## 3. Product Delivery — 3 900 €/mois ou 7 500 €/mois HT ($4,500 / $8,500)

**Pour qui** : une équipe de dev existe (interne, ESN, offshore) mais le produit n'avance pas droit — backlog flou, priorités qui bougent, delivery imprévisible. On apporte le pilotage produit, pas des bras en plus.

**Deux intensités** :

| | **Pilotage** — 3 900 €/mois | **Pilotage + build** — 7 500 €/mois |
|---|---|---|
| Équivalent charge | ~1 jour/semaine | ~2 jours/semaine |
| Backlog vivant, priorisé, critères d'acceptation | ✓ | ✓ |
| Rituels animés (planning, review, points d'arbitrage) | ✓ | ✓ |
| Interface parties prenantes / synthèse décideurs mensuelle | ✓ | ✓ |
| Recette des livrables de l'équipe | ✓ | ✓ |
| Contributions techniques directes (prototypes, scripts, revues de code, dette CI/CD) | — | ✓ |

**Engagement** : mensuel, résiliable avec 30 jours de préavis, des deux côtés. Pas d'engagement annuel — la reconduction se gagne chaque mois.

**Exclusions explicites** :
- Ce n'est pas de la régie déguisée : pas de présence imposée x jours/semaine dans les locaux, pas d'intégration à la hiérarchie client (garde-fou salariat déguisé). Le rythme se cale sur les livrables et rituels, pas sur un badge.
- Pas de management hiérarchique de l'équipe client — on pilote le produit, pas les carrières.
- Un seul produit par abonnement.

**Calcul du prix** (interne) : Pilotage ≈ 4,5 j/mois × 750 € = 3 375 € + prime de disponibilité continue → 3 900 €. Pilotage + build ≈ 9 j/mois × 750 € = 6 750 € + prime → 7 500 €. La prime rémunère la réactivité inter-jours (répondre le mardi à une question posée le lundi, sans facturer une journée).

---

## Parcours par cible

- **Startup / scale-up** : Sprint → Build → (option) Delivery pour tenir le rythme post-V1.
- **PME / ETI** : Build (si le besoin est net) ou Sprint d'abord (si le besoin est flou) ; Delivery si une équipe existe déjà.
- **Grand compte / DSI** : Delivery en entrée (le format abonnement passe bien en achat de prestation récurrente) ; Sprint pour cadrer un projet interne avant appel d'offres. Les missions longues plein-temps restent de la régie → Malt.
- **US / international** : les trois packages en $, 100 % remote, jalons et démos asynchrones + un créneau de recouvrement par semaine (EU timezone = matinées US East).

## FAQ objections (matière pour le site et les calls)

- **« Et si le périmètre bouge en cours de Build ? »** — Il bouge via avenant chiffré en 48 h, ou il attend la post-V1. Le prix fixe n'est possible que parce que cette règle est brutale des deux côtés : nous n'avons pas le droit de déborder non plus.
- **« Pourquoi un Sprint payant et pas un devis gratuit ? »** — Un devis gratuit sur un produit non cadré est une fiction polie : soit il est gonflé pour absorber l'inconnu, soit il explose en cours de route. Le Sprint produit un dossier qui vous appartient et rend notre proposition comparable — y compris avec nos concurrents.
- **« À qui appartient le code ? »** — Au client, intégralement, au paiement complet. Repo transféré, pas de dépendance cachée.
- **« Qui travaille réellement sur mon projet ? »** — Le fondateur cadre et construit, des partenaires identifiés interviennent selon les projets — jamais de sous-traitance anonyme. Celui qui a fait le Sprint fait le Build.
- **« Quelle stack ? »** — Celle qui minimise votre coût de possession : web moderne (TypeScript, Vue/React, Node), iOS natif (Swift) si le produit le justifie, cloud managé (GCP/Azure). La recommandation d'architecture du Sprint est argumentée coûts inclus, pas une préférence de confort.
- **« Vous êtes trop petits pour un grand compte. »** — Pour un programme de 20 personnes, oui. Pour cadrer et piloter un produit, la petite taille est le mécanisme : celui qui écrit le backlog est celui qui répond en comité — zéro perte en ligne. Le fondateur fait ça dans un groupe CAC40 depuis 2023.

---

## Notes de calibration (internes)

- Base : TJM régie 750 € (médiane Super Malter 8-15 ans Paris PM, relevé 2026-08-10). Prime productisation : 15-25 % selon package — rémunère le risque de forfait, la date fixe et la disponibilité continue.
- USD : conversion ~×1,08 + prime marché US ~5-8 %, arrondis psychologiques. Facturation SARL en USD, TVA non applicable export — à valider avec l'expert-comptable avant la première facture US.
- Tous les prix sont HT. Révision annuelle des prix ici avant toute mise à jour du site.
- Rappel vocabulaire : jamais « audit » (le Sprint « cadre », la reprise d'existant « s'évalue »), jamais de promesse chiffrée de résultat client.
