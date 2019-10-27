declare module 'hyped-logger';

declare module 'koa-logger-winston';

declare module '*.json' {
  const json: any;
  export = json;
}