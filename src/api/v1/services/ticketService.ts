import { tickets, Ticket, Priority, Status } from "../../../data/tickets";

// base urgency
const urgencyBase: Record<Priority, number> = {
  critical: 50,
  high: 30,
  medium: 20,
  low: 10
};


export function getAllTickets(): Ticket[] {
  return tickets;
}

// finds a ticket by ID
export function getTicketById(id: number): Ticket | undefined {
  return tickets.find(ticket => ticket.id === id);
}

export function createTicket(
  input: Omit<Ticket, "id" | "status" | "createdAt">
): Ticket {
  const ticket: Ticket = {
    id: tickets.length + 1,
    title: input.title,
    description: input.description,
    priority: input.priority,
    status: "open",
    createdAt: new Date()
  };

  tickets.push(ticket);
  return ticket;
}

// Updates allowed on only priority and status 
export function updateTicket(
  ticket: Ticket,
  updates: { priority?: Priority; status?: Status }
): Ticket {
  if (updates.priority) {
    ticket.priority = updates.priority;
  }

  if (updates.status) {
    ticket.status = updates.status;
  }

  return ticket;
}

// Deletes a ticket by ID
export function deleteTicket(id: number): void {
  const index = tickets.findIndex(ticket => ticket.id === id);
  tickets.splice(index, 1);
}

// Calculates urgency score and level for the ticket
export function calculateUrgency(ticket: Ticket) {
  if (ticket.status === "resolved") {
    return { score: 0, level: "RESOLVED" };
  }

  const daysOld = Math.floor(
    (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const score = urgencyBase[ticket.priority] + daysOld * 5;

  if (score >= 80) return { score, level: "CRITICAL" };
  if (score >= 60) return { score, level: "HIGH" };
  if (score >= 40) return { score, level: "MEDIUM" };

  return { score, level: "LOW" };
}

