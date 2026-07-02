# GrzywN's agent instructions

Common instructions for GrzywN's agents, all scenarios.

## Hard constraints

### Rules
- No AI/Claude traces in git, ever. No Co-Authored-By, no --author override, no "Generated with" tags. Applies to commits, PR titles/descriptions, issue comments, all git output. Strip if found in existing PRs/issues. Commit author = user, always
- Never use em dash "—". Use plain dash "-" instead
- Tech decisions: don't weight dev cost much.
  Prefer quality, simplicity, robustness, scalability, long-term maintainability.
  Also weight performance, UX, accessibility, security, copywriting/UX writing clarity, code quality, testing, analytics/logging/observability, dependency health, dev experience, repo cleanliness - even if not asked.
- Always check Makefile first, use it for project tasks (build, test, lint, dev, migrations, docker etc). Source of truth for running things in this repo, prefer over calling underlying tools directly or writing files manually e.g. migrations.
- Always check PR template and CONTRIBUTING.md before opening PR. Contain coding guidelines + full checklist PR must pass. Follow every time.
- No obvious/redundant comments. Prefer clean code: self-explanatory naming, comments only where intent unclear from code, consistent indentation.
- Never manually modify CHANGELOG.md files or files marked auto-generated
- Writing/editing long Markdown files: each full sentence own physical line.
  Preserve normal Markdown structure, don't wrap multiple sentences onto one line.
- Bug fixes: always start by reproducing bug in E2E setting, close as possible to end-user flow.
  Ensures real problem found, so fix actually solves it.
- E2E testing product: be picky on UI, obsess over pixel perfection.
  Something looks off, even unrelated to current task, try get it fixed along the way.
- Same high standard for engineering excellence: lint, test failures, test flakiness.
  See one, even not caused by current work, still get it fixed.
- npm vs pnpm for agent swarm configs: use pnpm. Faster installs, lower memory/disk usage.

### Ask before
- System-wide changes hitting unrelated work (global PATH, shell rc files, replacing system Python)
- Anything costs money or uses credentials
- Destructive installs (uninstalls, force-replace global symlinks)
- Fixing system-level configurations and its apps e.g. docker

Always state what got installed in final summary. User must audit.

### Work Within Existing Frameworks
Before adding interface, class, abstraction, or helper, check if one already in place suffices - if so, use it. Analyze workspace first: understanding what already exists cheaper than writing duplicate that later needs reconciling. Extend or compose existing patterns rather than introducing parallel ones; build new only when nothing in place can be made to fit.

### Maximize Parallelization via Sub-Agents
Dispatch independent work to sub-agents aggressively, incl swarms of them. Any task not requiring massive shared context or exclusive access to race-prone resource (single Android AVD, single dev port, in-progress DB migration, interactive shell session) should be delegated. File searches across repo, isolated edits to unrelated files, build verifications, independent test suites, multi-file refactors with non-overlapping scope, research and exploration: all run faster as parallel sub-agents than serially. Default to delegating; reserve main-thread context for synthesis, decisions, work that must stay coherent. Cost of unnecessary agent small; cost of unnecessarily serializing parallelizable work paid against user's wall-clock time. **Swarm sizing:** 3–20 parallel agents standard working range - use it fully, don't timidly spawn one or two; massive reworks needing broad verification and testing sweeps may scale to 40. Under-provisioning parallelizable task wastes wall-clock time same as serializing it.

### Swarm Review Passes: Iterate, but Verify Every Claim
One review pass not enough: pass surfaces real issues, fix them, dispatch another full pass, iterate til pass comes back clean. Convergence measured in *verified* issues, not raw findings.

Treat sub-agent findings as leads, not verdicts - verify each against actual code (reproduce it, trace path, confirm input can occur) before acting. Matters most in mature, hardened code, where swarms over-report theoretical problems on paths that never execute. Finding you can't substantiate = not an issue: don't fix it, don't let it trigger another pass, or loop never converges.

**Worktree verifiers run against the wrong base.** Sub-agent spawned with `isolation: "worktree"` branches from repo default (`origin/main`), NOT from master agent's in-progress feature branch - so sees none of uncommitted or unpushed work, will falsely report "work discarded / branch reset / files missing / line counts collapsed." Never act on such finding. Git object DB shared, so in-progress commit reachable by SHA: reproduce against real master worktree (`git rev-parse HEAD`, `git log --first-parent`, `ls`/`wc -l` actual files), or pass agent exact commit SHA and have it inspect via `git show <sha>:path` / `git grep <sha>` while warning it its own checkout will be `origin/main`. Master worktree's own tsc/test/prettier is authoritative build signal - isolation-worktree agents run those against wrong tree.
