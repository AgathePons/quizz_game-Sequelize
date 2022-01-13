require('dotenv').config();
// va chercher index.js auto
const {
  Level,
  Quiz
} = require('./app/model');

const test = async () => {
  /* const allLevels = await Level.findAll();
  //!
  console.log('all levels:');
  for (const level of allLevels) {
    console.log(level.name);
    if (level.name === 'Très difficile') {
      await level.destroy();
    }
  }

  const allLevels2 = await Level.findAll();
  //!
  console.log('all levels:');
  for (const level of allLevels2) {
    console.log(level.name);
  }
 */
  const quiz = await Quiz.findByPk(3);
  console.log('test findByPk:', quiz.title);

  const quizByTitle = await Quiz.findOne({
    where: {
      title: "Star Wars - I"
    },
    include: ["tags"]
  });
  for (const tag of quizByTitle.tags) {
    console.log('le quiz ayant pour titre Star Wars - I a le(s) tag(s):', tag.name);
  }

  /*
    Exemple d'ajout de tag dans un quiz

    const newTag = await Tag.build({name:"test"});
    await quizByTitle.addTag(newTag);
    */
};

test();