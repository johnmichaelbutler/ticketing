import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
import { randomBytes } from 'crypto';
console.clear()

const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

// Connecting to NATS
client.on('connect', () => {
  console.log('Listener connected to NATS');

  client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(client).listen();
});

// Interrupt signal
process.on('SIGINT', () => client.close());
// Terminate signal
process.on('SIGTERM', () => client.close());








