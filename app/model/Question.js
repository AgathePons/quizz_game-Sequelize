
const CoreModel = require("./CoreModel");

class Question extends CoreModel{
    wiki;
    question;
    anecdote;
    quiz_id;
    level_id;
    answer_id;

    constructor(obj){
        super(obj);
        this.wiki=obj.wiki;
        this.question=obj.question;
        this.anecdote=obj.anecdote;
        this.quiz_id=obj.quiz_id;
        this.level_id=obj.level_id;
        this.answer_id=obj.answer_id;
    }
}

module.exports = Question;