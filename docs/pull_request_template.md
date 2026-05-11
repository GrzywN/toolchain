## Description

<!-- What does this PR do? Link the relevant issue(s). -->

Closes #

---

## Review Checklist

> The pyramid below is ordered by **cost of change** — items at the bottom are the hardest to fix later.
> Reviewers should spend the most time on sections closer to the base.

---

### 🤖 Code Style · *automate where possible*

- [ ] Project formatting style is applied
- [ ] Naming conventions are followed
- [ ] Code is DRY (no unnecessary duplication)
- [ ] Code is readable (method lengths, complexity, structure)

---

### 🤖 Tests · *automate where possible*

- [ ] All existing tests pass
- [ ] New features are reasonably tested
- [ ] Corner cases are covered
- [ ] Unit tests used where possible, integration tests where necessary
- [ ] NFR tests included where relevant (e.g. performance)

---

### 📖 Documentation · *focus here*

- [ ] New features are documented
- [ ] All relevant doc types are updated (README, API docs, user guide, reference docs, etc.)
- [ ] Documentation is clear and free of significant typos or grammar issues

---

### ⚙️ Implementation Semantics · *focus here*

- [ ] Satisfies the original requirements
- [ ] Logically correct
- [ ] No unnecessary complexity
- [ ] Robust (concurrency, error handling, edge cases)
- [ ] Performant
- [ ] Secure (no injection vulnerabilities, sensitive data exposure, etc.)
- [ ] Observable (metrics, logging, tracing in place)
- [ ] New dependencies justify their weight and have acceptable licenses

---

### 🏛️ API Semantics · *highest priority — hardest to change later*

- [ ] API surface is as small as possible, as large as needed
- [ ] One way to do one thing — no redundant alternatives
- [ ] Consistent and follows the principle of least surprise
- [ ] Clean API/internals split — no internal details leaking into the public API
- [ ] No breaking changes to user-facing parts (API classes, config, metrics, log formats, etc.)
- [ ] New API is generally useful, not overly specific to a single use case

---

## Notes for Reviewers

<!-- Anything specific you'd like reviewers to focus on or be aware of? -->
