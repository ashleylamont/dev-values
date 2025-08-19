export type AxisId =
  | "typing"
  | "abstraction"
  | "design"
  | "paradigm"
  | "ethos"
  | "ai"
  | "release"
  | "editor";

// Short badge templates per axis at three intensities
const BADGE_TEMPLATES: Record<
  AxisId,
  { pos: [string, string, string]; neg: [string, string, string] }
> = {
  typing: {
    pos: ["TypeScript User", "Static Typing Fan", "Category Theory Nerd"],
    neg: ["JavaScript User", "Not a Type Fan", "Types Are For Nerds"],
  },
  abstraction: {
    pos: ["Python User", "Framework Enjoyer", "Abstraction Aficionado"],
    neg: ["C User", "Control Oriented", "Writes in x86 Assembly"],
  },
  design: {
    pos: ["Owns a Whiteboard", "Blueprint First", "RFC Writer"],
    neg: ["Prototyper", "Build-first-Plan-later", "F*ck Around and Find Out"],
  },
  paradigm: {
    pos: ["Leans Functional", "Function Pipeline Fan", "Haskell User"],
    neg: [
      "Leans OOP",
      "Class Enthusiast",
      "Java Certified Enterprise Programmer",
    ],
  },
  ethos: {
    pos: ["GitHub User", "OSS Contributor", "Open-Source Celebrity"],
    neg: ["BitBucket User", "Big-Tech Engineer", "Proprietary Software Owner"],
  },
  ai: {
    pos: [
      "Has GitHub Copilot Installed",
      "AI is my Pair Programmer",
      "Vibe Coder",
    ],
    neg: ["Don't Trust AI", "Human-First", "Big Fan of the word Clanker"],
  },
  release: {
    pos: [
      "Updates Frequently",
      "Subscribes to Release Notes",
      "Daily-drives Canary",
    ],
    neg: ["Installs LTS", "Change-Averse", "Works in Government"],
  },
  editor: {
    pos: ["VS Code User", "IntelliJ User", "Is scared of a terminal"],
    neg: ["Neovim User", "Vi User", "Is scared of a GUI"],
  },
};

export type AxisScores = Record<AxisId, number>; // 0..100 toward the positive label

// Produce badges for display (strong >72, medium >60)
export function buildBadges(
  scores: AxisScores,
  medium = 60,
  strong = 72,
): string[] {
  const out: string[] = [];
  (Object.keys(scores) as AxisId[]).forEach((id) => {
    const v = scores[id] ?? 50;
    const d = v - 50;
    const t = BADGE_TEMPLATES[id];
    if (Math.abs(d) < medium - 50) return; // near neutral, no badge

    const tier = Math.abs(d) >= strong - 50 ? 2 : 1; // 0=lean,1=strong,2=max
    out.push(d >= 0 ? t.pos[tier] : t.neg[tier]);
  });
  return out.sort((a, b) => a.localeCompare(b));
}

export interface DevValuesArchetype {
  id: string;
  name: string;
  blurb: string;
  // Target leaning (0..100 toward the positive label) for any subset of axes
  vector: Partial<Record<AxisId, number>>;
  // Optional tags you can render as chips
  tags?: string[];
}

// A small, opinionated but friendly library of archetypes.
export const DEV_VALUES_ARCHETYPES: DevValuesArchetype[] = [
  {
    id: "typed_functionalist",
    name: "Typed Functionalist",
    blurb:
      "Pure functions, strong types, and tidy interfaces. If the compiler smiles, you smile back.",
    vector: {
      typing: 70,
      paradigm: 60,
      abstraction: 30,
      design: 20,
      editor: 20,
    },
    tags: ["Types", "FP", "Calm code"],
  },
  {
    id: "dynamic_prototyper",
    name: "Dynamic Prototyper",
    blurb:
      "Small spikes, quick feedback, and code you can reshape on the fly. Tests over types.",
    vector: { typing: -50, design: -40, ai: 20, abstraction: 20, editor: -20 },
    tags: ["Fast loops", "Exploration"],
  },
  {
    id: "library_architect",
    name: "Library Architect",
    blurb:
      "Good abstractions are power tools. You sketch the API, then build the house around it.",
    vector: { abstraction: 70, design: 40, typing: 20, editor: 40 },
    tags: ["APIs", "Abstractions"],
  },
  {
    id: "systems_tinkerer",
    name: "Systems Tinkerer",
    blurb:
      "Knobs and dials please. You like seeing what the machine is actually doing.",
    vector: { abstraction: -70, typing: 40, editor: -30, release: -10 },
    tags: ["Low-level", "Control"],
  },
  {
    id: "commons_hacker",
    name: "Open-Commons Hacker",
    blurb:
      "You share early, iterate in public, and believe good ideas get better in the open.",
    vector: { ethos: 70, release: 30, design: -10 },
    tags: ["OSS", "Community"],
  },
  {
    id: "product_polisher",
    name: "Product Polisher",
    blurb:
      "You like the work neat and presentable. Ship fewer, nicer things; sweat the details.",
    vector: { ethos: -40, design: 40, editor: 40, release: -20 },
    tags: ["Polish", "Curation"],
  },
  {
    id: "copilot_captain",
    name: "AI Co-Pilot Captain",
    blurb:
      "Agents scaffold, you steer. Human taste with machine speed is your happy place.",
    vector: { ai: 70, typing: 20, abstraction: 40 },
    tags: ["AI-driven", "Supervisor"],
  },
  {
    id: "handcrafted_classic",
    name: "Hand-Crafted Classic",
    blurb:
      "You’d rather understand every line. AI writes drafts, you rewrite the finale.",
    vector: { ai: -60, editor: -20, typing: 40, abstraction: -20 },
    tags: ["Human-first", "Clarity"],
  },
  {
    id: "early_explorer",
    name: "Early Explorer",
    blurb: "New languages? New tools? Hand me a changelog and a parachute.",
    vector: { release: 70, ai: 40, typing: -10 },
    tags: ["Cutting-edge"],
  },
  {
    id: "lts_caretaker",
    name: "LTS Caretaker",
    blurb:
      "Stability is a feature. You prefer things that age like wine, not milk.",
    vector: { release: -60, design: 20, typing: 30 },
    tags: ["Stable", "Predictable"],
  },
  {
    id: "terminal_monk",
    name: "Terminal Monk",
    blurb:
      "A fast editor and the CLI are your dojo. Scripts, pipes, and peace.",
    vector: { editor: -70, design: -10, abstraction: -20 },
    tags: ["CLI", "Minimal"],
  },
  {
    id: "ide_maestro",
    name: "IDE Maestro",
    blurb:
      "Refactors, inspections, and debugger breakpoints are your superpowers.",
    vector: { editor: 70, typing: 20, design: 20 },
    tags: ["IDE", "Flow"],
  },
  {
    id: "oop_organizer",
    name: "OOP Organizer",
    blurb: "Interfaces, clear boundaries, and code that mirrors the domain.",
    vector: { paradigm: -60, design: 30, typing: 10 },
    tags: ["OOP", "Structure"],
  },
  {
    id: "pragmatic_generalist",
    name: "Pragmatic Generalist",
    blurb: "A bit of everything, and opinions that move with the problem.",
    vector: {
      typing: 10,
      abstraction: 10,
      design: 10,
      paradigm: 10,
      ai: 10,
      release: 10,
      editor: 10,
      ethos: 10,
    },
    tags: ["Adaptable"],
  },
];

const clamp100 = (n: number) => Math.max(-100, Math.min(100, n));

// Simple similarity: 1 − normalized L1 distance over axes the archetype defines
function scoreArchetype(
  scores: AxisScores,
  archetype: DevValuesArchetype,
): { similarity: number; dist: number; axesCount: number } {
  const axes = Object.keys(archetype.vector) as AxisId[];
  if (axes.length === 0) return { similarity: 0, dist: 0, axesCount: 0 };

  const dist = axes.reduce((sum, ax) => {
    const user = clamp100(scores[ax] ?? 0); // 0 = neutral if missing
    const target = clamp100(archetype.vector[ax] ?? 0); // 0 = neutral if missing
    return sum + Math.abs(user - target);
  }, 0);

  const max = 200 * axes.length; // per-axis max gap is 200
  const similarity = 1 - dist / max; // 0..1
  return { similarity, dist, axesCount: axes.length };
}

export function bestArchetypes(
  scores: AxisScores,
  topK = 3,
): Array<{ archetype: DevValuesArchetype; similarity: number }> {
  return DEV_VALUES_ARCHETYPES.map((a) => ({
    archetype: a,
    ...scoreArchetype(scores, a),
  }))
    .sort((x, y) => y.similarity - x.similarity)
    .slice(0, topK)
    .map(({ archetype, similarity }) => ({ archetype, similarity }));
}
