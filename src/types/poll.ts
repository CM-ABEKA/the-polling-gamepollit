export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  createdBy: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  allowMultipleVotes: boolean;
  isPublic: boolean;
}

export interface CreatePollRequest {
  title: string;
  description: string;
  options: string[];
  expiresAt?: Date;
  allowMultipleVotes: boolean;
  isPublic: boolean;
}

export interface VoteRequest {
  pollId: string;
  optionIds: string[];
}

export interface PollsResponse {
  polls: Poll[];
  totalCount: number;
  hasMore: boolean;
}


