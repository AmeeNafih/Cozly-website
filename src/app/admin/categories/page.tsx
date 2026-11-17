'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FolderTree,
  Plus,
  Save,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Category } from '@/types';
import { slugify } from '@/lib/formatters';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          description: newDesc.trim(),
          slug: slugify(newName),
          imageUrl: '/images/products/malabar-teak.svg',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(`Category "${newName}" added!`);
        setNewName('');
        setNewDesc('');
        fetchCategories();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Catalogue Taxonomies
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Category Manager
          </h1>
          <p className="text-xs text-brand-charcoal-600 mt-1">
            Manage product categories, filter tags, and visual catalogue groupings
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-cozly bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add New Category Card */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <h3 className="font-bold text-base text-black">
          Add New Category
        </h3>

        <form onSubmit={handleAddCategory} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black block mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Modular Corner Sofas"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black block mb-1">
                Short Description
              </label>
              <input
                type="text"
                placeholder="Brief summary for category card..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-grey-50 border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-kraft" />
            <span>{saving ? 'Adding...' : 'Add Category'}</span>
          </button>
        </form>
      </div>

      {/* Categories Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 bg-white rounded-cozly border border-brand-border shadow-soft flex items-start gap-4"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-brand-surface shrink-0 border border-brand-border/60">
              <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-base text-brand-primary truncate">
                {cat.name}
              </h4>
              <p className="text-[11px] font-mono text-brand-muted mt-0.5">
                slug: {cat.slug}
              </p>
              <p className="text-xs text-brand-muted line-clamp-2 mt-1">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
