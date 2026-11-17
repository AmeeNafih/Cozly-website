import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery | COZLY by Zoffaro IN',
  description:
    'Living room installations and workshop carpentry from COZLY by Zoffaro IN in Erattupetta, Kerala.',
};

export default function GalleryPage() {
  const galleryItems = [
    {
      title: 'Solid Teak Base L-Shape with Nested Tables',
      location: 'Kochi Villa',
      image: '/images/real/cozly-photo-14.jpg',
      aspect: 'aspect-[4/3] md:col-span-2',
    },
    {
      title: 'Modular Sectional with Integrated Console',
      location: 'Bangalore Apartment',
      image: '/images/real/cozly-photo-08.jpg',
      aspect: 'aspect-[4/3] md:col-span-1',
    },
    {
      title: 'Sculptural Minimalist Curved Sofa',
      location: 'Erattupetta Workshop',
      image: '/images/real/cozly-photo-01.jpg',
      aspect: 'aspect-[4/5] md:col-span-1',
    },
    {
      title: 'Solid Timber Joinery Detail',
      location: 'Carpentry Workshop',
      image: '/images/real/cozly-photo-13.jpg',
      aspect: 'aspect-[4/5] md:col-span-1',
    },
    {
      title: 'Panoramic Living Room Installation',
      location: 'Kottayam Residence',
      image: '/images/real/cozly-photo-22.jpg',
      aspect: 'aspect-[16/9] md:col-span-2',
    },
    {
      title: 'Steel Blue Swivel Ergonomic Recliner',
      location: 'Living Suite',
      image: '/images/real/cozly-photo-06.jpg',
      aspect: 'aspect-[4/5] md:col-span-1',
    },
    {
      title: 'Solid Teak Frame Side Profile',
      location: 'Erattupetta Workshop',
      image: '/images/real/cozly-photo-15.jpg',
      aspect: 'aspect-[4/5] md:col-span-1',
    },
    {
      title: 'Conversation Suite with Curved Armchairs',
      location: 'Private Home',
      image: '/images/real/cozly-photo-05.jpg',
      aspect: 'aspect-[4/3] md:col-span-2',
    },
    {
      title: 'Low-Slung Japandi Ambient Lounge',
      location: 'Showroom Interior',
      image: '/images/real/cozly-photo-21.jpg',
      aspect: 'aspect-[4/3] md:col-span-1',
    },
    {
      title: 'Bird’s-Eye View of Curved Living Suite',
      location: 'Erattupetta Atelier',
      image: '/images/real/cozly-photo-26.jpg',
      aspect: 'aspect-[4/3] md:col-span-1',
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-black tracking-[-0.02em]">
            Living room gallery
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Selected photographs of our sofas in living rooms across South India and timber details from our workshop in Erattupetta.
          </p>
        </div>

        {/* Clean Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {galleryItems.map((item, idx) => (
            <div key={idx} className={`group flex flex-col ${item.aspect.includes('md:col-span-2') ? 'md:col-span-2' : ''}`}>
              <div className={`relative w-full ${item.aspect.split(' ')[0]} rounded-[4px] overflow-hidden bg-neutral-100 border border-neutral-200/80`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="pt-3 pb-1 flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-black">{item.title}</p>
                <p className="text-xs text-neutral-500 shrink-0">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-neutral-200 text-center">
          <Link
            href="/collection"
            className="inline-block px-7 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-[0.14em] rounded-[4px] transition-colors"
          >
            Explore our sofas
          </Link>
        </div>
      </div>
    </div>
  );
}
