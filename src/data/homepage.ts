/* Homepage-only content. Anything marked verified:false is a PLACEHOLDER
   carried over from the Claude Design mockup — confirm with the client
   before launch, do not present as real. */

export const hero = {
  eyebrow: {
    en: 'Independent Palestinian Non-Profit Institution for Research & Field Studies',
    ar: 'مؤسسة فلسطينية مستقلة غير ربحية للأبحاث والدراسات الميدانية',
  },
  title: {
    en: 'Empowering Positive Change Through Independent Research and Policy Advocacy',
    ar: 'تمكين التغيير الإيجابي من خلال البحث المستقل ومناصرة السياسات',
  },
  body: {
    en: 'Phoenix Center converts rigorous quantitative and qualitative data into real action — through field studies, policy analysis, and on-ground data collection across Gaza and the West Bank.',
    ar: 'يحوّل مركز فينيق البيانات الكمية والنوعية الدقيقة إلى عمل حقيقي — عبر الدراسات الميدانية وتحليل السياسات وجمع البيانات الميدانية في غزة والضفة الغربية.',
  },
  cta1: { en: 'Explore Our Research', ar: 'استكشف أبحاثنا' },
  cta2: { en: 'Partner With Us', ar: 'كن شريكاً لنا' },
};

export const stats = {
  verified: false,
  items: [
    { target: 14, suffix: '+', label: { en: 'Years of Impact', ar: 'سنوات من الأثر' } },
    { target: 180, suffix: '+', label: { en: 'Studies & Assessments Published', ar: 'دراسة وتقييم منشور' } },
    { target: 65000, suffix: '+', label: { en: 'Households & Individuals Surveyed', ar: 'أسرة وفرد شملهم المسح' } },
    { target: 30, suffix: '+', label: { en: 'Local & International Partners', ar: 'شريك محلي ودولي' } },
  ],
};

export const enumeratorStat = { verified: false, value: '120+' };

export const pillars = {
  eyebrow: { en: 'What We Do', ar: 'ماذا نقدم' },
  title: { en: 'Three Capabilities, One Mission', ar: 'ثلاث قدرات، رسالة واحدة' },
  subtitle: {
    en: 'From policy papers to on-ground surveys and institutional training, we turn evidence into impact.',
    ar: 'من أوراق السياسات إلى المسوحات الميدانية والتدريب المؤسسي، نحوّل الأدلة إلى أثر.',
  },
  /* These three map 1:1 to the site's actual 3 services
     (src/content/services/*.md) — kept in sync deliberately so the
     homepage never describes a capability that isn't a real service page. */
  items: [
    {
      icon: 'search',
      href: '/services/research-and-development/',
      title: { en: 'Research & Field Studies', ar: 'الأبحاث والدراسات الميدانية' },
      desc: {
        en: 'Rigorous policy papers, case assessments, and field research grounded in real community data — our core discipline for 14+ years.',
        ar: 'أوراق سياسات وتقييمات حالة وأبحاث ميدانية دقيقة مبنية على بيانات مجتمعية حقيقية — تخصصنا الأساسي منذ أكثر من 14 عاماً.',
      },
      tags: {
        en: ['Policy Papers', 'Case Assessments', 'Political Analysis'],
        ar: ['أوراق سياسات', 'تقييمات حالة', 'تحليل سياسي'],
      },
    },
    {
      icon: 'document',
      href: '/services/policy-advocacy/',
      title: { en: 'Policy Advocacy', ar: 'مناصرة السياسات' },
      desc: {
        en: 'Evidence translated into policy briefs that decision-makers actually use.',
        ar: 'أدلة تُترجم إلى أوراق سياسات يستخدمها صناع القرار فعلياً.',
      },
    },
    {
      icon: 'people',
      href: '/services/training-and-capacity-building/',
      title: { en: 'Training & Capacity Building', ar: 'التدريب وبناء القدرات' },
      desc: {
        en: 'Tailored development programs delivered with international organizations to grow local institutional capacity.',
        ar: 'برامج تنموية مصممة بالشراكة مع منظمات دولية لتعزيز القدرات المؤسسية المحلية.',
      },
    },
  ],
};

export const approach = {
  eyebrow: { en: 'Our Approach', ar: 'منهجيتنا' },
  title: {
    en: 'Built for Organizations That Need Reliable Data on the Ground',
    ar: 'مصمَّمون للمؤسسات التي تحتاج بيانات ميدانية موثوقة',
  },
  body: {
    en: 'We work with UN agencies, INGOs, donors, and ministries who need credible monitoring, evaluation, and research capacity in hard-to-reach communities.',
    ar: 'نعمل مع وكالات أممية ومنظمات دولية وجهات مانحة ووزارات تحتاج قدرات رصد وتقييم وبحث موثوقة في المجتمعات صعبة الوصول.',
  },
  badgeLabel: { en: 'Trained field enumerators', ar: 'باحث ميداني مدرّب' },
  items: [
    { en: 'On-ground enumerator teams across Gaza & the West Bank', ar: 'فرق ميدانية منتشرة في غزة والضفة الغربية' },
    { en: 'Mixed-methods design: surveys, interviews & focus groups', ar: 'منهجية مختلطة: مسوحات ومقابلات ومجموعات نقاش' },
    { en: 'Rapid deployment for time-sensitive assessments', ar: 'انتشار سريع للتقييمات الحساسة للوقت' },
    { en: 'Data quality assurance & real-time monitoring', ar: 'ضمان جودة البيانات والرصد اللحظي' },
    { en: 'Bilingual reporting for donors and local stakeholders', ar: 'تقارير ثنائية اللغة للمانحين وأصحاب المصلحة المحليين' },
  ],
};

export const testimonials = {
  verified: false,
  eyebrow: { en: 'Testimonials', ar: 'آراء الشركاء' },
  title: { en: 'Trusted by Our Partners', ar: 'موثوقون من شركائنا' },
  items: [
    {
      quote: {
        en: "Phoenix Center's field teams delivered high-quality household survey data across Gaza under extremely difficult conditions.",
        ar: 'قدمت فرق مركز فينيق الميدانية بيانات مسح أسري عالية الجودة في غزة في ظل ظروف بالغة الصعوبة.',
      },
      name: 'M&E Lead',
      org: { en: 'International NGO Partner', ar: 'شريك منظمة دولية' },
    },
    {
      quote: {
        en: 'Their policy analysis is essential reading for anyone tracking the post-war political landscape.',
        ar: 'تحليلاتهم السياسية قراءة أساسية لكل من يتابع المشهد السياسي بعد الحرب.',
      },
      name: 'Program Officer',
      org: { en: 'Donor Agency', ar: 'جهة مانحة' },
    },
  ],
};

export const newsletter = {
  eyebrow: { en: 'Stay Informed', ar: 'ابقَ مطلعاً' },
  title: { en: 'Get Our Research in Your Inbox', ar: 'احصل على أبحاثنا في بريدك' },
  body: {
    en: 'Subscribe for new publications, field study releases, and policy briefs from Phoenix Center.',
    ar: 'اشترك لتصلك الإصدارات الجديدة والدراسات الميدانية وأوراق السياسات من مركز فينيق.',
  },
  placeholder: { en: 'Your email address', ar: 'بريدك الإلكتروني' },
  button: { en: 'Subscribe', ar: 'اشترك' },
  success: {
    en: 'Thank you — please check your inbox to confirm.',
    ar: 'شكراً لك — يرجى التحقق من بريدك لتأكيد الاشتراك.',
  },
};
