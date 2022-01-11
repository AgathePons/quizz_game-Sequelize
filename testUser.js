require('dotenv').config();

const Level = require('./app/model/Level');
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
    firstname: 'Marcel',
    lastname: 'Proust',
    email: 'proustoux-du-37@wanadoo.fr',
    password:'madelaine123'
  });
  //userTest.insert();
  //!
  console.log('new user:', userTest);

  // Update userTest
  userTest.firstname = 'Marcèle';
  userTest.update();
  //!
  console.log('Update user:', userTest);
  const allUsersNow1 = await User.getAllUsers();
  console.log('ALL USERS FROM DB:', allUsersNow1);

  // Delete users Honoré et Victor
  const allUsersNow = await User.getAllUsers();
  for(const user of allUsersNow) {
    if(user.firstname === 'Victor' || user.firstname === 'Honoré') {
      await user.delete();
    }
  }
  const allUsersAfterDelete = await User.getAllUsers();
  //!
  //console.log('users after delete:', allUsersAfterDelete);

  


};

test();
