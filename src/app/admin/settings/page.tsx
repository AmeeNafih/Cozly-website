'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  Share2,
} from 'lucide-react';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [brandName, setBrandName] = useState('COZLY by Zoffaro IN');
  const [tagline, setTagline] = useState('Crafted for every comfort.');
  const [whatsappNumber, setWhatsappNumber] = useState('+919846581241');
  const [phone, setPhone] = useState('+919846581241');
  const [email, setEmail] = useState('sales@cozly.in');
  const [factoryAddress, setFactoryAddress] = useState('Zoffaro Furniture / COZLY Atelier, Main Road, Erattupetta, Kottayam District, Kerala 686122, India');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('https://maps.app.goo.gl/XbcbCJcaut3oDnjx8');
  const [workingHours, setWorkingHours] = useState('Monday – Saturday: 9:00 AM – 7:30 PM (IST)');
  const [deliveryStatesStr, setDeliveryStatesStr] = useState('Kerala, Tamil Nadu, Karnataka (incl. Bangalore)');
  const [instagram, setInstagram] = useState('https://www.instagram.com/cozly_by_zoffaro.in');
  const [facebook, setFacebook] = useState('https://facebook.com/cozlysofas');
  const [youtube, setYoutube] = useState('https://youtube.com/@cozly');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          const s = data.settings;
          setSettings(s);
          setBrandName(s.brandName || 'COZLY by Zoffaro IN');
          setTagline(s.tagline || 'Crafted for every comfort.');
          setWhatsappNumber(s.whatsappNumber || '+919846581241');
          setPhone(s.phone || '+919846581241');
          setEmail(s.email || 'sales@cozly.in');
          setFactoryAddress(s.factoryAddress || 'Zoffaro Furniture / COZLY Atelier, Main Road, Erattupetta, Kottayam District, Kerala 686122, India');
          setGoogleMapsUrl(s.googleMapsUrl || 'https://maps.app.goo.gl/XbcbCJcaut3oDnjx8');
          setWorkingHours(s.workingHours || '');
          setDeliveryStatesStr(s.deliveryStates?.join(', ') || 'Kerala, Tamil Nadu, Karnataka');
          setInstagram(s.socialLinks?.instagram || 'https://www.instagram.com/cozly_by_zoffaro.in');
          setFacebook(s.socialLinks?.facebook || '');
          setYoutube(s.socialLinks?.youtube || '');
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

    const deliveryStates = deliveryStatesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      brandName,
      tagline,
      whatsappNumber,
      phone,
      email,
      factoryAddress,
      googleMapsUrl,
      workingHours,
      deliveryStates,
      socialLinks: {
        instagram,
        facebook,
        youtube,
      },
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save settings');
      }

      setFeedback('Settings successfully saved! All WhatsApp checkout links and contacts updated across the website.');
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-brand-muted">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600 block">
            Store Configuration
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black mt-1 tracking-tight">
            Store & WhatsApp Settings
          </h1>
          <p className="text-xs text-brand-charcoal-600 mt-1">
            Configure order recipient phone number, workshop location, and business hours
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-black hover:bg-brand-charcoal-800 text-white text-xs font-bold uppercase tracking-wider rounded-cozly flex items-center gap-2 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4 text-brand-kraft" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
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

      {/* 1. WhatsApp & Primary Phone */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-brand-border text-brand-primary">
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="font-serif font-bold text-base">WhatsApp Ordering Dispatch Number</h3>
        </div>
        <p className="text-xs text-brand-muted leading-relaxed">
          All visitor orders and custom sofa enquiries generated from cozly.in will be dispatched to this WhatsApp number.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
              WhatsApp Order Number *
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full text-xs font-mono font-bold px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
            />
            <span className="text-[10px] text-brand-muted mt-1 block">
              Format: +91 9846581241 or 9846581241
            </span>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
              Direct Phone Call Number *
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs font-mono font-bold px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none focus:ring-1 focus:ring-brand-accent"
            />
          </div>
        </div>
      </div>

      {/* 2. Factory Location & Hours */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-brand-border text-brand-primary">
          <MapPin className="w-5 h-5 text-brand-accent" />
          <h3 className="font-serif font-bold text-base">Factory Address & Working Hours</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
              Factory & Showroom Physical Address *
            </label>
            <textarea
              rows={2}
              required
              value={factoryAddress}
              onChange={(e) => setFactoryAddress(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
              Google Maps Location Link *
            </label>
            <input
              type="url"
              required
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Customer Support Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
                Operating Working Hours *
              </label>
              <input
                type="text"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Delivery States */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-brand-border text-brand-primary">
          <Truck className="w-5 h-5 text-brand-accent" />
          <h3 className="font-serif font-bold text-base">Delivery Coverage States</h3>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">
            States (Comma-separated)
          </label>
          <input
            type="text"
            value={deliveryStatesStr}
            onChange={(e) => setDeliveryStatesStr(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-cozly focus:outline-none"
          />
          <span className="text-[10px] text-brand-muted mt-1 block">
            Used on footer, delivery badges, and location verification checks.
          </span>
        </div>
      </div>

      {/* 4. Social Media Links */}
      <div className="bg-white p-6 rounded-cozly border border-brand-border shadow-soft space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-brand-border text-brand-primary">
          <Share2 className="w-5 h-5 text-brand-accent" />
          <h3 className="font-serif font-bold text-base">Social Media Profiles</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Instagram URL</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">Facebook URL</label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-primary block mb-1">YouTube URL</label>
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-brand-surface border border-brand-border rounded-cozly"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
