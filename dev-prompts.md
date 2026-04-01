# Developer AI Prompts — Curated Collection
> 55 battle-tested prompts for software developers across 8 categories.
> Sources: GitHub (f/awesome-chatgpt-prompts, PickleBoxer/dev-chatgpt-prompts), builder.io, logicweb.com, bestpromptsdb.com, 5ly.co, aiunpacker.com, portkey.ai, learnprompt.org, onix_react/Medium, addyo/substack, kms-technology.com, everythingai.io, dzone.com

---

## CATEGORY 1 — CODING
*General programming, algorithms, debugging, refactoring, code review, testing*

---

### 1. Senior-Level Code Review
**Description:** Multi-dimensional review that scores your code and surfaces security, performance, and maintainability issues.

**Tags:** `code-review` `security` `performance` `best-practices`

**Prompt:**
```
Please review this code from three different perspectives:

1. As a security specialist:
   - Identify potential vulnerabilities, injection risks, or authentication issues
   - Mention any OWASP Top 10 concerns

2. As a performance engineer:
   - Highlight inefficient patterns, memory leaks, or bottlenecks
   - Suggest more optimal data structures or algorithms

3. As a maintainability expert:
   - Point out unclear naming, complex logic, or architectural concerns
   - Suggest how to make the code easier to test and extend

CONTEXT:
- Tech stack: [e.g. React/Node.js/TypeScript]
- Runtime: [e.g. Node 20 / browser targets]
- Known constraints: [e.g. cannot introduce new dependencies]

CODE:
[YOUR CODE HERE]

For each role provide: concrete issues found, suggested improvements, and a short rationale for each change.
```

---

### 2. Structured Bug Diagnosis
**Description:** Provides root cause, step-by-step fix, and prevention tip for any bug or error message.

**Tags:** `debugging` `bug-fix` `root-cause`

**Prompt:**
```
Act as a debugging expert. Here is the situation:

Error message / stack trace:
[PASTE ERROR]

Relevant code:
[PASTE CODE]

Expected behavior: [DESCRIBE WHAT SHOULD HAPPEN]
Actual behavior: [DESCRIBE WHAT IS HAPPENING]
Environment: [language, framework, runtime version]

Please provide:
1. Root cause — what is actually wrong and why
2. Minimal fix — the exact code change needed (show as a diff if possible)
3. Explanation — why this fix works
4. Prevention tip — how to avoid this class of bug in the future
```

---

### 3. Deep Refactoring with Trade-offs
**Description:** Refactors code with explicit constraints and explains every change made, including trade-offs and edge cases.

**Tags:** `refactoring` `solid` `clean-code` `maintainability`

**Prompt:**
```
I have a [LANGUAGE] function in a [FRAMEWORK] project that needs refactoring.

Current code:
[PASTE CODE]

Issues I want to address:
- [e.g., low readability / high cyclomatic complexity]
- [e.g., non-optimal O(n²) time complexity]

What I have already considered:
[e.g., using a Map instead of an array filter]

Constraints:
- [e.g., must remain backward compatible]
- [e.g., no new dependencies]
- [e.g., must be a pure function]

Please provide:
- Refactored code with inline comments explaining each significant change
- Trade-offs of your approach
- Edge cases I should be aware of
```

---

### 4. Algorithm Implementation with Complexity Analysis
**Description:** Implements a named algorithm with Big-O analysis, edge case handling, and test stubs.

**Tags:** `algorithms` `complexity` `data-structures`

**Prompt:**
```
You are a senior [LANGUAGE] developer. Implement the [ALGORITHM NAME] algorithm to solve [PROBLEM DESCRIPTION].

Requirements:
- Clean, readable code with meaningful variable names
- Docstring / JSDoc with parameter types and return value
- Time and space complexity analysis (Big-O)
- Handling of edge cases: empty input, single element, duplicates, negative numbers (as applicable)
- 3 unit test stubs: one happy path, one edge case, one expected failure

Language/framework: [LANGUAGE]
Any constraints: [e.g., no built-in sort, O(n log n) required]
```

---

### 5. Comprehensive Unit Test Suite Generator
**Description:** Generates tests covering happy paths, edge cases, error conditions, mocks, and setup/teardown.

**Tags:** `testing` `unit-tests` `jest` `pytest` `tdd`

**Prompt:**
```
Generate a comprehensive test suite for this function using [Jest / pytest / TESTING FRAMEWORK]:

[FUNCTION CODE]

Organize the tests into:
1. Happy path — typical valid inputs and expected outputs
2. Edge cases — empty inputs, boundary values, large inputs, null/undefined
3. Error conditions — invalid types, missing required args, expected exceptions
4. Mocked dependencies — isolate external calls (DB, API, filesystem)

Follow the AAA pattern (Arrange–Act–Assert).
Include setup and teardown where appropriate.
Add a comment above each test explaining what it verifies.
```

---

### 6. Performance Bottleneck Analyzer
**Description:** Finds and fixes slow code with before/after complexity analysis and profiling guidance.

**Tags:** `performance` `optimization` `profiling` `big-o`

**Prompt:**
```
Act as a performance optimization specialist. Examine this [LANGUAGE] code:

[PASTE CODE]

Please:
1. Identify all performance bottlenecks (nested loops, blocking I/O, expensive DB calls, repeated computations, inefficient data structures)
2. For each bottleneck: explain why it is slow, provide a faster alternative with code, and estimate the complexity improvement (e.g., O(n²) → O(n log n))
3. Suggest profiling tools appropriate for this stack
4. Provide a benchmark format I can use to measure before/after
```

---

### 7. Security Vulnerability Audit
**Description:** Scans code against OWASP Top 10 with severity ratings and specific remediation code.

**Tags:** `security` `owasp` `vulnerabilities` `auth`

**Prompt:**
```
Perform a thorough security audit of the following [LANGUAGE/FRAMEWORK] code:

[PASTE CODE]

Check for and categorize by severity (Critical / High / Medium / Low):
- SQL injection, NoSQL injection, command injection
- XSS (stored, reflected, DOM-based)
- Authentication and authorization bypass
- Insecure direct object references
- Sensitive data exposure (tokens, keys, PII in logs)
- Missing input validation and sanitization
- OWASP Top 10 violations

For each issue found:
- Explain the risk and how an attacker could exploit it
- Show the vulnerable line(s)
- Provide corrected, hardened code
```

---

### 8. Modernize Legacy Code
**Description:** Upgrades old-style code to modern idioms, patterns, and standards without changing behavior.

**Tags:** `refactoring` `modernization` `es6` `typescript` `async-await`

**Prompt:**
```
Modernize the following [LANGUAGE] code to current best practices and modern standards.

[PASTE CODE]

Requirements:
- Maintain identical external behavior and API signatures
- Adopt modern syntax (e.g., async/await, optional chaining, destructuring for JS; dataclasses, type hints, walrus operator for Python)
- Apply idiomatic conventions for the language (PEP 8, ESLint Airbnb, Google style, etc.)
- Remove deprecated patterns
- Improve naming clarity

Show a before/after diff and add a short explanation for each significant change.
```

---

### 9. Regex Pattern Builder
**Description:** Creates a regex pattern with a component-by-component explanation and test cases.

**Tags:** `regex` `pattern-matching` `validation`

**Prompt:**
```
Create a regex pattern in [LANGUAGE] to [VALIDATE / EXTRACT / REPLACE] the following: [DESCRIBE PATTERN].

Provide:
1. The regex pattern itself
2. A breakdown explaining each component of the pattern
3. Flags used and why (e.g., case-insensitive, multiline)
4. 5 test cases: 3 that should match, 2 that should not
5. Language-specific implementation snippet showing how to use it in code
6. Common edge cases or gotchas to watch out for
```

---

### 10. Race Condition and Concurrency Debugger
**Description:** Diagnoses async/threading issues and rewrites code with safe concurrency patterns.

**Tags:** `concurrency` `async` `race-conditions` `threading`

**Prompt:**
```
I have a concurrency / async bug with these characteristics:

Observed problem: [e.g., "data is inconsistently updated when multiple requests arrive simultaneously"]
Language/runtime: [e.g., Node.js, Python asyncio, Java threads]
Relevant code:
[PASTE CODE]

Please:
1. Identify whether this is a race condition, deadlock, stale closure, or timing issue
2. Explain step-by-step how the bug manifests
3. Rewrite the code using safe concurrency patterns (locks, atomic operations, queues, immutability, etc.)
4. Suggest how to write a test that reliably reproduces the original bug
```

---

### 11. Code Translation Between Languages
**Description:** Converts code between programming languages while preserving idioms and conventions of the target language.

**Tags:** `code-translation` `migration` `cross-language`

**Prompt:**
```
Translate the following code from [SOURCE LANGUAGE] to [TARGET LANGUAGE]:

[PASTE ORIGINAL CODE]

Requirements:
- Maintain identical functionality and behavior
- Preserve error handling patterns (adapt Promises to async/await, Go error values, etc.)
- Follow idiomatic conventions in the target language (PEP 8, Effective Go, etc.)
- Include all necessary imports or dependencies
- Adapt any platform-specific features (I/O, concurrency, standard library equivalents)

Additional context: [PURPOSE OF THE CODE, PERFORMANCE CONSTRAINTS, ENVIRONMENT]
```

---

### 12. Production-Ready Boilerplate Generator
**Description:** Scaffolds a complete, production-quality starting structure for a new module or project.

**Tags:** `boilerplate` `scaffolding` `project-setup`

**Prompt:**
```
Generate production-ready boilerplate for a [LANGUAGE/FRAMEWORK] [MODULE TYPE, e.g., REST API endpoint, CLI tool, React component, background worker].

It must include:
- Proper project/file structure
- Configuration via environment variables (with .env.example)
- Logging setup
- Error handling and graceful shutdown
- Input validation
- A basic README with setup and run instructions
- At least one test file stub

Tech stack: [SPECIFY DEPENDENCIES, e.g., FastAPI + Pydantic, Express + Zod, Next.js 15]
Purpose: [BRIEF DESCRIPTION OF WHAT IT SHOULD DO]
```

---

---

## CATEGORY 2 — WRITING
*Technical docs, README files, commit messages, changelogs, API docs, comments*

---

### 13. Professional README Generator
**Description:** Creates a complete, well-structured README with badges, diagrams, and all standard sections.

**Tags:** `readme` `documentation` `markdown` `open-source`

**Prompt:**
```
Create a comprehensive README.md for my project with the following details:

Project name: [NAME]
What it does: [ONE-LINE DESCRIPTION]
Tech stack: [LANGUAGES, FRAMEWORKS, DATABASES]
Key features: [LIST 3–5 FEATURES]

The README must include these sections:
1. Project title + badges (build, license, version)
2. Short description and motivation (the "why")
3. Features list
4. Architecture overview (with a Mermaid diagram)
5. Prerequisites and installation steps
6. Configuration (environment variables table)
7. Usage with code examples
8. API reference (if applicable)
9. Running tests
10. Contributing guide
11. License

Use clean Markdown formatting with proper headings, code blocks, and tables.
```

---

### 14. Conventional Commit Message Generator
**Description:** Generates a Conventional Commits-compliant message from a git diff with subject, body, and optional footer.

**Tags:** `git` `commits` `conventional-commits` `version-control`

**Prompt:**
```
Act as an expert developer. I have staged changes for a single, atomic commit. Analyze the following git diff and generate a commit message following the Conventional Commits specification.

Staged diff:
[PASTE YOUR `git diff --cached` OUTPUT HERE]

Guidelines:
1. Choose the correct type: feat, fix, docs, style, refactor, perf, test, chore, ci
2. Write a concise subject line (max 72 chars) in the imperative mood ("add", "fix", "update" — not "added", "fixes")
3. If a scope applies, add it in parentheses: feat(auth):
4. Write a body paragraph explaining WHAT changed and WHY (not how)
5. Add a footer only for breaking changes (BREAKING CHANGE: description) or issue references (Closes #123)
```

---

### 15. Changelog / Release Notes Generator
**Description:** Synthesizes a list of commits or file changes into a structured, stakeholder-ready CHANGELOG entry.

**Tags:** `changelog` `release-notes` `versioning` `documentation`

**Prompt:**
```
You are a Release Manager. Synthesize the following list of commits into a single CHANGELOG.md entry for version [X.Y.Z].

Commits / changes:
[PASTE GIT LOG OR LIST OF COMMIT MESSAGES]

Context: [DESCRIBE THE RELEASE THEME OR EPIC, e.g., "User Profile V2 — new settings UI and refactored backend"]

Instructions:
1. Group changes logically: New Features, Bug Fixes, Performance, Breaking Changes, Deprecations
2. For each item, write in plain language focusing on user-facing value (the "why"), not implementation details
3. For Breaking Changes, include a migration note
4. Include PR or issue references where available
5. Target audience: developers reading the project changelog

Output format: valid Markdown following Keep a Changelog conventions (https://keepachangelog.com)
```

---

### 16. Inline Code Documentation Writer
**Description:** Adds comprehensive JSDoc / PyDoc / docstring comments to every function and complex block.

**Tags:** `documentation` `jsdoc` `docstring` `comments` `code-clarity`

**Prompt:**
```
Add comprehensive inline documentation to the following [LANGUAGE] code:

[PASTE CODE]

For every function / method include:
- A description of purpose (not just what it does, but why it exists)
- @param / :param for each parameter with type and description
- @returns / :returns with type and what it represents
- @throws / :raises for any exceptions that can be raised
- A usage example in the docstring
- Inline comments on non-obvious logic blocks explaining the reasoning

Follow the standard documentation format for this language (JSDoc for JS/TS, Google-style docstrings for Python, XML docs for C#).
```

---

### 17. API Reference Documentation
**Description:** Generates clean, complete API documentation in Markdown + OpenAPI YAML from code or endpoint descriptions.

**Tags:** `api-docs` `openapi` `swagger` `rest` `documentation`

**Prompt:**
```
Generate API documentation for the following endpoint(s):

[PASTE CONTROLLER / ROUTE CODE OR DESCRIBE THE ENDPOINTS]

For each endpoint provide:
1. HTTP method and path
2. Purpose description (one sentence)
3. Authentication required (type and how to pass it)
4. Request parameters table: name | type | required | description
5. Request body schema (JSON example + field descriptions)
6. Response schema for success (JSON example + field descriptions)
7. Error responses table: status code | condition | example body
8. A complete curl example

Also generate the corresponding OpenAPI 3.0 YAML snippet for each endpoint.
```

---

### 18. Technical Specification Writer
**Description:** Produces a thorough tech spec document covering requirements, architecture, data models, APIs, and risk assessment.

**Tags:** `tech-spec` `planning` `architecture` `documentation`

**Prompt:**
```
Write a technical specification document for the following feature or system:

Feature name: [NAME]
Problem it solves: [DESCRIPTION]
Tech stack: [LANGUAGES, FRAMEWORKS, DATABASES]

The document must cover:
1. Overview and goals
2. Non-goals (explicit scope boundaries)
3. User stories / requirements (functional and non-functional)
4. High-level architecture with component diagram (Mermaid)
5. Data model / schema changes
6. API design (new or modified endpoints)
7. Security considerations
8. Performance targets and SLOs
9. Testing strategy (unit, integration, E2E)
10. Deployment and rollout plan
11. Risks and open questions

Format: Markdown, suitable for a team wiki or GitHub PR description.
```

---

---

## CATEGORY 3 — PRODUCTIVITY
*Workflow optimization, planning, task breakdown, estimation, retrospectives*

---

### 19. Epic-to-Tasks Breakdown
**Description:** Breaks a vague feature request or epic into sprint-ready, estimated user stories and technical tasks.

**Tags:** `agile` `planning` `user-stories` `estimation` `scrum`

**Prompt:**
```
Act as an expert Agile coach and senior developer. Break down the following feature into sprint-ready tasks:

Feature / Epic: [DESCRIBE THE FEATURE]
Tech stack: [LANGUAGES, FRAMEWORKS]
Team size: [NUMBER OF DEVELOPERS]
Sprint length: [1 or 2 weeks]

For each task provide:
1. User story: "As a [persona], I want [action] so that [benefit]"
2. Acceptance criteria (Given/When/Then)
3. Technical sub-tasks for the developer
4. Story point estimate (Fibonacci: 1, 2, 3, 5, 8, 13) with brief rationale
5. Dependencies on other tasks or services
6. Any risks or unknowns that need spikes

Also list: assumptions made, questions that need clarification before starting, and a suggested task order.
```

---

### 20. Pre-PR / Pre-Commit Checklist Generator
**Description:** Generates a personalized checklist for a developer to review before submitting a PR for a given codebase or feature type.

**Tags:** `workflow` `pull-request` `code-quality` `checklist`

**Prompt:**
```
Generate a pre-pull-request checklist for a [LANGUAGE/FRAMEWORK] project.

Feature type: [e.g., new API endpoint, database migration, UI component, auth change]
Team standards: [e.g., we use ESLint + Prettier, Jest coverage threshold 80%, Conventional Commits]

The checklist should cover:
- Code quality (naming, complexity, duplication)
- Testing (new tests added, existing tests pass, coverage)
- Documentation (updated README, added JSDoc/docstrings, updated API docs)
- Security (input validation, no hardcoded secrets, auth checks)
- Performance (no obvious N+1 queries, no blocking I/O on hot paths)
- Accessibility (if UI changes)
- Breaking changes (migration notes, version bump, CHANGELOG updated)
- Reviewer-friendliness (PR description, small diff, linked issue)

Format as a Markdown checklist (- [ ] items).
```

---

### 21. Step-by-Step Implementation Plan
**Description:** Turns a high-level goal into a concrete, ordered sequence of small implementation steps.

**Tags:** `planning` `implementation` `workflow` `task-management`

**Prompt:**
```
I need to implement the following in my [LANGUAGE/FRAMEWORK] project:

Goal: [DESCRIBE WHAT YOU WANT TO BUILD]
Existing codebase context: [BRIEF DESCRIPTION OF RELEVANT EXISTING CODE/ARCHITECTURE]
Constraints: [e.g., must not break existing API, no new DB tables, must be done in 2 days]

Break this down into a concrete, ordered step-by-step implementation plan where:
- Each step is small enough to complete and test independently
- Steps are ordered to minimize rework
- Each step specifies: what to build, how to verify it works, and what could go wrong
- Risks and blockers are flagged early

Do NOT write the code yet — just give me the plan so I can review it first.
```

---

### 22. Code Onboarding Guide Generator
**Description:** Creates a "how to navigate this codebase" guide for new developers joining a project.

**Tags:** `onboarding` `documentation` `workflow` `team`

**Prompt:**
```
Generate an onboarding guide for a new developer joining this project.

Project overview: [BRIEF DESCRIPTION]
Tech stack: [LANGUAGES, FRAMEWORKS, DATABASES, TOOLS]
Repository structure:
[PASTE FOLDER TREE OR DESCRIBE KEY DIRECTORIES]

The guide should cover:
1. What the project does and why (business context)
2. Architecture overview with a diagram (Mermaid)
3. Key directories and what lives where
4. How to set up the local development environment (step by step)
5. How to run tests
6. The main data flow through the application (e.g., "request comes in → auth middleware → controller → service → DB")
7. The 5 most important files to read first and why
8. Common gotchas and "don't touch this unless you know what you're doing" areas
9. Who to ask about what (team roles, if known)
```

---

### 23. Sprint Retrospective Facilitator
**Description:** Structures a team sprint retrospective with data-driven insights, patterns, and actionable next steps.

**Tags:** `agile` `retrospective` `team` `process-improvement`

**Prompt:**
```
Act as an experienced Agile coach facilitating a sprint retrospective.

Sprint context:
- Sprint goal: [WHAT WAS THE SPRINT GOAL]
- What went well: [LIST ITEMS]
- What did not go well: [LIST ITEMS]
- Delivery: [DID YOU MEET THE SPRINT GOAL? VELOCITY?]
- Notable events: [INCIDENTS, SCOPE CHANGES, BLOCKERS]

Please:
1. Identify patterns across the "what didn't go well" items
2. Suggest 3 root causes (using 5 Whys if applicable)
3. Propose 3 concrete, actionable improvements for next sprint (with an owner and a success metric)
4. Highlight 2–3 wins to celebrate and reinforce
5. Flag any systemic issues to escalate to leadership
```

---

---

## CATEGORY 4 — BUSINESS
*Architecture decisions, ADRs, PRDs, tech specs, system design, API design*

---

### 24. Architecture Decision Record (ADR) Writer
**Description:** Generates a formal ADR document with context, alternatives considered, decision rationale, and consequences.

**Tags:** `architecture` `adr` `decision-making` `documentation`

**Prompt:**
```
Write an Architecture Decision Record (ADR) for the following decision:

Decision to document: [e.g., "Use PostgreSQL instead of MongoDB for the primary data store"]
System context: [BRIEF DESCRIPTION OF THE SYSTEM]
Date: [DATE]

Format the ADR with these sections:
1. Title: ADR-[NUMBER] — [SHORT TITLE]
2. Status: [Proposed / Accepted / Deprecated / Superseded]
3. Context: the problem or situation that requires a decision
4. Decision drivers: the key factors influencing the decision
5. Considered options: list each alternative with pros and cons
6. Decision outcome: the chosen option and why
7. Consequences: positive, negative, and neutral outcomes of this decision
8. Compliance: how will we know if this decision is being followed

Output as Markdown suitable for committing to a /docs/adr folder.
```

---

### 25. Product Requirements Document (PRD) Generator
**Description:** Creates a structured PRD from a feature idea, covering goals, user personas, requirements, and success metrics.

**Tags:** `prd` `product` `requirements` `planning` `business`

**Prompt:**
```
Write a Product Requirements Document (PRD) for the following feature:

Feature name: [NAME]
Problem statement: [WHAT PAIN POINT DOES THIS SOLVE?]
Target users: [DESCRIBE THE USER PERSONA(S)]
Business goal: [WHAT BUSINESS METRIC DOES THIS IMPROVE?]
Tech stack: [RELEVANT TECHNOLOGIES]

The PRD must include:
1. Executive summary (2–3 sentences)
2. Problem statement and background
3. Goals and success metrics (KPIs with target values)
4. Non-goals (explicit scope limits)
5. User personas affected
6. User stories (at least 3, in "As a / I want / So that" format)
7. Functional requirements (numbered list)
8. Non-functional requirements (performance, security, accessibility, scalability)
9. Technical constraints and dependencies
10. Open questions and risks
11. Timeline and milestones

Format as Markdown.
```

---

### 26. Scalable Microservices Architecture Designer
**Description:** Designs a complete microservices architecture with service boundaries, communication patterns, and a Mermaid diagram.

**Tags:** `microservices` `system-design` `architecture` `scalability`

**Prompt:**
```
Design a scalable microservices architecture for the following system:

System description: [DESCRIBE THE APPLICATION, e.g., "real-time e-commerce platform with inventory, orders, payments, and notifications"]
Expected scale: [USERS, REQUESTS PER SECOND, DATA VOLUME]
Cloud provider / infra: [e.g., AWS, GCP, Kubernetes]

Please provide:
1. Service decomposition — list each microservice, its responsibility, and its data store
2. Communication patterns — synchronous (REST/gRPC) vs. asynchronous (Kafka/RabbitMQ) with rationale
3. API Gateway / BFF design
4. Authentication and authorization strategy (e.g., OAuth2 + JWT)
5. Data consistency strategy (saga pattern, eventual consistency, etc.)
6. Caching layer (where and what to cache)
7. Observability (logging, metrics, tracing)
8. Mermaid architecture diagram
9. Key trade-offs of this design vs. a monolith
```

---

### 27. Progressive REST API Design
**Description:** Designs a complete, versioned REST API stage by stage: resources → interactions → advanced concerns → OpenAPI spec.

**Tags:** `api-design` `rest` `openapi` `versioning` `architecture`

**Prompt:**
```
I'm designing a RESTful API for a [SPECIFIC DOMAIN] system. Let's develop this progressively:

STAGE 1 — Core resources:
- Define the essential resources and their relationships
- Specify primary attributes and data types
- Outline CRUD endpoints

STAGE 2 — Interaction patterns:
- Specialized endpoints beyond CRUD
- Query parameters, filtering, sorting
- Pagination approach (cursor-based vs. offset)

STAGE 3 — Advanced concerns:
- Authentication and authorization (OAuth2, API keys, RBAC)
- Rate limiting and quota strategy
- Caching (Cache-Control, ETags)
- Versioning approach (URL path vs. header)
- Standardized error format (RFC 7807 Problem Details)

STAGE 4 — Documentation:
- OpenAPI 3.0 YAML for the key endpoints
- Example request/response pairs

Start with Stage 1. Domain context and business rules: [YOUR DETAILS]
```

---

### 28. CI/CD Pipeline Designer
**Description:** Generates a complete GitHub Actions (or other CI) workflow YAML for a given stack with all quality gates.

**Tags:** `cicd` `devops` `github-actions` `automation` `deployment`

**Prompt:**
```
Design and write a complete CI/CD pipeline for the following project:

Stack: [e.g., Node.js + React, Python FastAPI, Java Spring Boot]
Cloud deployment target: [e.g., AWS ECS, Vercel, GCP Cloud Run, Kubernetes]
CI/CD platform: [e.g., GitHub Actions, GitLab CI, CircleCI]

The pipeline must include these stages:
1. Lint and format check
2. Unit tests with coverage threshold enforcement
3. Integration tests
4. Security scan (e.g., npm audit, Snyk, Trivy for Docker images)
5. Build and containerize (Dockerfile)
6. Push to container registry
7. Deploy to staging on PRs / deploy to production on main branch merge
8. Post-deployment smoke test
9. Rollback strategy on failure
10. Slack / email notification on failure

Output the complete YAML file with inline comments explaining each step.
```

---

---

## CATEGORY 5 — DATA
*SQL queries, data modeling, data analysis, ETL, optimization*

---

### 29. Complex SQL Query Builder
**Description:** Generates an optimized SQL query with CTEs, window functions, and a performance explanation.

**Tags:** `sql` `database` `query` `postgresql` `performance`

**Prompt:**
```
Write a SQL query (PostgreSQL dialect) to solve the following problem:

Problem: [DESCRIBE WHAT YOU NEED TO CALCULATE OR RETRIEVE]

Available tables and schemas:
[PASTE TABLE DEFINITIONS OR DESCRIBE: table_name (col1 type, col2 type, ...)]

Requirements:
- Use CTEs (WITH clauses) to structure the logic step-by-step with meaningful CTE names
- Use window functions if appropriate (LAG, LEAD, RANK, ROW_NUMBER, running totals)
- Filter: [ANY DATE RANGES, STATUS FILTERS, ETC.]
- Output columns: [LIST DESIRED OUTPUT COLUMNS]
- Performance: add a note on which indexes would help this query

For each CTE, add a comment explaining its purpose. Explain the overall query logic after the code.
```

---

### 30. SQL Query Optimizer
**Description:** Rewrites a slow query for performance with specific index recommendations and cost analysis.

**Tags:** `sql` `optimization` `indexing` `performance` `database`

**Prompt:**
```
Optimize the following SQL query. It is running slowly on a table with approximately [NUMBER] rows.

Current query:
[PASTE QUERY]

Table schemas:
[PASTE SCHEMAS]

Existing indexes: [LIST CURRENT INDEXES OR "unknown"]

Please:
1. Identify the performance anti-patterns (e.g., SELECT *, missing indexes, inefficient JOINs, N+1, correlated subqueries, functions on indexed columns)
2. Rewrite the optimized query
3. Explain each optimization change and why it improves performance
4. Recommend specific indexes to create (with CREATE INDEX statements)
5. Estimate the expected improvement (qualitatively)
6. Note any trade-offs (index maintenance cost, storage, etc.)
```

---

### 31. Database Schema Designer
**Description:** Designs a normalized relational database schema with ERD, indexes, and migration scripts.

**Tags:** `database` `schema-design` `data-modeling` `postgresql` `migrations`

**Prompt:**
```
Design a relational database schema for the following domain:

Domain description: [e.g., "multi-tenant SaaS project management tool with users, teams, projects, tasks, comments, and file attachments"]
Database: [PostgreSQL / MySQL / SQLite]
Scale expectations: [e.g., thousands of tenants, millions of rows per table]

Provide:
1. Entity-Relationship diagram description (or Mermaid ERD)
2. CREATE TABLE statements for all entities with:
   - Appropriate data types and constraints (NOT NULL, UNIQUE, CHECK)
   - Primary keys (prefer UUIDs for multi-tenant systems)
   - Foreign key relationships with ON DELETE / ON UPDATE behavior
   - created_at / updated_at timestamps
3. Index strategy (which columns to index and why)
4. Notes on normalization decisions (and intentional denormalizations for performance)
5. A migration file stub (using [Flyway / Alembic / Prisma / Knex / your preferred tool])
```

---

### 32. Cohort and Retention Analysis Query
**Description:** Builds a cohort analysis query to measure user retention across signup months.

**Tags:** `sql` `analytics` `cohort-analysis` `retention` `business-metrics`

**Prompt:**
```
Write a PostgreSQL query for cohort retention analysis.

Tables:
- users (user_id, created_at)
- events / orders (id, user_id, event_date / order_date)

Goal: Calculate the percentage of users from each signup cohort (monthly) who returned and performed [an action / made a purchase] in Month 0 (signup month), Month 1, and Month 2.

Use Common Table Expressions (CTEs) to structure the logic:
1. CTE 1: assign each user to their signup cohort month
2. CTE 2: find all users who performed the action in each subsequent month
3. CTE 3: calculate retention percentages per cohort

Output columns: cohort_month, cohort_size, month_0_retention_pct, month_1_retention_pct, month_2_retention_pct

Explain each CTE and the overall approach.
```

---

### 33. ETL Data Pipeline Script Generator
**Description:** Creates a production-quality ETL pipeline with validation, logging, and error handling.

**Tags:** `etl` `data-pipeline` `pandas` `python` `data-engineering`

**Prompt:**
```
Write a Python ETL pipeline script for the following task:

Source: [e.g., CSV files in S3, PostgreSQL table, REST API]
Destination: [e.g., PostgreSQL data warehouse, BigQuery, Parquet files]
Transformation rules: [DESCRIBE THE BUSINESS LOGIC, JOINS, AGGREGATIONS]
Data volume: [APPROXIMATE ROWS AND FILE SIZES]

The script must include:
- Schema validation on ingestion (reject or quarantine malformed rows)
- Deduplication logic
- Data type coercion and standardization (e.g., snake_case column names, UTC timestamps)
- Upsert / incremental load logic (not full reload)
- Structured logging with row counts at each stage
- Error handling with a dead letter queue or error log file
- A dry-run mode that shows what would be written without writing

Use [Pandas / Polars / SQLAlchemy / your preferred stack]. Add inline comments throughout.
```

---

### 34. N+1 Query Detector and Fixer
**Description:** Identifies N+1 query patterns in ORM code and rewrites with eager loading or raw SQL.

**Tags:** `orm` `n+1` `performance` `database` `sql`

**Prompt:**
```
Review the following [ORM / LANGUAGE / FRAMEWORK] code for N+1 query problems and other database performance anti-patterns:

[PASTE CODE]

ORM: [e.g., SQLAlchemy, Prisma, ActiveRecord, Django ORM, TypeORM]
Database: [PostgreSQL / MySQL]

For each problem found:
1. Explain what the N+1 issue is and how many queries it generates for N records
2. Provide the fixed version using eager loading, JOIN queries, or batch fetching
3. Show the SQL that the optimized ORM query generates
4. Add a comment in the code explaining the optimization
```

---

---

## CATEGORY 6 — DESIGN
*UI/UX, component design, design systems, accessibility, Figma-to-code*

---

### 35. React Component Generator with Full TypeScript + Accessibility
**Description:** Generates a production-ready React component with TypeScript, accessibility attributes, Storybook story, and tests.

**Tags:** `react` `typescript` `accessibility` `component` `frontend`

**Prompt:**
```
Generate a production-ready React component for the following UI element:

Component name: [NAME]
Purpose: [WHAT IT DOES AND WHERE IT IS USED]
Props / API: [LIST THE PROPS IT SHOULD ACCEPT, OR DESCRIBE BEHAVIOR]
Design system: [e.g., Tailwind CSS, CSS Modules, styled-components, shadcn/ui]

Requirements:
- Full TypeScript with exported interface for Props
- WCAG 2.1 AA accessibility: correct ARIA roles, labels, keyboard navigation, focus management
- Loading, error, and empty states handled
- Controlled vs. uncontrolled mode (if applicable)
- A Storybook story with Default, Loading, Error, and Interactive variants
- A Jest + React Testing Library test covering render, user interaction, and accessibility (use jest-axe)
- Inline comments on non-obvious logic

Do not use any library not already in the stack.
```

---

### 36. Design System Audit
**Description:** Audits a component library or codebase for design system consistency, accessibility, and tokenization gaps.

**Tags:** `design-system` `audit` `accessibility` `ui` `tokens`

**Prompt:**
```
Perform a design system audit of the following component code:

[PASTE COMPONENT CODE OR LIST OF COMPONENTS]

Design system context: [e.g., "We use Tailwind CSS + shadcn/ui, with a custom color token set"]

Audit for:
1. Inconsistent spacing — are spacing values taken from a fixed scale or are they arbitrary?
2. Color usage — are hardcoded color values used instead of design tokens?
3. Typography — are font sizes, weights, and line heights consistent?
4. Accessibility gaps — ARIA labels, keyboard navigation, color contrast (WCAG AA)
5. Component API consistency — are prop names, event handler names, and variant patterns consistent across components?
6. Duplication — are there components doing the same thing in slightly different ways?
7. Missing states — which components lack loading, error, disabled, or empty states?

For each finding: severity (Critical / High / Medium / Low), current state, recommended fix, and an example.
```

---

### 37. Figma Design-to-Code Translator
**Description:** Converts a described Figma design or screenshot into React + Tailwind code with correct layout and semantics.

**Tags:** `figma` `tailwind` `react` `design-to-code` `frontend`

**Prompt:**
```
Convert the following UI design description into React + Tailwind CSS code:

Design description:
[DESCRIBE THE COMPONENT IN DETAIL: layout, colors, typography, spacing, interactive states, responsive behavior. Or paste a Figma component description / inspect panel values.]

Requirements:
- Semantic HTML elements (use button, nav, article, etc. — not div for everything)
- Responsive: mobile-first with Tailwind responsive prefixes (sm:, md:, lg:)
- Dark mode support using Tailwind dark: variant
- Hover, focus, and active states for interactive elements
- No hardcoded pixel values — use only Tailwind utility classes
- TypeScript with typed props
- Accessible: correct ARIA attributes, sufficient color contrast, keyboard-navigable

If there is ambiguity in the design, state your assumption and provide the code.
```

---

### 38. UX Micro-Copy and Error Message Writer
**Description:** Rewrites developer-written error messages and UI labels into clear, friendly, actionable user-facing copy.

**Tags:** `ux-writing` `micro-copy` `error-messages` `ui` `accessibility`

**Prompt:**
```
Rewrite the following developer-written error messages and UI labels into clear, user-friendly micro-copy:

Current messages:
[PASTE YOUR CURRENT ERROR MESSAGES, BUTTON LABELS, EMPTY STATES, LOADING TEXT, ETC.]

Context:
- Product: [DESCRIBE WHAT THE PRODUCT IS]
- Tone of voice: [e.g., friendly and direct, professional, playful]
- User type: [technical / non-technical / mixed]

For each message provide:
1. The rewritten copy
2. A brief note on why the original was problematic (e.g., too technical, blames the user, no action)
3. Any alternative variants for A/B testing

Also flag any messages that reveal internal system details (e.g., stack traces, SQL errors) that should never be shown to users.
```

---

---

## CATEGORY 7 — EDUCATION
*Learning new tech, concept explanations, code walkthroughs, tutoring, comparisons*

---

### 39. "Explain This Code" for Different Levels
**Description:** Explains a code snippet at three levels: beginner, intermediate, and senior developer.

**Tags:** `education` `explanation` `learning` `code-walkthrough`

**Prompt:**
```
Explain the following code at three different levels of technical depth:

[PASTE CODE]
Language / framework: [LANGUAGE]

Level 1 — Beginner (no jargon):
Explain what this code does using everyday language and analogies. Assume the reader knows basic programming but not this language or pattern.

Level 2 — Intermediate:
Explain the code's structure, the patterns it uses, and the decisions made. Include terminology but explain each term.

Level 3 — Senior developer:
Discuss trade-offs, edge cases, performance characteristics, potential failure modes, and how this fits into larger architectural patterns. What would you change and why?

After the three levels, add annotated inline comments to the code itself at the intermediate level.
```

---

### 40. Concept-to-Code Tutorial Generator
**Description:** Creates a complete tutorial for learning a new programming concept or framework feature with exercises.

**Tags:** `tutorial` `learning` `education` `teaching`

**Prompt:**
```
Create a tutorial for the following programming concept:

Concept: [e.g., "React useReducer hook", "Python async generators", "PostgreSQL window functions"]
Target audience: developers who know [PREREQUISITE KNOWLEDGE] but are new to this concept
Language/framework: [LANGUAGE]

Structure the tutorial as:
1. One-sentence definition
2. Why this concept exists — what problem does it solve that simpler alternatives do not?
3. Mental model / analogy to make it intuitive
4. Minimal working example (simplest possible code that demonstrates the concept)
5. Realistic example (a real-world use case)
6. Common pitfalls and how to avoid them
7. When NOT to use this (the alternatives and when they are better)
8. Three progressive exercises with solutions
9. Further reading links (format as placeholders I can fill in)

Use clear headings, code blocks, and keep explanations concise.
```

---

### 41. Technology Comparison Guide
**Description:** Produces a detailed, opinionated comparison of two or more technologies for a specific use case.

**Tags:** `comparison` `decision-making` `technology` `architecture` `learning`

**Prompt:**
```
Compare [TECHNOLOGY A] vs. [TECHNOLOGY B] (vs. [TECHNOLOGY C if applicable]) for the following use case:

Use case: [e.g., "building a REST API with PostgreSQL for a startup team of 3"]
My context: [e.g., "team knows Python well, need to ship fast, performance is not critical yet"]

Comparison dimensions:
1. Learning curve and developer experience
2. Performance characteristics (with rough benchmarks if known)
3. Ecosystem and community support
4. Scalability ceiling
5. Operational complexity (deployment, maintenance)
6. Cost (licensing, hosting, tooling)
7. When each shines and when each is a poor fit
8. Migration path if you outgrow it

Present findings as a table first, then a narrative recommendation for my specific context.
End with: "If I were starting this project today, I would choose X because..."
```

---

### 42. Personalized Learning Roadmap Generator
**Description:** Creates a custom week-by-week learning plan for mastering a technology, based on existing skills.

**Tags:** `learning` `roadmap` `education` `self-improvement`

**Prompt:**
```
Create a personalized learning roadmap for the following goal:

Goal: I want to learn / master [TECHNOLOGY, e.g., "Rust", "Kubernetes", "advanced TypeScript"]
Current skill level: [DESCRIBE YOUR CURRENT EXPERIENCE WITH THIS AND RELATED TECHNOLOGIES]
Time available: [e.g., 1 hour per day, 10 hours per week]
Target: [e.g., "able to build production services", "pass the CKA certification", "contribute to OSS"]

The roadmap should:
1. Break learning into weekly milestones
2. For each week: learning objectives, recommended resources (books/docs/courses — as placeholders), and a hands-on mini-project to apply the learning
3. Include common beginner mistakes to avoid
4. Suggest a "capstone project" at the end that demonstrates mastery
5. Note which concepts to go deep on vs. which to just understand at a surface level
6. Flag prerequisites I should cover before starting (if any)
```

---

### 43. Code Walkthrough — Line-by-Line Execution Trace
**Description:** Traces execution through complex code step by step, tracking variable state at each point.

**Tags:** `debugging` `education` `code-walkthrough` `execution-trace`

**Prompt:**
```
Walk through the execution of the following code step by step:

[PASTE CODE]

Input used for the trace: [SPECIFIC INPUT VALUE]

For each significant step:
1. Which line is executing
2. Current values of all relevant variables
3. What decision/branch is taken (if applicable)
4. Any side effects (function calls, mutations)

After the walkthrough:
- What is the final output / return value?
- Are there any edge cases where execution would differ significantly?
- Is there any step where a developer commonly makes a wrong assumption?
```

---

---

## CATEGORY 8 — CREATIVITY
*Feature brainstorming, naming, problem solving, innovation, ideation*

---

### 44. Feature Brainstorming Session
**Description:** Generates a broad range of creative, differentiated feature ideas for a product with feasibility notes.

**Tags:** `brainstorming` `ideation` `product` `creativity` `features`

**Prompt:**
```
Act as a creative product strategist and senior engineer. Brainstorm feature ideas for the following:

Product: [DESCRIBE YOUR PRODUCT]
Target users: [USER PERSONA]
Current main features: [LIST EXISTING FEATURES]
Business goal: [e.g., increase retention, expand to new market, reduce churn]
Constraints: [e.g., team of 3, 3-month roadmap, mobile-first]

Generate 15 feature ideas. For each include:
1. Feature name and one-line description
2. User problem it solves
3. Rough implementation complexity (S / M / L)
4. Potential impact on [the business goal]
5. One creative "twist" that would make it more differentiated from competitors

At the end, rank the top 3 by the best impact-to-effort ratio and explain why.
```

---

### 45. Naming Generator — Variables, Functions, Classes, Projects
**Description:** Generates multiple clear, idiomatic naming options for any code element with rationale.

**Tags:** `naming` `code-quality` `creativity` `conventions`

**Prompt:**
```
Generate naming options for the following code element:

What it is: [variable / function / class / interface / constant / module / project / CLI command]
What it does / represents: [DESCRIBE ITS PURPOSE AND BEHAVIOR CLEARLY]
Language and conventions: [e.g., Python snake_case, TypeScript camelCase, Kotlin PascalCase for classes]
Constraints: [e.g., max 20 chars, must start with a verb for functions, must not conflict with: [EXISTING NAMES]]

Provide 8–10 naming options. For each:
- The name itself
- A brief rationale (why this name communicates the intent)
- Any potential confusion or ambiguity to watch out for

Then recommend the top 2 and explain why they are the strongest choices.
```

---

### 46. "How Would I Build This?" Problem Solver
**Description:** Gives multiple concrete implementation approaches for a problem, with honest trade-offs to help pick the right one.

**Tags:** `problem-solving` `architecture` `creativity` `design-patterns`

**Prompt:**
```
I need to solve the following engineering problem and I want to explore multiple approaches before committing:

Problem: [DESCRIBE THE PROBLEM CLEARLY — WHAT IT MUST DO, WHAT IT MUST NOT DO]
Context: [TECH STACK, TEAM SIZE, SCALE, DEADLINE]
What I have tried: [IF ANYTHING]

Give me 3–4 distinct implementation approaches. For each:
1. Name the approach (e.g., "Polling-based", "Event-driven with Kafka", "Simple synchronous call")
2. How it works (1 paragraph)
3. A skeleton code example (pseudocode or real code)
4. Pros (where it excels)
5. Cons (where it breaks down or adds complexity)
6. When to choose this approach

End with your recommendation given my specific context, and flag any assumptions you made.
```

---

### 47. Technical Blog Post Outliner
**Description:** Generates a structured, compelling blog post outline for a technical topic that developers will actually want to read.

**Tags:** `writing` `blog` `creativity` `technical-writing` `developer-relations`

**Prompt:**
```
Create a detailed outline for a technical blog post on the following topic:

Topic: [e.g., "Why we migrated from REST to GraphQL — and what we wish we'd known"]
Target audience: [e.g., "mid-level backend developers who have heard of GraphQL but haven't used it in production"]
Goal of the post: [e.g., "educate, share hard-won lessons, attract engineers to our team"]
Approximate length: [e.g., 1500 words]

The outline must include:
1. A hook opening (question, surprising stat, or controversial statement)
2. Section headings with a one-sentence description of each section's key point
3. For each section: the argument, the supporting code example or data to include, and the key takeaway
4. A concrete "here's what to do next" conclusion
5. 3 suggested SEO-friendly titles ranked by click-worthiness
6. 5 tags / keywords to target
```

---

### 48. "Devil's Advocate" Technical Decision Reviewer
**Description:** Challenges a technical decision you have already made, surfacing risks and blind spots you may have missed.

**Tags:** `architecture` `decision-making` `risk` `critical-thinking` `creativity`

**Prompt:**
```
Play devil's advocate on the following technical decision I have made or am about to make:

Decision: [DESCRIBE THE DECISION IN DETAIL]
Rationale I used: [EXPLAIN WHY YOU CHOSE THIS]
Context: [TECH STACK, TEAM, SCALE, CONSTRAINTS]

Challenge this decision by:
1. Identifying the 3 most significant risks or failure modes I may have underweighted
2. Arguing the strongest case for the alternative(s) I did NOT choose
3. Surfacing any assumptions in my reasoning that might be wrong
4. Asking 5 pointed questions I should be able to answer confidently before proceeding
5. Describing the scenario where this decision becomes a serious regret in 18 months

Note: I am not necessarily changing my decision — I want to stress-test it.
```

---

### 49. API Design Brainstorm — Naming and Ergonomics
**Description:** Brainstorms multiple API design options for a function or endpoint with usability and ergonomics feedback.

**Tags:** `api-design` `creativity` `naming` `dx` `developer-experience`

**Prompt:**
```
I am designing the public API (function signatures / REST endpoints / SDK interface) for the following:

What it does: [DESCRIBE THE FUNCTIONALITY]
Consumers of this API: [internal team / external developers / both]
Language / protocol: [e.g., TypeScript SDK, REST HTTP, GraphQL]
Constraints: [e.g., must be backward compatible, must feel familiar to users of [POPULAR LIBRARY]]

Propose 3 different API designs. For each:
1. Show the interface / signature / endpoint with example usage code
2. Rate it on: intuitiveness (is it guessable?), consistency, verbosity, error clarity
3. Identify the main trade-off vs. the other designs

Then apply these DX heuristics to each design:
- The "pit of success" — does the easy path also happen to be the correct path?
- Discoverability — can a developer find the right method without reading docs?
- Error messages — when used wrong, does it fail loudly and helpfully?

Recommend one design and explain your reasoning.
```

---

### 50. Incident Post-Mortem Generator
**Description:** Produces a blameless post-mortem document from an incident description, with timeline, root causes, and action items.

**Tags:** `incident` `post-mortem` `devops` `reliability` `sre`

**Prompt:**
```
Write a blameless post-mortem document for the following incident:

Incident description: [WHAT HAPPENED — SYMPTOMS, IMPACT, DURATION]
Timeline of events: [PASTE RAW TIMELINE OR NOTES]
Systems affected: [SERVICE NAMES, DATABASES, USERS AFFECTED]
How it was resolved: [WHAT FIXED IT]
Tech stack: [RELEVANT SERVICES AND INFRASTRUCTURE]

Structure the post-mortem as:
1. Incident summary (title, date, severity, duration, impact)
2. Timeline (table: time | event | who noticed/acted)
3. Root cause analysis (use 5 Whys)
4. Contributing factors (not causes — things that made it worse or harder to detect)
5. What went well during the response
6. What went poorly during the response
7. Action items table: action | owner | due date | type (prevent / detect / mitigate)
8. Lessons learned

Tone: blameless — focus on systems and processes, never on individual fault.
```

---

### 51. "Rubber Duck" Thinking Partner
**Description:** Acts as an interactive thinking partner that asks Socratic questions to help you work through a complex problem.

**Tags:** `problem-solving` `thinking` `creativity` `productivity` `debugging`

**Prompt:**
```
Act as a Socratic rubber duck — a thinking partner who helps me work through a problem by asking probing questions rather than giving answers directly.

My problem: [DESCRIBE THE PROBLEM YOU ARE STUCK ON]

Process:
1. Ask me 3 clarifying questions to make sure you understand the problem
2. After I answer, reflect back what you heard and identify any gaps or contradictions in my reasoning
3. Ask "what have you already tried and why did it not work?"
4. Ask "what do you believe the root cause is, and what evidence supports that?"
5. Ask "what is the simplest possible version of this problem?"
6. If I am still stuck after 3 rounds, offer a hint — not the answer — that nudges me toward the solution
7. Only reveal the solution if I explicitly ask for it

Goal: help me develop the thinking, not just solve this specific instance.
```

---

### 52. Green / Yellow / Red Code Review Feedback Formatter
**Description:** Takes raw review notes and formats them into a constructive, tiered code review comment using the Green/Yellow/Red system.

**Tags:** `code-review` `communication` `team` `feedback` `writing`

**Prompt:**
```
Reformat and improve the following code review notes into professional, constructive feedback organized by priority:

Raw notes: [PASTE YOUR REVIEW NOTES]
Code being reviewed: [PASTE THE CODE OR DESCRIBE IT]
Reviewer context: [e.g., "senior reviewing a mid-level developer's PR"]

Format as:
- RED (blocking — must fix before merge): issues that introduce bugs, security vulnerabilities, or violate hard team standards
- YELLOW (suggested — should discuss): improvements that would make the code meaningfully better but are not strictly blocking
- GREEN (praise — keep doing this): specific things done well that should be reinforced

For each comment:
- Be specific and reference the line or function
- Explain WHY it matters, not just what to change
- Suggest the fix (or ask a question if the intent is unclear)
- Use "I suggest..." or "Consider..." language — never imperative commands

End with an overall summary that is honest but encouraging.
```

---

### 53. "Explain Like I'm a Business Stakeholder" Translator
**Description:** Translates technical decisions, architecture choices, or incident reports into business language for non-technical audiences.

**Tags:** `communication` `business` `writing` `stakeholders` `translation`

**Prompt:**
```
Translate the following technical content into clear business language for a non-technical stakeholder (e.g., a product manager, CEO, or investor):

Technical content: [PASTE THE TECHNICAL EXPLANATION, ARCHITECTURE DECISION, INCIDENT REPORT, OR ENGINEERING UPDATE]

The translated version should:
- Use no technical jargon (if a term is unavoidable, define it in plain English on first use)
- Focus on business impact: what does this mean for users, revenue, timelines, or risk?
- Answer the questions a stakeholder actually cares about: "Is this a problem?", "How does it affect me?", "What are we doing about it?", "When will it be resolved?"
- Be under 200 words unless the content demands more
- Use an analogy if it helps (e.g., comparing a database index to a book's table of contents)

Then provide a one-sentence TL;DR suitable for a status update email.
```

---

### 54. Side Project Validator
**Description:** Stress-tests a side project or startup idea from a technical and business perspective before you invest time building it.

**Tags:** `creativity` `product` `validation` `startup` `planning`

**Prompt:**
```
Help me validate the following side project idea before I start building it:

Idea: [DESCRIBE YOUR PROJECT IDEA]
Target users: [WHO IS THIS FOR]
My skills: [YOUR TECH STACK AND EXPERIENCE]
Time available: [e.g., 10 hours/week]
Goal: [e.g., "earn $500/month", "build a portfolio project", "learn Rust in production"]

Evaluate from two angles:

TECHNICAL:
1. What is the hardest technical problem in this idea?
2. What are the most likely technical failure points?
3. What is the MVP that could be built in [2 weeks]?
4. Which parts should I build vs. use existing services (e.g., Stripe for payments, Auth0 for auth)?

BUSINESS:
1. Who else is building this — and is that a problem?
2. How would a user find this? (distribution challenge)
3. What would make someone pay for or keep using this?
4. What is the most likely reason this fails?

End with: "The highest-risk assumption you need to validate first is..." and suggest how to validate it without writing code.
```

---

### 55. Daily Standup / Status Update Generator
**Description:** Converts a brain dump of what you worked on into a clean, structured async standup update.

**Tags:** `productivity` `communication` `standup` `async` `workflow`

**Prompt:**
```
Convert the following raw notes into a clean, concise async standup update for my team:

Raw notes from today:
[DUMP EVERYTHING YOU DID TODAY — MESSY IS FINE]

Format the update as:
**Yesterday:** [What was completed — focus on outcomes, not just activity]
**Today:** [What I plan to work on — specific tasks]
**Blockers:** [Anything slowing me down or requiring input from someone else]
**FYI / context:** [Optional — anything the team should know that doesn't fit above]

Rules:
- Keep it under 100 words total
- Use plain language — no internal jargon that a new team member wouldn't understand
- Make blockers specific: who do I need input from and what exactly do I need?
- Start each bullet with a verb (Completed, Reviewed, Fixed, Working on, Waiting for)
```
