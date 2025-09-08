'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePollRequest, Poll } from '@/types';
import { PollService } from '@/lib/polls';

interface CreatePollFormProps {
  onCreate?: (payload: CreatePollRequest) => Promise<Poll>;
}

export function CreatePollForm({ onCreate }: CreatePollFormProps) {
  const [formData, setFormData] = useState<CreatePollRequest>({
    title: '',
    description: '',
    options: ['', ''],
    allowMultipleVotes: false,
    isPublic: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Poll title is required');
      return;
    }

    const validOptions = formData.options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      setError('At least 2 options are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const creator = onCreate ?? (async (payload: CreatePollRequest) => {
        return PollService.createPoll(payload);
      });

      const poll = await creator({
        ...formData,
        options: validOptions,
      });
      
      router.push(`/polls/${poll.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create poll');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Omit<CreatePollRequest, 'options'>) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt),
    }));
  };

  const addOption = () => {
    if (formData.options.length < 10) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, ''],
      }));
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      expiresAt: value ? new Date(value) : undefined,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>
          Create a new poll to gather opinions from your community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="What's your question?"
              value={formData.title}
              onChange={handleInputChange('title')}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide more context about your poll (optional)"
              value={formData.description}
              onChange={handleInputChange('description')}
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Options *</Label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  disabled={isSubmitting}
                />
                {formData.options.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                    disabled={isSubmitting}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {formData.options.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                disabled={isSubmitting}
              >
                Add Option
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
            <Input
              id="expiresAt"
              type="datetime-local"
              onChange={handleExpirationChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                id="allowMultipleVotes"
                type="checkbox"
                checked={formData.allowMultipleVotes}
                onChange={handleInputChange('allowMultipleVotes')}
                disabled={isSubmitting}
                className="w-4 h-4"
              />
              <Label htmlFor="allowMultipleVotes">Allow multiple votes per user</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isPublic"
                type="checkbox"
                checked={formData.isPublic}
                onChange={handleInputChange('isPublic')}
                disabled={isSubmitting}
                className="w-4 h-4"
              />
              <Label htmlFor="isPublic">Make poll public</Label>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


