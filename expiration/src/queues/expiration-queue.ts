import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string;
}

// First arg, the "channel", or bucket in Redis to store the job
// Second arg is our options object, how to connect to redis
const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host:
      process.env.REDIS_HOST
  }
});

// The job is similar to the message in NATS. Contains our data wrapped in extra info
expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId
  })
});

export {expirationQueue};