import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_TEXT, GET_TEXT, DELETE_TEXTS } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveText';
import { deleteNodes } from './testTools/db';

const { query, mutate } = createTestClient(server) as any;

const nodesToDelete: string[] = [];

describe('mutations/deleteTexts', () => {
  afterAll(async () => {
    await deleteNodes(nodesToDelete);
  });

  test(`deletes a single text`, async () => {
    const text = fixtures['around-the-world-in-80-days'];

    const {
      data: { saveText: id },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text,
      },
    });
    nodesToDelete.push(id);

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    const queryResponse = await query({
      query: GET_TEXT,
      variables: {
        id,
      },
    });

    expect(queryResponse.data.text).not.toBe(null);

    const { data } = await query({
      query: DELETE_TEXTS,
      variables: {
        ids: [id],
      },
    });

    expect(data.deleteTexts).toEqual([id]);
  });
});
