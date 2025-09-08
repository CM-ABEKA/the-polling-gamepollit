## ALX Polly

Interactive polling app built with Next.js App Router, TypeScript, and Tailwind.

### Tech Stack
- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Vitest for unit tests

### Features
- Create, browse, and vote on polls
- Server actions for voting/creating/deleting
- Mock services for auth and data with easy swap to real APIs

## Setup

### Prerequisites
- Node 20+
- pnpm or npm

### Install
```bash
pnpm install
# or
npm install
```

### Environment Variables
Create a `.env.local` if wiring a real backend (e.g., Supabase):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Currently, services use mocked data (`src/lib/auth.ts`, `src/lib/polls.ts`). Replace these with real API calls when ready.

## Running Locally
```bash
pnpm dev
# or
npm run dev
```
Visit http://localhost:3000

## Usage Examples

### Create a Poll
1. Navigate to `/polls/create`
2. Enter title, optional description
3. Add at least two options
4. Submit to be redirected to the new poll detail

### Vote on a Poll
1. Open `/polls/[id]` (e.g., `/polls/1`)
2. Select option(s) and click Vote
3. Page revalidates to show updated counts

### Delete a Poll
From the poll detail page, click Delete (owner-only in a real app). Page redirects to `/polls`.

## Testing
```bash
pnpm test
```
Vitest runs unit tests such as `src/lib/polls.test.ts`.

## Project Structure
```
src/
  app/
    polls/
      [id]/page.tsx        # Poll detail + vote + delete
      create/page.tsx      # Create poll page
      poll-actions.ts      # Server actions (vote/create/delete)
  components/
    polls/
      poll-card.tsx        # Poll display + client vote UI
      poll-list.tsx        # List with pagination
      create-poll-form.tsx # New poll form
  lib/
    polls.ts               # Mocked poll service
    auth.ts                # Mocked auth service
  types/                   # Shared types
```

## Contributing
1. Create a branch
2. Make changes and write tests
3. Commit with conventional messages
4. Open a PR
