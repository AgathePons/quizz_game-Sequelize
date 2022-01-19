require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('./app/database');


const { User, Level, Quiz, Question, Answer } = require("./app/models");

const importData = async () => {

    await sequelize.sync({
        force: true  // le force oblige la suppression puis la création de la BDD et donc supprime les données
    });

    const level = new Level({
        name: "Débutant"
    });

    await level.save();

    const user = new User(
        {
            firstname: 'Philippe',
            lastname: 'Candille',
            email: 'philippe@oclock.io',
            password: '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG',
            role: "admin"
        });

    await user.save();

    const quiz = new Quiz({
        title: "quiz 1",
        description: "test de quiz"
    });

    /* je lie mon user à mon quiz */
    // Sequelize va créer une fonction à partir de la relation qui existe entre eux
    // ici Quiz belongsTo User avec le as qui est "autohor"
    // la fonction créée va être setAuthor
    // c'est la combinaison de "set"+"ce qu'il y a dans le "as" avec une majuscule"


    /* Avant d'ajouter une association, il faut que j'ajoute en BDD mon quiz */

    const quizBDD = await quiz.save(); // il essaie de mettre à jour le quiz en BDD mais avec un id NULL

    await quizBDD.setAuthor(user); // il crèe un quiz en BDD (sans titre et sans description)

    const question = new Question({
        question: "Quel est la couleur du cheval blanc d'Henry 10",
        anecdote: "Il n'a jamais existé",
        wiki: "google.com"
    });

    // je récupère la question insérée en BDD (on a une instance avec l'id)
    const questionBDD = await question.save();

    /*
        add vient ajouter une élément à la liste existante
        set vient remplacer l'ensemble de la liste par une nouvelle
        ici il s'agit de la liste des questions d'un quiz

        le add et le set n'ajoutent pas en base de données si jamais la question n'existe pas
    */
    await quizBDD.addQuestion(question);
    //await quizBDD.setQuestions([question]);

    const answer = new Answer({
        description: "C'est vrai",
        isGoodAnswer : true
    });

    await answer.save();

    await questionBDD.addAnswer(answer);

};
importData();