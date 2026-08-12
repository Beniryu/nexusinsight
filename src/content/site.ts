// Copie bilingue du site — EN par défaut, FR en pair idiomatique (jamais une traduction littérale).
// Source de vérité du contenu : brand/OFFERS.md et brand/BRAND.md. Les tests vérifient la parité des clés.

export type Locale = 'en' | 'fr';

interface Copy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export const site: Record<Locale, Copy> = {
  en: {
    meta: {
      title: 'NexusInsight — Products shipped, not days billed',
      description:
        'Fixed-scope product packages: discovery sprint, end-to-end build, monthly delivery. The scope in writing, the price known upfront.',
    },
    hero: {
      kicker: 'Scoping · Build · Delivery',
      title: 'Products shipped, not days billed.',
      lead: 'Fixed-scope packages — the small one prices the big one. Nobody signs a big number blind. Neither do we.',
      ctaPrimary: 'Book a call',
      ctaSecondary: 'See the offers',
    },
  },
  fr: {
    meta: {
      title: 'NexusInsight — Des produits livrés, pas des jours facturés',
      description:
        'Des packages produit à périmètre cadré : sprint de cadrage, build bout en bout, delivery mensuel. Le périmètre par écrit, le prix connu d\'avance.',
    },
    hero: {
      kicker: 'Cadrage · Build · Delivery',
      title: 'Des produits livrés, pas des jours facturés.',
      lead: 'Des packages à périmètre cadré — le petit package price le gros. Personne ne signe un gros chiffre à l\'aveugle. Nous non plus.',
      ctaPrimary: 'Prendre un call',
      ctaSecondary: 'Voir les offres',
    },
  },
};
