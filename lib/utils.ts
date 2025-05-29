import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function preventWidows(text: string, minWordsOnLastLine = 3): string {
  const words = text.split(" ");
  if (words.length <= minWordsOnLastLine) return text;

  const lastWords = words.splice(-minWordsOnLastLine).join("\u00A0");
  return [...words, lastWords].join(" ");
}
