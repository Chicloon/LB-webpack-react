import User from '../../models/User';
import Chat from '../../models/Chat';

export default {
  // Fields resolvers
  userField: (parentValue, args) => {
    return User.findById(parentValue.user)
      .then(user => user)
  },
}