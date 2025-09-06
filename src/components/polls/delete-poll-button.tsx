'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface DeletePollButtonProps {
  pollId: string;
  onDelete: (pollId: string) => Promise<void>;
}

export function DeletePollButton({ pollId, onDelete }: DeletePollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    if (!confirm('Are you sure you want to delete this poll?')) return;
    setLoading(true);
    try {
      await onDelete(pollId);
      router.push('/polls');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete poll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </Button>
      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  );
}


