import Sequelize from 'sequelize';
import faker from 'faker';
import { _ } from 'lodash';



// Создаем базу
const db = new Sequelize('chatty', null, null, {
  dialect: 'sqlite',
  storage: './chatty.sqlite',
  logging: false,
});

// Определяем модели
const GroupModel = db.define('group', {
  name: { type: Sequelize.STRING },
});

const MessageModel = db.define('message', {
  text: { type: Sequelize.STRING },
});

const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

// Пользователи относятся ко многим группам
UserModel.belongsToMany(GroupModel, { through: 'GroupUser'});

// Пользователи относятся к другим пользователям (как друзья)
UserModel.belongsToMany(UserModel, { through: 'Friends', as: 'friends'});

// Сообщения пользователей
MessageModel.belongsTo(UserModel);

// Сообщения в группе
MessageModel.belongsTo(GroupModel);

// Группы могут иметь много пользователей
GroupModel.belongsToMany(UserModel, { through: 'GroupUser'});

// Создаем фейковых пользователей

// const GROUPS = 4;
// const USERS_PER_GROUP = 5;
// const MESSAGES_PER_USER = 5;
// faker.seed(123); // get consistent data every time we reload app
// // you don't need to stare at this code too hard
// // just trust that it fakes a bunch of groups, users, and messages
// db.sync({ force: true }).then(() => _.times(GROUPS, () => GroupModel.create({
//   name: faker.lorem.words(3),
// }).then(group => _.times(USERS_PER_GROUP, () => {
//   const password = faker.internet.password();
//   return group.createUser({
//     email: faker.internet.email(),
//     username: faker.internet.userName(),
//     password,
//   }).then((user) => {
//     console.log(
//       '{email, username, password}',
//       `{${user.email}, ${user.username}, ${password}}`
//     );
//     _.times(MESSAGES_PER_USER, () => MessageModel.create({
//       userId: user.id,
//       groupId: group.id,
//       text: faker.lorem.sentences(3),
//     }));
//     return user;
//   });
// })).then((userPromises) => {
//   // make users friends with all users in the group
//   Promise.all(userPromises).then((users) => {
//     _.each(users, (current, i) => {
//       _.each(users, (user, j) => {
//         if (i !== j) {
//           current.addFriend(user);
//         }
//       });
//     });
//   });
// })));



const Group = db.models.group;
const Message = db.models.message;
const User = db.models.user;

export { Group, Message, User };



