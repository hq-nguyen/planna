export enum CollectionColors {
  sunrise = "bg-gradient-to-r from-amber-400 to-orange-500",
  flamingo = "bg-gradient-to-r from-rose-400 to-pink-500",
  sky = "bg-gradient-to-r from-sky-400 to-indigo-500",
  ocean = "bg-gradient-to-r from-cyan-400 to-blue-500",
  lavender = "bg-gradient-to-r from-violet-400 to-fuchsia-500",
  steel = "bg-gradient-to-r from-zinc-400 to-neutral-600",
  forest = "bg-gradient-to-r from-emerald-400 to-green-500",
  blossom = "bg-gradient-to-r from-pink-300 to-rose-400",
}

export type CollectionColor = keyof typeof CollectionColors;
