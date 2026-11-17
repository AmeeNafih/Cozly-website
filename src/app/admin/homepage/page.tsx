'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sliders,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle,
  Eye,
  Megaphone,
  ShieldCheck,
} from 'lucide-react';
import { SiteSettings } from '@/types';

export default function HomepageEditorPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Announcement Bar state
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementLink, setAnnouncementLink] = useState('/collection');

  // Hero Slides
  const [slides, setSlides] = useState<SiteSettings['heroContent']['slides']>([]);

  // Why COZLY Points
  const [whyPoints, setWhyPoints] = useState<SiteSettings['whyCozly']>([]);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          const s = data.settings;
          setSettings(s);
          setAnnouncementEnabled(s.announcementBar?.enabled ?? true);
          setAnnouncementText(s.announcementBar?.text ?? '');
          setAnnouncementLink(s.announcementBar?.link ?? '/collection');
          setSlides(s.heroContent?.slides || []);
          setWhyPoints(s.whyCozly || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddSlide = () => {
    const newSlide = {
      id: `hero-${Date.now()}`,
      title: 'New Artisanal Headline',
      subtitle: 'Handcrafted solid timber furniture built in Erattupetta, Kottayam.',
      tag: 'NEW ARRIVAL • KERALA ATELIER',
      ctaText: 'Explore Models',
      ctaLink: '/collection',
      imageUrl: '/images/hero/hero-atelier.svg',
    };
    setSlides([...slides, newSlide]);
  };

  const handleUpdateSlide = (index: number, field: string, val: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: val };
    setSlides(updated);
  };

  const handleDeleteSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleUpdateWhyPoint = (index: number, field: 'title' | 'description', val: string) => {
    const updated = [...whyPoints];
    updated[index] = { ...updated[index], [field]: val };
    setWhyPoints(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setError(null);

    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroContent: { slides },
          whyCozly: whyPoints,
          announcementBar: {
            enabled: announcementEnabled,
            text: announcementText,
            link: announcementLink,
          },
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save homepage settings');
      }

      setFeedback('Homepage visual settings updated! Live site will reflect changes immediately.');
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-brand-muted">Loading homepage editor...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Visual Content Management
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Homepage Editor
          </h1>
          <p className="text-xs text-brand-charcoal-600 mt-1">
            Control hero slides, headlines, promotional banners, and craftsmanship highlights
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-2 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4 text-brand-kraft" />
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-cozly bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-cozly bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Announcement Bar Banner */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div className="flex items-center gap-2 text-black">
            <Megaphone className="w-4 h-4 stroke-[1.5]" />
            <h3 className="font-bold text-base">Top Announcement Banner</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-black">
            <input
              type="checkbox"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="rounded accent-black w-4 h-4"
            />
            <span>Enable Announcement</span>
          </label>
        </div>

        {announcementEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Banner Text
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Destination Link
              </label>
              <input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Hero Carousel Slides */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h3 className="font-serif font-bold text-base text-brand-primary">
              Hero Section Carousel Slides ({slides.length})
            </h3>
            <p className="text-xs text-brand-muted">
              Displayed in the main full-screen hero area of the homepage
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddSlide}
            className="px-3.5 py-2 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-cozly text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="p-5 rounded-cozly bg-brand-surface border border-brand-border space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Slide {idx + 1}
                </span>
                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(idx)}
                    className="text-gray-400 hover:text-rose-600 p-1"
                    title="Remove slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Headline</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleUpdateSlide(idx, 'title', e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => handleUpdateSlide(idx, 'subtitle', e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Tag Badge</label>
                  <input
                    type="text"
                    value={slide.tag}
                    onChange={(e) => handleUpdateSlide(idx, 'tag', e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly font-semibold text-brand-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={slide.ctaText}
                    onChange={(e) => handleUpdateSlide(idx, 'ctaText', e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Button Link</label>
                  <input
                    type="text"
                    value={slide.ctaLink}
                    onChange={(e) => handleUpdateSlide(idx, 'ctaLink', e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={slide.imageUrl}
                  onChange={(e) => handleUpdateSlide(idx, 'imageUrl', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Why COZLY Feature Points */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="border-b border-brand-border pb-3">
          <h3 className="font-serif font-bold text-base text-brand-primary">
            "Why COZLY" Craftsmanship Pillars
          </h3>
          <p className="text-xs text-brand-muted">
            Highlights why customers choose our Erattupetta solid wood manufacturing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyPoints.map((point, idx) => (
            <div key={idx} className="p-4 rounded-cozly bg-brand-surface border border-brand-border space-y-2">
              <span className="text-[10px] font-bold uppercase text-brand-accent block">Point {idx + 1}</span>
              <input
                type="text"
                value={point.title}
                onChange={(e) => handleUpdateWhyPoint(idx, 'title', e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-brand-border rounded-cozly"
              />
              <textarea
                rows={2}
                value={point.description}
                onChange={(e) => handleUpdateWhyPoint(idx, 'description', e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-brand-border rounded-cozly"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
