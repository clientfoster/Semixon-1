'use client';

import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface PostActionsProps {
  likeCount: number;
  postTitle: string;
  postUrl: string;
}

export function PostActions({ likeCount, postTitle, postUrl }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikeCount(prev => liked ? prev - 1 : prev + 1);
    // Here you could add actual like functionality with API calls
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: postUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(postUrl);
      // You could show a toast notification here
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        size="sm" 
        className={`flex items-center gap-2 transition-colors ${
          liked ? 'text-red-500 border-red-200 bg-red-50' : ''
        }`}
        onClick={handleLike}
      >
        <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        {currentLikeCount} Likes
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
}