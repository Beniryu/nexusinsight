// Copie bilingue du site — EN par défaut, FR en pair idiomatique (jamais une traduction littérale).
// Source de vérité du contenu : brand/OFFERS.md et brand/BRAND.md. Les tests vérifient la parité des clés.
// Vocabulaire : jamais « audit » (un existant « s'évalue »), pas de superlatifs de plaquette, voix « nous ».

export type Locale = 'en' | 'fr';

export interface Meta {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

interface HeroFact {
  k: string;
  v: string;
  /** Règle E3 : une seule valeur en cuivre par carte de faits. */
  copper?: boolean;
}

interface PackageSummary {
  index: string;
  name: string;
  duration: string;
  price: string;
  priceMeta: string;
  blurb: string;
  href: string;
}

interface PackageHero {
  kicker: string;
  name: string;
  promise: string;
  price: string;
  priceMeta: string;
  duration: string;
}

interface Deliverable {
  title: string;
  text: string;
}

interface TitledText {
  title: string;
  text: string;
}

interface CrossLink {
  text: string;
  label: string;
  href: string;
}

export interface SprintPage {
  meta: Meta;
  hero: PackageHero;
  deliverablesTitle: string;
  deliverables: Deliverable[];
  processTitle: string;
  process: string[];
  prerequisitesTitle: string;
  prerequisites: string[];
  exclusionsTitle: string;
  exclusions: string[];
  faqTitle: string;
  faq: FaqItem[];
  crossLink: CrossLink;
}

export interface BuildPage {
  meta: Meta;
  hero: PackageHero;
  deliverablesTitle: string;
  deliverables: Deliverable[];
  processTitle: string;
  process: string[];
  scopeRule: TitledText;
  prerequisitesTitle: string;
  prerequisites: string[];
  exclusionsTitle: string;
  exclusions: string[];
  faqTitle: string;
  faq: FaqItem[];
  crossLink: CrossLink;
}

interface DeliveryTier {
  name: string;
  price: string;
  priceMeta: string;
  charge: string;
  inclusions: string[];
}

export interface DeliveryPage {
  meta: Meta;
  hero: PackageHero;
  tiersTitle: string;
  tiers: DeliveryTier[];
  commitment: TitledText;
  prerequisitesTitle: string;
  prerequisites: string[];
  exclusionsTitle: string;
  exclusions: string[];
  faqTitle: string;
  faq: FaqItem[];
  crossLink: CrossLink;
}

/** Union des trois contenus package — consommée par le gabarit PackagePage.astro. */
export type PackageContent = SprintPage | BuildPage | DeliveryPage;

export interface MethodPage {
  meta: Meta;
  hero: { kicker: string; title: string; lead: string };
  milestones: TitledText;
  scopeRule: TitledText;
  stack: TitledText;
  ownership: TitledText;
  remote: TitledText;
}

export interface FounderPage {
  meta: Meta;
  hero: { kicker: string; title: string; lead: string };
  structure: TitledText;
  factsTitle: string;
  facts: string[];
  link: { label: string; href: string };
}

export interface ContactPage {
  meta: Meta;
  hero: { kicker: string; title: string; lead: string };
  email: string;
  ctaLabel: string;
  note: string;
}

export interface LegalPage {
  meta: Meta;
  title: string;
  tradeName: string;
  publisherTitle: string;
  publisher: string[];
  hostTitle: string;
  host: string;
}

interface CostRow {
  option: string;
  range: string;
  tradeoff: string;
  /** Ligne « nous » — mise en évidence discrète dans le tableau. */
  us?: boolean;
}

export interface MvpCostPage {
  meta: Meta;
  hero: { kicker: string; title: string; lead: string };
  tableTitle: string;
  tableHead: { option: string; range: string; tradeoff: string };
  rows: CostRow[];
  factors: TitledText & { items: string[] };
  explode: TitledText;
  position: TitledText & { ctaSprint: string; ctaBuild: string };
  faqTitle: string;
  faq: FaqItem[];
}

interface NotFoundPage {
  meta: Meta;
  title: string;
  text: string;
  links: { en: { label: string; href: string }; fr: { label: string; href: string } };
}

export interface Copy {
  meta: Meta;
  hero: {
    kicker: string;
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  nav: { offers: string; method: string; founder: string; cta: string };
  footer: { company: string; legal: string; contact: string; founderSite: string; guide: string };
  home: {
    heroFacts: HeroFact[];
    packagesTitle: string;
    packages: PackageSummary[];
    mechanism: { title: string; stepTitles: string[]; steps: string[]; punchline: string };
    proof: { title: string; text: string; link: { label: string; href: string } };
    audiencesTitle: string;
    audiences: { label: string; text: string; href: string }[];
    faqTitle: string;
    faq: FaqItem[];
    ctaBand: { text: string; cta: string };
  };
  pages: {
    sprint: SprintPage;
    build: BuildPage;
    delivery: DeliveryPage;
    method: MethodPage;
    founder: FounderPage;
    contact: ContactPage;
    legal: LegalPage;
    mvpCost: MvpCostPage;
    notFound: NotFoundPage;
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
    nav: {
      offers: 'Offers',
      method: 'Method',
      founder: 'Founder',
      cta: 'Book a call',
    },
    footer: {
      company: 'NexusInsight is the trade name of NexusEvo SARL',
      legal: 'Legal notice',
      contact: 'kaan@nexusinsight.io',
      founderSite: "Founder's personal site",
      guide: 'How much does an MVP cost?',
    },
    home: {
      heroFacts: [
        { k: 'Scope', v: 'in writing, frozen' },
        { k: 'Price', v: 'known upfront', copper: true },
        { k: 'Deliverable', v: 'verifiable' },
        { k: 'Code', v: 'yours, repo included' },
        { k: 'Engagement', v: 'no day rates' },
      ],
      packagesTitle: 'Three packages, one mechanism',
      packages: [
        {
          index: '01',
          name: 'Product Discovery Sprint',
          duration: '3 weeks',
          price: '$11,000',
          priceMeta: 'fixed price, excl. VAT',
          blurb:
            'Three weeks to scope a product: a written V1 scope, a prioritised backlog, a clickable prototype and a firm-price Build proposal.',
          href: '/sprint/',
        },
        {
          index: '02',
          name: 'End-to-end Build',
          duration: '6 to 10 weeks',
          price: 'from $29,000',
          priceMeta: 'firm price set by the Sprint, excl. VAT',
          blurb:
            'Your product in production: 2-week milestones with a demo at each one, the code handed over, 4 weeks of corrective warranty.',
          href: '/build/',
        },
        {
          index: '03',
          name: 'Product Delivery',
          duration: 'monthly subscription, cancellable',
          price: '$4,500 or $8,500 per month',
          priceMeta: 'excl. VAT',
          blurb:
            'Product steering for your existing team: a living backlog, facilitated rituals, continuous acceptance. Two intensities.',
          href: '/delivery/',
        },
      ],
      mechanism: {
        title: 'The Sprint prices the Build',
        stepTitles: ['The Sprint', 'Frozen scope', 'Firm price'],
        steps: [
          'The Sprint — small, fixed price, 3 weeks — produces the written scope, the prioritised backlog and the prototype.',
          'On that basis, the Build gets a firm-price, frozen-scope proposal.',
          'You can stop after the Sprint and leave with the full dossier — it is written to be executable by any team, not just ours.',
        ],
        punchline: 'Nobody signs a big number blind. Neither do we.',
      },
      proof: {
        title: 'Where this comes from',
        text: 'Our founder has been steering a data governance programme inside a CAC40 group since 2023 — more than 80,000 users, around a hundred countries. The one who writes the backlog is the one who answers in the steering committee.',
        link: { label: 'The founder page', href: '/founder/' },
      },
      audiencesTitle: 'Who this is for',
      audiences: [
        {
          label: 'Startup / scale-up',
          text: 'Scope fast and build without scope risk: Sprint, then Build.',
          href: '/sprint/',
        },
        {
          label: 'SMB / mid-market',
          text: 'One counterpart from scoping to production, without hiring: Build.',
          href: '/build/',
        },
        {
          label: 'Enterprise / CIO office',
          text: 'Reliable product steering as a monthly subscription: Delivery.',
          href: '/delivery/',
        },
        {
          label: 'US / international',
          text: 'All three packages in dollars, fully remote, async milestones — the Sprint is the entry point.',
          href: '/sprint/',
        },
      ],
      faqTitle: 'Fair questions',
      faq: [
        {
          q: 'What if the scope moves during the Build?',
          a: 'It moves through a priced amendment within 48 hours, or it waits for post-V1. The fixed price only works because the rule is blunt on both sides: we are not allowed to overrun either.',
        },
        {
          q: 'Why a paid Sprint instead of a free quote?',
          a: 'A free quote on an unscoped product is a polite fiction: either it is inflated to absorb the unknown, or it blows up along the way. The Sprint produces a dossier you own and makes our proposal comparable — including with our competitors.',
        },
        {
          q: 'Who owns the code?',
          a: 'You do, in full, upon complete payment. Repository transferred, no hidden dependency on us.',
        },
        {
          q: 'Who actually works on my project?',
          a: 'The founder scopes and builds; identified partners step in depending on the project — never anonymous subcontracting. Whoever did the Sprint does the Build.',
        },
        {
          q: 'Are you too small for an enterprise account?',
          a: 'For a 20-person programme, yes. For scoping and steering a product, the small size is the mechanism: the one who writes the backlog is the one who answers in the committee — nothing lost in translation. Our founder has been doing this inside a CAC40 group since 2023.',
        },
      ],
      ctaBand: {
        text: 'One call to see which package fits your situation',
        cta: 'Book a call',
      },
    },
    pages: {
      sprint: {
        meta: {
          title: 'Product Discovery Sprint — $11,000, 3 weeks — NexusInsight',
          description:
            'Three weeks to scope a product: explicit V1 scope, prioritised backlog, clickable prototype, architecture recommendation and a firm-price Build proposal. $11,000 fixed, excl. VAT.',
        },
        hero: {
          kicker: '01 · Product Discovery Sprint',
          name: 'Product Discovery Sprint',
          promise:
            'A product idea, a redesign or an internal project to scope — before committing a development budget.',
          price: '$11,000',
          priceMeta: 'fixed price, excl. VAT',
          duration: '3 calendar weeks — fixed start date, fixed end date',
        },
        deliverablesTitle: 'What you get',
        deliverables: [
          {
            title: 'Product scoping',
            text: 'Problem, target users, key journeys, an explicit V1 scope — in, out, later.',
          },
          {
            title: 'Prioritised initial backlog',
            text: 'User stories written with acceptance criteria, split into milestones.',
          },
          {
            title: 'Clickable prototype',
            text: 'The key journeys as a navigable mockup — not code: enough to test the value proposition and align stakeholders.',
          },
          {
            title: 'Architecture recommendation',
            text: 'Stack, hosting, estimated infrastructure costs, identified technical risks.',
          },
          {
            title: 'Firm-price Build proposal',
            text: 'Frozen scope, milestone plan, price. Valid for 60 days.',
          },
        ],
        processTitle: 'How the 3 weeks run',
        process: [
          'Week 1 — immersion and interviews, 3 to 5 people on your side.',
          'Week 2 — scope, backlog, prototype.',
          'Week 3 — prototype iteration, pricing, final session: half a day with the decision-makers.',
        ],
        prerequisitesTitle: 'What we need from you',
        prerequisites: [
          'A decision-maker available 2 hours a week.',
          'Access to the business stakeholders.',
          'Answers within 48 hours during the sprint.',
        ],
        exclusionsTitle: "What's not included",
        exclusions: [
          'No production code, no technical proof of concept — if one is essential to remove a risk, it is priced separately before we start.',
          'No market study, no formal competitive benchmark — we scope the execution, not the business opportunity.',
          'No full design system — the prototype validates the journeys, not the final art direction.',
          'One idea or product per sprint.',
        ],
        faqTitle: 'Fair questions',
        faq: [
          {
            q: 'Why a paid Sprint instead of a free quote?',
            a: 'A free quote on an unscoped product is a polite fiction: either it is inflated to absorb the unknown, or it blows up along the way. The Sprint produces a dossier you own and makes our proposal comparable — including with our competitors.',
          },
          {
            q: 'What if I stop after the Sprint?',
            a: 'You leave with the full dossier — scope, backlog, prototype, architecture recommendation. It is written to be executable by any team, not just ours.',
          },
        ],
        crossLink: {
          text: 'The Sprint ends with a firm-price proposal for the next step.',
          label: 'End-to-end Build',
          href: '/build/',
        },
      },
      build: {
        meta: {
          title: 'End-to-end Build — from $29,000 — NexusInsight',
          description:
            'From frozen scope to production in 6 to 10 weeks: 2-week milestones, a demo at each one, CI/CD, the code yours in full, 4 weeks of corrective warranty. From $29,000 excl. VAT.',
        },
        hero: {
          kicker: '02 · End-to-end Build',
          name: 'End-to-end Build',
          promise:
            'A product built through to production — after a Sprint, or from an existing scoping document precise enough to be priced.',
          price: 'from $29,000',
          priceMeta: 'firm price set by the Sprint, excl. VAT',
          duration: '6 to 10 weeks depending on the frozen scope',
        },
        deliverablesTitle: 'What you get',
        deliverables: [
          {
            title: 'The product in production',
            text: 'Web — and/or iOS depending on scope — deployed on your infrastructure or provisioned for you.',
          },
          {
            title: 'Operational CI/CD',
            text: 'Automated tests, build and deployment — the same chain we use to ship.',
          },
          {
            title: 'The code, your property',
            text: 'Repository transferred, clear licence, no hidden dependency on us.',
          },
          {
            title: 'Handover documentation',
            text: 'Architecture, decisions, production runbook — written for the team that takes over, in-house or hired later.',
          },
          {
            title: '4 weeks of corrective warranty',
            text: 'After go-live, on the delivered scope.',
          },
        ],
        processTitle: 'How it runs',
        process: [
          '2-week milestones, a demo at each milestone, continuous acceptance — you watch the product move, not progress slides.',
        ],
        scopeRule: {
          title: 'The scope is frozen',
          text: 'Every new request goes through a priced amendment within 48 hours — accepted, it shifts the plan accordingly; declined, it goes to the post-V1 backlog. No grey zone. The rule is blunt on both sides: we are not allowed to overrun either.',
        },
        prerequisitesTitle: 'Where it starts from',
        prerequisites: [
          'After a Sprint — recommended — or from an existing scoping document precise enough to be priced, assessed before commitment, free of charge.',
        ],
        exclusionsTitle: "What's not included",
        exclusions: [
          'Content — copy, business visuals — is provided by you, unless the scope says otherwise.',
          'No ongoing maintenance after the warranty — that is what the Delivery package is for.',
          'No takeover of an existing codebase that has not been assessed — an existing codebase gets assessed during the Sprint, not in the middle of the Build.',
          'Infrastructure costs — cloud, third-party services, app stores — are on your account, estimated from the Sprint onwards.',
        ],
        faqTitle: 'Fair questions',
        faq: [
          {
            q: 'What if the scope moves during the Build?',
            a: 'It moves through a priced amendment within 48 hours, or it waits for post-V1. The fixed price only works because the rule is blunt on both sides.',
          },
          {
            q: 'Who owns the code?',
            a: 'You do, in full, upon complete payment. Repository transferred, no hidden dependency on us.',
          },
          {
            q: 'Who actually works on my project?',
            a: 'The founder scopes and builds; identified partners step in depending on the project — never anonymous subcontracting. Whoever did the Sprint does the Build.',
          },
        ],
        crossLink: {
          text: 'After go-live, the product still needs steering.',
          label: 'Product Delivery',
          href: '/delivery/',
        },
      },
      delivery: {
        meta: {
          title: 'Product Delivery — monthly product steering — NexusInsight',
          description:
            'Monthly product steering for your existing dev team: living backlog, facilitated rituals, continuous acceptance. Two intensities, $4,500 or $8,500 per month excl. VAT, cancellable with 30 days’ notice.',
        },
        hero: {
          kicker: '03 · Product Delivery',
          name: 'Product Delivery',
          promise:
            'A dev team exists — in-house, agency or offshore — but the product drifts: fuzzy backlog, shifting priorities, unpredictable delivery. We bring product steering, not extra hands.',
          price: '$4,500 or $8,500 per month',
          priceMeta: 'excl. VAT',
          duration: 'monthly subscription, cancellable with 30 days’ notice',
        },
        tiersTitle: 'Two intensities',
        tiers: [
          {
            name: 'Steering',
            price: '$4,500 per month',
            priceMeta: 'excl. VAT',
            charge: 'about 1 day a week',
            inclusions: [
              'A living, prioritised backlog with acceptance criteria.',
              'Facilitated rituals — planning, review, arbitration points.',
              'Stakeholder interface and a monthly summary for decision-makers.',
              'Acceptance of the team’s deliverables.',
            ],
          },
          {
            name: 'Steering + build',
            price: '$8,500 per month',
            priceMeta: 'excl. VAT',
            charge: 'about 2 days a week',
            inclusions: [
              'A living, prioritised backlog with acceptance criteria.',
              'Facilitated rituals — planning, review, arbitration points.',
              'Stakeholder interface and a monthly summary for decision-makers.',
              'Acceptance of the team’s deliverables.',
              'Direct technical contributions — prototypes, scripts, code reviews, CI/CD debt.',
            ],
          },
        ],
        commitment: {
          title: 'Monthly commitment',
          text: 'Cancellable with 30 days’ notice, on both sides. No annual lock-in — renewal is earned every month.',
        },
        prerequisitesTitle: 'Where it starts from',
        prerequisites: [
          'A dev team already exists — in-house, agency or offshore.',
          'One product to steer — the subscription covers a single product.',
        ],
        exclusionsTitle: "What's not included",
        exclusions: [
          'This is not staffing in disguise: no imposed presence in your offices, no integration into your hierarchy. The rhythm follows deliverables and rituals, not a badge.',
          'No line management of your team — we steer the product, not careers.',
          'One product per subscription.',
        ],
        faqTitle: 'Fair questions',
        faq: [
          {
            q: 'Is this a part-time product manager?',
            a: 'No. The rhythm follows deliverables and rituals, not a number of days on site. The intensity — with or without direct technical contributions — is the only variable.',
          },
          {
            q: 'What if we stop?',
            a: '30 days’ notice, on both sides, no annual lock-in. The backlog, criteria and documentation stay with you.',
          },
        ],
        crossLink: {
          text: 'A product still to scope before steering it?',
          label: 'Product Discovery Sprint',
          href: '/sprint/',
        },
      },
      method: {
        meta: {
          title: 'Method — short milestones, frozen scope, async remote — NexusInsight',
          description:
            'How we ship: 2-week milestones with a demo at each one, continuous acceptance, a 48-hour amendment rule, a stack chosen for minimal cost of ownership, async-friendly remote.',
        },
        hero: {
          kicker: 'Method',
          title: 'Short milestones, a written scope, one clear rule',
          lead: 'The same mechanics on every package: visible progress, a frozen scope, and a stack you can afford to own.',
        },
        milestones: {
          title: 'Two-week milestones',
          text: 'A demo at every milestone, continuous acceptance — you watch the product move, not progress slides.',
        },
        scopeRule: {
          title: 'The 48-hour amendment rule',
          text: 'The contract scope is frozen. Every new request goes through a priced amendment within 48 hours — accepted, it shifts the plan; declined, it goes to the post-V1 backlog. No grey zone.',
        },
        stack: {
          title: 'A stack with minimal cost of ownership',
          text: 'Modern web — TypeScript, Vue or React, Node —, native iOS in Swift when the product justifies it, managed cloud on GCP or Azure. The Sprint’s architecture recommendation is argued with costs included, not a comfort preference.',
        },
        ownership: {
          title: 'The code is yours',
          text: 'In full, upon complete payment. Repository transferred, clear licence, no hidden dependency on us.',
        },
        remote: {
          title: 'Remote and async, US-friendly',
          text: 'Milestones and demos run asynchronously, with one weekly overlap slot between European hours and US East mornings. Fully remote.',
        },
      },
      founder: {
        meta: {
          title: 'Founder — the one who scopes is the one who builds — NexusInsight',
          description:
            'NexusInsight is carried by its founder, Kaan Karabulut, and identified partners activated per project. No fake team — the one who scopes is the one who builds.',
        },
        hero: {
          kicker: 'Founder',
          title: 'The one who scopes is the one who builds',
          lead: 'NexusInsight is carried by its founder, Kaan Karabulut — Product Manager, Tech Ops, developer — and a network of identified partners activated per project.',
        },
        structure: {
          title: 'Structural honesty',
          text: 'We do not pretend to be a 40-person agency. Whoever did the Sprint does the Build; the one who writes the backlog is the one who answers in the committee. “We” stands for responsibility, never for an invented size.',
        },
        factsTitle: 'The facts',
        facts: [
          'Steering a data governance programme (Microsoft Purview) at TotalEnergies since 2023 — more than 80,000 users, around a hundred countries.',
          'Partner at The Node; product owner of Drift.',
          'Builds and runs his own products end to end — scoped, shipped and operated the same way we work for clients.',
        ],
        link: { label: 'kaankarabulut.com', href: 'https://kaankarabulut.com' },
      },
      contact: {
        meta: {
          title: 'Contact — book a call — NexusInsight',
          description:
            'Tell us where your product stands — an idea, a redesign, a team that drifts. One email to the founder: kaan@nexusinsight.io.',
        },
        hero: {
          kicker: 'Contact',
          title: 'Tell us where your product stands',
          lead: 'Two lines are enough — an idea, a redesign, a team that drifts. We come back to you to set up a first call.',
        },
        email: 'kaan@nexusinsight.io',
        ctaLabel: 'Write to kaan@nexusinsight.io',
        note: 'No form here — a direct email to the founder.',
      },
      legal: {
        meta: {
          title: 'Legal notice — NexusInsight',
          description: 'Legal notice of nexusinsight.io — publisher NexusEvo SARL, hosting Google Cloud.',
        },
        title: 'Legal notice',
        tradeName: 'NexusInsight is the trade name of NexusEvo SARL.',
        publisherTitle: 'Publisher',
        publisher: [
          'NexusEvo SARL, share capital of €1,000',
          '45 rue de la Capsulerie, 93170 Bagnolet, France',
          'SIREN 928 581 545 — RCS Bobigny (Trade and Companies Register)',
          'EU VAT number: FR95 928 581 545',
          'Publishing director: Kaan Karabulut',
          'Contact: kaan@nexusinsight.io',
        ],
        hostTitle: 'Hosting',
        host: 'Google Cloud — Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland',
      },
      mvpCost: {
        meta: {
          title: 'How much does an MVP cost in 2026? — NexusInsight',
          description:
            'Between $5,000 and $150,000, depending on who builds it and how the scope is held. The honest breakdown by option — agencies, studios, freelancers, offshore, no-code — including where we sit.',
        },
        hero: {
          kicker: 'Pricing, in the open',
          title: 'How much does an MVP cost in 2026?',
          lead: 'Between $5,000 and $150,000. The spread has less to do with code than with who builds it and whether the scope holds. Here is the honest breakdown, including where we sit.',
        },
        tableTitle: 'The realistic ranges, by option',
        tableHead: { option: 'Who builds it', range: 'Typical range', tradeoff: 'The trade-off nobody prints' },
        rows: [
          {
            option: 'US or UK agency',
            range: '$80,000 – $150,000+',
            tradeoff: 'A full team and real process — you pay for the layers between you and the people building.',
          },
          {
            option: 'EU product studio (us)',
            range: '$25,000 – $60,000',
            tradeoff: 'Senior work at EU cost. Ours starts from $29,000, firm after an $11,000 scoping sprint.',
            us: true,
          },
          {
            option: 'Senior freelancer',
            range: '$15,000 – $50,000',
            tradeoff: 'The cheapest senior path — one person, one point of failure, and the scope discipline is on you.',
          },
          {
            option: 'Offshore team',
            range: '$10,000 – $30,000',
            tradeoff: 'The rate looks low; the management time and rework usually eat the difference.',
          },
          {
            option: 'No-code build',
            range: '$5,000 – $15,000',
            tradeoff: 'Fast to validate an idea. The ceiling and the lock-in show up with traction.',
          },
        ],
        factors: {
          title: 'What actually moves the number',
          text: 'Feature lists don\'t price a product — flows do. The same five questions drive most of the spread:',
          items: [
            'How many user-facing flows (a marketplace is not a landing page with a form)',
            'Auth, payments and third-party integrations — each one is real surface area',
            'Platforms: web only, or iOS too',
            'Admin and back-office, the part everyone forgets to scope',
            'Compliance and data constraints (EU hosting, GDPR, retention)',
          ],
        },
        explode: {
          title: 'What makes budgets explode',
          text: 'Not the daily rate — the unfrozen scope. Specs that grow mid-build without repricing are how a $40,000 project quietly becomes an $80,000 one. It is the reason we freeze scope in writing before the build and quote any change as a 48-hour amendment: brutal on both sides, and the reason the number holds.',
        },
        position: {
          title: 'Where we sit, in plain terms',
          text: 'We are not the cheapest option on this page. Our Build starts from $29,000 and the number does not move once the Sprint has frozen the scope — that is the deal. If the ranges above are the market, our bet is simple: senior work, prices on the page, no surprise in month two.',
          ctaSprint: 'See the Discovery Sprint ($11,000, fixed)',
          ctaBuild: 'See the end-to-end Build (from $29,000)',
        },
        faqTitle: 'Frequent questions',
        faq: [
          {
            q: 'Can I get an MVP for under $10,000?',
            a: 'Yes — with no-code tools and a genuinely narrow scope, or a junior freelancer. You trade robustness, ownership of the code and room to grow. For validating demand before investing, it can be exactly the right call.',
          },
          {
            q: 'Why do agencies quote $100,000+ for the same product?',
            a: 'You are not only paying developers: you fund account managers, project managers, QA layers and the agency\'s own margin structure. That is not a scam — it is a different cost structure, built for clients who need a large team and formal process.',
          },
          {
            q: 'Fixed price or time & materials?',
            a: 'Time & materials moves the risk to you: the meter runs regardless of outcome. A fixed price only works when the scope is frozen in writing first — which is exactly what a paid scoping sprint is for.',
          },
          {
            q: 'How long does an MVP take?',
            a: 'With a frozen scope, 6 to 10 weeks is a realistic build window, with a demo every two weeks. Add 3 weeks upfront for the scoping sprint.',
          },
          {
            q: 'What if my scope changes mid-build?',
            a: 'Changes go through a written amendment quoted within 48 hours — accepted, it shifts the plan; declined, it goes to the post-V1 backlog. No grey zone, in both directions.',
          },
        ],
      },
      notFound: {
        meta: {
          title: 'Page not found — NexusInsight',
          description: 'This page does not exist. Back to the NexusInsight home page.',
        },
        title: 'Page not found',
        text: 'This page does not exist — or not yet.',
        links: {
          en: { label: 'Back to the home page', href: '/' },
          fr: { label: 'Retour à l’accueil', href: '/fr/' },
        },
      },
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
    nav: {
      offers: 'Offres',
      method: 'Méthode',
      founder: 'Fondateur',
      cta: 'Prendre un call',
    },
    footer: {
      company: 'NexusInsight est le nom commercial de NexusEvo SARL',
      legal: 'Mentions légales',
      contact: 'kaan@nexusinsight.io',
      founderSite: 'Site personnel du fondateur',
      guide: 'Combien coûte un MVP ?',
    },
    home: {
      heroFacts: [
        { k: 'Périmètre', v: 'par écrit, gelé' },
        { k: 'Prix', v: 'connu d\'avance', copper: true },
        { k: 'Livrable', v: 'vérifiable' },
        { k: 'Code', v: 'à vous, repo inclus' },
        { k: 'Engagement', v: 'pas de jours facturés' },
      ],
      packagesTitle: 'Trois packages, un mécanisme',
      packages: [
        {
          index: '01',
          name: 'Product Discovery Sprint',
          duration: '3 semaines',
          price: '9 500 €',
          priceMeta: 'prix fixe, HT',
          blurb:
            'Trois semaines pour cadrer un produit : périmètre V1 écrit, backlog priorisé, prototype navigable et proposition de Build à prix ferme.',
          href: '/fr/sprint/',
        },
        {
          index: '02',
          name: 'Build bout en bout',
          duration: '6 à 10 semaines',
          price: 'à partir de 25 000 €',
          priceMeta: 'prix ferme fixé par le Sprint, HT',
          blurb:
            'Votre produit en production : jalons de 2 semaines avec démo à chaque jalon, code transféré, 4 semaines de garantie corrective.',
          href: '/fr/build/',
        },
        {
          index: '03',
          name: 'Product Delivery',
          duration: 'abonnement mensuel, résiliable',
          price: '3 900 € ou 7 500 € par mois',
          priceMeta: 'HT',
          blurb:
            'Le pilotage produit de votre équipe existante : backlog vivant, rituels animés, recette continue. Deux intensités.',
          href: '/fr/delivery/',
        },
      ],
      mechanism: {
        title: 'Le Sprint price le Build',
        stepTitles: ['Le Sprint', 'Périmètre gelé', 'Prix ferme'],
        steps: [
          'Le Sprint — petit, prix fixe, 3 semaines — produit le périmètre écrit, le backlog priorisé et le prototype.',
          'Sur cette base, le Build reçoit une proposition à prix ferme et à périmètre gelé.',
          'Vous pouvez vous arrêter après le Sprint et partir avec tout le dossier — il est fait pour être exécutable par n\'importe quelle équipe, pas seulement la nôtre.',
        ],
        punchline: 'Personne ne signe un gros chiffre à l\'aveugle. Nous non plus.',
      },
      proof: {
        title: 'D\'où ça vient',
        text: 'Notre fondateur pilote un programme de data governance dans un groupe du CAC40 depuis 2023 — plus de 80 000 utilisateurs, une centaine de pays. Celui qui écrit le backlog est celui qui répond en comité.',
        link: { label: 'La page fondateur', href: '/fr/fondateur/' },
      },
      audiencesTitle: 'Pour qui',
      audiences: [
        {
          label: 'Startup / scale-up',
          text: 'Cadrer vite et construire sans risque de périmètre : le Sprint, puis le Build.',
          href: '/fr/sprint/',
        },
        {
          label: 'PME / ETI',
          text: 'Un seul interlocuteur du cadrage à la prod, sans recruter : le Build.',
          href: '/fr/build/',
        },
        {
          label: 'Grand compte / DSI',
          text: 'Un pilotage produit fiable, en abonnement mensuel : le Delivery.',
          href: '/fr/delivery/',
        },
        {
          label: 'US / international',
          text: 'Les trois packages en dollars, 100 % remote, jalons asynchrones — l\'entrée se fait par le Sprint.',
          href: '/fr/sprint/',
        },
      ],
      faqTitle: 'Les questions légitimes',
      faq: [
        {
          q: 'Et si le périmètre bouge en cours de Build ?',
          a: 'Il bouge via un avenant chiffré en 48 h, ou il attend la post-V1. Le prix fixe n\'est possible que parce que cette règle est brutale des deux côtés : nous n\'avons pas le droit de déborder non plus.',
        },
        {
          q: 'Pourquoi un Sprint payant et pas un devis gratuit ?',
          a: 'Un devis gratuit sur un produit non cadré est une fiction polie : soit il est gonflé pour absorber l\'inconnu, soit il explose en cours de route. Le Sprint produit un dossier qui vous appartient et rend notre proposition comparable — y compris avec nos concurrents.',
        },
        {
          q: 'À qui appartient le code ?',
          a: 'À vous, intégralement, au paiement complet. Repo transféré, pas de dépendance cachée.',
        },
        {
          q: 'Qui travaille réellement sur mon projet ?',
          a: 'Le fondateur cadre et construit, des partenaires identifiés interviennent selon les projets — jamais de sous-traitance anonyme. Celui qui a fait le Sprint fait le Build.',
        },
        {
          q: 'Vous êtes trop petits pour un grand compte ?',
          a: 'Pour un programme de 20 personnes, oui. Pour cadrer et piloter un produit, la petite taille est le mécanisme : celui qui écrit le backlog est celui qui répond en comité — zéro perte en ligne. Notre fondateur fait ça dans un groupe du CAC40 depuis 2023.',
        },
      ],
      ctaBand: {
        text: 'Un call pour voir quel package colle à votre situation',
        cta: 'Prendre un call',
      },
    },
    pages: {
      sprint: {
        meta: {
          title: 'Product Discovery Sprint — 9 500 €, 3 semaines — NexusInsight',
          description:
            'Trois semaines pour cadrer un produit : périmètre V1 explicite, backlog priorisé, prototype navigable, recommandation d\'architecture et proposition de Build à prix ferme. 9 500 € fixe, HT.',
        },
        hero: {
          kicker: '01 · Product Discovery Sprint',
          name: 'Product Discovery Sprint',
          promise:
            'Une idée de produit, une refonte ou un projet interne à cadrer — avant d\'engager un budget de développement.',
          price: '9 500 €',
          priceMeta: 'prix fixe, HT',
          duration: '3 semaines calendaires — démarrage à date fixe, fin à date fixe',
        },
        deliverablesTitle: 'Ce que vous recevez',
        deliverables: [
          {
            title: 'Cadrage produit',
            text: 'Problème, utilisateurs cibles, parcours clés, périmètre V1 explicite — dedans, dehors, plus tard.',
          },
          {
            title: 'Backlog initial priorisé',
            text: 'User stories rédigées avec critères d\'acceptation, découpées en jalons.',
          },
          {
            title: 'Prototype navigable',
            text: 'Les parcours clés en maquette cliquable — pas du code : de quoi tester la proposition de valeur et aligner les parties prenantes.',
          },
          {
            title: 'Recommandation d\'architecture',
            text: 'Stack, hébergement, coûts d\'infra estimés, risques techniques identifiés.',
          },
          {
            title: 'Proposition de Build à prix ferme',
            text: 'Périmètre gelé, planning par jalons, prix. Valable 60 jours.',
          },
        ],
        processTitle: 'Le déroulé des 3 semaines',
        process: [
          'Semaine 1 — immersion et entretiens, 3 à 5 interlocuteurs côté client.',
          'Semaine 2 — périmètre, backlog, prototype.',
          'Semaine 3 — itération sur le prototype, chiffrage, restitution : une demi-journée avec les décideurs.',
        ],
        prerequisitesTitle: 'Ce que nous attendons de vous',
        prerequisites: [
          'Un décideur disponible 2 h par semaine.',
          'L\'accès aux interlocuteurs métier.',
          'Une réponse sous 48 h pendant le sprint.',
        ],
        exclusionsTitle: 'Ce qui n\'est pas inclus',
        exclusions: [
          'Pas de code de production ni de POC technique — si un POC est indispensable pour lever un risque, il est chiffré à part avant de commencer.',
          'Pas d\'étude de marché ni de benchmark concurrentiel formel — nous cadrons l\'exécution, pas l\'opportunité business.',
          'Pas de design system complet — le prototype valide les parcours, pas la direction artistique finale.',
          'Une seule idée ou un seul produit par sprint.',
        ],
        faqTitle: 'Les questions légitimes',
        faq: [
          {
            q: 'Pourquoi un Sprint payant et pas un devis gratuit ?',
            a: 'Un devis gratuit sur un produit non cadré est une fiction polie : soit il est gonflé pour absorber l\'inconnu, soit il explose en cours de route. Le Sprint produit un dossier qui vous appartient et rend notre proposition comparable — y compris avec nos concurrents.',
          },
          {
            q: 'Et si je m\'arrête après le Sprint ?',
            a: 'Vous partez avec tout le dossier — périmètre, backlog, prototype, recommandation d\'architecture. Il est fait pour être exécutable par n\'importe quelle équipe, pas seulement la nôtre.',
          },
        ],
        crossLink: {
          text: 'Le Sprint se termine par une proposition à prix ferme pour la suite.',
          label: 'Build bout en bout',
          href: '/fr/build/',
        },
      },
      build: {
        meta: {
          title: 'Build bout en bout — à partir de 25 000 € — NexusInsight',
          description:
            'Du périmètre gelé à la production en 6 à 10 semaines : jalons de 2 semaines, démo à chaque jalon, CI/CD, code intégralement à vous, 4 semaines de garantie corrective. À partir de 25 000 € HT.',
        },
        hero: {
          kicker: '02 · Build bout en bout',
          name: 'Build bout en bout',
          promise:
            'Un produit construit jusqu\'à la mise en production — après un Sprint, ou sur la base d\'un cadrage existant assez précis pour être chiffré.',
          price: 'à partir de 25 000 €',
          priceMeta: 'prix ferme fixé par le Sprint, HT',
          duration: '6 à 10 semaines selon le périmètre gelé',
        },
        deliverablesTitle: 'Ce que vous recevez',
        deliverables: [
          {
            title: 'Le produit en production',
            text: 'Web — et/ou iOS selon le périmètre — déployé sur votre infrastructure ou provisionnée pour vous.',
          },
          {
            title: 'Une CI/CD opérationnelle',
            text: 'Tests, build, déploiement automatisés — la même chaîne que celle que nous utilisons pour livrer.',
          },
          {
            title: 'Le code, votre propriété',
            text: 'Repo transféré, licence claire, aucune dépendance cachée à nous.',
          },
          {
            title: 'Une documentation de reprise',
            text: 'Architecture, décisions, runbook de mise en production — écrite pour l\'équipe qui prendra la suite, interne ou recrutée plus tard.',
          },
          {
            title: '4 semaines de garantie corrective',
            text: 'Après la mise en production, sur le périmètre livré.',
          },
        ],
        processTitle: 'Le déroulé',
        process: [
          'Jalons de 2 semaines, démo à chaque jalon, recette continue — vous voyez le produit avancer, pas des slides d\'avancement.',
        ],
        scopeRule: {
          title: 'Le périmètre est gelé',
          text: 'Toute demande nouvelle passe par un avenant chiffré en 48 h — acceptée, elle décale le planning d\'autant ; refusée, elle va au backlog post-V1. Pas de zone grise. La règle est brutale des deux côtés : nous n\'avons pas le droit de déborder non plus.',
        },
        prerequisitesTitle: 'Le point de départ',
        prerequisites: [
          'Après un Sprint — recommandé — ou sur la base d\'un cadrage existant assez précis pour être chiffré, évalué avant engagement, sans frais.',
        ],
        exclusionsTitle: 'Ce qui n\'est pas inclus',
        exclusions: [
          'Le contenu — textes, visuels métier — est fourni par vous, sauf mention contraire au périmètre.',
          'Pas de maintenance évolutive après la garantie — c\'est le rôle du package Delivery.',
          'Pas de reprise d\'un code existant non évalué — un existant s\'évalue pendant le Sprint, pas au milieu du Build.',
          'Les coûts d\'infrastructure — cloud, services tiers, stores — sont à votre compte, estimés dès le Sprint.',
        ],
        faqTitle: 'Les questions légitimes',
        faq: [
          {
            q: 'Et si le périmètre bouge en cours de Build ?',
            a: 'Il bouge via un avenant chiffré en 48 h, ou il attend la post-V1. Le prix fixe n\'est possible que parce que la règle est brutale des deux côtés.',
          },
          {
            q: 'À qui appartient le code ?',
            a: 'À vous, intégralement, au paiement complet. Repo transféré, pas de dépendance cachée.',
          },
          {
            q: 'Qui travaille réellement sur mon projet ?',
            a: 'Le fondateur cadre et construit, des partenaires identifiés interviennent selon les projets — jamais de sous-traitance anonyme. Celui qui a fait le Sprint fait le Build.',
          },
        ],
        crossLink: {
          text: 'Après la mise en production, le produit a encore besoin d\'un pilotage.',
          label: 'Product Delivery',
          href: '/fr/delivery/',
        },
      },
      delivery: {
        meta: {
          title: 'Product Delivery — pilotage produit mensuel — NexusInsight',
          description:
            'Le pilotage produit mensuel de votre équipe de dev existante : backlog vivant, rituels animés, recette continue. Deux intensités, 3 900 € ou 7 500 € par mois HT, résiliable avec 30 jours de préavis.',
        },
        hero: {
          kicker: '03 · Product Delivery',
          name: 'Product Delivery',
          promise:
            'Une équipe de dev existe — interne, ESN ou offshore — mais le produit n\'avance pas droit : backlog flou, priorités qui bougent, delivery imprévisible. Nous apportons le pilotage produit, pas des bras en plus.',
          price: '3 900 € ou 7 500 € par mois',
          priceMeta: 'HT',
          duration: 'abonnement mensuel, résiliable avec 30 jours de préavis',
        },
        tiersTitle: 'Deux intensités',
        tiers: [
          {
            name: 'Pilotage',
            price: '3 900 € par mois',
            priceMeta: 'HT',
            charge: 'environ 1 jour par semaine',
            inclusions: [
              'Un backlog vivant, priorisé, avec critères d\'acceptation.',
              'Des rituels animés — planning, review, points d\'arbitrage.',
              'L\'interface avec les parties prenantes et une synthèse décideurs mensuelle.',
              'La recette des livrables de l\'équipe.',
            ],
          },
          {
            name: 'Pilotage + build',
            price: '7 500 € par mois',
            priceMeta: 'HT',
            charge: 'environ 2 jours par semaine',
            inclusions: [
              'Un backlog vivant, priorisé, avec critères d\'acceptation.',
              'Des rituels animés — planning, review, points d\'arbitrage.',
              'L\'interface avec les parties prenantes et une synthèse décideurs mensuelle.',
              'La recette des livrables de l\'équipe.',
              'Des contributions techniques directes — prototypes, scripts, revues de code, dette CI/CD.',
            ],
          },
        ],
        commitment: {
          title: 'Un engagement mensuel',
          text: 'Résiliable avec 30 jours de préavis, des deux côtés. Pas d\'engagement annuel — la reconduction se gagne chaque mois.',
        },
        prerequisitesTitle: 'Le point de départ',
        prerequisites: [
          'Une équipe de dev existe déjà — interne, ESN ou offshore.',
          'Un produit à piloter — l\'abonnement couvre un seul produit.',
        ],
        exclusionsTitle: 'Ce qui n\'est pas inclus',
        exclusions: [
          'Ce n\'est pas de la régie déguisée : pas de présence imposée dans vos locaux, pas d\'intégration à votre hiérarchie. Le rythme se cale sur les livrables et les rituels, pas sur un badge.',
          'Pas de management hiérarchique de votre équipe — nous pilotons le produit, pas les carrières.',
          'Un seul produit par abonnement.',
        ],
        faqTitle: 'Les questions légitimes',
        faq: [
          {
            q: 'Est-ce un product manager à temps partiel ?',
            a: 'Non. Le rythme se cale sur les livrables et les rituels, pas sur un nombre de jours de présence. L\'intensité — avec ou sans contributions techniques directes — est la seule variable.',
          },
          {
            q: 'Et si nous arrêtons ?',
            a: '30 jours de préavis, des deux côtés, pas d\'engagement annuel. Le backlog, les critères et la documentation restent chez vous.',
          },
        ],
        crossLink: {
          text: 'Un produit encore à cadrer avant de le piloter ?',
          label: 'Product Discovery Sprint',
          href: '/fr/sprint/',
        },
      },
      method: {
        meta: {
          title: 'Méthode — jalons courts, périmètre gelé, remote async — NexusInsight',
          description:
            'Comment nous livrons : jalons de 2 semaines avec démo à chaque jalon, recette continue, règle d\'avenant en 48 h, stack choisie pour un coût de possession minimal, remote compatible async.',
        },
        hero: {
          kicker: 'Méthode',
          title: 'Des jalons courts, un périmètre écrit, une règle claire',
          lead: 'La même mécanique sur tous les packages : un avancement visible, un périmètre gelé, et une stack que vous pouvez vous permettre de posséder.',
        },
        milestones: {
          title: 'Des jalons de 2 semaines',
          text: 'Une démo à chaque jalon, une recette continue — vous voyez le produit avancer, pas des slides d\'avancement.',
        },
        scopeRule: {
          title: 'La règle d\'avenant en 48 h',
          text: 'Le périmètre du contrat est gelé. Toute demande nouvelle passe par un avenant chiffré en 48 h — acceptée, elle décale le planning ; refusée, elle va au backlog post-V1. Pas de zone grise.',
        },
        stack: {
          title: 'Une stack au coût de possession minimal',
          text: 'Web moderne — TypeScript, Vue ou React, Node —, iOS natif en Swift quand le produit le justifie, cloud managé sur GCP ou Azure. La recommandation d\'architecture du Sprint est argumentée coûts inclus, pas une préférence de confort.',
        },
        ownership: {
          title: 'Le code vous appartient',
          text: 'Intégralement, au paiement complet. Repo transféré, licence claire, aucune dépendance cachée à nous.',
        },
        remote: {
          title: 'Remote et async, compatible US',
          text: 'Les jalons et les démos se déroulent en asynchrone, avec un créneau de recouvrement hebdomadaire entre les horaires européens et les matinées US East. 100 % remote.',
        },
      },
      founder: {
        meta: {
          title: 'Fondateur — celui qui cadre est celui qui construit — NexusInsight',
          description:
            'NexusInsight est porté par son fondateur, Kaan Karabulut, et des partenaires identifiés activés selon les projets. Pas de fausse équipe — celui qui cadre est celui qui construit.',
        },
        hero: {
          kicker: 'Fondateur',
          title: 'Celui qui cadre est celui qui construit',
          lead: 'NexusInsight est porté par son fondateur, Kaan Karabulut — Product Manager, Tech Ops, développeur — et un réseau de partenaires identifiés, activés selon les projets.',
        },
        structure: {
          title: 'L\'honnêteté structurelle',
          text: 'Nous ne prétendons pas être une agence de 40 personnes. Celui qui a fait le Sprint fait le Build ; celui qui écrit le backlog est celui qui répond en comité. Le « nous » dit la responsabilité, jamais une taille inventée.',
        },
        factsTitle: 'Les faits',
        facts: [
          'Pilote un programme de data governance (Microsoft Purview) chez TotalEnergies depuis 2023 — plus de 80 000 utilisateurs, une centaine de pays.',
          'Associé chez The Node ; product owner de Drift.',
          'Construit et opère ses propres produits de bout en bout — cadrés, livrés et maintenus comme nous travaillons pour nos clients.',
        ],
        link: { label: 'kaankarabulut.com', href: 'https://kaankarabulut.com' },
      },
      contact: {
        meta: {
          title: 'Contact — prendre un call — NexusInsight',
          description:
            'Dites-nous où en est votre produit — une idée, une refonte, une équipe qui patine. Un mail au fondateur : kaan@nexusinsight.io.',
        },
        hero: {
          kicker: 'Contact',
          title: 'Dites-nous où en est votre produit',
          lead: 'Deux lignes suffisent — une idée, une refonte, une équipe qui patine. Nous revenons vers vous pour caler un premier call.',
        },
        email: 'kaan@nexusinsight.io',
        ctaLabel: 'Écrire à kaan@nexusinsight.io',
        note: 'Pas de formulaire ici — un mail direct au fondateur.',
      },
      legal: {
        meta: {
          title: 'Mentions légales — NexusInsight',
          description: 'Mentions légales de nexusinsight.io — éditeur NexusEvo SARL, hébergement Google Cloud.',
        },
        title: 'Mentions légales',
        tradeName: 'NexusInsight est le nom commercial de NexusEvo SARL.',
        publisherTitle: 'Éditeur',
        publisher: [
          'NexusEvo SARL, au capital de 1 000 €',
          '45 rue de la Capsulerie, 93170 Bagnolet, France',
          'SIREN 928 581 545 — RCS Bobigny',
          'TVA intracommunautaire : FR95 928 581 545',
          'Directeur de la publication : Kaan Karabulut',
          'Contact : kaan@nexusinsight.io',
        ],
        hostTitle: 'Hébergeur',
        host: 'Google Cloud — Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande',
      },
      mvpCost: {
        meta: {
          title: 'Combien coûte un MVP en 2026 ? — NexusInsight',
          description:
            'Entre 5 000 € et 130 000 €, selon qui le construit et si le périmètre tient. La décomposition honnête par option — agences, studios, freelances, offshore, no-code — avec notre position.',
        },
        hero: {
          kicker: 'Les prix, à découvert',
          title: 'Combien coûte un MVP en 2026 ?',
          lead: 'Entre 5 000 € et 130 000 €. L\'écart tient moins au code qu\'à qui construit — et à la tenue du périmètre. Voici la décomposition honnête, avec notre position dedans.',
        },
        tableTitle: 'Les fourchettes réalistes, par option',
        tableHead: { option: 'Qui construit', range: 'Fourchette typique', tradeoff: 'Le compromis qu\'on n\'imprime jamais' },
        rows: [
          {
            option: 'Agence (FR/UK/US)',
            range: '60 000 € – 130 000 €+',
            tradeoff: 'Une vraie équipe et un vrai process — on paie les étages entre soi et les gens qui construisent.',
          },
          {
            option: 'Studio produit européen (nous)',
            range: '25 000 € – 55 000 €',
            tradeoff: 'Du travail senior au coût européen. Chez nous : à partir de 25 000 €, prix ferme après un sprint de cadrage à 9 500 €.',
            us: true,
          },
          {
            option: 'Freelance senior',
            range: '12 000 € – 45 000 €',
            tradeoff: 'Le chemin senior le moins cher — une personne, un point de défaillance unique, et la discipline de périmètre repose sur vous.',
          },
          {
            option: 'Équipe offshore',
            range: '8 000 € – 25 000 €',
            tradeoff: 'Le tarif paraît bas ; le temps de pilotage et les reprises mangent souvent la différence.',
          },
          {
            option: 'Build no-code',
            range: '5 000 € – 12 000 €',
            tradeoff: 'Rapide pour valider une idée. Le plafond et la dépendance à l\'outil apparaissent avec la traction.',
          },
        ],
        factors: {
          title: 'Ce qui fait vraiment bouger le chiffre',
          text: 'Une liste de features ne price pas un produit — les parcours, si. Les mêmes cinq questions expliquent l\'essentiel de l\'écart :',
          items: [
            'Le nombre de parcours utilisateur (une marketplace n\'est pas une landing avec un formulaire)',
            'Auth, paiements, intégrations tierces — chacune est une vraie surface de travail',
            'Les plateformes : web seul, ou iOS aussi',
            'L\'admin et le back-office, la partie que tout le monde oublie de cadrer',
            'Conformité et contraintes de données (hébergement UE, RGPD, rétention)',
          ],
        },
        explode: {
          title: 'Ce qui fait exploser les budgets',
          text: 'Pas le taux journalier — le périmètre non gelé. Des specs qui grossissent en cours de build sans re-chiffrage : c\'est comme ça qu\'un projet à 35 000 € devient discrètement un projet à 70 000 €. C\'est la raison pour laquelle nous gelons le périmètre par écrit avant le build et chiffrons tout changement en avenant sous 48 h : brutal des deux côtés, et c\'est ce qui fait tenir le chiffre.',
        },
        position: {
          title: 'Notre position, sans détour',
          text: 'Nous ne sommes pas l\'option la moins chère de cette page. Notre Build démarre à 25 000 € et le chiffre ne bouge plus une fois le périmètre gelé par le Sprint — c\'est le contrat. Si les fourchettes ci-dessus sont le marché, notre pari est simple : du travail senior, les prix affichés, zéro surprise au deuxième mois.',
          ctaSprint: 'Voir le Discovery Sprint (9 500 €, prix fixe)',
          ctaBuild: 'Voir le Build bout en bout (à partir de 25 000 €)',
        },
        faqTitle: 'Questions fréquentes',
        faq: [
          {
            q: 'Peut-on avoir un MVP à moins de 10 000 € ?',
            a: 'Oui — avec du no-code et un périmètre vraiment étroit, ou un freelance junior. On y échange la robustesse, la propriété du code et la marge de croissance. Pour valider une demande avant d\'investir, c\'est parfois exactement le bon choix.',
          },
          {
            q: 'Pourquoi les agences chiffrent-elles 100 000 €+ pour le même produit ?',
            a: 'On n\'y paie pas que des développeurs : on finance les account managers, les chefs de projet, les couches de QA et la structure de marge de l\'agence. Ce n\'est pas une arnaque — c\'est une autre structure de coûts, faite pour des clients qui ont besoin d\'une grande équipe et d\'un process formel.',
          },
          {
            q: 'Prix fixe ou régie ?',
            a: 'La régie déplace le risque vers vous : le compteur tourne quel que soit le résultat. Un prix fixe ne fonctionne que si le périmètre est d\'abord gelé par écrit — c\'est exactement à ça que sert un sprint de cadrage payant.',
          },
          {
            q: 'Combien de temps prend un MVP ?',
            a: 'Avec un périmètre gelé, 6 à 10 semaines de build sont réalistes, avec une démo toutes les deux semaines. Ajoutez 3 semaines en amont pour le sprint de cadrage.',
          },
          {
            q: 'Et si mon périmètre change en cours de build ?',
            a: 'Tout changement passe par un avenant écrit chiffré sous 48 h — accepté, il décale le plan ; refusé, il va au backlog post-V1. Pas de zone grise, dans les deux sens.',
          },
        ],
      },
      notFound: {
        meta: {
          title: 'Page introuvable — NexusInsight',
          description: 'Cette page n\'existe pas. Retour à l\'accueil de NexusInsight.',
        },
        title: 'Page introuvable',
        text: 'Cette page n\'existe pas — ou pas encore.',
        links: {
          en: { label: 'Back to the home page', href: '/' },
          fr: { label: 'Retour à l’accueil', href: '/fr/' },
        },
      },
    },
  },
};
