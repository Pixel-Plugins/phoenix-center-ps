import icon from '../assets/brand/icon.png';
import logoDark from '../assets/brand/logo-dark.png';
import logoLight from '../assets/brand/logo-light.png';

/** Centralized brand asset paths — swap these three files and nothing else touches. */
export const brand = {
  icon,
  /** Navy wordmark, for light backgrounds (header, footer-light contexts). */
  logoDark,
  /** White/gold wordmark, for dark backgrounds (navy footer, navy sections). */
  logoLight,
};

export const siteConfig = {
  name: 'Phoenix Center',
  url: 'https://phoenix-center.ps',
  email: 'info@phoenix-center.ps',
  phone: '+970 8 282 2506',
  address: {
    en: 'Abu Shaaban Building, Institutions St., Gaza, Palestine',
    ar: 'مبنى أبو شعبان، شارع المؤسسات، غزة، فلسطين',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100079550763081',
    instagram: 'https://www.instagram.com/phoenix.center2022/',
    twitter: 'https://twitter.com/phoenixcenter01',
  },
  formspreeFormId: 'meaqbagn',
  ga4MeasurementId: 'G-MLT2BMX78R',
} as const;

export const publicationCategoryLabels: Record<string, { en: string; ar: string }> = {
  'political-papers': { en: 'Political Papers', ar: 'أوراق سياسية' },
  'case-assessment': { en: 'Case Assessment', ar: 'تقييم حالة' },
  seminars: { en: 'Seminars', ar: 'ندوات' },
  'fact-sheets': { en: 'Fact Sheets', ar: 'أوراق حقائق' },
  'research-field-studies': { en: 'Research & Field Studies', ar: 'أبحاث ودراسات ميدانية' },
};

export const publicationsPageSize = 12;

export const projectActivitiesHeading = { en: 'Activities', ar: 'الأنشطة' };
