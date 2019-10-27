import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { GET_AUTHOR, SAVE_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { prepareDb } from './helpers/prepareDb';

const { query, mutate } = createTestClient(server) as any;

describe('mutations/getAuthor', () => {
  beforeAll(async () => {
    await prepareDb();
  });

  test(`gets an author if it exists`, async () => {
    const johnDoe = fixtures['john-doe'];

    const {
      data: {
        saveAuthor: { id },
      },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: johnDoe,
      },
    });

    const {
      data: { author },
    } = await query({
      query: GET_AUTHOR,
      variables: {
        id,
      },
    });
    expect(typeof author.id).toBe('string');
    expect(author.birthdate).toBe(johnDoe.birthdate);
    expect(author.deathdate).toBe(johnDoe.deathdate);
    expect(author.name).toBe(johnDoe.name);
    expect(author.aliases.sort()).toEqual(johnDoe.aliases.sort());
    expect(author.thumbnail).toEqual(johnDoe.thumbnail);
  });

  test(`returns null if author doesn't exist`, async () => {
    const {
      data: { author },
    } = await query({
      query: GET_AUTHOR,
      variables: {
        id: 'invalid',
      },
    });
    expect(author).toBe(null);
  });
});
