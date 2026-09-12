/* Content for the Services LISTING page. Per-service detail content
   (hero statement, 8-step process, examples) lives in the `services`
   content collection, src/content/services/*.md. */

export const servicesListing = {
  eyebrow: { en: 'What We Do', ar: 'ماذا نقدم' },
  title: { en: 'Services', ar: 'خدماتنا' },
  intro: {
    en: 'Phoenix Center partners with UN agencies, INGOs, donors, and ministries to deliver rigorous research, effective policy advocacy, and lasting institutional capacity across Gaza and the West Bank.',
    ar: 'يعمل مركز فينيكس مع وكالات أممية ومنظمات دولية وجهات مانحة ووزارات لتقديم أبحاث دقيقة، ومناصرة فعّالة للسياسات، وبناء قدرات مؤسسية مستدامة في غزة والضفة الغربية.',
  },
  whyChoose: {
    title: { en: 'Why Choose Phoenix', ar: 'لماذا تختار فينيكس' },
    items: [
      {
        title: { en: 'Expertise in Innovation', ar: 'خبرة في الابتكار' },
        desc: {
          en: 'Methodologies that adapt to hard-to-reach, fast-changing field conditions.',
          ar: 'منهجيات تتكيف مع الظروف الميدانية صعبة الوصول والمتغيرة بسرعة.',
        },
      },
      {
        title: { en: 'Impactful Advocacy', ar: 'مناصرة ذات أثر' },
        desc: {
          en: 'Evidence translated into policy briefs decision-makers actually use.',
          ar: 'أدلة تُترجم إلى أوراق سياسات يستخدمها صناع القرار فعلياً.',
        },
      },
      {
        title: { en: 'Empowerment Through Learning', ar: 'التمكين من خلال التعلم' },
        desc: {
          en: 'Training programs that build lasting local institutional capacity.',
          ar: 'برامج تدريبية تبني قدرات مؤسسية محلية مستدامة.',
        },
      },
      {
        title: { en: 'Holistic Approach', ar: 'نهج شامل' },
        desc: {
          en: 'Research, advocacy, and capacity building working together, not in isolation.',
          ar: 'البحث والمناصرة وبناء القدرات تعمل معاً وليس بمعزل عن بعضها.',
        },
      },
    ],
  },
};

/** The 8-step process titles are shared across all three services so they
 *  aren't retyped per file; each service.md only supplies per-step descriptions. */
export const sharedProcessStepTitles = [
  { en: 'Needs Assessment', ar: 'تقييم الاحتياجات' },
  { en: 'Partner Identification', ar: 'تحديد الشركاء' },
  { en: 'Scope Definition', ar: 'تحديد النطاق' },
  { en: 'Collaborative Research Plan', ar: 'خطة بحث تشاركية' },
  { en: 'Solution Delivery', ar: 'تنفيذ الحلول' },
  { en: 'Impact Assessment', ar: 'تقييم الأثر' },
  { en: 'Knowledge Transfer', ar: 'نقل المعرفة' },
  { en: 'Long-term Collaboration', ar: 'تعاون طويل الأمد' },
] as const;
