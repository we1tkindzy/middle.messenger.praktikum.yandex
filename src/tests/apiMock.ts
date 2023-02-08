import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.get(`${URL}/auth/user`, (_req, res, ctx) => res(ctx.status(200))),

  rest.post(`${URL}/auth/logout`, (_req, res, ctx) => res(ctx.status(200))),
];

const server = setupServer(...handlers);

export default server;
