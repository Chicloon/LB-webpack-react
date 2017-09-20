const app = require('../server');

module.exports = {
  first: async () => {
    const docs = await app.models.Doctors.find();
    // console.log('docs from await', docs);

    // app.models.Contacts.count((error, count) => {
    //   console.log(count);
    // });
    // app.dataSources.mongoDs.automigrate('Doctors', (err) => {
    //   if (err) throw err;

    //   app.models.Doctors.find((err, res) => console.log(res));
    // });
    // app.models.Doctors.find((err, res) => console.log(res));
    // console.log(app.models);

    // console.log(app.dataSources.mongoDs.ready('Doctors'));
    // return Docs;
  },
};
