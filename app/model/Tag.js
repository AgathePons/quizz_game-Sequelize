
const CoreModel = require("./CoreModel");

class Tag extends CoreModel{
    name;

    constructor(obj){
        super(obj);
        this.name=obj.name;
    }
}

module.exports = Tag;