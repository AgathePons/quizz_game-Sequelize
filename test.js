require('dotenv').config();
// va chercher index.js auto
const {
  Answer,
  Level,
  Question,
  Quiz,
  Tag,
  User
} = require('./app/model');
const { build } = require('./app/model/level');

// ------ MY TEST FUNCTIONS ------ //
/**
 * Find all levels and build an array with dataValues of each level
 * -> array of levels with a lot of data.
 * -> obj.dataValues to have all objects with just columns content
 */
const allLevels = async () => {
  const allLevels = await Level.findAll();
  const levels = [];
  for(const level of allLevels) {
    levels.push(level.dataValues);
  }
  //!
  console.log('all levels:');
  console.table(levels);
};

/**
 * Find one level by id
 * @param {number} levelId id of the level
 */
const oneLevelById = async (levelId) => {
  const levelToFind = await Level.findOne({
    where: {
      id: levelId
    }
  });
  if(levelToFind) {
    console.log(`Level ${levelId}:`, levelToFind);
  } else {
    console.log('There is no level with id:', levelId);
  }
};

/**
 * Build and save one level which name is given by argument
 * @param {string} levelName name of the level we want to build
 */
const buildLevel = async (levelName) => {
  const newLevel = Level.build({
    name: levelName
  });
  console.log('New level buildt and saved:', newLevel);
  await newLevel.save();
};

/**
 * Create one level which name is given by argument
 * @param {string} levelName name of the level we want to build
 */
const createLevel = async (levelName) => {
  const newLevel = await Level.create({
    name: levelName
  });
  console.log('New level created:', newLevel);
};

/**
 * Delete THE FIRST level whose name matches
 * @param {string} levelName name of the level
 */
const destroyOneLevel = async (levelName) => {
  const levelToDestroy = await Level.findOne({
    where: {
      name: levelName
    }
  });
  if(levelToDestroy) {
    await levelToDestroy.destroy();
  } else {
    console.log('There is no level named', levelName);
  }
  
};

/**
 * Find all levels whose name matches
 * @param {string} levelsName name of the levels to find
 */
const findLevelsByName = async (levelsName) => {
  const levelsToFind = await Level.findAll({
    where: {
      name: levelsName
    }
  });
  const foundLevels = [];
  for(const level of levelsToFind) {
    foundLevels.push(level.dataValues);
  }
  console.table(foundLevels);
  return levelsToFind;
};

/**
 * Destroy all levels whose name matches
 * @param {string} levelsName name of the levels to destroy
 */
const destroyLevelsByName = async (levelsName) => {
  const allLevels = await Level.findAll();
  for(const level of allLevels) {
    if(level.name === levelsName) {
      level.destroy();
    }
  }
};

const findOneQuizByTitle = async (quizTitle) => {
  const options = {
    where: {
      title: quizTitle
    },
    include: 'author',
  };
  const quizTofind = await Quiz.findOne(options);
  console.log(`Le quiz ${quizTofind.title} a été créé par ${quizTofind.author.firstname} ${quizTofind.author.lastname}`);
  return quizTofind;
};

const test = async () => {
/* // tests on levels
  await buildLevel('Harcore');
  await createLevel('Easy peasy');
  await findLevelsByName('Moyen...');
  await destroyOneLevel('Trop trop dur');
  await destroyLevelsByName('Harcore');
  await oneLevelById(66);
  await allLevels(); */

  // tests on quiz
  const quiz = await Quiz.findByPk(2);
  console.log('quiz title by PK:', quiz.title);
  findOneQuizByTitle('Les bières belges - I');
  
  /* const quizByTitle = await Quiz.findOne({
    where: {
      title: 'Star Wars - I'
    },
    include: ['tags']
  });
  for (const tag of quizByTitle.tags) {
    console.log('le quiz ayant pour titre Star Wars - I a le(s) tag(s):', tag.name);
  }   */

  /*
    Exemple d'ajout de tag dans un quiz

    const newTag = await Tag.build({name:"test"});
    await quizByTitle.addTag(newTag);
    */
    
};

test();