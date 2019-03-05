import gql from 'graphql-tag';

export default gql`
  type Lifetime {
    born: Int!
    died: Int
  }

  input QueryOptions {
    limit: Int = 100
    offset: Int = 0
  }

  type Author {
    id: String
    fullname: String
    lifetime: Lifetime!
    alias: String
    influences: [Author]
    influenced: [Author]
    contemporaries: [Author]
    texts: [Text]
  }

  type Text {
    id: String!
    url: String!
    type: String!
    title: String
    author: Author
    aboutAuthor: [String]
    subject: String
    publisher: String
    downloads: Int
    issued: String
  }

  type Query {
    author(id: ID!): Author
    authors(options: QueryOptions): [Author]!
    texts(options: QueryOptions): [Text]!
    text(id: ID!): Text
  }
`;
