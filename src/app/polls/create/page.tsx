import { CreatePollForm } from '@/components/polls/create-poll-form';

export default function CreatePollPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Poll</h1>
        <p className="text-gray-600 mt-2">Ask a question and get opinions from the community</p>
      </div>

      <CreatePollForm />
    </div>
  );
}
