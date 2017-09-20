// import Chat from '../../models/Chat.js'
// import Message from '../../models/Message';
// import app from '../../server';
// import { pubsub } from '../pubsub';
const app = require('../../server');

// const MESSAGE_ADDED = 'messageAdded';


export default {
  // queries  
  chats: (_, args) => {
    console.log('app is----', app);
    return app.models.Chat.find()
      .then(chat => chat);
  },
}