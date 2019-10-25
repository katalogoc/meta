import { createTestClient } from 'apollo-server-testing';
import server from '../../src/apollo';
import { init, createClient, dropGraphAndSchema } from '../../src/db';

const { mutate } = createTestClient(server) as any;

const client = createClient();

const SAVE_TEXT = `
    mutation saveText($text: SaveTextInput!) {
        saveText(text: $text) {
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
        await dropGraphAndSchema(client);

        await init(client);
    });

    test('saves a new text without an author', async () => {
        const title = 'Hawaiian language';

        const url = 'https://hawaiian-language-handbook.com/book';

        const subject = ['linguistics', 'polynesian languages'];

        const { data: { saveText } } = await mutate({
            mutation: SAVE_TEXT,
            variables: {
                text: {
                    title,
                    url,
                    subject,
                },
            },
        });

        expect(typeof saveText.id).toBe('string');
        expect(saveText.id).toBeTruthy();
        expect(saveText.title).toBe(title);
        expect(saveText.url).toBe(url);
        expect(saveText.subject).toEqual(subject);
        expect(saveText.authors).toEqual([]);
    });
});
