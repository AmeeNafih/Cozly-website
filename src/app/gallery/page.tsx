import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowRight, MessageCircle } from 'lucide-react';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'Gallery & Client Projects | COZLY by Zoffaro IN',
  description:
    'Explore photos of COZLY by Zoffaro IN handcrafted sofas in real living rooms across Kerala, Bangalore, and Tamil Nadu, plus behind-the-scenes carpentry in Erattupetta.',
};

export default async function GalleryPage() {
  const settings = await getSiteSettings();

  const galleryItems = [
    {
      title: 'The Malabar Teak 3-Seater in Kochi Villa',
      category: 'Living Room Project',
      location: 'Panampilly Nagar, Kochi',
      image: '/images/products/malabar-teak.svg',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      title: 'Vembanad Modular L-Shape in Bangalore Penthouse',
      category: 'Sectional Project',
      location: 'Indiranagar, Bangalore',
      image: '/images/products/vembanad-lshape.svg',
      span: 'md:col-span-2',
    },
    {
      title: 'Royal Chesterfield Hand-Tufting Detail',
      category: 'Atelier Craftsmanship',
      location: 'Erattupetta Workshop',
      image: '/images/products/royal-tufting.svg',
      span: 'md:col-span-1',
    },
    {
      title: 'Precision Mortise & Tenon Joint Sanding',
      category: 'Factory Floor',
      location: 'Erattupetta Timber Works',
      image: '/images/products/factory-craft.svg',
      span: 'md:col-span-1',
    },
    {
      title: 'Sahyadri Sofa-Cum-Bed Hydraulic Mechanism',
      category: 'Engineering',
      location: 'Erattupetta Assembly Line',
      image: '/images/products/sahyadri-bed-mode.svg',
      span: 'md:col-span-2',
    },
    {
      title: 'Highrange 2-Seater in Modern Studio',
      category: 'Scandinavian Living',
      location: 'Trivandrum',
      image: '/images/products/highrange-2seater.svg',
      span: 'md:col-span-1',
    },
    {
      title: 'Periyar Curved Chaise in Reading Nook',
      category: 'Bespoke Accent',
      location: 'Coimbatore',
      image: '/images/products/periyar-chaise.svg',
      span: 'md:col-span-1',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal-600">
            <Camera className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Living Space Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            Projects & Factory Gallery
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
            Real homes, real timber, real comfort. See how our bespoke sofas settle into apartments and heritage homes across South India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-cozly overflow-hidden group bg-brand-grey-100 border border-brand-border shadow-soft hover:shadow-md transition-all duration-300 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-wider text-brand-kraft font-semibold block mb-1">
                  {item.category} • {item.location}
                </span>
                <h3 className="font-bold text-base sm:text-xl leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Request CTA */}
        <div className="mt-16 p-8 rounded-cozly bg-white border border-brand-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-xl text-black">
              Want more photos of a specific sofa model or timber finish?
            </h3>
            <p className="text-xs text-brand-charcoal-600">
              Our workshop craftsmen are happy to take live photos and video clips of finished pieces and send them via WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
              'Hello COZLY by Zoffaro IN! Could you please send me some workshop photos and video clips of your latest sofa builds?'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-brand-whatsapp hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-cozly shrink-0 flex items-center gap-2 shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
            <span>Request Photos on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
