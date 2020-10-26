import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@jbdevtickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    try {
      const ticket = await Ticket.findByEvent(data);
      console.log('Data for ticket-updated-listener from Ticket service', data);
      console.log('ticket from ticket-updated-listener', ticket);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      const { title, price } = data;
      ticket!.set({ title, price });
      await ticket!.save();
    } catch (error) {
      console.log(error);
    }


    msg.ack();
  }
}
