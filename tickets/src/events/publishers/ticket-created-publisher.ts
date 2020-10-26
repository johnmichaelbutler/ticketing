import { Publisher, Subjects, TicketCreatedEvent } from '@jbdevtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}