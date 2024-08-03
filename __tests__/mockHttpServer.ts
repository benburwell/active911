import { setupServer } from 'msw/node';
import { handlers, errorHandlers } from './handlers';

export const mswServer = setupServer(...handlers);
export const mswErroredServer = setupServer(...errorHandlers);
