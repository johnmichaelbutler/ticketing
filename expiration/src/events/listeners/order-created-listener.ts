import { OrderCreatedEvent, Listener, Subjects } from '@jbdevtickets/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many ms to process the job:', delay);
    await expirationQueue.add({
      orderId: data.id
    }, {
      // Sets a delay in ms
      delay
    });

    msg.ack();
  }
}