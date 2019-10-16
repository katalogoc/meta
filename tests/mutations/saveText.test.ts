import { createTestClient } from 'apollo-server-testing';
import server from '../../src/apollo';
import db from '../../src/db';

const { mutate } = createTestClient(server) as any;

const SAVE_TEXT = `
    mutation saveText($textInput: SaveTextInput!) {
        saveText(textInput: $textInput) {
        id
        url
        title
        authors {
            name
        }
            subject
        }
    }
`;

describe('mutations/saveText', () => {
    beforeAll(async () => {
        await db.init();
    });

    test('saves a new text without an author', async () => {
        const { data } = await mutate({
            mutation: SAVE_TEXT,
            variables: {
                textInput: {
                    // The text is new because it does't have an "id" field
                    title: 'Hawaiian language',
                    url: 'https://en.wikipedia.org/wiki/Hawaiian_language',
                    authors: [],
                },
            },
        });

        expect(data.saveText.id).toBeDefined();

        expect(typeof data.saveText.id).toBe('string');

        expect(data.saveText.id).toBeTruthy();
    });
});
