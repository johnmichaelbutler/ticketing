import { OrderCancelledPublisher } from './../publishers/order-cancelled-publisher';
import { queueGroupName } from './queue-group-name';
import { Listener, ExpirationCompleteEvent, Subjects, OrderStatus } from '@jbdevtickets/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../nats-wrapper';
import { Order } from '../../models/order';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) throw new Error('Order not found');
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id
      }
    });
    msg.ack();
  }
}