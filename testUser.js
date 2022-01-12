require('dotenv').config();

const User = require('./app/model/User');

const test = async () => {
  // All users (static)
  const allUsers = await User.getAllUsers();
  //!
  //console.log('all users', allUsers);
  // One user (static)
  const oneUser = await User.getOneUser(3);
  //!
  //console.log('one user', oneUser);

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
  //!
  console.log('Update user:', userTest);
  const allUsersNow1 = await User.getAllUsers();
  console.log('ALL USERS FROM DB (before delete the user):');
  console.table(allUsersNow1);
  // Delete le user qu'on vient de créé
  await userTest.delete();

  // Delete users Honoré et Victor
  const allUsersNow = await User.getAllUsers();
  for(const user of allUsersNow) {
    if(user.firstname === 'test' || user.firstname === 'Honoré') {
      await user.delete();
    }
  }
  const allUsersAfterDelete = await User.getAllUsers();
  //!
  console.log('users after delete:');
  console.table(allUsersAfterDelete);

};

test();
