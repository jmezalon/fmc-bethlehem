// src/lib/youtube.ts
type SearchItem = {
  id?: { videoId?: string };
  snippet?: {
    liveBroadcastContent?: 'live' | 'none' | 'upcoming';
    publishedAt?: string;
  };
};

const YT_BASE = 'https://www.googleapis.com/youtube/v3';

async function yt<T>(path: string, params: Record<string, string | number>) {
  const url = new URL(`${YT_BASE}/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

/** Resolve channelId. If env.YT_CHANNEL_ID is set, use it; else resolve via handle. */
export async function getChannelId({
  apiKey,
  handle,
}: {
  apiKey: string;
  handle: string;
}): Promise<string> {
  if (process.env.YT_CHANNEL_ID && process.env.YT_CHANNEL_ID.trim().length > 0) {
    return process.env.YT_CHANNEL_ID.trim();
  }
  // Use channels?forHandle=… (newer param supported by v3)
  const data = await yt<{ items: Array<{ id: string }> }>('channels', {
    part: 'id',
    forHandle: handle.startsWith('@') ? handle : `@${handle}`,
    key: apiKey,
    maxResults: 1,
  });
  const id = data.items?.[0]?.id;
  if (!id) throw new Error(`Could not resolve channelId for handle ${handle}`);
  return id;
}

/** Return the current live videoId if streaming now. */
export async function getCurrentLiveVideoId({
  apiKey,
  channelId,
}: {
  apiKey: string;
  channelId: string;
}): Promise<string | null> {
  // search live
  const data = await yt<{ items: SearchItem[] }>('search', {
    part: 'snippet',
    channelId,
    eventType: 'live',
    type: 'video',
    maxResults: 1,
    order: 'date',
    key: apiKey,
  });
  const vid = data.items?.[0]?.id?.videoId ?? null;
  return vid ?? null;
}

/** Return the most recent *completed* livestream videoId (fallback). */
export async function getLatestCompletedLiveVideoId({
  apiKey,
  channelId,
}: {
  apiKey: string;
  channelId: string;
}): Promise<string | null> {
  // Completed livestreams are videos with eventType=completed
  const data = await yt<{ items: SearchItem[] }>('search', {
    part: 'snippet',
    channelId,
    eventType: 'completed',
    type: 'video',
    maxResults: 1,
    order: 'date',
    key: apiKey,
  });
  const vid = data.items?.[0]?.id?.videoId ?? null;
  return vid ?? null;
}
