import gql from 'graphql-tag';

export default gql`
    type Lifetime {
        born: Int!
        died: Int
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
        url: String!
        type: String!
        title: String
        author: Author
        subject: String
        publisher: String
        downloads: Int
        issued: String
    }

    type Query {
        author(name: ID!): Author
        authors: [Author]!
    }
`;

// ['hasFormat', 'type', 'subject', 
// 'publisher', 'downloads', 'issued', 'title'];