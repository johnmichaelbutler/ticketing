import { Publisher, OrderCancelledEvent, Subjects } from '@jbdevtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}