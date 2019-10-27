import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_TEXT } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveText';
import { prepareDb } from './helpers/prepareDb';

const { mutate } = createTestClient(server) as any;

describe('mutations/saveText', () => {
  beforeAll(async () => {
    await prepareDb();
  });

  test(`creates a new text if it doesn't exist yet`, async () => {
    const text = fixtures['hawaiian-language'];

    const {
      data: { saveText },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text,
      },
    });
    expect(typeof saveText.id).toBe('string');
    expect(saveText.title).toBe(text.title);
    expect(saveText.url).toBe(text.url);
    expect(saveText.subject).toEqual(text.subject);
    expect(saveText.authors).toEqual([]);
  });

  test(`creates a new text with one author`, async () => {
    const text = fixtures['cooking-salads'];

    const {
      data: { saveText },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text,
      },
    });
    expect(typeof saveText.id).toBe('string');
    expect(saveText.title).toBe(text.title);
    expect(saveText.url).toBe(text.url);
    expect(saveText.subject).toEqual(text.subject);
    expect(saveText.authors).toEqual([]);
  });
});
