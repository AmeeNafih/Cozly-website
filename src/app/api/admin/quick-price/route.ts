import { NextRequest, NextResponse } from 'next/server';
import { bulkUpdatePrices } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const { updates } = await req.json();
    if (!Array.isArray(updates)) {
      return NextResponse.json({ success: false, error: 'Updates array is required' }, { status: 400 });
    }

    await bulkUpdatePrices(updates);
    return NextResponse.json({ success: true, count: updates.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
