import { notFound } from 'next/navigation';
import { PollCard } from '@/components/polls/poll-card';
import { PollService } from '@/lib/polls';

interface PollPageProps {
  params: Promise<{ id: string }>;
}

export default async function PollPage({ params }: PollPageProps) {
  const { id } = await params;
  
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
            // In a real app, this would handle the vote on the server
            console.log('Vote:', { pollId, optionIds });
          }}
        />
      </div>
    </div>
  );
}
