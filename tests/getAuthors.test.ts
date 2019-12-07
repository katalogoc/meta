import { createTestClient } from 'apollo-server-testing';
import server from '../src/apollo';
import { GET_AUTHORS, SAVE_AUTHOR } from './fixtures/queries';
import fixtures from './fixtures/inputs/saveAuthor';
import { deleteNodes } from './testTools/db';
import { Author, AuthorFilterInput, AuthorFilterOperation, AuthorIndexedField, Operation } from '../src/common/types';

const { query, mutate } = createTestClient(server) as any;

const nodesToDelete = [];

describe('queries/getAuthors', () => {
  afterAll(async () => {
    await deleteNodes(nodesToDelete);
  });

  test(`gets a list of authors`, async () => {
    const response = await query({
      query: GET_AUTHORS,
    });

    expect(response.data.authors instanceof Array).toBe(true);
    expect(response.data.authors.every((a: Author) => a.__typename === 'Author')).toBe(true);
  });

  test(`returns an author that previously was saved`, async () => {
    const author = fixtures['jill-kill'];

    const {
      data: { saveAuthor: id },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });

    nodesToDelete.push(id);

    const {
      data: { authors },
    } = await query({
      query: GET_AUTHORS,
    });

    const jillKill = authors.find((a: Author) => a.id === id);

    expect(jillKill).toBeDefined();
    expect(jillKill.name).toBe(author.name);
    expect(jillKill.birthdate).toBe(author.birthdate);
    expect(jillKill.deathdate).toBe(author.deathdate);
    expect(jillKill.alias.sort()).toEqual(author.alias.sort());
    expect(jillKill.thumbnail).toEqual(author.thumbnail);
  });

  test(`filters authors by their external ids`, async () => {
    const author = fixtures['haruki-murakami'];

    const {
      data: { saveAuthor: id },
    } = await mutate({
      mutation: SAVE_AUTHOR,
      variables: {
        author,
      },
    });

    nodesToDelete.push(id);

    const operations: AuthorFilterOperation[] = [
      {
        field: AuthorIndexedField.Xid,
        type: Operation.Eq,
        value: author.xid,
      },
    ];

    const filter: AuthorFilterInput = {
      operations,
    };

    const {
      data: { authors },
    } = await query({
      query: GET_AUTHORS,
      variables: {
        filter,
      },
    });


    const murakami = authors.find((a: Author) => a.id === id);

    expect(authors.length).toBe(1);
    expect(murakami.xid).toBe(author.xid);
  });
});
