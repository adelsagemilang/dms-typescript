import { createLogger } from 'redux-logger';

// Dev Middlewares For Watching Redux and display it as a logger on console
export const devMiddlewares: any[] = [];
if (process.env.REACT_APP_ENV === 'development') {
  const loggerMiddleware = createLogger({
    diff: true,
    collapsed: true,
  });

  devMiddlewares.push(loggerMiddleware);
}
