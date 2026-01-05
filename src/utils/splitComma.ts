export function splitComma(text?: string): string[] {
  if (!text) return [];

  return text
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}