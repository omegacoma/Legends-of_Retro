-- Optional support table for shared Admin/Moderator submission notes.
-- Does not modify existing challenges or submissions.
create table if not exists public.submission_notes (
  submission_id bigint primary key references public.submissions(id) on delete cascade,
  note text not null default '',
  admin_user_id uuid references auth.users(id),
  updated_at timestamptz not null default now()
);
alter table public.submission_notes enable row level security;
drop policy if exists "authenticated can read submission notes" on public.submission_notes;
create policy "authenticated can read submission notes" on public.submission_notes for select to authenticated using (true);
-- Writes are performed by the server-side service role after verifying the caller is an Admin.
