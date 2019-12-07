declare module 'hyped-logger';

declare module 'koa-logger-winston';

declare module '*.json' {
  const json: any;
  export = json;
}

declare module 'try-to-catch' {
  type Type = <O = any, I1 = any, I2 = any, I3 = any, I4 = any>(i?: I1, i2?: I2, i3?: I3, i4?: I4) => O;
  const fn: Type;
  export = fn;
}