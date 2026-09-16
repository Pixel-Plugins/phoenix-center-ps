/* Content for the Services LISTING page. Per-service detail content
   (hero statement, 8-step process, examples) lives in the `services`
   content collection, src/content/services/*.md. */

export const servicesListing = {
  eyebrow: { en: 'What We Do', ar: 'ماذا نقدم' },
  title: { en: 'Services', ar: 'خدماتنا' },
  intro: {
    en: 'At Phoenix Research Center, our commitment lies in driving meaningful transformation and progress within society. Rooted in a foundation of expertise, innovation, and collaboration, our comprehensive services pave the way for positive societal change. With a steadfast focus on Research and Development, Policy Advocacy, and Training and Capacity Building, we are dedicated to shaping a brighter future.',
    ar: 'في مركز فينيق للأبحاث، يكمن التزامنا في قيادة تحول حقيقي وتقدم داخل المجتمع. انطلاقاً من أساس راسخ من الخبرة والابتكار والتعاون، تمهد خدماتنا الشاملة الطريق نحو تغيير مجتمعي إيجابي. وبتركيز ثابت على البحث والتطوير، ودراسة السياسات، والتدريب وبناء القدرات، نحن ملتزمون برسم ملامح مستقبل أكثر إشراقاً.',
  },
  /* Real quote from the live /services/ page (also appears, in a
     differently-worded Arabic translation, as the About page's Vision
     quote — the live site itself isn't consistent between pages here, so
     this keeps the exact wording as it appears on THIS page). */
  missionQuote: {
    en: 'We strive to achieve political, economic and social resilience to empower Palestinian communities with human rights and dignity',
    ar: 'نحن نسعى جاهدين لتحقيق المرونة السياسية والاقتصادية والاجتماعية لتمكين المجتمعات الفلسطينية وتمتعها بحقوق الإنسان والكرامة',
  },
  contactCta: { en: 'Contact us', ar: 'للتواصل' },
  whyChoose: {
    /* Real text from the live /services/ page. */
    title: { en: 'Why Choose Phoenix', ar: 'لماذا تختار فينيق' },
    intro: {
      en: 'Choose Phoenix and become a partner in shaping a brighter, more equitable future.',
      ar: 'اختر فينيق وكن شريكًا في تشكيل مستقبل أكثر إشراقًا وإنصافًا.',
    },
    items: [
      {
        title: { en: 'Expertise in Innovation', ar: 'الابتكار' },
        desc: {
          en: 'Our relentless pursuit of innovative solutions, backed by data and collaboration, sets us apart as change catalysts.',
          ar: 'إن سعينا الدؤوب لإيجاد حلول مبتكرة، مدعومة بالبيانات والتعاون، يميزنا كمحفزين للتغيير.',
        },
      },
      {
        title: { en: 'Impactful Advocacy', ar: 'الدراسة' },
        desc: {
          en: 'We drive tangible change through strategic policy reforms, fueled by research, education, and effective collaboration.',
          ar: 'نحن نقود التغيير الملموس من خلال إصلاحات السياسات الاستراتيجية، التي يغذيها البحث والتعليم والتعاون الفعال.',
        },
      },
      {
        title: { en: 'Empowerment Through Learning', ar: 'التمكين' },
        desc: {
          en: 'Our tailored training programs empower individuals and teams to excel, innovate, and lead with confidence.',
          ar: 'تعمل برامجنا التدريبية المصممة خصيصًا على تمكين الأفراد والفرق من التفوق والابتكار والقيادة بثقة.',
        },
      },
      {
        title: { en: 'Holistic Approach', ar: 'نهج شمولي' },
        desc: {
          en: 'Offering comprehensive services that span Research and Development, Policy Advocacy, and Training—providing a one-stop solution for societal progress.',
          ar: 'تقديم خدمات شاملة من البحث والتطوير، دراسة السياسات، التدريب وبناء القدرات - مما يوفر حلاً شاملاً للتقدم المجتمعي.',
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
