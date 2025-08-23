'use client';

import { Button } from '@/components/ui/button';
import { MessageCircleIcon, ShareIcon } from 'lucide-react';

interface LiveInteractionButtonsProps {
  isLive: boolean;
  videoId: string;
}

export default function LiveInteractionButtons({ isLive, videoId }: LiveInteractionButtonsProps) {
  const handleJoinChat = () => {
    if (!isLive || !videoId) return;
    
    // Open YouTube live chat in new window
    const chatUrl = `https://www.youtube.com/live_chat?v=${videoId}`;
    window.open(chatUrl, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
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
        Join Live Chat
      </Button>
      
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
