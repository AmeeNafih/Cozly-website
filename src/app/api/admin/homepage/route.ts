import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const { heroContent, whyCozly, announcementBar } = await req.json();
    const current = await getSiteSettings();

    const updated = await saveSiteSettings({
      heroContent: heroContent || current.heroContent,
      whyCozly: whyCozly || current.whyCozly,
      announcementBar: announcementBar !== undefined ? announcementBar : current.announcementBar,
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
