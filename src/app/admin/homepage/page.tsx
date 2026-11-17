'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Save,
  CheckCircle,
  AlertCircle,
  Megaphone,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { SiteSettings } from '@/types';

export default function HomepageEditorPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Announcement Bar
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [announcementText, setAnnouncementText] = useState('Factory-direct sofas with All-India delivery.');
  const [announcementLink, setAnnouncementLink] = useState('/collection');

  // Hero Section
  const [heroHeadline, setHeroHeadline] = useState('Sofas made for living.');
  const [heroSubheadline, setHeroSubheadline] = useState('Solid timber frames and tailored upholstery, crafted in Erattupetta and delivered direct.');
  const [heroImage, setHeroImage] = useState('/images/real/cozly-photo-05.jpg');

  // Brand Story Block
  const [storyHeadline, setStoryHeadline] = useState('Handcrafted in Erattupetta');
  const [storyText, setStoryText] = useState('In our Erattupetta workshop, we build sofas one at a time using seasoned solid timber and balanced upholstery foam. Every piece is constructed to order by experienced local woodcrafters, without retail showroom markups or distributor layers.');
  const [storyImage, setStoryImage] = useState('/images/real/cozly-photo-13.jpg');

  // Slides array (preserved for backwards compatibility)
  const [slides, setSlides] = useState<SiteSettings['heroContent']['slides']>([]);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          const s = data.settings;
          setSettings(s);
          setAnnouncementEnabled(s.announcementBar?.enabled ?? true);
          setAnnouncementText(s.announcementBar?.text || 'Factory-direct sofas with All-India delivery.');
          setAnnouncementLink(s.announcementBar?.link || '/collection');

          const hc = s.heroContent;
          setHeroHeadline(hc?.headline || hc?.slides?.[0]?.title || 'Sofas made for living.');
          setHeroSubheadline(hc?.subheadline || hc?.slides?.[0]?.subtitle || 'Solid timber frames and tailored upholstery, crafted in Erattupetta and delivered direct.');
          setHeroImage(hc?.slides?.[0]?.imageUrl || '/images/real/cozly-photo-05.jpg');

          setStoryHeadline(hc?.storyHeadline || 'Handcrafted in Erattupetta');
          setStoryText(hc?.storyText || 'In our Erattupetta workshop, we build sofas one at a time using seasoned solid timber and balanced upholstery foam. Every piece is constructed to order by experienced local woodcrafters, without retail showroom markups or distributor layers.');
          setStoryImage(hc?.storyImage || '/images/real/cozly-photo-13.jpg');

          setSlides(hc?.slides || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setError(null);

    try {
      // Update first slide to match hero fields for backward compatibility
      const updatedSlides = slides.length > 0 ? [...slides] : [{
        id: 'hero-1',
        title: heroHeadline,
        subtitle: heroSubheadline,
        tag: 'COZLY BY ZOFFARO IN • KERALA ATELIER',
        ctaText: 'Shop sofas',
        ctaLink: '/collection',
        imageUrl: heroImage,
      }];

      if (updatedSlides[0]) {
        updatedSlides[0].title = heroHeadline;
        updatedSlides[0].subtitle = heroSubheadline;
        updatedSlides[0].imageUrl = heroImage;
      }

      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroContent: {
            headline: heroHeadline,
            subheadline: heroSubheadline,
            storyHeadline,
            storyText,
            storyImage,
            slides: updatedSlides,
          },
          announcementBar: {
            enabled: announcementEnabled,
            text: announcementText,
            link: announcementLink,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback('Homepage content updated successfully.');
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setError(data.error || 'Failed to update homepage content.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        Loading homepage editor...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-xl font-medium text-black">
          Homepage Editor
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Edit announcement text, hero photography, headline, and the workshop story block.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-neutral-50 border border-neutral-300 rounded-[4px] text-xs text-neutral-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-black" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-neutral-50 border border-red-300 rounded-[4px] text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Announcement Bar */}
        <div className="p-6 bg-white border border-neutral-200 rounded-[4px] space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-black" />
              <h2 className="text-sm font-medium text-black">Announcement Bar</h2>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="rounded-[2px] border-neutral-300 text-black focus:ring-black"
              />
              <span className="text-neutral-700">Display bar</span>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Announcement Text (Single thin line, no emojis)
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Factory-direct sofas with All-India delivery."
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Destination Link (Optional)
              </label>
              <input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                placeholder="/collection"
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hero Section */}
        <div className="p-6 bg-white border border-neutral-200 rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <ImageIcon className="w-4 h-4 text-black" />
            <h2 className="text-sm font-medium text-black">Hero Section (Section 1)</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Headline (Max 6 words recommended)
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="Sofas made for living."
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Subline (One clear sentence)
              </label>
              <input
                type="text"
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                placeholder="Solid timber frames and tailored upholstery, crafted in Erattupetta and delivered direct."
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Lifestyle Image URL
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="/images/real/cozly-photo-05.jpg"
                  className="flex-1 text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                />
                <div className="relative w-16 h-12 rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                  <Image src={heroImage} alt="Hero preview" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Brand Story Block */}
        <div className="p-6 bg-white border border-neutral-200 rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <BookOpen className="w-4 h-4 text-black" />
            <h2 className="text-sm font-medium text-black">Workshop Story Block (Section 4)</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Story Headline
              </label>
              <input
                type="text"
                value={storyHeadline}
                onChange={(e) => setStoryHeadline(e.target.value)}
                placeholder="Handcrafted in Erattupetta"
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Story Description (2–3 short sentences)
              </label>
              <textarea
                rows={3}
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="In our Erattupetta workshop, we build sofas one at a time using seasoned solid timber..."
                className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Workshop Photo URL
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={storyImage}
                  onChange={(e) => setStoryImage(e.target.value)}
                  placeholder="/images/real/cozly-photo-13.jpg"
                  className="flex-1 text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-[4px] focus:outline-none focus:border-black text-black"
                />
                <div className="relative w-16 h-12 rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                  <Image src={storyImage} alt="Story preview" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-[4px] text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving changes...' : 'Save homepage content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
