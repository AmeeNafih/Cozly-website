-- ==============================================================================
-- COZLY (cozly.in) Production Database Schema & RLS Policies
-- Execute this SQL in your Supabase Project SQL Editor
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    material_type TEXT NOT NULL CHECK (material_type IN ('wooden', 'upholstered', 'both')),
    seating_capacity TEXT NOT NULL,
    style TEXT NOT NULL DEFAULT 'Modern',
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(12, 2) CHECK (original_price IS NULL OR original_price >= price),
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    dimensions JSONB NOT NULL DEFAULT '{"width": 0, "depth": 0, "height": 0, "unit": "cm"}'::jsonb,
    materials_spec JSONB NOT NULL DEFAULT '{"frameWood": "Solid Teak", "foamType": "High Density 40D", "springSystem": "Zig-zag steel", "legMaterial": "Teak Wood"}'::jsonb,
    warranty_years INT NOT NULL DEFAULT 5,
    delivery_time TEXT NOT NULL DEFAULT '7-10 Business Days',
    stock_status TEXT NOT NULL DEFAULT 'made_to_order' CHECK (stock_status IN ('in_stock', 'made_to_order')),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    fabrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    wood_finishes JSONB NOT NULL DEFAULT '[]'::jsonb,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SITE SETTINGS TABLE (Singleton)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name TEXT NOT NULL DEFAULT 'COZLY',
    tagline TEXT NOT NULL DEFAULT 'Artisanal Sofas Crafted in Kerala',
    whatsapp_number TEXT NOT NULL DEFAULT '+919846581241',
    phone TEXT NOT NULL DEFAULT '+919846581241',
    email TEXT NOT NULL DEFAULT 'sales@cozly.in',
    factory_address TEXT NOT NULL DEFAULT 'Main Road, Erattupetta, Kottayam District, Kerala 686122, India',
    city TEXT NOT NULL DEFAULT 'Erattupetta',
    state TEXT NOT NULL DEFAULT 'Kerala',
    pincode TEXT NOT NULL DEFAULT '686122',
    working_hours TEXT NOT NULL DEFAULT 'Monday - Saturday: 9:00 AM - 7:30 PM',
    delivery_states JSONB NOT NULL DEFAULT '["Kerala", "Tamil Nadu", "Karnataka"]'::jsonb,
    social_links JSONB NOT NULL DEFAULT '{"instagram": "https://instagram.com/cozly_sofas", "facebook": "https://facebook.com/cozlysofas", "youtube": "https://youtube.com/@cozly"}'::jsonb,
    hero_content JSONB NOT NULL DEFAULT '{"slides": []}'::jsonb,
    why_cozly JSONB NOT NULL DEFAULT '[]'::jsonb,
    announcement_bar JSONB DEFAULT '{"enabled": true, "text": "Handcrafted Solid Teak & Premium Upholstered Sofas • Direct Factory Delivery across Kerala, Tamil Nadu & Bangalore"}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    product_name TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. INDEXES FOR HIGH-PERFORMANCE FILTERING
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_material ON public.products(material_type);
CREATE INDEX IF NOT EXISTS idx_products_seating ON public.products(seating_capacity);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active categories
CREATE POLICY "Public read active categories" ON public.categories
    FOR SELECT USING (is_active = true);

-- Allow public read access to published products
CREATE POLICY "Public read published products" ON public.products
    FOR SELECT USING (is_published = true);

-- Allow public read access to site settings
CREATE POLICY "Public read site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Allow public read access to verified reviews
CREATE POLICY "Public read reviews" ON public.reviews
    FOR SELECT USING (verified = true);

-- Authenticated Admin Policies (Full access for authenticated admins)
CREATE POLICY "Admin full access categories" ON public.categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access products" ON public.products
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access reviews" ON public.reviews
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. STORAGE BUCKET FOR PRODUCT PHOTOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('cozly-media', 'cozly-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to media bucket
CREATE POLICY "Public read media" ON storage.objects
    FOR SELECT USING (bucket_id = 'cozly-media');

-- Authenticated admin upload/delete to media bucket
CREATE POLICY "Admin upload media" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cozly-media');

CREATE POLICY "Admin update media" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'cozly-media');

CREATE POLICY "Admin delete media" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'cozly-media');
