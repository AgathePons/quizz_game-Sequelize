require('dotenv').config();

// Avec le dataMapper:
/*const dataMapper = require('./app/dataMapper');

dataMapper.getAllLevels();
dataMapper.getOneLevel(1); */

// 2 façons de mettre à dispo les méthodes de classe
const Level = require('./app/model/Level');

const test = async () => {
  // Méthodes globales (static)
  const allLevels = await Level.findAll();
  const level2 = await Level.findById(1);
  console.log(allLevels);
  console.log(level2);

  // Méthodes spécifiques à une instance de classe

  // On veut ajouter un niveau moyen
  const levelMoyen = new Level({
    name: 'Moyen'
  });
  await levelMoyen.insert();

  // On veut ajouter un niveau moyen
  const levelIntermediaire = new Level({
    name: 'Intermédiaire'
  });
  await levelIntermediaire.insert();

  // On veut suppr niveau moyen et intermédiaire

  // je récupère à nouveau les niveaux après l'insertion de deux niveaux
  const allLevelsTEMP = await Level.findAll();
  console.log('après insert() et avant delete()',allLevelsTEMP);

  await levelMoyen.delete();
  await levelIntermediaire.delete();

  const allLevelsTEMP2 = await Level.findAll();
  console.log('après insert() et après delete()', allLevelsTEMP2);
};

test();