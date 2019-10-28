import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { SAVE_TEXT, SAVE_AUTHOR } from './fixtures/queries';
import texts from './fixtures/inputs/saveText';
import authors from './fixtures/inputs/saveAuthor';
import { prepareDb } from './helpers/prepareDb';

const { mutate } = createTestClient(server) as any;

describe('mutations/saveText', () => {
  beforeAll(async () => {
    await prepareDb();
  });

  test(`creates a new text if it doesn't exist yet`, async () => {
    const text = texts['hawaiian-language'];

    const {
      data: { saveText },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text,
      },
    });

    expect(typeof saveText).toBe('string');
    expect(saveText.length).toBeGreaterThan(0);
  });

  test(`creates a new text with an author`, async () => {
    const {
      data: { saveAuthor: authorId },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author: authors['dee-doe'],
      },
    });

    const text = texts['cooking-salads'];

    const {
      data: { saveText },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text: {
          ...text,
          authors: [authorId],
        },
      },
    });

    expect(typeof saveText).toBe('string');
    expect(saveText.length).toBeGreaterThan(0);
  });

  test(`updates a text if it exists`, async () => {
    const text = texts['design-patters'];

    const {
      data: { saveText: id },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text,
      },
    });

    console.log('ID', id);

    const newUrl = 'https://design-patterns.com/Design_Patterns.epub';

    const {
      data: { saveText },
    } = await mutate({
      mutation: SAVE_TEXT,
      variables: {
        text: {
          ...text,
          url: newUrl,
          id,
        },
      },
    });

    expect(typeof saveText).toBe('string');
    expect(saveText.length).toBeGreaterThan(0);
  });
});
