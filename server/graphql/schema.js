export default `
scalar Date

type Chat {
  id: ID!
  name: String!  
}

type Query {
  chats: [Chat]  
}

schema {
  query: Query
}
`;
