export const navLinks = [
  { href: '/services/', labelKey: 'nav.services' },
  { href: '/about-us/', labelKey: 'nav.about' },
  { href: '/projects/', labelKey: 'nav.projects' },
  { href: '/publications/', labelKey: 'nav.publications' },
  { href: '/contact/', labelKey: 'nav.contact' },
] as const;

export const serviceLinks = [
  {
    href: '/services/research-and-development/',
    title: { en: 'Research & Field Studies', ar: 'الأبحاث والدراسات الميدانية' },
    blurb: {
      en: 'Rigorous policy papers, case assessments, and field research grounded in real community data.',
      ar: 'أوراق سياسات وتقييمات حالة وأبحاث ميدانية دقيقة مبنية على بيانات مجتمعية حقيقية.',
    },
  },
  {
    href: '/services/policy-advocacy/',
    title: { en: 'Policy Advocacy', ar: 'مناصرة السياسات' },
    blurb: {
      en: 'Evidence translated into policy briefs that decision-makers actually use.',
      ar: 'أدلة تُترجم إلى أوراق سياسات يستخدمها صناع القرار فعلياً.',
    },
  },
  {
    href: '/services/training-and-capacity-building/',
    title: { en: 'Training & Capacity Building', ar: 'التدريب وبناء القدرات' },
    blurb: {
      en: 'Tailored programs that grow lasting local institutional capacity.',
      ar: 'برامج مصممة خصيصاً لبناء قدرات مؤسسية محلية مستدامة.',
    },
  },
] as const;
