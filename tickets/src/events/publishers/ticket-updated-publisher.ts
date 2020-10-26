import { Publisher, Subjects, TicketUpdatedEvent } from '@jbdevtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}