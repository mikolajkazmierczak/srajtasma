const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const prompts = require('prompts');

function init() {
  // create a user if none exists (input from console)
  User.find().count(async (err, count) => {
    if (!err && count == 0) {
      const questions = [
        { type: 'number', name: 'phone', message: 'Phone?' },
        { type: 'text', name: 'first_name', message: 'First name?' },
        { type: 'text', name: 'last_name', message: 'Last name?' },
        { type: 'password', name: 'password', message: 'Password?' },
      ];
      const userInput = await prompts(questions);
      userInput.password = bcrypt.hashSync(userInput.password, 10);
      User.create(userInput, err => {
        if (err) console.log('error', err);
        else console.log(`Added "${userInput.phone}" to Users collection`);
      });
    }
  });
}

exports.connect = () => {
  const { MONGO_URI } = process.env;
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database');
      init();
    })
    .catch(err => {
      console.log('Failed connecting to the database. Exiting now...');
      console.error(err);
      process.exit(1);
    });
};
