import { Subjects, Publisher, ExpirationCompleteEvent } from '@jbdevtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}