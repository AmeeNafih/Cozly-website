import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategory } from '@/lib/data-store';
import { slugify } from '@/lib/formatters';

export async function GET(req: NextRequest) {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const category = await saveCategory({
      id: body.id || `cat-${Date.now()}`,
      name: body.name,
      slug,
      description: body.description || '',
      imageUrl: body.imageUrl || '/images/real/cozly-photo-14.jpg',
      productCount: body.productCount || 0,
    });

    return NextResponse.json({ success: true, category });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
