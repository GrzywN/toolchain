# GrzywN's agent instructions

These are common instructions for GrzywN's agents across all scenarios.

## Hard constraints

### Rules
- No AI/Claude traces in git. Ever. No Co-Authored-By, no --author override, no "Generated with" tags. Applies to commits, PR titles, PR descriptions, issue comments, all git output. Strip if found in existing PRs/issues. Commit author = user, always
- Never use the em dash "—". Use plain dash "-" instead
- When making technical decisions, do not give much weight to development cost.
  Instead, prefer quality, simplicity, robustness, scalability, and long term maintainability.
  Also give weight to performance, UX, accessibility, security, copywriting/UX writing clarity, code quality, testing, analytics/logging/observability, dependency health, developer experience, and repository cleanliness, even if not explicitly asked for.
- Always check for a Makefile first and use it to run project tasks (build, test, lint, dev, migrations, docker etc). It is the source of truth for how to run things in this repo, prefer it over calling underlying tools directly or writing files manually e.g. migrations.
- Always check the pull request template and CONTRIBUTING.md before opening a PR. They contain coding guidelines and the full checklist of checks a PR must pass. Follow them every time.
- Never manually modify CHANGELOG.md files or any files that are marked as auto-generated
- When writing or substantially editing long Markdown files, put each full sentence on its own physical line.
  Preserve normal Markdown structure, but avoid wrapping multiple sentences onto one line.
- When doing bug fixes, always start with reproducing the bug in an E2E setting as closely aligned with how an end user would.
  This makes sure you find the real problem so your fix will actually solve it.
- When end-to-end testing a product, be picky about the UI you see and be obsessed with pixel perfection.
  If something clearly looks off, even if it is not directly related to what you are doing, try to get it fixed along the way.
- Apply that same high standard to engineering excellence: lint, test failures, and test flakiness.
  If you see one, even if it is not caused by what you are working on right now, still get it fixed.
- When choosing between npm and pnpm for agent swarm configs, use pnpm. Faster installs, lower memory/disk usage.

### Ask before
- System-wide changes hitting unrelated work (global PATH, shell rc files, replacing system Python)
- Anything costs money or uses credentials
- Destructive installs (uninstalls, force-replace global symlinks)
- Fixing system-level configurations and its apps e.g. docker

Always state what got installed in final summary. User must audit.

### Work Within Existing Frameworks
Before adding an interface, class, abstraction, or helper, check whether one already in place is sufficient — if so, use it. Take the time to analyze the workspace first: understanding what already exists is cheaper than writing a duplicate that later has to be reconciled. Extend or compose existing patterns rather than introducing parallel ones; build new only when nothing in place can be made to fit.

### Maximize Parallelization via Sub-Agents
Dispatch independent work to sub-agents aggressively, including swarms of them. Any task that doesn't require massive shared context or exclusive access to a race-prone resource (a single Android AVD, a single dev port, an in-progress DB migration, an interactive shell session) should be delegated. File searches across the repo, isolated edits to unrelated files, build verifications, independent test suites, multi-file refactors with non-overlapping scope, research and exploration: all of these run faster as parallel sub-agents than serially. Default to delegating; reserve the main-thread context for synthesis, decisions, and work that must stay coherent. The cost of an unnecessary agent is small; the cost of unnecessarily serializing parallelizable work is paid against the user's wall-clock time. **Swarm sizing:** 3–20 parallel agents is the standard working range — use it fully rather than timidly spawning one or two; massive reworks that need broad verification and testing sweeps may scale to 40. Under-provisioning a parallelizable task wastes wall-clock time as surely as serializing it.

### Swarm Review Passes: Iterate, but Verify Every Claim
One review pass is not enough: when a pass surfaces real issues, fix them and dispatch another full pass, iterating until a pass comes back clean. Convergence is measured in *verified* issues, not raw findings.

Treat sub-agent findings as leads, not verdicts — verify each against the actual code (reproduce it, trace the path, confirm the input can occur) before acting. This matters most in mature, hardened code, where swarms over-report theoretical problems on paths that never execute. A finding you can't substantiate is not an issue: don't fix it and don't let it trigger another pass, or the loop never converges.

**Worktree verifiers run against the wrong base.** A sub-agent spawned with `isolation: "worktree"` branches from the repo default (`origin/main`), NOT from the master agent's in-progress feature branch — so it sees none of your uncommitted or unpushed work and will falsely report "work discarded / branch reset / files missing / line counts collapsed." Never act on such a finding. The git object DB is shared, so the in-progress commit is reachable by SHA: reproduce against the real master worktree (`git rev-parse HEAD`, `git log --first-parent`, `ls`/`wc -l` the actual files), or pass the agent the exact commit SHA and have it inspect via `git show <sha>:path` / `git grep <sha>` while warning it that its own checkout will be `origin/main`. The master worktree's own tsc/test/prettier is the authoritative build signal — isolation-worktree agents run those against the wrong tree.

### Monitor CI After Push
After every `git push`, monitor CI and fix any failures before declaring the push done.

### Active Monitoring — Never Sleep Through Stuck Tools
Never start a `Monitor` or background process and then issue a long sleep waiting for it.
- Every `Monitor` until-loop needs an explicit upper bound (iteration cap, max elapsed, deadline). No unbounded loops.
- For `run_in_background: true`, the harness notifies on completion — that notification IS the wake signal, don't also poll.
- Otherwise, wake every 60–270s (within prompt-cache window) and verify *progress* on each wake, not just "still running." Two wakes with no measurable progress = stuck; kill and diagnose.

**ALWAYS dispatch independent time-based wakeup shells alongside any monitor of a remote or opaque condition.** Whenever you launch a shell to monitor work whose real state lives somewhere you can't directly see — a remote GPU pod job, a training/build/deploy run, a queued task, a `curl`-polled endpoint, anything you "await" — that monitor is NEVER sufficient on its own, because it can hang, miss a silent failure, or block on output that never comes. You MUST also fire one or more separate background shells that do nothing but exit after a fixed delay (e.g. `run_in_background` a `sleep 600`) to force you back to inspect status. These timer shells are your independent guarantee of regaining control; the monitor watching the work is not.
- **Size the timers against your expected runtime, and stagger them.** If you believe the job should finish in ~15 min, schedule check-ins both before and around that mark — e.g. one shell exiting at 10 min and another at 20 min — so you catch a death loop, an error, or a hang early instead of discovering it long after. The point of the *earlier* timer is to verify the run is healthy and progressing; the point of the *later* one is to confirm it actually completed within budget rather than silently overrunning.
- **On each wakeup, actively inspect — don't just glance.** Read the latest logs/output, confirm the job advanced since the last check (new steps, new lines, changed metrics), and look for stall/error signatures. If it overran its budget or shows no progress, treat it as stuck: diagnose, and kill/restart rather than continuing to wait.
- **Keep the timers running until the work is genuinely done.** When one wakeup shell fires and the work is still in flight, dispatch the next one before returning to wait. The chain of timers must outlive the job, never the other way around.

