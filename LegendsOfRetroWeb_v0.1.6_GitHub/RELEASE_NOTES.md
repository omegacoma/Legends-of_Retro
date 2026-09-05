# Legends of Retro Web v0.1.6

Desktop parity/admin rebuild.

- Users: Add Account, Enable/Disable, Reset Password, Change Role, Edit Account, Remove Account.
- Submissions: Correct Time, Delete Bad Submission, Add/Edit Note.
- Challenge: +1/+3/+7 days, End Challenge Now, Edit Settings, Reopen, Recalculate Standings.
- Participants: Add Participant and Remove Participant.
- Activity Log reads the shared Supabase audit log.
- System includes Online Backup JSON and Results CSV downloads.
- Game of the Month remains separate from competitive standings.
- Existing Challenge 01 data is not reset, resized, or migrated.
- Privileged actions are server-side Vercel functions; service-role credentials are never shipped to the browser.

## v0.1.6
- Fixed public Runner signup profile creation on Vercel by removing the unsupported server-side `https://esm.sh` import.
- Runner profile API now uses Supabase Auth/REST directly with the server-only service-role key.
- Signup now surfaces the actual API/Vercel error instead of only the generic “Runner profile could not be created” message.
