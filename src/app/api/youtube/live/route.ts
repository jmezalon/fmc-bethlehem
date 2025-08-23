import { NextResponse } from 'next/server';
import { getChannelId, getCurrentLiveVideoId, getLatestCompletedLiveVideoId } from '@/lib/youtube';

export const dynamic = 'force-dynamic'; // always check freshness
export const revalidate = 0;

export async function GET() {
  try {
    const apiKey = process.env.YT_API_KEY;
    const handle = process.env.NEXT_PUBLIC_YT_HANDLE ?? '@FMCBCHURCH';
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing YT_API_KEY' }, { status: 500 });
    }

    const channelId = await getChannelId({ apiKey, handle });

    const liveId = await getCurrentLiveVideoId({ apiKey, channelId });
    if (liveId) {
      return NextResponse.json(
        { status: 'live', videoId: liveId },
        { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } },
      );
    }

    // If no current live video, get the latest completed livestream
    const latestVideoId = await getLatestCompletedLiveVideoId({
      apiKey,
      channelId,
    });

    if (latestVideoId) {
      return NextResponse.json(
        {
          status: 'offline',
          videoId: latestVideoId,
        },
        { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } },
      );
    }

    // No live or recent livestream found, use fallback video
    return NextResponse.json(
      {
        status: 'offline',
        videoId: 'ye3CPI-qC8E',
      },
      { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } },
    );
  } catch (err: any) {
    // If YouTube API fails, return fallback video
    return NextResponse.json(
      {
        status: 'offline',
        videoId: 'ye3CPI-qC8E',
      },
      { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } },
    );
  }
}
