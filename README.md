# Legends of Retro Web v0.1.8

Adds a complete separate Game of the Month timer/leaderboard and lets Admin edit or replace individual games in the active challenge.

## One-time database step for v0.1.8
Run `supabase/003_monthly_timer_leaderboard.sql` once in the Supabase SQL Editor.

# Legends of Retro Web v0.1.7

Browser-first Legends of Retro using the same Supabase backend as the desktop app.

This build keeps the existing Challenge 01 data untouched and adds the desktop-parity Admin workflows that were missing from the earlier web build.

## Vercel setup for Admin account actions

The browser never receives a Supabase service-role key. For Add Account, Reset Password, Change Role, Edit Account, Enable/Disable, Remove Account, submission moderation, participant management, and challenge admin actions, add this secret in Vercel:

`SUPABASE_SERVICE_ROLE_KEY`

Vercel Project -> Settings -> Environment Variables -> add the key for Production, then redeploy.

The API routes verify the logged-in caller is an Admin before using the service-role credential.

## Optional one-time SQL

Run `supabase/002_web_admin_support.sql` once to enable shared submission notes. It does not alter existing challenges, PBs, members, Champions, or submissions.
