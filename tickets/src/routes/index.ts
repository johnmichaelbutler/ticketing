import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError } from '@jbdevtickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { app } from '../app';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined
  });
  res.send(tickets);
});

export {router as indexTicketRouter}