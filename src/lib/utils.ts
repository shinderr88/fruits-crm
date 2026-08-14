import { Language, LocalizedText } from "@/types";

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function localize(text: LocalizedText, language: Language): string {
  return language === "mr" ? text.mr : text.en;
}

export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
