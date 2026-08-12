# DESIGN — NexusInsight (système retenu : E3 « Split + carte de faits »)

> Validé par Kaan le 2026-08-12 après 3 rounds (C → C1 → E3). Source de vérité : `tokens.css`.
> Distinct de Nocturne (marque perso). Contraintes héritées : zéro emoji, pas de stock photos,
> pas de fausse équipe, géométrie avant illustration.

## Parcours de décision (pour mémoire)

1. Round 1 : A « Spec » / B « Waybill » / C « Klein » → structure C retenue (prix monumental, table-manifeste), typo Bricolage et bleu Klein rejetés.
2. Round 2 : C1 graphite/cuivre + Clash Display retenus, beige rejeté ; C2 vert bouteille et C3 Fraunces écartés.
3. Round 3 (5 propositions, typo assagie, cards) : **E3 retenu** — hero clair en split avec « carte de faits » graphite, cards d'offres graphite sur papier froid.

## Palette

```
--nxi-graphite      #1E2126   fond sombre principal (cards d'offres, carte de faits, bandes)
--nxi-graphite-2    #282C33   surface sombre secondaire (hover, panneaux)
--nxi-paper         #F5F6F8   fond clair principal (pages) — PAS de beige
--nxi-white         #FFFFFF   surfaces claires (cards claires si besoin)
--nxi-ink           #1E2126   texte sur clair
--nxi-fg            #F5F6F8   texte sur sombre
--nxi-muted-l       #5F6570   texte secondaire sur clair
--nxi-muted-d       #A9ADB5   texte secondaire sur sombre
--nxi-copper        #C97E48   accent sur sombre (tags, prix small, liens cards sombres)
--nxi-copper-deep   #A45F2E   accent sur clair (kickers, metas) — contraste AA sur paper
--nxi-copper-fg     #1C1408   texte sur bouton cuivre
--nxi-line-light    #DDE0E6   bordures sur clair
--nxi-line-dark     rgba(245,246,248,.14)   bordures sur sombre
```

Règles : le cuivre est un **accent de signalement** (tags, metas, prix secondaires, soulignés), jamais un fond de section. Sur clair on utilise `copper-deep`, sur sombre `copper`. Un seul bouton cuivre plein par écran maximum.

## Typographie

- **Display : Clash Display** (Fontshare, self-host en prod — woff2 500/600). Titres, noms de packages, prix. Graisse 600 max.
- **Body : Switzer** (Fontshare, self-host — 400/500/600). Texte courant, boutons, nav.
- **Mono : JetBrains Mono** (400/500). Tags, kickers, metas de prix, labels de la carte de faits. Toujours uppercase + letter-spacing 0.13-0.16em en label.

Échelle : hero clamp(34px→56px)/1.08 · h2 section 12.5px mono uppercase (le titre de section est un label, pas un titre) · h3 card 21px · prix card 27px · body 16.5px/1.6 · desc card 14px/1.55 · meta mono 10.5-12px. Tracking display -0.015em.

## Composants clés

- **Carte de faits** (signature du hero) : fond graphite, radius 6, lignes k/v séparées par `line-dark` ; clé en mono uppercase `muted-d`, valeur en 600 ; une seule valeur en cuivre (« known upfront »).
- **Card d'offre** : fond graphite sur page claire, radius 6, padding 24/22, min-height 300 ; tag mono cuivre (`01 · 3 WEEKS`), h3 Clash, desc `muted-d`, prix Clash 27px + small mono cuivre, lien « Details → » cuivre. Hover : fond `graphite-2` + lift 3px (transition 160ms cubic-bezier(.4,0,.2,1)).
- **Boutons** : radius 4. Primaire sur clair = fond `ink` texte blanc ; primaire sur sombre = fond `copper` texte `copper-fg` ; secondaire = bordure 1.5px.
- **Nav** : fond de la page (pas de barre pleine), nom en toutes lettres Clash 600 16.5px — pas de logo (règle héritée), CTA à droite.
- **Index 01/02/03** : réservé à la vraie séquence Sprint→Build→Delivery (l'ordre porte du sens), pas un ornement générique.

## Layout

Page-max 1120, gutter 40 (20 mobile). Hero split : `1.5fr 1fr`, gap 48 (1 colonne < 900px). Cards : grid 3 colonnes gap 18 (1 colonne < 900px). Radius : 4 (boutons) / 6 (cards). Animation : 140-200ms, un seul moment expressif par page, `prefers-reduced-motion` respecté.

## Sombre/clair par page (héritage E3)

Pages claires (`paper`) avec sections/cards sombres en contraste. La bande CTA de pied de page peut être graphite (héritée de D3). Pas de mode clair/sombre utilisateur : un seul thème.

## Fichiers

- `tokens.css` — variables CSS canoniques.
- `designs-round3.html` §E3 — mockup de référence.
- `ds/` — bundle poussé sur claude.ai/design (DesignSync) pour itération visuelle.
- Explorations conservées : `directions.html`, `variants-c.html`, `designs-c1.html`.
