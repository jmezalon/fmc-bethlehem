'use client';

import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

export function YouTubeEmbed({ 
  videoId, 
  title = "YouTube Video", 
  autoplay = false,
  className = ""
}: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(autoplay);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    fs: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
    autohide: '0'
  }).toString()}`;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setShowPlayer(true);
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!showPlayer) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden group cursor-pointer ${className}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to standard quality thumbnail if maxres fails
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
          aria-label={`Play ${title}`}
        >
          <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-lg transition-colors">
            <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
      />
    </div>
  );
}
