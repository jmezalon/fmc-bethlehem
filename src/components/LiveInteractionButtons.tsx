'use client';

import { Button } from '@/components/ui/button';
import { MessageCircleIcon, ShareIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

interface LiveInteractionButtonsProps {
  isLive: boolean;
  videoId: string;
}

export default function LiveInteractionButtons({ isLive, videoId }: LiveInteractionButtonsProps) {
  const [showChat, setShowChat] = useState(false);

  const handleJoinChat = () => {
    if (!isLive || !videoId) return;
    setShowChat(!showChat);
  };

  const handleShareStream = () => {
    const shareUrl = isLive 
      ? `https://www.youtube.com/watch?v=${videoId}`
      : window.location.href;
    
    const shareText = isLive 
      ? 'Join us for live worship at FMC Bethlehem!'
      : 'Watch live worship services at FMC Bethlehem';

    // Try native sharing first, fallback to clipboard
    if (navigator.share) {
      navigator.share({
        title: 'FMC Bethlehem Live Stream',
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareUrl);
      });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        fallbackCopyToClipboard(text);
      });
    } else {
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    } catch (err) {
      alert(`Copy failed. Please copy manually: ${text}`);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full justify-start gap-3 h-12"
        disabled={!isLive}
        onClick={handleJoinChat}
      >
        <MessageCircleIcon className="w-5 h-5" />
        {showChat ? 'Hide Live Chat' : 'Join Live Chat'}
      </Button>
      
      {showChat && isLive && videoId && (
        <div className="relative bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-medium text-slate-900">Live Chat</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(false)}
              className="h-6 w-6 p-0"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
          <iframe
            src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}`}
            width="100%"
            height="400"
            className="w-full border-0"
            title="YouTube Live Chat"
          />
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="w-full justify-start gap-3 h-12"
        onClick={handleShareStream}
      >
        <ShareIcon className="w-5 h-5" />
        Share Stream
      </Button>
    </div>
  );
}
