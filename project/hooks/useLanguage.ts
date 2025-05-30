import { useTranslations } from 'next-intl';

export function useLanguage() {
  const t = useTranslations();
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const tVilla = useTranslations('villa');
  const tGallery = useTranslations('gallery');
  const tContact = useTranslations('contact');
  const tInfo = useTranslations('info');
  const tDiscover = useTranslations('discover');

  return {
    t,
    tCommon,
    tHome,
    tVilla,
    tGallery,
    tContact,
    tInfo,
    tDiscover
  };
} 