import User from '../../models/User';
import Chat from '../../models/Chat';
import Message from '../../models/Message';

export default {
  messages: (_, { chatId }) => {
    return Message.find({
      chat: chatId
    }).sort({ createdAt: 1 })
  },
  // Fields resolvers
  userField: ({ user }, args) => {
    return User.findById(user)
  },
  chatField: ({chat}, args) => {
    return Chat.findById(chat)
  }
}