import { createClient as createBrowserSupabase } from './supabase/client';

export const ADMIN_COOKIE_NAME = 'cozly_admin_session';

export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  // Check cookie or localStorage
  const localAuth = localStorage.getItem('cozly_admin_authenticated');
  return localAuth === 'true';
}

export function setAdminAuthenticated(status: boolean, userEmail: string = 'admin@cozly.in') {
  if (typeof window === 'undefined') return;
  if (status) {
    localStorage.setItem('cozly_admin_authenticated', 'true');
    localStorage.setItem('cozly_admin_email', userEmail);
    document.cookie = `${ADMIN_COOKIE_NAME}=authenticated; path=/; max-age=604800; SameSite=Lax`;
  } else {
    localStorage.removeItem('cozly_admin_authenticated');
    localStorage.removeItem('cozly_admin_email');
    document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function getAdminUserEmail(): string {
  if (typeof window === 'undefined') return 'admin@cozly.in';
  return localStorage.getItem('cozly_admin_email') || 'admin@cozly.in';
}
