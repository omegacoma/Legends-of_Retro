# v0.1.8

- Game of the Month now has its own countdown timer.
- Admin can start/resume, stop/pause, reset to 30 days, end now, or change the monthly end date/time.
- Game of the Month now has its own separate leaderboard and runner PB submissions.
- Monthly results never affect the main Legends challenge totals or Champions.
- Admin Challenge controls now show every active challenge game with an Edit / Replace action.
- Replacing a challenge game lets Admin KEEP or CLEAR existing submissions for that slot.
- Existing main challenge data is otherwise left intact.
- Includes one-time Supabase migration: `supabase/003_monthly_timer_leaderboard.sql`.
