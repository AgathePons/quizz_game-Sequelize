const Level = require('./level');
const Answer = require('./answer');
const Quiz = require('./quiz');
const Question = require('./question');
const Tag = require('./tag');
const User = require('./user');

/*
Je définis la relation entre Question et Answer
une question possède plusieurs réponses
une question appartient à une réponse correcte
une réponse appartient à une question
*/
Question.hasMany(Answer, {
  foreignKey: 'question_id',
  as: 'answers'
});

Question.belongsTo(Answer, {
  foreignKey: 'answer_id',
  as: 'good_answer'
});

Answer.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

/*
un quiz possède plusieurs questions 0,N
une question appartient à un quizz 1,1
*/
Quiz.hasMany(Question, {
  foreignKey: 'quiz_id',
  as: 'questions'
});

Question.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz'
});

Quiz.belongsToMany(Tag, {
  as: 'tags',
  through: 'quiz_has_tag',
  foreignKey: 'quiz_id',
  otherKey: 'tag_id'
});

Tag.belongsToMany(Quiz, {
  as: 'quizList',
  through: 'quiz_has_tag',
  foreignKey: 'tag_id',
  otherKey: 'quiz_id'
});

Quiz.belongsTo(User,{
  foreignKey:'user_id',
  as:'author'
});

User.hasMany(Quiz,{
  foreignKey:'user_id',
  as:'quizList'
});

Level.hasMany(Question, {
  foreignKey: 'level_id',
  as: 'questions'
});

Question.belongsTo(Level, {
  foreignKey: 'level_id',
  as: 'level'
});

module.exports = {Level, Answer, Quiz, Question, Tag, User};