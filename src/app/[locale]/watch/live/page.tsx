import YouTubePlayer from '@/components/YouTubePlayer';
import { Container } from '@/components/ui/container';
import { getCurrentServiceInfo, formatServiceTime, getDayName } from '@/lib/live-stream';
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import LiveInteractionButtons from '@/components/LiveInteractionButtons';

async function fetchLive() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/youtube/live`, {
      cache: 'no-store',
    });
    if (!res.ok) return { status: 'error', videoId: null } as const;
    const data = await res.json();
    return data as { status: 'live'|'offline'|'error'; videoId: string | null };
  } catch (error) {
    return { status: 'error', videoId: null } as const;
  }
}

export default async function LivePage() {
  const data = await fetchLive();
  const serviceInfo = getCurrentServiceInfo();
  const nextService = serviceInfo.nextService;

  // Fallback to ensure we always have a video
  const videoId = data.videoId || 'ye3CPI-qC8E';
  const status = data.status || 'offline';

  return (
    <div className="min-h-screen bg-background">
      {/* Status Badge */}
      <div className="flex justify-center pt-6 pb-2">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          status === 'live' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700'
        }`}>
          {status == 'live' ? 'LIVE' : 'OFFLINE'}
        </div>
      </div>

      {/* Header */}
      <div className="text-center pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Watch Live
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto px-4">
          Join us for live worship services and experience community from anywhere
        </p>
      </div>

      {/* Video Player */}
      <Container className="pb-8">
        <div className="max-w-4xl mx-auto">
          <YouTubePlayer 
            videoId={videoId} 
            title={status === 'live' ? 'Live Stream' : 'Recent Livestream'} 
            autoplay={status === 'live'}
          />
        </div>
      </Container>

      {/* Bottom Sections */}
      <Container className="pb-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Next Service */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Next Service
            </h2>
            
            {nextService ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{getDayName(nextService.day)}</span>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600">
                  <ClockIcon className="w-5 h-5" />
                  <span>{formatServiceTime(nextService)}</span>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600">
                  <UsersIcon className="w-5 h-5" />
                  <span>{nextService.language}</span>
                </div>
                
                <p className="text-sm text-slate-500 mt-4">
                  {nextService.description}
                </p>
                
                {serviceInfo.timeUntilNext && (
                  <p className="text-sm font-medium text-slate-700">
                    Starts in {serviceInfo.timeUntilNext}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-slate-500">
                No upcoming services scheduled
              </p>
            )}
          </div>

          {/* Interact */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Interact
            </h2>
            
            <LiveInteractionButtons 
              isLive={status === 'live'} 
              videoId={videoId} 
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
