import { Ticket } from "../api/v1/services/ticketService";

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "Update footer copyright year",
    description: "Footer still shows 2024",
    priority: "low",
    status: "open",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 6,
    title: "Login page not loading",
    description: "Users report blank screen",
    priority: "critical",
    status: "open",
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
];
