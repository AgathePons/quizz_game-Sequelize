require('dotenv').config();
const Level = require('./app/model/Level');
const Question = require('./app/model/Question');
const User = require('./app/model/User');

const test = async () => {

  const allUsers = await User.findAll();
  console.log('All users:');
  console.table(allUsers);

  const question3 = await Question.findById(3);
  console.log('question id:3');
  console.table(question3);

  const levelTresDifficile = new Level({
    name: 'Très difficile'
  });
  await levelTresDifficile.insert();
  const allLevels = await Level.findAll();
  console.log('all levels:');
  console.table(allLevels);

  const test = await Level.findBy({name: 'Très difficile'});
  console.log('résultat du find by:')
  console.table(test);

  const levelVeryHard = new Level({
    name: 'Verry hard'
  });
  await levelVeryHard.save();
  console.log('test save (insert):');
  console.table(await Level.findAll());

  levelVeryHard.name = 'Very hard';
  await levelVeryHard.save();
  console.log('test save (update):');
  console.table(await Level.findAll());
};

test();