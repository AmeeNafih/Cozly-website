'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Copy,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/formatters';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setFeedback('Product duplicated as draft successfully!');
        fetchProducts();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublish = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !product.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFeedback(`"${name}" deleted successfully.`);
        fetchProducts();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (statusFilter === 'published' && !p.isPublished) return false;
    if (statusFilter === 'draft' && p.isPublished) return false;
    return true;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Inventory & Catalogue
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Product Management
          </h1>
          <p className="text-xs text-brand-charcoal-600 mt-1">
            Add, modify specs, set fabric swatches, clone models, and toggle visibility
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-3 bg-black hover:bg-brand-charcoal-800 text-white rounded-cozly text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-brand-kraft" />
          <span>Add New Sofa</span>
        </Link>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-cozly bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-cozly border border-brand-border shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product by name or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none font-medium"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 text-xs font-medium bg-brand-grey-100 p-1 rounded-cozly border border-brand-border">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'all' ? 'bg-white shadow-sm font-bold text-black' : 'text-brand-charcoal-600 hover:text-black'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'published' ? 'bg-white shadow-sm font-bold text-black' : 'text-brand-charcoal-600 hover:text-black'
            }`}
          >
            Published ({products.filter((p) => p.isPublished).length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'draft' ? 'bg-white shadow-sm font-bold text-black' : 'text-brand-charcoal-600 hover:text-black'
            }`}
          >
            Drafts ({products.filter((p) => !p.isPublished).length})
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-cozly border border-brand-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-brand-charcoal-500">Loading catalogue...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-brand-charcoal-500 space-y-2">
            <p>No products match your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setCategoryFilter(''); setStatusFilter('all'); }}
              className="text-black font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-grey-50 border-b border-brand-border text-brand-charcoal-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Photo</th>
                  <th className="py-3 px-4">Product Name & Specs</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price / Offer</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4">Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filtered.map((product) => {
                  const cover = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || '/images/products/malabar-teak.svg';
                  return (
                    <tr key={product.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-surface shrink-0 border border-brand-border/60">
                          <Image src={cover} alt={product.name} fill className="object-cover" />
                        </div>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="font-bold text-brand-primary hover:text-brand-accent transition-colors block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[10px] text-brand-muted truncate mt-0.5">
                          {product.seatingCapacity} • {product.materialsSpec?.frameWood}
                        </p>
                      </td>

                      <td className="py-3 px-4 text-brand-charcoal font-medium">
                        {product.category}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-bold text-brand-primary block">
                          {formatINR(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatINR(product.originalPrice)}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            product.stockStatus === 'in_stock'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-brand-secondary text-brand-primary'
                          }`}
                        >
                          {product.stockStatus === 'in_stock' ? 'In Stock' : 'Made to Order'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePublish(product)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors ${
                            product.isPublished
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {product.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{product.isPublished ? 'Live' : 'Hidden'}</span>
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 rounded-lg hover:bg-brand-secondary text-brand-primary"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDuplicate(product.id)}
                            className="p-1.5 rounded-lg hover:bg-brand-secondary text-brand-primary"
                            title="Duplicate / Clone"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <Link
                            href={`/collection/${product.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg hover:bg-brand-secondary text-brand-muted hover:text-brand-primary"
                            title="Preview on Store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
