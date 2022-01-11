const CoreModel = require("./CoreModel");

class Answer extends CoreModel {
    description;
    question_id;

    constructor(obj){
        super(obj);
        this.description=obj.description;
        this.question_id=obj.question_id;
    }
}

module.exports = Answer;