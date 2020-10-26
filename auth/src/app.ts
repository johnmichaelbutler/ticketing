import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { errorHandler, NotFoundError } from '@jbdevtickets/common';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
