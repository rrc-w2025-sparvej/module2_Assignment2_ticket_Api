import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";

export function getAll(req: Request, res: Response) {
  const tickets = ticketService.getAllTickets();
  res.status(HTTP_STATUS.OK).json(tickets);
}

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
