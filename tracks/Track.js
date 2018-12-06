export type Track = {
  displayName: string,
  category: string, // TK categoryId type?
  summary: string,
  description: string,
  milestones: {
    summary: string,
    signals: string[],
    examples: string[]
  }[]
};
