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
// ===== Axes =====
export const DEV_VALUES_AXES: DevValuesAxis[] = [
  {
    id: "typing",
    name: "Typing",
    description:
      "How much you want the compiler to catch things versus keeping it loose and flexible.",
    positiveLabel: "Static",
    negativeLabel: "Dynamic",
    farNegativeDescription:
      "Types are optional; quick runs and tests are my safety net. The code will tell me what it wants.",
    moderateNegativeDescription:
      "Prefer dynamic until the domain settles; add structure later if it earns its keep.",
    lightNegativeDescription:
      "Annotate only the tricky bits; keep the rest breezy.",
    neutralDescription:
      "Pick the typing approach that makes this codebase calmer, not louder.",
    lightPositiveDescription:
      "Types are great documentation and make tools smarter.",
    moderatePositiveDescription:
      "Default to strong static typing for medium-to-large work; it prevents whole categories of oopsies.",
    farPositiveDescription:
      "If the compiler isn’t happy, I’m not shipping. Future-me thanks present-me.",
  },
  {
    id: "abstraction",
    name: "Abstraction",
    description:
      "Hide complexity with higher-level tools, or keep the knobs and dials in reach?",
    positiveLabel: "High-Level",
    negativeLabel: "Low-Level",
    farNegativeDescription:
      "Show me the gears. I want to see memory, layout, and what’s really happening.",
    moderateNegativeDescription:
      "I’ll accept extra code for predictable control paths.",
    lightNegativeDescription:
      "Abstractions are fine, but I want escape hatches right there.",
    neutralDescription:
      "Use the simplest level that still lets me reason about the system.",
    lightPositiveDescription:
      "Let the library handle the boilerplate; I’ve got logic to write.",
    moderatePositiveDescription:
      "Good abstractions pay rent daily by removing incidental complexity.",
    farPositiveDescription:
      "Layer-cake enjoyer: build on shoulders, not on raw rebar.",
  },
  {
    id: "design",
    name: "Design Style",
    description:
      "Sketch first or learn by building? (Both are valid; which do you reach for first?)",
    positiveLabel: "Architecture First",
    negativeLabel: "Prototype First",
    farNegativeDescription:
      "Prototype first, ask questions later. The code is the conversation.",
    moderateNegativeDescription:
      "Small spikes reveal the shape faster than long documents.",
    lightNegativeDescription: "A tiny proof-of-concept beats a long debate.",
    neutralDescription:
      "A quick plan plus a quick prototype - whichever reduces risk.",
    lightPositiveDescription:
      "A one-pager of goals and invariants makes the rest smoother.",
    moderatePositiveDescription:
      "Interfaces and constraints deserve thought before typing.",
    farPositiveDescription: "Measure twice, cut once; then cut cleanly.",
  },
  {
    id: "paradigm",
    name: "Paradigm",
    description:
      "How you like to express solutions: function pipelines or object orchestras.",
    positiveLabel: "Functional",
    negativeLabel: "Object-Oriented",
    farNegativeDescription:
      "Everything is an object; behavior lives with data; long live encapsulation.",
    moderateNegativeDescription:
      "Interfaces and polymorphism model the world clearly.",
    lightNegativeDescription:
      "Objects help organize stateful concerns and teams.",
    neutralDescription:
      "Use functions or objects - just don’t fight the problem.",
    lightPositiveDescription:
      "Pure functions and immutability reduce surprise.",
    moderatePositiveDescription:
      "Composition over inheritance; data in, data out.",
    farPositiveDescription:
      "Side-effects can stay in the corner; data should flow like a calm river.",
  },
  {
    id: "ethos",
    name: "Community Ethos",
    description: "Where you sit on sharing code and knowledge.",
    positiveLabel: "Open-Source",
    negativeLabel: "Proprietary",
    farNegativeDescription:
      "Ship it closed, curate it carefully, and publish when it’s a product.",
    moderateNegativeDescription:
      "Prefer private repos and polished releases; open later if useful.",
    lightNegativeDescription:
      "Share selectively; keep competitive bits in-house.",
    neutralDescription: "Open when it helps; closed when it must.",
    lightPositiveDescription:
      "Default public for reusable bits; sunlight is a good reviewer.",
    moderatePositiveDescription:
      "Upstream instead of long-term forks; collaborate in the open.",
    farPositiveDescription:
      "If it’s useful to others, it belongs on the commons shelf.",
  },
  {
    id: "ai",
    name: "Tooling / AI Workflow",
    description: "How much you want AI/codegen in the loop.",
    positiveLabel: "AI-Driven",
    negativeLabel: "Hand-Crafted",
    farNegativeDescription: "I hand-write it; assistants can grab coffee.",
    moderateNegativeDescription:
      "I’ll accept autocomplete - AI shouldn’t drive the bus.",
    lightNegativeDescription:
      "Maybe for boilerplate, but I prefer owning the ideas.",
    neutralDescription: "Use AI when it actually reduces thinking tax.",
    lightPositiveDescription: "Let AI sketch; I’ll edit with taste and tests.",
    moderatePositiveDescription:
      "AI for scaffolds, drafts, and options - then human judgment.",
    farPositiveDescription: "Agent-assisted building; I steer, they shovel.",
  },
  {
    id: "release",
    name: "Release Temperament",
    description: "How spicy you like your tools: brand-new or proven-classic.",
    positiveLabel: "Cutting-Edge",
    negativeLabel: "LTS/Conservative",
    farNegativeDescription:
      "Give me the stable stuff; wake me when it’s version 3.2.1.",
    moderateNegativeDescription: "Prefer LTS and long-term compatibility.",
    lightNegativeDescription: "Adopt when the sharp edges are sanded down.",
    neutralDescription: "New is fine - after someone else finds the dragons.",
    lightPositiveDescription:
      "Happy to try new versions when the payoff looks real.",
    moderatePositiveDescription:
      "Early adopter with backups; moving targets keep me sharp.",
    farPositiveDescription: "Nightlies are my breakfast cereal.",
  },
  {
    id: "editor",
    name: "Editor / Environment",
    description: "Big integrated IDE, or lightweight editor plus command line?",
    positiveLabel: "IDE/Integrated",
    negativeLabel: "Minimalist + CLI",
    farNegativeDescription:
      "Terminal native. A speedy editor and a toolbox of commands are all I need.",
    moderateNegativeDescription:
      "Prefer minimal editor + CLI; debuggers only when necessary.",
    lightNegativeDescription:
      "Linters and simple tools first; GUI when it truly helps.",
    neutralDescription:
      "Use whichever is faster for today; comfortable in both worlds.",
    lightPositiveDescription:
      "Integrated refactors and debugging keep me in flow.",
    moderatePositiveDescription:
      "I learn my IDE deeply: navigation, inspections, quick-fixes.",
    farPositiveDescription:
      "IDE power-user: breakpoints, code actions, and analysis on tap.",
  },
];

// ===== Questions =====
// 4 per axis (32) + 8 cross-axis = 40 items.
// Agreeing nudges you toward each axis’s positiveLabel in `positiveAxes`,
// and toward the negativeLabel for any axis in `negativeAxes`.
export const DEV_VALUES_QUESTIONS: DevValuesQuestion[] = [
  // Typing (Static + / Dynamic -)
  {
    id: "TY1",
    text: "Strong static types usually pay for themselves once a codebase gets medium-sized.",
    positiveAxes: ["typing"],
    negativeAxes: [],
  },
  {
    id: "TY2",
    text: "Early on, dynamic typing keeps momentum up without causing chaos.",
    positiveAxes: [],
    negativeAxes: ["typing"],
  },
  {
    id: "TY3",
    text: "I’d rather have the compiler argue with me now than a bug argue with me later.",
    positiveAxes: ["typing"],
    negativeAxes: [],
  },
  {
    id: "TY4",
    text: "If types slow me down, I’ll remove them and rely on tests and common sense.",
    positiveAxes: [],
    negativeAxes: ["typing"],
  },

  // Abstraction (High-Level + / Low-Level Control -)
  {
    id: "AB1",
    text: "Good libraries are worth it even if I don’t touch the gears underneath.",
    positiveAxes: ["abstraction"],
    negativeAxes: [],
  },
  {
    id: "AB2",
    text: "Understanding and controlling the details of what your program does is worth a few extra lines.",
    positiveAxes: [],
    negativeAxes: ["abstraction"],
  },
  {
    id: "AB3",
    text: "A helpful abstraction that hides noise is doing its job.",
    positiveAxes: ["abstraction"],
    negativeAxes: [],
  },
  {
    id: "AB4",
    text: "Abstractions are fine, but I want low-level control nearby for when they break.",
    positiveAxes: [],
    negativeAxes: ["abstraction"],
  },

  // Design Style (Upfront + / Evolutionary -)
  {
    id: "DS1",
    text: "I prefer a short design note before I touch the keyboard.",
    positiveAxes: ["design"],
    negativeAxes: [],
  },
  {
    id: "DS2",
    text: "A tiny prototype answers more questions than a long discussion.",
    positiveAxes: [],
    negativeAxes: ["design"],
  },
  {
    id: "DS3",
    text: "Figuring out what things are called and how they connect early saves trouble later.",
    positiveAxes: ["design"],
    negativeAxes: [],
  },
  {
    id: "DS4",
    text: "I learn the shape of the problem by building something small and adjusting.",
    positiveAxes: [],
    negativeAxes: ["design"],
  },

  // Paradigm (Functional + / Object-Oriented -)
  {
    id: "PD1",
    text: "Pure functions and immutability are my default starting point.",
    positiveAxes: ["paradigm"],
    negativeAxes: [],
  },
  {
    id: "PD2",
    text: "Wrapping data and logic together in objects makes sense to me.",
    positiveAxes: [],
    negativeAxes: ["paradigm"],
  },
  {
    id: "PD3",
    text: "Composition beats inheritance most days of the week.",
    positiveAxes: ["paradigm"],
    negativeAxes: [],
  },
  {
    id: "PD4",
    text: "Interfaces and polymorphism make code easier to navigate than function pipelines.",
    positiveAxes: [],
    negativeAxes: ["paradigm"],
  },

  // Community Ethos (Open Commons + / Proprietary -)
  {
    id: "EH1",
    text: "If it might help others, my default is to open-source it.",
    positiveAxes: ["ethos"],
    negativeAxes: [],
  },
  {
    id: "EH2",
    text: "I’d rather keep code private until it’s cleaned up and feels worth showing.",
    positiveAxes: [],
    negativeAxes: ["ethos"],
  },
  {
    id: "EH3",
    text: "Contributing upstream beats maintaining long-lived forks.",
    positiveAxes: ["ethos"],
    negativeAxes: [],
  },
  {
    id: "EH4",
    text: "Product managers are better at setting a clear direction for projects than open-source discussions and debates are.",
    positiveAxes: [],
    negativeAxes: ["ethos"],
  },

  // Tooling / AI Workflow (Generative + / Explicit Craft -)
  {
    id: "AI1",
    text: "Let AI draft code or docs; I’ll tidy and test.",
    positiveAxes: ["ai"],
    negativeAxes: [],
  },
  {
    id: "AI2",
    text: "I’d rather write things myself - AI is a last resort.",
    positiveAxes: [],
    negativeAxes: ["ai"],
  },
  {
    id: "AI3",
    text: "AI is great for scaffolding options I wouldn’t have considered.",
    positiveAxes: ["ai"],
    negativeAxes: [],
  },
  {
    id: "AI4",
    text: "If I can’t understand the code myself, then I don’t want AI sneaking it into the repo.",
    positiveAxes: [],
    negativeAxes: ["ai"],
  },

  // Release Temperament (Cutting-Edge + / LTS/Conservative -)
  {
    id: "RL1",
    text: "I enjoy trying new languages and tools early.",
    positiveAxes: ["release"],
    negativeAxes: [],
  },
  {
    id: "RL2",
    text: "I wait for LTS and stability before adopting new tech.",
    positiveAxes: [],
    negativeAxes: ["release"],
  },
  {
    id: "RL3",
    text: "Adopting breaking changes when upgrading is an easy choice, if the benefits are real.",
    positiveAxes: ["release"],
    negativeAxes: [],
  },
  {
    id: "RL4",
    text: "Stability beats novelty for my day-to-day work.",
    positiveAxes: [],
    negativeAxes: ["release"],
  },

  // Editor / Environment (IDE/Integrated + / Minimalist + CLI -)
  {
    id: "ED1",
    text: "An integrated IDE (refactors, debugger, inspections) makes me faster than stitching tools together.",
    positiveAxes: ["editor"],
    negativeAxes: [],
  },
  {
    id: "ED2",
    text: "A lightweight editor plus command-line tools is all I need most days.",
    positiveAxes: [],
    negativeAxes: ["editor"],
  },
  {
    id: "ED3",
    text: "I’d rather master my IDE deeply than memorize lots of separate commands.",
    positiveAxes: ["editor"],
    negativeAxes: [],
  },
  {
    id: "ED4",
    text: "Text editor + CLI (search, build, lint) gives me everything an IDE does with less overhead.",
    positiveAxes: [],
    negativeAxes: ["editor"],
  },

  // Cross-axis (multi-axis where useful)
  {
    id: "X1",
    text: "Static types make AI tools more reliable and easier to supervise.",
    positiveAxes: ["typing", "ai"],
    negativeAxes: [],
  },
  {
    id: "X2",
    text: "A quick prototype - possibly with AI help - is the best first step on uncertain problems.",
    positiveAxes: ["ai"],
    negativeAxes: ["design"],
  },
  {
    id: "X3",
    text: "Functional style pairs naturally with type-driven design to create clean and safe code.",
    positiveAxes: ["paradigm", "typing"],
    negativeAxes: [],
  },
  {
    id: "X4",
    text: "Open-source communities adopt new innovations and improvements (to their benefit) faster than big vendors.",
    positiveAxes: ["ethos", "release"],
    negativeAxes: [],
  },
  {
    id: "X5",
    text: "High-level tools plus clear interfaces beat low-level code for most everyday tasks.",
    positiveAxes: ["abstraction", "design"],
    negativeAxes: [],
  },
  {
    id: "X6",
    text: "AI tools make static typing less important, since they catch my mistakes anyway..",
    positiveAxes: ["ai"],
    negativeAxes: ["typing"],
  },
  {
    id: "X7",
    text: "Objects with well-defined interfaces are easier for mixed-experience teams than pure function pipelines.",
    positiveAxes: [],
    negativeAxes: ["paradigm"],
  },
  {
    id: "X8",
    text: "Strong type systems make high-level abstractions safer to use.",
    positiveAxes: ["typing", "abstraction"],
    negativeAxes: [],
  },
];
