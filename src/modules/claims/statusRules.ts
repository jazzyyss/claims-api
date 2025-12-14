export const allowedTransitions: Record<string, string[]> = {
  SUBMITTED: ["IN_REVIEW", "REJECTED"],
  IN_REVIEW: ["APPROVED", "REJECTED"],
  APPROVED: ["PAID", "CLOSED"],
  REJECTED: ["CLOSED"],
  PAID: ["CLOSED"],
  CLOSED: [],
};

export function canTransition(from: string, to: string): boolean {
  return allowedTransitions[from]?.includes(to) ?? false;
}