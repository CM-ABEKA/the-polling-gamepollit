import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PollList } from '@/components/polls/poll-list';

export default function PollsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Polls</h1>
          <p className="text-gray-600 mt-2">Discover and participate in community polls</p>
        </div>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>

      <PollList />
    </div>
  );
}


