import { describe, it, expect } from 'vitest';
import { PollService } from '@/lib/polls';

describe('PollService.createPoll', () => {
  it('throws when title is empty', async () => {
    await expect(
      PollService.createPoll({
        title: '   ',
        description: 'desc',
        options: ['A'],
        allowMultipleVotes: false,
        isPublic: true,
      } as any)
    ).rejects.toThrow('Title is required');
  });

  it('throws when options array is empty', async () => {
    await expect(
      PollService.createPoll({
        title: 'X',
        description: 'desc',
        options: [],
        allowMultipleVotes: false,
        isPublic: true,
      } as any)
    ).rejects.toThrow('Poll must have at least one non-empty option');
  });

  it('throws when options contain only whitespace', async () => {
    await expect(
      PollService.createPoll({
        title: 'X',
        description: 'desc',
        options: ['   ', '\n\t  '],
        allowMultipleVotes: false,
        isPublic: true,
      } as any)
    ).rejects.toThrow('Poll must have at least one non-empty option');
  });

  it('creates poll when title and options are valid', async () => {
    const poll = await PollService.createPoll({
      title: 'Valid',
      description: 'desc',
      options: ['A', '  B  '],
      allowMultipleVotes: false,
      isPublic: true,
    } as any);

    expect(poll.title).toBe('Valid');
    expect(poll.options.map(o => o.text)).toEqual(['A', 'B']);
  });
});


