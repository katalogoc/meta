export type CatchAllResult<T> = [
  Error[],
  T[],
];

export async function catchAll<T = any>(promises: Array<Promise<T>>): Promise<CatchAllResult<T>> {
  const errors: Error[] = [];
  const results: T[] = [];

  await Promise.all(
    promises.map((promise: Promise<T>) =>
      promise.then((result: T) => results.push(result)).catch((err: Error) => {
        errors.push(err);
      })
    )
  );
  return [errors, results];
}
