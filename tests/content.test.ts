import { describe, it, expect } from 'vitest';
import { site } from '../src/content/site';

const texteDe = (obj: unknown): string => JSON.stringify(obj);

describe('CAP-3 — conformité de la copy', () => {
  it('EARS-13 : prix conformes à OFFERS.md — EUR côté FR, USD côté EN', () => {
    const fr = texteDe(site.fr);
    const en = texteDe(site.en);
    expect(fr).toMatch(/9 500\s?€|9 500\s?€/);
    expect(fr).toMatch(/25 000\s?€|25 000\s?€/);
    expect(fr).toMatch(/3 900|3 900/);
    expect(fr).toMatch(/7 500|7 500/);
    expect(en).toMatch(/\$11,000/);
    expect(en).toMatch(/\$29,000/);
    expect(en).toMatch(/\$4,500/);
    expect(en).toMatch(/\$8,500/);
  });

  it('EARS-14 : mention HT (FR) / excl. VAT (EN) présente', () => {
    expect(texteDe(site.fr)).toMatch(/HT/);
    expect(texteDe(site.en)).toMatch(/excl\. VAT/);
  });

  it('EARS-15 : aucun emoji dans la copy', () => {
    expect(texteDe(site)).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  });

  it('EARS-16 : vocabulaire interdit absent', () => {
    const tout = texteDe(site).toLowerCase();
    for (const mot of ['audit', 'passionate', 'passionné', 'seasoned', 'world-class', 'results-driven']) {
      expect(tout, `mot interdit trouvé : ${mot}`).not.toContain(mot);
    }
    expect(tout).not.toMatch(/\bexpert\b/);
  });
});
