'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  TableProperties,
  Sliders,
  Settings,
  FolderTree,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';
import { isUserAuthenticated, setAdminAuthenticated, getAdminUserEmail } from '@/lib/admin-auth';

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState('admin@cozly.in');

  useEffect(() => {
    setMounted(true);
    if (!pathname.includes('/admin/login')) {
      if (!isUserAuthenticated()) {
        router.push('/admin/login');
      } else {
        setUserEmail(getAdminUserEmail());
      }
    }
  }, [pathname, router]);

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'All Products', href: '/admin/products', icon: Package },
    { label: 'Add Product', href: '/admin/products/new', icon: PlusCircle },
    { label: 'Quick Price Editor', href: '/admin/quick-price', icon: TableProperties, highlight: true },
    { label: 'Homepage Editor', href: '/admin/homepage', icon: Sliders },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Settings & WhatsApp', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!mounted) {
    return <div className="min-h-screen bg-brand-surface p-12 text-center text-xs text-brand-muted">Loading Admin Portal...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-surface flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-brand-border shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <Link href="/admin" className="relative w-36 h-10 block">
            <Image
              src="/brand/logo.svg"
              alt="COZLY by Zoffaro IN Admin"
              fill
              className="object-contain object-left"
            />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black text-white">
            Admin
          </span>
        </div>

        {/* User Info */}
        <div className="px-6 py-3 bg-brand-grey-50 border-b border-brand-border flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-black truncate">{userEmail}</p>
            <p className="text-[9px] text-brand-charcoal-500 font-semibold">Active Session</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-cozly text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm font-bold'
                    : item.highlight
                    ? 'text-brand-kraft hover:bg-brand-grey-100 font-bold'
                    : 'text-brand-charcoal-700 hover:bg-brand-grey-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions: View Live Store & Logout */}
        <div className="p-4 border-t border-brand-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-cozly text-xs font-medium text-black hover:bg-brand-grey-100 transition-colors"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-charcoal-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-cozly text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-brand-border p-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="relative w-32 h-8 block">
          <Image src="/brand/logo.svg" alt="COZLY by Zoffaro IN Admin" fill className="object-contain object-left" />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-black hover:bg-brand-grey-100 rounded-lg"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-brand-border p-4 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-cozly text-xs font-semibold ${
                  isActive ? 'bg-black text-white font-bold' : 'text-brand-charcoal-700 hover:bg-brand-grey-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs">
            <Link href="/" target="_blank" className="text-black font-semibold flex items-center gap-1">
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button onClick={handleLogout} className="text-rose-600 font-semibold">
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-brand-grey-50">
        {children}
      </main>
    </div>
  );
}
