import { Request, Response } from 'express';
import Ticket from '../models/ticketModel';

interface TicketParams {
  id: string; // Explicitly typing `id` as string
}

export const createTicket = async (req: Request, res: Response) => {
  const { bus, price, time } = req.body;
  try {
    const ticket = await Ticket.create({ bus, price, time });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket', error });
  }
};

export const viewTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({ isAvailable: true }).populate('bus');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tickets', error });
  }
};

export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId, userId } = req.body; // Extract ticketId and userId from the request body
  try {
    // Find the ticket by its ID
    const ticket = await Ticket.findById(ticketId);

    // If ticket not found or is unavailable, return a 400 error
    if (!ticket || !ticket.isAvailable) {
      res.status(400).json({ message: 'Ticket unavailable' });
      return; // Ensure no further code is executed
    }

    // Mark the ticket as unavailable and save changes
    ticket.isAvailable = false;
    await ticket.save();

    // Respond with success
    res.status(200).json({ message: 'Ticket purchased successfully' });
  } catch (error) {
    // Handle errors and respond with a 400 status
    res.status(400).json({ message: 'Error purchasing ticket', error });
  }
};

export const updateTicket = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;  // Ensure we return early after sending a response
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket', error });
  }
};

export const deleteTicket = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;  // Ensure we return early after sending a response
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ticket', error });
  }
};
