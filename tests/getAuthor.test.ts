import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { GET_AUTHOR, SAVE_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { prepareDb } from './helpers/prepareDb';

const { query, mutate } = createTestClient(server) as any;

describe('queries/getAuthor', () => {
  beforeAll(async () => {
    await prepareDb();
  });

  test(`gets an author if it exists`, async () => {
    const realBill = fixtures['real-bill'];

    const mutationResponse = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: realBill,
      },
    });

    expect(mutationResponse.data.saveAuthor.length).toBeGreaterThan(0);

    const {
      data: { author },
    } = await query({
      query: GET_AUTHOR,
      variables: {
        id: mutationResponse.data.saveAuthor,
      },
    });
    expect(author.id.length).toBeGreaterThan(0);
    expect(author.birthdate).toBe(realBill.birthdate);
    expect(author.deathdate).toBe(realBill.deathdate);
    expect(author.name).toBe(realBill.name);
    expect(author.alias.sort()).toEqual(realBill.alias.sort());
    expect(author.thumbnail).toEqual(realBill.thumbnail);
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
