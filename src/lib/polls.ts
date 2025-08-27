import { Poll, CreatePollRequest, VoteRequest, PollsResponse } from '@/types';

// Mock API functions - replace with actual API calls
export class PollService {
  private static mockPolls: Poll[] = [
    {
      id: '1',
      title: 'What\'s your favorite programming language?',
      description: 'Help us understand the developer community\'s preferences',
      options: [
        { id: '1', text: 'JavaScript', votes: 45, percentage: 35.7 },
        { id: '2', text: 'Python', votes: 38, percentage: 30.2 },
        { id: '3', text: 'TypeScript', votes: 25, percentage: 19.8 },
        { id: '4', text: 'Java', votes: 18, percentage: 14.3 },
      ],
      totalVotes: 126,
      createdBy: {
        id: '1',
        username: 'johndoe',
        avatar: undefined,
      },
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
      expiresAt: new Date('2024-02-15T10:00:00Z'),
      isActive: true,
      allowMultipleVotes: false,
      isPublic: true,
    },
    {
      id: '2',
      title: 'Best time for team meetings?',
      description: 'Let\'s find a time that works for everyone on the team',
      options: [
        { id: '5', text: '9:00 AM', votes: 12, percentage: 40.0 },
        { id: '6', text: '2:00 PM', votes: 10, percentage: 33.3 },
        { id: '7', text: '4:00 PM', votes: 8, percentage: 26.7 },
      ],
      totalVotes: 30,
      createdBy: {
        id: '2',
        username: 'janedoe',
        avatar: undefined,
      },
      createdAt: new Date('2024-01-16T14:30:00Z'),
      updatedAt: new Date('2024-01-16T14:30:00Z'),
      expiresAt: new Date('2024-01-23T14:30:00Z'),
      isActive: true,
      allowMultipleVotes: true,
      isPublic: false,
    },
  ];

  static async getPolls(page = 1, limit = 10): Promise<PollsResponse> {
    // TODO: Replace with actual API call
    await this.delay(500);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const polls = this.mockPolls.slice(startIndex, endIndex);

    return {
      polls,
      totalCount: this.mockPolls.length,
      hasMore: endIndex < this.mockPolls.length,
    };
  }

  static async getPollById(id: string): Promise<Poll | null> {
    // TODO: Replace with actual API call
    await this.delay(300);

    const poll = this.mockPolls.find(p => p.id === id);
    return poll || null;
  }

  static async createPoll(request: CreatePollRequest): Promise<Poll> {
    // TODO: Replace with actual API call
    await this.delay(800);

    const newPoll: Poll = {
      id: String(this.mockPolls.length + 1),
      title: request.title,
      description: request.description,
      options: request.options.map((text, index) => ({
        id: String(Date.now() + index),
        text,
        votes: 0,
        percentage: 0,
      })),
      totalVotes: 0,
      createdBy: {
        id: '1', // Mock current user
        username: 'currentuser',
        avatar: undefined,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: request.expiresAt,
      isActive: true,
      allowMultipleVotes: request.allowMultipleVotes,
      isPublic: request.isPublic,
    };

    this.mockPolls.unshift(newPoll);
    return newPoll;
  }

  static async vote(request: VoteRequest): Promise<Poll> {
    // TODO: Replace with actual API call
    await this.delay(400);

    const pollIndex = this.mockPolls.findIndex(p => p.id === request.pollId);
    if (pollIndex === -1) {
      throw new Error('Poll not found');
    }

    const poll = { ...this.mockPolls[pollIndex] };
    
    // Add votes to selected options
    request.optionIds.forEach(optionId => {
      const optionIndex = poll.options.findIndex(o => o.id === optionId);
      if (optionIndex !== -1) {
        poll.options[optionIndex].votes += 1;
        poll.totalVotes += 1;
      }
    });

    // Recalculate percentages
    poll.options = poll.options.map(option => ({
      ...option,
      percentage: poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0,
    }));

    poll.updatedAt = new Date();
    this.mockPolls[pollIndex] = poll;

    return poll;
  }

  static async deletePoll(id: string): Promise<void> {
    // TODO: Replace with actual API call
    await this.delay(300);

    const index = this.mockPolls.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPolls.splice(index, 1);
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
