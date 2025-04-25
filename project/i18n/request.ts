import { NextRequest } from 'next/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import config from './config';

export const locales = ['en', 'fr', 'el'] as const;
export const defaultLocale = 'fr' as const;

export const pathnames = {
  '/': '/',
  '/villa': '/villa',
  '/about': '/about',
  '/contact': '/contact'
} as const;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ 
  locales: config.locales 
}); 