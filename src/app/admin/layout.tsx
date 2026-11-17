import React from 'react';
import { Metadata } from 'next';
import AdminNav from '@/components/admin/AdminNav';

export const metadata: Metadata = {
  title: 'Admin Atelier Control | COZLY',
  description: 'Manage products, prices, images, and homepage configurations for cozly.in.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminNav>{children}</AdminNav>;
}
