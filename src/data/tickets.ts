// Priority levels
export type Priority = "critical" | "high" | "medium" | "low";

// Status values
export type Status = "open" | "in-progress" | "resolved";

// Support ticket
export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

export const tickets: Ticket[] = [];
