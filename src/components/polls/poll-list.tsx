'use client';

import { useState, useEffect } from 'react';
import { PollCard } from './poll-card';
import { Button } from '@/components/ui/button';
import { Poll, PollsResponse } from '@/types';
import { PollService } from '@/lib/polls';

interface PollListProps {
  initialPolls?: Poll[];
  showVoteButtons?: boolean;
}

export function PollList({ initialPolls = [], showVoteButtons = true }: PollListProps) {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [loading, setLoading] = useState(!initialPolls.length);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPolls.length) {
      // Initial load of polls when no initial data is provided
      loadPolls();
    }
  }, [initialPolls.length]);

  const loadPolls = async (pageNum = 1, append = false) => {
    try {
      setError(null);
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response: PollsResponse = await PollService.getPolls(pageNum, 10);
      
      if (append) {
        // Append when loading subsequent pages
        setPolls(prev => [...prev, ...response.polls]);
      } else {
        // Replace on first load or refresh
        setPolls(response.polls);
      }
      
      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load polls');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadPolls(page + 1, true);
    }
  };

  const handleVote = async (pollId: string, optionIds: string[]) => {
    try {
      const updatedPoll = await PollService.vote({ pollId, optionIds });
      setPolls(prev => 
        prev.map(poll => 
          poll.id === pollId ? updatedPoll : poll
        )
      );
    } catch (error) {
      // Surface error to caller so vote button can show a message if desired
      console.error('Failed to vote:', error);
      throw error;
    }
  };

  if (loading && !polls.length) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !polls.length) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => loadPolls()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!polls.length) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No polls found. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            showVoteButton={showVoteButtons}
            onVote={handleVote}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            variant="outline"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}


