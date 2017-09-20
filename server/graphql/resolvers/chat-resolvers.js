import Chat from '../../models/Chat.js'
import Message from '../../models/Message';

import { pubsub } from '../pubsub';

const MESSAGE_ADDED = 'messageAdded';

export default {
  // queries
  chat: (parentValue, {id}) => {
    return Chat.findById(id)
  },
  chats: (_, args) => {
    return Chat.find({})
    .populate('members')
    .then(chat=> chat)
    
  },
  // mutations
  addMessage: async (_, {chatId, content}, req) => {
    const { user } = req;
    const message = await Chat.addMessage(chatId, user.id, content);

    pubsub.publish(MESSAGE_ADDED, {[MESSAGE_ADDED]: message});

    return message
  },
  addUser: (_, {chatId, userId, access}) => {
    return Chat.addUser(chatId, userId, access)        
  },
  createChat: (_, {name}, req) => {
    const { user } = req;
    console.log("user", req, user);
    return Chat.createChat(name, user.id)
  },
  // Field resolvers
  messagesField: (parentValue, args) => {
    return Chat.findById(parentValue.id)
      .populate('messages')
      .then(chat => chat.messages);
  },
  //Subscriptions 
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
  },
}