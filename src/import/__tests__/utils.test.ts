import test, { ExecutionContext } from 'ava';
import { spy } from 'sinon';
import { resolve, join } from 'path';
import { traverse, filter, map } from '../utils';

const fixturesDir = resolve(__dirname, '..', '..', '..', 'fixtures');

const rdfFiles = join(fixturesDir, 'rdf-files-test');

test('utils.traverse yields all files from directory recursively', async (t: ExecutionContext) => {
  const cb = spy();

  let count = 0;

  for await (const _ of traverse(rdfFiles)) {
    count++;
  }

  t.is(count, 5);
});

test('utils.filter yields only items which passes the predicate', async (t: ExecutionContext) => {
  const predicate = (num: number) => num % 2 === 0;

  const asyncGen = async function*() {
    for (const num of [1, 2, 3, 4]) {
      yield num;
    }
  };

  for await (const num of filter<number>(predicate)(asyncGen())) {
    t.true(num % 2 === 0);
  }
});

test('utils.map yields mapped items', async (t: ExecutionContext) => {
  const mapper = (num: number) => num * 2;

  const asyncGen = async function*() {
    for (const num of [1, 2, 3, 4]) {
      yield num;
    }
  };

  const result = [];

  for await (const num of map<number>(mapper)(asyncGen())) {
    result.push(num);
  }

  t.deepEqual(result, [2, 4, 6, 8]);
});
