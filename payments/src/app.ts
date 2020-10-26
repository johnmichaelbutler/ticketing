import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@jbdevtickets/common';
import { createChargeRouter } from './routes/new';


const app = express();
// Traffic is proxied from nginx. By default, express doesn't trust proxies
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // Encryption
    signed: false,
    // Should cookie only be sent over HTTPS
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createChargeRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
