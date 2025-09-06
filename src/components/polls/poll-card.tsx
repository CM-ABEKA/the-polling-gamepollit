'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Poll } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface PollCardProps {
  poll: Poll;
  showVoteButton?: boolean;
  onVote?: (pollId: string, optionIds: string[]) => void;
}

export function PollCard({ poll, showVoteButton = true, onVote }: PollCardProps) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (!poll.allowMultipleVotes) {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleVote = async () => {
    if (selectedOptions.length === 0 || !onVote) return;

    setIsVoting(true);
    try {
      await Promise.resolve(onVote(poll.id, selectedOptions));
      setSelectedOptions([]);
      setHasVoted(true);
      router.refresh();
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">
              <Link 
                href={`/polls/${poll.id}`} 
                className="hover:text-blue-600 transition-colors"
              >
                {poll.title}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">
              {poll.description}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={poll.isActive ? 'default' : 'secondary'}>
              {poll.isActive ? 'Active' : 'Closed'}
            </Badge>
            <Badge variant="outline">
              {poll.isPublic ? 'Public' : 'Private'}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Avatar className="h-6 w-6">
            <AvatarImage src={poll.createdBy.avatar} />
            <AvatarFallback className="text-xs">
              {getInitials(poll.createdBy.username)}
            </AvatarFallback>
          </Avatar>
          <span>by {poll.createdBy.username}</span>
          <span>•</span>
          <span>{formatDistanceToNow(poll.createdAt, { addSuffix: true })}</span>
          <span>•</span>
          <span>{poll.totalVotes} votes</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <label 
                  className="flex items-center gap-2 cursor-pointer flex-1"
                  onClick={() => showVoteButton && handleOptionSelect(option.id)}
                >
                  {showVoteButton && (
                    <input
                      type={poll.allowMultipleVotes ? 'checkbox' : 'radio'}
                      name={`poll-${poll.id}`}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => {}} // Handled by label onClick
                      className="w-4 h-4"
                    />
                  )}
                  <span className="flex-1">{option.text}</span>
                  <span className="text-sm text-gray-600">
                    {option.votes} votes ({option.percentage.toFixed(1)}%)
                  </span>
                </label>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {showVoteButton && poll.isActive && !hasVoted && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              {poll.allowMultipleVotes 
                ? 'You can select multiple options' 
                : 'Select one option'
              }
            </div>
            <Button 
              onClick={handleVote}
              disabled={selectedOptions.length === 0 || isVoting}
              size="sm"
            >
              {isVoting ? 'Voting...' : 'Vote'}
            </Button>
          </div>
        )}

        {showVoteButton && hasVoted && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-green-700">Thank you for voting! Refreshing results...</div>
          </div>
        )}

        {poll.expiresAt && (
          <div className="text-xs text-gray-500 mt-2">
            Expires {formatDistanceToNow(poll.expiresAt, { addSuffix: true })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

