export type Colors =
  | "lime"
  | "orange"
  | "green"
  | "red"
  | "violet"
  | "sky"
  | "teal"
  | "yellow";

export interface AvatarValues {
  color: Colors;
  avatar: string;
}

export const avatarBackground: Colors[] = [
  "lime" /* oklch(76.8% 0.233 130.85) */,
  "orange" /* oklch(70.5% 0.213 47.604) */,
  "green" /* oklch(72.3% 0.219 149.579) */,
  "red" /* oklch(63.7% 0.237 25.331) */,
  "violet" /* oklch(60.6% 0.25 292.717) */,
  "sky" /* oklch(68.5% 0.169 237.323) */,
  "teal" /* oklch(70.4% 0.14 182.503) */,
  "yellow" /* oklch(79.5% 0.184 86.047) */,
];

export const emojis = [
  "🚀",
  "🔥",
  "❤️",
  "👻",
  "⚡",
  "🔑",
  "⚒️",
  "🔶",
  "🔷",
  "💎",
  "💰",
  "🏦",
  "💵",
  "🔔",
  "🦄",
  "🦊",
  "🐶",
  "🐰",
  "🐯",
  "🐻",
  "🐮",
  "🍕",
  "🍔",
  "💊",
  "👑",
  "🌈",
  "🤖",
  "🌕",
];
