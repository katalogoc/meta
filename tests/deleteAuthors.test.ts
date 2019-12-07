import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_AUTHOR, GET_AUTHOR, DELETE_AUTHORS } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { deleteNodes } from './testTools/db';

const { query, mutate } = createTestClient(server) as any;

const nodesToDelete: string[] = [];

describe('mutations/deleteAuthors', () => {
  afterAll(async () => {
    await deleteNodes(nodesToDelete);
  });

  test(`deletes a single author`, async () => {
    const author = fixtures['john-doe'];

    const {
      data: { saveAuthor: id },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });
    nodesToDelete.push(id);

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    const queryResponse = await query({
      query: GET_AUTHOR,
      variables: {
        id,
      },
    });

    expect(queryResponse.data.author).not.toBe(null);

    await query({
      query: DELETE_AUTHORS,
      variables: {
        ids: [id],
      },
    });

    const queryAfterDeleteResponse = await query({
      query: GET_AUTHOR,
      variables: {
        id,
      },
    });

    expect(queryAfterDeleteResponse.data.author).toBe(null);
  });
});
