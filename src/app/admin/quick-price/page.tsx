'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  TableProperties,
  Save,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Search,
} from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/formatters';

interface PriceRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  coverImage: string;
  originalPriceVal: number;
  price: number;
  offerPrice: number | string;
  stockStatus: Product['stockStatus'];
  isModified: boolean;
}

export default function QuickPriceEditorPage() {
  const [rows, setRows] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        const mapped: PriceRow[] = data.products.map((p: Product) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category,
          coverImage: p.images.find((i) => i.isCover)?.url || p.images[0]?.url || '/images/products/malabar-teak.svg',
          originalPriceVal: p.price,
          price: p.price,
          offerPrice: p.originalPrice || '',
          stockStatus: p.stockStatus,
          isModified: false,
        }));
        setRows(mapped);
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

  const handlePriceChange = (id: string, newPrice: string) => {
    const val = Number(newPrice) || 0;
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, price: val, isModified: true } : row))
    );
  };

  const handleOfferChange = (id: string, newOffer: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, offerPrice: newOffer, isModified: true } : row
      )
    );
  };

  const handleStockChange = (id: string, newStock: Product['stockStatus']) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, stockStatus: newStock, isModified: true } : row))
    );
  };

  const modifiedCount = rows.filter((r) => r.isModified).length;

  const handleSaveAll = async () => {
    const modifiedRows = rows.filter((r) => r.isModified);
    if (modifiedRows.length === 0) return;

    setSaving(true);
    setFeedback(null);

    const updates = modifiedRows.map((r) => ({
      id: r.id,
      price: Number(r.price),
      originalPrice: r.offerPrice ? Number(r.offerPrice) : undefined,
      stockStatus: r.stockStatus,
    }));

    try {
      const res = await fetch('/api/admin/quick-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: `Successfully updated prices & inventory for ${modifiedRows.length} sofa models!`,
        });
        setRows((prev) => prev.map((r) => ({ ...r, isModified: false })));
        setTimeout(() => setFeedback(null), 4000);
      } else {
        throw new Error(data.error || 'Failed to save prices');
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error updating prices' });
    } finally {
      setSaving(false);
    }
  };

  const filtered = rows.filter((r) =>
    search ? r.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Batch Pricing Controls
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Quick Price Editor
          </h1>
          <p className="text-xs text-brand-charcoal-600 mt-1">
            Edit selling prices, strike-through original prices, and stock statuses inline across all products at once
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving || modifiedCount === 0}
          className={`px-6 py-3 rounded-cozly text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm ${
            modifiedCount > 0
              ? 'bg-black hover:bg-brand-charcoal-800 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : `Save All Changes (${modifiedCount})`}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-cozly text-xs flex items-center gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-cozly border border-brand-border shadow-soft flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product to adjust price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <span className="text-xs text-brand-charcoal-600">
          {modifiedCount > 0 ? (
            <strong className="text-black font-bold">{modifiedCount} unsaved change(s)</strong>
          ) : (
            'All rows up to date'
          )}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-cozly border border-brand-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-brand-charcoal-500">Loading pricing table...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-grey-50 border-b border-brand-border text-brand-charcoal-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Selling Price (₹)</th>
                  <th className="py-3 px-4">Original / Strike-through (₹)</th>
                  <th className="py-3 px-4">Discount Badge</th>
                  <th className="py-3 px-4">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {filtered.map((row) => {
                  const numPrice = Number(row.price) || 0;
                  const numOffer = Number(row.offerPrice) || 0;
                  const discountPct =
                    numOffer > numPrice ? Math.round(((numOffer - numPrice) / numOffer) * 100) : 0;

                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors ${
                        row.isModified ? 'bg-amber-50/60' : 'hover:bg-brand-grey-50'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-grey-100 shrink-0 border border-brand-border">
                            <Image src={row.coverImage} alt={row.name} fill className="object-cover" />
                          </div>
                          <div>
                            <Link
                              href={`/admin/products/${row.id}/edit`}
                              className="font-bold text-black hover:underline"
                            >
                              {row.name}
                            </Link>
                            {row.isModified && (
                              <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded ml-1.5">
                                Edited
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-brand-charcoal-700 font-medium">
                        {row.category}
                      </td>

                      <td className="py-3 px-4">
                        <div className="relative max-w-[140px]">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                          <input
                            type="number"
                            value={row.price}
                            onChange={(e) => handlePriceChange(row.id, e.target.value)}
                            className="w-full pl-7 pr-2.5 py-1.5 text-xs font-bold text-black bg-white border border-brand-border rounded focus:outline-none focus:ring-1 focus:ring-black shadow-inner"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="relative max-w-[140px]">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                          <input
                            type="number"
                            placeholder="Optional"
                            value={row.offerPrice}
                            onChange={(e) => handleOfferChange(row.id, e.target.value)}
                            className="w-full pl-7 pr-2.5 py-1.5 text-xs text-brand-charcoal-600 bg-white border border-brand-border rounded focus:outline-none focus:ring-1 focus:ring-black shadow-inner"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {discountPct > 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-kraft text-white shadow-sm">
                            {discountPct}% OFF
                          </span>
                        ) : (
                          <span className="text-[10px] text-brand-charcoal-400">Standard Price</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={row.stockStatus}
                          onChange={(e) => handleStockChange(row.id, e.target.value as any)}
                          className="text-xs px-2.5 py-1.5 bg-white border border-brand-border rounded font-medium focus:outline-none"
                        >
                          <option value="in_stock">In Stock (Quick Ship)</option>
                          <option value="made_to_order">Made to Order</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar when changes exist */}
      {modifiedCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-brand-primary text-white p-4 rounded-cozly shadow-modal flex items-center gap-4 border border-brand-primary-light animate-bounce">
          <p className="text-xs font-medium">
            You have <strong className="text-brand-accent">{modifiedCount}</strong> unsaved price updates
          </p>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-2 bg-brand-accent hover:bg-brand-accent-hover text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {saving ? 'Saving...' : 'Save All Now'}
          </button>
        </div>
      )}
    </div>
  );
}
