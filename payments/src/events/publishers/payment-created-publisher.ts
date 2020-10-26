import { Subjects, Publisher, PaymentCreatedEvent } from '@jbdevtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}