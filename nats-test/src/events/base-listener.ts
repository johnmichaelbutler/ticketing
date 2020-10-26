import { Subjects } from './subjects';
import { Message, Stan } from 'node-nats-streaming';

interface Event {
  subject: Subjects;
  data: any;
}

// LISTNER CLASS
export abstract class Listener<T extends Event> {
  // Name of the channel listening to
  abstract subject: T['subject'];
  // Name of queue group this listener will join
  abstract queueGroupName: string;
  // Function to run when a message is received
  abstract onMessage(data: T['data'], msg: Message): void;
  // Pre-Initialized NATS client
  private client: Stan;
  // # of seconds this listener has to ack a message
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  // Default subscription options
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  // Code to set up our subscription
  listen() {
    // Build up the subscription
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    // Set up subscription to listen to messages and run callback
    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      );
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg)
    })
  };

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'))
  }
}
