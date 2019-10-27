import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_AUTHOR, GET_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { prepareDb } from './helpers/prepareDb';

const { query, mutate } = createTestClient(server) as any;

describe('mutations/saveAuthor', () => {
  beforeAll(async () => {
    await prepareDb();
  });

  test(`creates a new author if it doesn't exist yet`, async () => {
    const author = fixtures['john-doe'];

    const {
      data: { saveAuthor },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });
    expect(typeof saveAuthor.id).toBe('string');
    expect(saveAuthor.name).toBe(author.name);
    expect(saveAuthor.alias).toEqual(author.alias);
    expect(saveAuthor.thumbnail).toBe(author.thumbnail);
    expect(saveAuthor.birthdate).toBe(author.birthdate);
    expect(saveAuthor.deathdate).toBe(author.deathdate);
  });

  test(`updates an author if it exists`, async () => {
    const author = fixtures['john-doe'];

    const initialResponse = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });

    const { id } = initialResponse.data.saveAuthor;

    expect(typeof id).toBe('string');

    const newThumbnail = 'https://john-doe.com/my-new-thumbnail.png';

    await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: {
          ...author,
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

    console.log(queryResponse);
    expect(queryResponse.data.author.thumbnail).toBe(newThumbnail);
  });
});
