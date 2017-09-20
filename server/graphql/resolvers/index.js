import GraphQLDate from 'graphql-date';

import UserResolvers from './user-resolvers';
import ChatResolvers from './chat-resolvers';
import MemberResolvers from './member-resolvers';
import MessageRsolvers from './message-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    user: UserResolvers.user,
    users: UserResolvers.users,
    chat: ChatResolvers.chat,
    chats: ChatResolvers.chats,
    messages: MessageRsolvers.messages,
  },
  Mutation: {
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    // logout: UserResolvers.logout,
    createChat: ChatResolvers.createChat,
    addUserToChat: ChatResolvers.addUser,
    addMessage: ChatResolvers.addMessage,
  },
  Subscription: {
    messageAdded: ChatResolvers.messageAdded,
  },
  Chat: {
    messages: ChatResolvers.messagesField,
  },
  Member: {
    user: MemberResolvers.userField,
  },
  Message: {
    user: MessageRsolvers.userField,
    chat: MessageRsolvers.chatField,
  },
  User: {
    chats: UserResolvers.chatsField,
    messages: UserResolvers.messagesField,
  },
}