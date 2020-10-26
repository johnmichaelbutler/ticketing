import { Publisher, OrderCreatedEvent, Subjects } from '@jbdevtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}