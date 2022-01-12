require('dotenv').config();

const User = require('./app/model/User');

const test = async () => {
  // All users (static)
  const allUsers = await User.findAll();
  //!
  console.log('all users:');
  console.table(allUsers);
  // One user (static)
  const oneUser = await User.findById(1);
  //!
  console.log('user id:1', oneUser);

  // Insert new user (not static)
  const userTest = new User({
    firstname: 'Nadège',
    lastname: 'Monbroult',
    email: 'nadoudou@wanadoo.fr',
    password:'azerty'
  });
  await userTest.insert();
  //!
  console.log('new user:', userTest);

  // Update userTest
  userTest.firstname = 'Nadou';
  await userTest.update();
  
  const allUsersNow1 = await User.findAll();
  //!
  console.log('ALL USERS FROM DB (before delete but after update):');
  console.table(allUsersNow1);

  await userTest.delete();

  // Delete users Honoré et Victor
  /* const allUsersNow = await User.findAll();
  for(const user of allUsersNow) {
    if(user.firstname === 'test' || user.firstname === 'Honoré') {
      await user.delete();
    }
  } */
  const allUsersAfterDelete = await User.findAll();
  //!
  console.log('users after delete:');
  console.table(allUsersAfterDelete);

};

test();
