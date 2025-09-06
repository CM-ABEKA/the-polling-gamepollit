'use server';

import { revalidatePath } from 'next/cache';
import { PollService } from '@/lib/polls';
import { CreatePollRequest, VoteRequest } from '@/types';

export async function voteOnPoll(request: VoteRequest) {
  const updated = await PollService.vote(request);
  revalidatePath(`/polls/${request.pollId}`);
  return updated;
}

export async function createPollAction(payload: CreatePollRequest) {
  const poll = await PollService.createPoll(payload);
  revalidatePath('/polls');
  return poll;
}

export async function deletePollAction(pollId: string) {
  await PollService.deletePoll(pollId);
  revalidatePath('/polls');
  return { success: true } as const;
}


