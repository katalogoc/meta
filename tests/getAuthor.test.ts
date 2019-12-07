import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { GET_AUTHOR, SAVE_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { deleteNodes } from './testTools/db';

const { query, mutate } = createTestClient(server) as any;

const nodesToDelete = [];

describe('queries/getAuthor', () => {
  afterAll(async () => {
    await deleteNodes(nodesToDelete);
  });

  test(`gets an author if it exists`, async () => {
    const realBill = fixtures['real-bill'];

    const mutationResponse = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: realBill,
      },
    });

    const id = mutationResponse.data.saveAuthor;

    nodesToDelete.push(id);

    expect(id.length).toBeGreaterThan(0);

    const {
      data: { author },
    } = await query({
      query: GET_AUTHOR,
      variables: {
        id,
      },
    });
    expect(author.id.length).toBeGreaterThan(0);
    expect(author.xid).toBe(realBill.xid);
    expect(author.source).toBe(realBill.source);
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
