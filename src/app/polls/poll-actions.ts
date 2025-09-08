'use server';

import { revalidatePath } from 'next/cache';
import { PollService } from '@/lib/polls';
import { CreatePollRequest, VoteRequest } from '@/types';

/**
 * voteOnPoll
 *
 * Server action that records a vote and revalidates the poll detail path
 * so clients see the updated results.
 */
export async function voteOnPoll(request: VoteRequest) {
  const updated = await PollService.vote(request);
  revalidatePath(`/polls/${request.pollId}`);
  return updated;
}

/**
 * createPollAction
 *
 * Server action that creates a poll and revalidates the list route so the
 * new poll appears in listings.
 */
export async function createPollAction(payload: CreatePollRequest) {
  const poll = await PollService.createPoll(payload);
  revalidatePath('/polls');
  return poll;
}

/**
 * deletePollAction
 *
 * Server action that deletes a poll and revalidates the list route.
 */
export async function deletePollAction(pollId: string) {
  await PollService.deletePoll(pollId);
  revalidatePath('/polls');
  return { success: true } as const;
}


