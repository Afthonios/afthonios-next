import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Exporte analog zu Next.js APIs
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);