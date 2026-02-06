import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";

// returns all support tickets
export function getAll(req: Request, res: Response) {
  const tickets = ticketService.getAllTickets();
  res.status(HTTP_STATUS.OK).json(tickets);
}

// returns a single ticket by its ID
export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const foundTicket = ticketService.getTicketById(id);

  if (!foundTicket) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Ticket not found" });
  }

  res.status(HTTP_STATUS.OK).json(foundTicket);
}

// create a new support ticket
export function create(req: Request, res: Response) {
  const { title, description, priority } = req.body;

  if (!title) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Missing required field: title" });
  }

  if (!description) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Missing required field: description" });
  }

  if (!["critical", "high", "medium", "low"].includes(priority)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        message:
          "Invalid priority. Must be one of: critical, high, medium, low"
      });
  }

  const ticket = ticketService.createTicket({
    title,
    description,
    priority
  });

  res.status(HTTP_STATUS.CREATED).json(ticket);
}

// updates an existing tickket
export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { priority, status } = req.body;

  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Ticket not found" });
  }

  if (priority && !["critical", "high", "medium", "low"].includes(priority)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        message:
          "Invalid priority. Must be one of: critical, high, medium, low"
      });
  }

  if (status && !["open", "in-progress", "resolved"].includes(status)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        message:
          "Invalid status. Must be one of: open, in-progress, resolved"
      });
  }

  const updatedTicket = ticketService.updateTicket(ticket, {
    priority,
    status
  });

  res.status(HTTP_STATUS.OK).json(updatedTicket);
}

// deletes a ticket by its ID
export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Ticket not found" });
  }

  ticketService.deleteTicket(id);
  res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" });
}

// returns the urgency info from the ticket
export function urgency(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Ticket not found" });
  }

  const urgencyResult = ticketService.calculateUrgency(ticket);

  res.status(HTTP_STATUS.OK).json({
    ticket,
    urgency: urgencyResult
  });
}

