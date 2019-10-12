import { createTestClient } from 'apollo-server-testing';
import server from '../../src/apollo';

const { query, mutate } = createTestClient(server);

describe('mutations/saveText', () => {
    test('saves a text without an author', () => {

    });
});
