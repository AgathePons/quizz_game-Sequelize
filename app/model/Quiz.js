
const CoreModel = require("./CoreModel");

class Quiz extends CoreModel {
    title;
    description;
    user_id;

    constructor(obj){
        // appel du constructeur du parent
        super(obj);
        this.title=obj.title;
        this.description=obj.description;
        this.user_id=obj.user_id;
    }
}

module.exports = Quiz;