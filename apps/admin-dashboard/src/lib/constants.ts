// Add Vite env type declaration
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_ENABLED: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// API URL for backend services
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Authentication settings
export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === 'true';

// Application settings
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Dominion City ERP Admin';

// Other constants
export const APP_NAME = 'DC ERP';
export const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} DC ERP. All rights reserved.`;

// Default pagination settings
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

// Date format
export const DEFAULT_DATE_FORMAT = 'MMMM d, yyyy';
export const DEFAULT_TIME_FORMAT = 'h:mm a';
export const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;

// Route paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MEMBERS: '/members',
  CHURCHES: '/churches',
  EVENTS: '/events',
  FINANCE: '/finance',
  MEDIA: '/media',
  SETTINGS: '/settings',
  UNAUTHORIZED: '/unauthorized',
};

// Timeout durations
export const TOAST_TIMEOUT = 5000;
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Sidebar navigation items
export const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'layout-dashboard',
  },
  {
    title: 'Members',
    path: '/members',
    icon: 'users',
  },
  {
    title: 'Churches',
    path: '/churches',
    icon: 'church',
  },
  {
    title: 'Finance',
    path: '/finance',
    icon: 'dollar-sign',
  },
  {
    title: 'Events',
    path: '/events',
    icon: 'calendar',
  },
  {
    title: 'Media',
    path: '/media',
    icon: 'image',
  },
]; 