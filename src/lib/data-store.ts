import fs from 'fs';
import path from 'path';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SITE_SETTINGS, INITIAL_REVIEWS } from './seed-data';
import { Product, Category, SiteSettings, Review } from '@/types';
import { createClient } from './supabase/server';

interface LocalDB {
  products: Product[];
  categories: Category[];
  siteSettings: SiteSettings;
  reviews: Review[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

function ensureDataFile(): LocalDB {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial: LocalDB = {
        products: INITIAL_PRODUCTS,
        categories: INITIAL_CATEGORIES,
        siteSettings: INITIAL_SITE_SETTINGS,
        reviews: INITIAL_REVIEWS,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      siteSettings: INITIAL_SITE_SETTINGS,
      reviews: INITIAL_REVIEWS,
    };
  }
}

function saveLocalDB(data: LocalDB): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local store:', err);
  }
}

// ---------------- PRODUCTS ----------------

export async function getProducts(options?: { publishedOnly?: boolean }): Promise<Product[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (options?.publishedOnly) {
        query = query.eq('is_published', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as unknown as Product[];
      }
    } catch {
      // Fallback to local
    }
  }

  const db = ensureDataFile();
  if (options?.publishedOnly) {
    return db.products.filter((p) => p.isPublished);
  }
  return db.products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (!error && data) {
        return data as unknown as Product;
      }
    } catch {
      // Fallback
    }
  }

  const db = ensureDataFile();
  return db.products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (!error && data) {
        return data as unknown as Product;
      }
    } catch {
      // Fallback
    }
  }

  const db = ensureDataFile();
  return db.products.find((p) => p.id === id) || null;
}

export async function saveProduct(product: Partial<Product> & { name: string; price: number }): Promise<Product> {
  const db = ensureDataFile();
  const now = new Date().toISOString();

  let savedProduct: Product;
  if (product.id) {
    const index = db.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      savedProduct = {
        ...db.products[index],
        ...product,
        updatedAt: now,
      } as Product;
      db.products[index] = savedProduct;
    } else {
      savedProduct = {
        ...product,
        id: product.id,
        createdAt: now,
        updatedAt: now,
      } as Product;
      db.products.push(savedProduct);
    }
  } else {
    const newId = `prod-${Date.now()}`;
    savedProduct = {
      ...product,
      id: newId,
      createdAt: now,
      updatedAt: now,
    } as Product;
    db.products.unshift(savedProduct);
  }

  saveLocalDB(db);

  // Sync to Supabase if connected
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('products').upsert(savedProduct);
    } catch (err) {
      console.warn('Supabase sync skipped:', err);
    }
  }

  return savedProduct;
}

export async function duplicateProduct(id: string): Promise<Product | null> {
  const db = ensureDataFile();
  const original = db.products.find((p) => p.id === id);
  if (!original) return null;

  const newId = `prod-${Date.now()}`;
  const newSlug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;
  const cloned: Product = {
    ...JSON.parse(JSON.stringify(original)),
    id: newId,
    name: `${original.name} (Copy)`,
    slug: newSlug,
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.products.unshift(cloned);
  saveLocalDB(db);
  return cloned;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  db.products.splice(index, 1);
  saveLocalDB(db);

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // Ignore
    }
  }

  return true;
}

export async function bulkUpdatePrices(
  updates: Array<{ id: string; price: number; originalPrice?: number; stockStatus?: Product['stockStatus'] }>
): Promise<boolean> {
  const db = ensureDataFile();
  const now = new Date().toISOString();

  updates.forEach((update) => {
    const product = db.products.find((p) => p.id === update.id);
    if (product) {
      product.price = update.price;
      if (update.originalPrice !== undefined) {
        product.originalPrice = update.originalPrice || undefined;
      }
      if (update.stockStatus) {
        product.stockStatus = update.stockStatus;
      }
      product.updatedAt = now;
    }
  });

  saveLocalDB(db);
  return true;
}

// ---------------- SITE SETTINGS ----------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        return data as unknown as SiteSettings;
      }
    } catch {
      // Fallback
    }
  }

  const db = ensureDataFile();
  return db.siteSettings || INITIAL_SITE_SETTINGS;
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = ensureDataFile();
  db.siteSettings = {
    ...db.siteSettings,
    ...settings,
  };
  saveLocalDB(db);

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('site_settings').upsert(db.siteSettings);
    } catch {
      // Ignore
    }
  }

  return db.siteSettings;
}

// ---------------- CATEGORIES ----------------

export async function getCategories(): Promise<Category[]> {
  const db = ensureDataFile();
  return db.categories || INITIAL_CATEGORIES;
}

export async function saveCategory(category: Category): Promise<Category> {
  const db = ensureDataFile();
  const idx = db.categories.findIndex((c) => c.id === category.id);
  if (idx >= 0) {
    db.categories[idx] = category;
  } else {
    db.categories.push(category);
  }
  saveLocalDB(db);
  return category;
}

// ---------------- REVIEWS ----------------

export async function getReviews(): Promise<Review[]> {
  const db = ensureDataFile();
  return db.reviews || INITIAL_REVIEWS;
}
