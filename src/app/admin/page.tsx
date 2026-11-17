import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  CheckCircle,
  Clock,
  Plus,
  TableProperties,
  Sliders,
  Settings,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { getProducts, getCategories, getSiteSettings } from '@/lib/data-store';
import { formatINR } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSiteSettings(),
  ]);

  const total = products.length;
  const published = products.filter((p) => p.isPublished).length;
  const drafts = total - published;
  const inStock = products.filter((p) => p.stockStatus === 'in_stock').length;
  const madeToOrder = total - inStock;
  const recentProducts = products.slice(0, 6);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Atelier Management
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-brand-primary mt-1">
            COZLY Dashboard
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Manufacturing catalogue overview & quick controls for cozly.in
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/quick-price"
            className="px-4 py-2.5 bg-brand-accent/15 text-brand-accent hover:bg-brand-accent hover:text-white rounded-cozly text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Quick Price Editor</span>
          </Link>

          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-white rounded-cozly text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <Package className="w-4 h-4 text-brand-accent" />
          </div>
          <p className="font-serif font-bold text-3xl text-brand-primary">{total}</p>
          <span className="text-[11px] text-brand-muted block">Active catalogue items</span>
        </div>

        <div className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif font-bold text-3xl text-emerald-600">{published}</p>
          <span className="text-[11px] text-brand-muted block">{drafts} draft items hidden</span>
        </div>

        <div className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Ready to Ship</span>
            <Clock className="w-4 h-4 text-brand-accent" />
          </div>
          <p className="font-serif font-bold text-3xl text-brand-primary">{inStock}</p>
          <span className="text-[11px] text-brand-muted block">{madeToOrder} Made-to-order</span>
        </div>

        <div className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Dispatch</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="font-mono font-bold text-base text-brand-primary truncate">
            {settings.whatsappNumber}
          </p>
          <Link href="/admin/settings" className="text-[11px] text-brand-accent font-semibold hover:underline block">
            Edit in Settings →
          </Link>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/quick-price"
          className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft hover:shadow-elevated transition-all flex items-start gap-3 group"
        >
          <div className="p-3 bg-brand-secondary rounded-lg text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors">
            <TableProperties className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-brand-primary group-hover:text-brand-accent transition-colors">
              Quick Price Editor
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Change prices and offer discounts across all products in an inline spreadsheet view.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/homepage"
          className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft hover:shadow-elevated transition-all flex items-start gap-3 group"
        >
          <div className="p-3 bg-brand-secondary rounded-lg text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-brand-primary group-hover:text-brand-accent transition-colors">
              Homepage Visual Editor
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Edit hero carousel headlines, subheadlines, button links, and "Why COZLY" highlights.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft hover:shadow-elevated transition-all flex items-start gap-3 group"
        >
          <div className="p-3 bg-brand-secondary rounded-lg text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-brand-primary group-hover:text-brand-accent transition-colors">
              Store & WhatsApp Settings
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Update WhatsApp ordering number, Erattupetta factory address, and delivery zones.
            </p>
          </div>
        </Link>
      </div>

      {/* Recently Edited Products Table */}
      <div className="bg-white rounded-cozly border border-brand-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-brand-primary">
              Recent Products
            </h3>
            <p className="text-xs text-brand-muted">Latest sofas in catalogue</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
          >
            <span>View All Products ({total})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-surface border-b border-brand-border text-brand-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {recentProducts.map((product) => {
                const cover = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || '/images/products/malabar-teak.svg';
                return (
                  <tr key={product.id} className="hover:bg-brand-surface/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-surface shrink-0 border border-brand-border/60">
                          <Image src={cover} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-primary">{product.name}</p>
                          <span className="text-[10px] text-brand-muted">{product.seatingCapacity}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-brand-charcoal/80 font-medium">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 font-bold text-brand-primary">
                      {formatINR(product.price)}
                    </td>
                    <td className="py-3 px-4">
                      {product.isPublished ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-brand-muted">
                        {product.stockStatus === 'in_stock' ? 'Ready to Ship' : 'Made to Order'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs font-semibold text-brand-accent hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/collection/${product.slug}`}
                        target="_blank"
                        className="text-xs text-brand-muted hover:text-brand-primary inline-flex items-center"
                        title="View on site"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
