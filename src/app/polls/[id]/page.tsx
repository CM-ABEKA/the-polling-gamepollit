import { notFound } from 'next/navigation';
import { PollCard } from '@/components/polls/poll-card';
import { PollService } from '@/lib/polls';
import { voteOnPoll } from '@/app/polls/poll-actions';
import { DeletePollButton } from '@/components/polls/delete-poll-button';
import { deletePollAction } from '@/app/polls/poll-actions';

interface PollPageProps {
  params: { id: string };
}

export default async function PollPage({ params }: PollPageProps) {
  const { id } = params;
  
  // In a real app, this would be an API call
  const poll = await PollService.getPollById(id);

  if (!poll) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Poll Details</h1>
          <p className="text-gray-600">View and participate in this poll</p>
        </div>

        <PollCard 
          poll={poll} 
          showVoteButton={true}
          onVote={async (pollId, optionIds) => {
            'use server';
            await voteOnPoll({ pollId, optionIds });
          }}
        />

        <div className="mt-6 flex justify-end">
          {/* In a real app, show this only to the owner/admin */}
          <DeletePollButton pollId={poll.id} onDelete={async (pollId) => {
            'use server';
            await deletePollAction(pollId);
          }} />
        </div>
      </div>
    </div>
  );
}


