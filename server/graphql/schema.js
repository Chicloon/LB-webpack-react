export default `
scalar Date

type Auth {
  token: String
}

type Member {    
  user: User
  access: Int
}

type Chat {
  id: ID!
  name: String!
  members: [Member]
  messages: [Message]    
}

type Message {
  id: ID!
  content: String
  user: User
  chat: Chat    
  createdAt: Date
}

type User {
  id: ID!
  username: String
  messages: [Message]    
  chats: [Chat]
}

type Query {
  user: User
  users: [User]
  chat(id: ID): Chat
  chats: [Chat]
  messages(chatId: ID!): [Message]
}

type Mutation {
  login (username: String!, password: String!): Auth
  #logout: User
  signup (username: String!, password: String!, isAdmin: Boolean): Auth 
  addMessage(chatId: ID!, content: String): Message
  createChat(name: String): Chat
  addUserToChat(userId: ID, chatId: ID, access: Int): Member    
}

type Subscription {
  messageAdded: Message
}


schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
