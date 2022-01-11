class CoreModel {
    #id;

    constructor(obj){
        this.#id = obj.id;
    }

    get id(){
        return this.#id;
    }

    // Je n'ai pas besoin d'écrire de SETTER car Sequelize va le faire pour moi
    set id(value){
        console.log("mise à jour de l'id",value);
        this.#id=value;
    // test sur le type
    // ici on est au niveau de l'id, ça sous entend, qu'il soit unique et autoincrémenté
    }
}

module.exports = CoreModel;