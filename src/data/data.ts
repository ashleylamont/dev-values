export interface DevValuesQuestion {
  id: string;
  text: string;
  // Axes for which a positive answer increases the score
  positiveAxes: string[];
  // Axes for which a positive answer decreases the score
  negativeAxes: string[];
}

export interface DevValuesAxis {
  id: string;
  name: string;
  description: string;
  positiveLabel: string;
  negativeLabel: string;
  farNegativeDescription: string;
  moderateNegativeDescription: string;
  lightNegativeDescription: string;
  neutralDescription: string;
  lightPositiveDescription: string;
  moderatePositiveDescription: string;
  farPositiveDescription: string;
}

// Axes
export const DEV_VALUES_AXES: DevValuesAxis[] = [
  {
    id: "arch",
    name: "Architecture",
    description:
      "Preference for higher-level abstractions versus lower-level explicit control.",
    positiveLabel: "Abstract",
    negativeLabel: "Concrete",
    farNegativeDescription:
      "Prefers low-level primitives and direct tunables; minimal reliance on frameworks or generators.",
    moderateNegativeDescription:
      "Implements key paths with explicit control and fine-grained configuration.",
    lightNegativeDescription:
      "Leans to explicit APIs and escape hatches, even if it adds some complexity.",
    neutralDescription:
      "Mixes abstraction and control based on context and impact.",
    lightPositiveDescription:
      "Uses frameworks to hide boilerplate and common cross-cutting concerns.",
    moderatePositiveDescription:
      "Defaults to high-level components and code generation to reduce incidental complexity.",
    farPositiveDescription:
      "Maximizes developer-time leverage with layered abstractions and managed building blocks.",
  },
  {
    id: "proc",
    name: "Delivery Process",
    description:
      "Emphasis on upfront design and gates versus rapid iteration and learning-by-shipping.",
    positiveLabel: "Upfront Design",
    negativeLabel: "Prototyping",
    farNegativeDescription:
      "Ships early and often with lightweight checks; course-corrects via rapid feedback.",
    moderateNegativeDescription:
      "Optimizes for MVPs and short cycles; formal planning is minimal.",
    lightNegativeDescription:
      "Uses flags and staged rollouts to iterate while watching impact.",
    neutralDescription: "Balances upfront thinking with incremental releases.",
    lightPositiveDescription:
      "Begins significant work with short design notes and acceptance criteria.",
    moderatePositiveDescription:
      "Uses explicit gates (reviews, tests, canaries) for risky changes.",
    farPositiveDescription:
      "Prioritizes comprehensive specifications, formal reviews, and quality bars before release.",
  },
  {
    id: "team",
    name: "Collaboration",
    description:
      "Organization-wide standardization versus team-level autonomy in tools and process.",
    positiveLabel: "Standardization",
    negativeLabel: "Team Autonomy",
    farNegativeDescription:
      "Teams choose their own stacks and practices with minimal central constraints.",
    moderateNegativeDescription:
      "Local conventions can override org standards when they improve outcomes.",
    lightNegativeDescription:
      "Prefers opt-in guidelines with room for exceptions.",
    neutralDescription:
      "Adopts shared practices where helpful; allows divergence when justified.",
    lightPositiveDescription:
      "Uniform lint/format/build tools to reduce friction across teams.",
    moderatePositiveDescription:
      "Converges on shared patterns to ease mobility and cross-team maintenance.",
    farPositiveDescription:
      "Strong central standards, tooling, and conventions applied consistently across the org.",
  },
  {
    id: "risk",
    name: "Stability",
    description:
      "Willingness to trade speed for reliability versus accepting controlled risk for velocity.",
    positiveLabel: "Reliability",
    negativeLabel: "Speed",
    farNegativeDescription:
      "Tolerates higher operational risk to meet deadlines and respond quickly.",
    moderateNegativeDescription:
      "Deploys directly when rollback is easy and blast radius is small.",
    lightNegativeDescription:
      "Accepts limited shortcuts when customer impact is time-sensitive.",
    neutralDescription: "Balances error budgets with delivery needs.",
    lightPositiveDescription:
      "Uses canaries/gradual rollouts for most nontrivial changes.",
    moderatePositiveDescription:
      "Enforces SLOs and review gates, delaying releases when needed.",
    farPositiveDescription:
      "Optimizes for predictability and resilience even at substantial cost to speed.",
  },
  {
    id: "type",
    name: "Typing",
    description:
      "Value placed on static typing and compile-time guarantees versus dynamic flexibility.",
    positiveLabel: "Static Types",
    negativeLabel: "Dynamic Types",
    farNegativeDescription:
      "Favors dynamic languages for speed and experimentation; relies on tests/runtime checks.",
    moderateNegativeDescription:
      "Uses types selectively; avoids strictness until the domain stabilizes.",
    lightNegativeDescription:
      "Adds annotations where helpful, but keeps ergonomics simple.",
    neutralDescription: "Chooses typing strength per domain and maturity.",
    lightPositiveDescription:
      "Sees clear IDE/refactor benefits from type annotations.",
    moderatePositiveDescription:
      "Defaults to strong typing for larger or longer-lived codebases.",
    farPositiveDescription:
      "Prioritizes strict static guarantees and generics for correctness and tooling.",
  },
  {
    id: "repo",
    name: "Codebase Structure",
    description:
      "Single shared monorepo versus multiple independent repositories.",
    positiveLabel: "Monorepos",
    negativeLabel: "Multirepos",
    farNegativeDescription:
      "Prefers many repos with clear boundaries and independent lifecycles.",
    moderateNegativeDescription:
      "Optimizes for ownership clarity and lighter checkouts.",
    lightNegativeDescription:
      "Uses separate repos to decouple release cadence where helpful.",
    neutralDescription:
      "Mixes monorepo and multirepo based on coupling and ownership.",
    lightPositiveDescription:
      "Values atomic cross-service changes and unified tooling.",
    moderatePositiveDescription:
      "Centralized CI and shared infra outweigh monorepo scaling costs.",
    farPositiveDescription:
      "Strongly favors a single repo for consistency, discoverability, and org-wide changes.",
  },
  {
    id: "plat",
    name: "Platform",
    description:
      "Using managed cloud services versus running infrastructure yourself.",
    positiveLabel: "Cloud-First",
    negativeLabel: "Self-Hosted",
    farNegativeDescription:
      "Runs core services in-house for full control and portability.",
    moderateNegativeDescription:
      "Owns critical components to manage cost, performance, and compliance.",
    lightNegativeDescription:
      "Self-hosts selectively to avoid lock-in and provider limits.",
    neutralDescription:
      "Combines managed and self-hosted services pragmatically.",
    lightPositiveDescription:
      "Adopts provider primitives (auth/queues/secrets) to reduce toil.",
    moderatePositiveDescription:
      "Defaults to managed databases and platforms to accelerate delivery.",
    farPositiveDescription:
      "Maximizes managed offerings to minimize undifferentiated ops work.",
  },
  {
    id: "obs",
    name: "Operational Surface",
    description:
      "Rich observability by default versus keeping systems minimal.",
    positiveLabel: "Observability",
    negativeLabel: "Minimalism",
    farNegativeDescription:
      "Minimizes agents/sidecars/dashboards; prefers few moving parts.",
    moderateNegativeDescription:
      "Restricts instrumentation to essentials for simplicity.",
    lightNegativeDescription: "Adds telemetry sparingly to reduce overhead.",
    neutralDescription:
      "Observes enough to operate safely without over-instrumenting.",
    lightPositiveDescription:
      "Standard metrics, tracing, and structured logs for most services.",
    moderatePositiveDescription:
      "Invests in feature flags and progressive delivery to manage risk.",
    farPositiveDescription:
      "Comprehensive telemetry and controls to support frequent, safe changes.",
  },
];

// Questions
export const DEV_VALUES_QUESTIONS: DevValuesQuestion[] = [
  // Architecture
  {
    id: "A1",
    text: "For most teams, higher-level frameworks are worth the trade-off in fine-grained control.",
    positiveAxes: ["arch"],
    negativeAxes: [],
  },
  {
    id: "A2",
    text: "Gaining direct control over performance characteristics is often worth extra complexity.",
    positiveAxes: [],
    negativeAxes: ["arch"],
  },
  {
    id: "A3",
    text: "Abstractions that hide distributed concerns (retries, timeouts, backoff) are beneficial by default.",
    positiveAxes: ["arch"],
    negativeAxes: [],
  },
  {
    id: "A4",
    text: "Exposing lower-level details helps diagnose issues and avoid leaky abstractions.",
    positiveAxes: [],
    negativeAxes: ["arch"],
  },

  // Delivery Process
  {
    id: "P1",
    text: "Significant work should begin with a concise written plan or design note.",
    positiveAxes: ["proc"],
    negativeAxes: [],
  },
  {
    id: "P2",
    text: "Shipping a thin MVP to learn from users beats extended planning for most features.",
    positiveAxes: [],
    negativeAxes: ["proc"],
  },
  {
    id: "P3",
    text: "Risky changes should meet explicit entry/exit criteria (tests, review, canary).",
    positiveAxes: ["proc"],
    negativeAxes: [],
  },
  {
    id: "P4",
    text: "Merging behind a feature flag and refining post-release is acceptable for non-critical work.",
    positiveAxes: [],
    negativeAxes: ["proc"],
  },

  // Collaboration
  {
    id: "C1",
    text: "Uniform tooling (lint/format/build) across teams reduces friction more than it constrains.",
    positiveAxes: ["team"],
    negativeAxes: [],
  },
  {
    id: "C2",
    text: "Teams should be free to choose languages/frameworks when they own the outcomes.",
    positiveAxes: [],
    negativeAxes: ["team"],
  },
  {
    id: "C3",
    text: "Converging on shared patterns improves cross-team mobility and maintainability.",
    positiveAxes: ["team"],
    negativeAxes: [],
  },
  {
    id: "C4",
    text: "Local conventions may trump org standards when they measurably speed delivery.",
    positiveAxes: [],
    negativeAxes: ["team"],
  },

  // Stability / Risk
  {
    id: "R1",
    text: "I would delay a release to respect error budgets and SLOs.",
    positiveAxes: ["risk"],
    negativeAxes: [],
  },
  {
    id: "R2",
    text: "Hitting a customer deadline can justify taking controlled operational risk.",
    positiveAxes: [],
    negativeAxes: ["risk"],
  },
  {
    id: "R3",
    text: "Gradual rollouts (canary/partial) are worth the extra steps for most changes.",
    positiveAxes: ["risk"],
    negativeAxes: [],
  },
  {
    id: "R4",
    text: "A direct deploy is reasonable when rollback is easy and blast radius is small.",
    positiveAxes: [],
    negativeAxes: ["risk"],
  },

  // Typing
  {
    id: "T1",
    text: "Strong static types usually pay off in larger or longer-lived codebases.",
    positiveAxes: ["type"],
    negativeAxes: [],
  },
  {
    id: "T2",
    text: "Dynamic typing often accelerates early product work without unacceptable risk.",
    positiveAxes: [],
    negativeAxes: ["type"],
  },
  {
    id: "T3",
    text: "Type annotations primarily improve tooling (jump-to-def, refactor, autocomplete).",
    positiveAxes: ["type"],
    negativeAxes: [],
  },
  {
    id: "T4",
    text: "For simple domains, tests can substitute for strict static types.",
    positiveAxes: [],
    negativeAxes: ["type"],
  },

  // Codebase Structure
  {
    id: "M1",
    text: "Atomic cross-service changes are a major advantage of a monorepo.",
    positiveAxes: ["repo"],
    negativeAxes: [],
  },
  {
    id: "M2",
    text: "Independent versioning and release cadences matter more than atomic commits.",
    positiveAxes: [],
    negativeAxes: ["repo"],
  },
  {
    id: "M3",
    text: "Centralized CI and shared infra outweigh large-repo tooling costs.",
    positiveAxes: ["repo"],
    negativeAxes: [],
  },
  {
    id: "M4",
    text: "Separate repos clarify ownership and boundaries for distributed teams.",
    positiveAxes: [],
    negativeAxes: ["repo"],
  },

  // Platform
  {
    id: "S1",
    text: "Managed databases/queues reduce operational burden enough to justify some lock-in.",
    positiveAxes: ["plat"],
    negativeAxes: [],
  },
  {
    id: "S2",
    text: "Running core infrastructure ourselves improves control and cost visibility at scale.",
    positiveAxes: [],
    negativeAxes: ["plat"],
  },
  {
    id: "S3",
    text: "Provider auth, secrets, and identity services are preferable to building equivalents.",
    positiveAxes: ["plat"],
    negativeAxes: [],
  },
  {
    id: "S4",
    text: "Self-hosting critical services avoids provider outages and deprecations.",
    positiveAxes: [],
    negativeAxes: ["plat"],
  },

  // Operational Surface
  {
    id: "O1",
    text: "Default metrics, tracing, and structured logs pay off over time.",
    positiveAxes: ["obs"],
    negativeAxes: [],
  },
  {
    id: "O2",
    text: "Minimal instrumentation keeps systems simpler to reason about.",
    positiveAxes: [],
    negativeAxes: ["obs"],
  },
  {
    id: "O3",
    text: "Feature flags and progressive delivery materially reduce risk.",
    positiveAxes: ["obs"],
    negativeAxes: [],
  },
  {
    id: "O4",
    text: "Fewer agents, sidecars, and dashboards often yields higher reliability.",
    positiveAxes: [],
    negativeAxes: ["obs"],
  },

  // Cross-axis (multi-axis)
  {
    id: "X1",
    text: "Adopting TypeScript across a monorepo improves onboarding and defect rates.",
    positiveAxes: ["type", "repo", "team"],
    negativeAxes: [],
  },
  {
    id: "X2",
    text: "Letting teams pick language and repo layout increases velocity more than it harms maintainability.",
    positiveAxes: [],
    negativeAxes: ["team", "repo"],
  },
  {
    id: "X3",
    text: "Using managed platform primitives typically reduces time-to-market.",
    positiveAxes: ["plat"],
    negativeAxes: ["proc"],
  },
  {
    id: "X4",
    text: "Self-hosting CI/CD improves control and security in regulated environments.",
    positiveAxes: ["risk"],
    negativeAxes: ["plat"],
  },
  {
    id: "X5",
    text: "Strict entry/exit criteria are worth slower iteration for high-risk changes.",
    positiveAxes: ["proc", "risk"],
    negativeAxes: [],
  },
  {
    id: "X6",
    text: "A small MVP in a dynamic language is better than waiting to establish strong typing.",
    positiveAxes: [],
    negativeAxes: ["type", "proc"],
  },
  {
    id: "X7",
    text: "Runtime observability enables safe, frequent, small releases.",
    positiveAxes: ["obs"],
    negativeAxes: ["proc"],
  },
  {
    id: "X8",
    text: "Hiding complexity behind stable abstractions helps most teams deliver faster.",
    positiveAxes: ["arch"],
    negativeAxes: ["proc"],
  },
];
