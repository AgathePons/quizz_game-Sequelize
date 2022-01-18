//!Problématique, on veut supprimer la dépendance cyclique entre Question et Answer
//Cela revient à supprimer la colonne answer_id dans la table QUESTION et à placer la bonne réponse dans la colonne is_good_answer dans une nouvelle table QUESTION

// TODO 1. On passe le script import_tables.sql pour créer les tables comme avant
//psql -U oquiz -d oquiz -f data/import_tables.sql 
// TODO 2. On passe le script d'import des données import_data.sql
//psql -U oquiz -d oquiz -f data/import_data.sql 

// TODO 3. On crèe une table QUESTION_TEMP qui va être notre nouvelle table sans answer_id
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('../app/database');

//#region MODEL
const Level = require('../app/models/level');
const Quiz = require('../app/models/quiz');
const Question = require('../app/models/question');

class QuestionTEMP extends Sequelize.Model {}

QuestionTEMP.init({
  question: Sequelize.STRING,
  anecdote: Sequelize.STRING,
  wiki: Sequelize.STRING
},{
  sequelize,
  tableName: 'question_temp'
});

// une question a un niveau
QuestionTEMP.belongsTo(Level, {
  foreignKey: 'level_id',
  as: 'level'
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(QuestionTEMP, {
  foreignKey: 'level_id',
  as: 'questions'
});

// Question : "un Quiz possède plusieurs Questions"
Quiz.hasMany(QuestionTEMP, {
  foreignKey: 'quiz_id',
  as: 'questions',
});
// et la réciproque: "une Question appartient à un seul Quiz"
QuestionTEMP.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz'
});

// une question a un niveau
Question.belongsTo(Level, {
  foreignKey: 'level_id',
  as: 'level_temp'
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
  foreignKey: 'level_id',
  as: 'questions_temp'
});

// Question : "un Quiz possède plusieurs Questions"
Quiz.hasMany(Question, {
  foreignKey: 'quiz_id',
  as: 'questions_temp',
});
// et la réciproque: "une Question appartient à un seul Quiz"
Question.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz_temp'
});

//#endregion

// création de ma table via sequelize
const createQuestionTemp = async ()=>{
  await QuestionTEMP.sync({force:true});
};

// TODO 4. On ajoute la colonne is_good_answer à la table ANSWER
//psql -U oquiz -d oquiz -f data/add_good_answer.sql

// TODO 5. On remplit la table QUESTION_TEMP à partir de QUESTION (sans answer_id)
const migrateQuestions = async() => {
  const allQuestion = await Question.findAll({include:['level_temp','quiz_temp']});
  /*notre création d'une entrée dans QUESTION_TEMP, va passer par 3 étapes

        1. je crèe une nouvelle instance QuestionTEMP
        2. j'ajoute le level
        3. j'ajoute le quiz
  */
  for(const question of allQuestion) {
    const newQuestionTEMP = new QuestionTEMP({
      question: question.question,
      anecdote: question.anecdote,
      wiki: question.wiki
    });
    newQuestionTEMP.setLevel(question.level);
    newQuestionTEMP.setQuiz(question.quiz);
    await newQuestionTEMP.save();
  }
};

/* fonction pour gérer l'ordre de mes scripts */
const manageScript = async () => {
  await createQuestionTemp();
  await migrateQuestions();
};
manageScript();