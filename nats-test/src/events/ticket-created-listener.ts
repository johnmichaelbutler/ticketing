import { TicketCreatedEvent } from './ticket-created-event';
import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Subjects } from './subjects';


class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    // Business logic of data
    console.log('Event data!', data);
    msg.ack();
  }
}

export { TicketCreatedListener };