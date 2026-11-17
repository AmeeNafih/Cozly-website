import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/data-store';
import { slugify } from '@/lib/formatters';

export async function GET(req: NextRequest) {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || body.price === undefined) {
      return NextResponse.json({ success: false, error: 'Name and price are required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);

    const product = await saveProduct({
      ...body,
      slug,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
