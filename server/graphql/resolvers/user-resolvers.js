import AuthService from '../../services/auth.js';
import { requireAuth } from '../../services/auth';

import User from '../../models/User';
import Message from '../../models/Message';

export default {
  // querries
  user:async (_, args, { user }) => {
    // console.log('user from resolver', user);
    try {
      const me = await requireAuth(user);

      return me;
    } catch (error) {
      console.log( error);
    }
  },
  users: (_, args, req) => {
    return req.user&& User.find({});    
  },
  // mutations
  signup: async (_, { username, password, isAdmin }) => {
    try {     
      const checkUser = await User.findOne({username});
      
      if(checkUser !== null) {
        throw new Error('username in use');
      }
      const user = await User.create({ username, password, isAdmin });

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }

      return {        
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },
  // Fields resolvers
  chatsField: (parentValue, args) => {
    return User.findChats(parentValue.id)
  },
  messagesField: (parentValue, args) => {
    return User.findById(parentValue.id)
      .populate('messages')
      .then(user => user.messages)
  },
}