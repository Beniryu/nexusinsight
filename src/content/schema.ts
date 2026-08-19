// JSON-LD (schema.org) — source unique des données structurées.
// Les montants numériques ci-dessous DOIVENT rester alignés avec les prix affichés de site.ts
// (brand/OFFERS.md fait foi) : EN → USD, FR → EUR, comme les pages.

import type { Locale } from './site';

const SITE = 'https://nexusinsight.io';

export function organizationLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NexusInsight',
    legalName: 'NexusEvo SARL',
    url: SITE,
    email: 'kaan@nexusinsight.io',
    founder: {
      '@type': 'Person',
      name: 'Kaan Karabulut',
      url: 'https://kaankarabulut.com',
    },
    sameAs: ['https://kaankarabulut.com'],
  };
}

interface PackagePricing {
  name: { en: string; fr: string };
  /** Offer à prix fixe, ou AggregateOffer (lowPrice) pour le Build, ou 2 Offers pour Delivery. */
  offers: (locale: Locale, url: string) => object;
}

const CURRENCY: Record<Locale, string> = { en: 'USD', fr: 'EUR' };

const PACKAGES: Record<string, PackagePricing> = {
  sprint: {
    name: { en: 'Product Discovery Sprint', fr: 'Product Discovery Sprint' },
    offers: (locale, url) => ({
      '@type': 'Offer',
      price: locale === 'en' ? 11000 : 9500,
      priceCurrency: CURRENCY[locale],
      url,
    }),
  },
  build: {
    name: { en: 'End-to-end Build', fr: 'Build bout en bout' },
    offers: (locale, url) => ({
      '@type': 'AggregateOffer',
      lowPrice: locale === 'en' ? 29000 : 25000,
      priceCurrency: CURRENCY[locale],
      url,
    }),
  },
  delivery: {
    name: { en: 'Product Delivery', fr: 'Product Delivery' },
    offers: (locale, url) => ({
      '@type': 'AggregateOffer',
      lowPrice: locale === 'en' ? 4500 : 3900,
      highPrice: locale === 'en' ? 8500 : 7500,
      priceCurrency: CURRENCY[locale],
      url,
    }),
  },
};

/** Service JSON-LD d'une page package ; retourne null pour les chemins hors packages. */
export function packageLd(path: string, locale: Locale): object | null {
  const key = Object.keys(PACKAGES).find((k) => path.includes(`/${k}/`));
  if (!key) return null;
  const pkg = PACKAGES[key];
  const url = SITE + path;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pkg.name[locale],
    provider: { '@type': 'Organization', name: 'NexusInsight', url: SITE },
    url,
    offers: pkg.offers(locale, url),
  };
}
