// Paires de routes EN↔FR — source de vérité unique (Layout, Nav, tests).
export interface RoutePair {
  en: string;
  fr: string;
  noindex?: boolean;
}

export const routes: RoutePair[] = [
  { en: '/', fr: '/fr/' },
  { en: '/sprint/', fr: '/fr/sprint/' },
  { en: '/build/', fr: '/fr/build/' },
  { en: '/delivery/', fr: '/fr/delivery/' },
  { en: '/method/', fr: '/fr/methode/' },
  { en: '/founder/', fr: '/fr/fondateur/' },
  { en: '/contact/', fr: '/fr/contact/' },
  { en: '/legal/', fr: '/fr/mentions-legales/', noindex: true },
];

export function paire(path: string): RoutePair {
  const r = routes.find((p) => p.en === path || p.fr === path);
  if (!r) throw new Error(`route inconnue : ${path}`);
  return r;
}
