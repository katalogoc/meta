import gql from 'graphql-tag';

export default gql`  
    type Lifetime {
        born: Int!
        died: Int
    }
    
    type Author {
        id: String!
        fullname: String!
        influences: [Author]
        influenced: [Author]
        contemporaries: [Author]
        lifetime: Lifetime!
    }

    type Text {
        path: String!
        origin: String!
        originMirrors: [String]
        author: Author!
    }

    type Query {
        author(id: ID!): Author
        authors: [Author]!
    }
`;