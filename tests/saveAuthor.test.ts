import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_AUTHOR, GET_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { deleteNodes } from './testTools/db';

const { query, mutate } = createTestClient(server) as any;

const nodesToDelete = [];

describe('mutations/saveAuthor', () => {
  afterAll(async () => {
    await deleteNodes(nodesToDelete);
  });

  test(`creates a new author if it doesn't exist yet`, async () => {
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
  });

  test(`updates an author if it exists`, async () => {
    const author = fixtures['jade-blade'];

    const initialResponse = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });

    const id = initialResponse.data.saveAuthor;

    nodesToDelete.push(id);

    expect(id.length).toBeGreaterThan(0);

    const newThumbnail = 'https://jade-blade.com/my-new-thumbnail.png';

    await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: {
          ...author,
          id,
          thumbnail: newThumbnail,
        },
      },
    });

    const queryResponse = await query({
      query: GET_AUTHOR,
      variables: {
        id,
      },
    });

    expect(queryResponse.data.author.thumbnail).toBe(newThumbnail);
  });
});
