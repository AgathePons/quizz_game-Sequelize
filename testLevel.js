require('dotenv').config();

// Avec le dataMapper:
/*const dataMapper = require('./app/dataMapper');

dataMapper.getAllLevels();
dataMapper.getOneLevel(1); */

// 2 façons de mettre à dispo les méthodes de classe
const Level = require('./app/model/Level');

const test = async () => {
  // Méthodes globales (static)
  const allLevels = await Level.getAllLevels();
  const level2 = await Level.getOneLevel(2);
  console.log(allLevels);
  console.log(level2);

  // Méthodes spécifiques à une instance de classe

  // On veut ajouter un niveau moyen
  const levelMoyen = new Level({
    name: 'Moyen'
  });
  levelMoyen.insert();

  // On veut ajouter un niveau moyen
  const levelIntermediaire = new Level({
    name: 'Intermédiaire'
  });
  levelIntermediaire.insert();

  // On veut suppr niveau moyen et intermédiaire

  // je récupère à nouveau les niveaux après l'insertion de deux niveaux
  const allLevelsTEMP = await Level.getAllLevels();
  console.log('après insert() et avant delete()',allLevelsTEMP);

  // Exercice : je veux supprimer le niveau moyen et le niveau intermédiaire
  for (const level of allLevelsTEMP) {
    // Si c'est "Moyen" ou "Intermédiaire", je supprime le niveau
    if (level.name == 'Moyen' || level.name == 'Intermédiaire') {
      await level.delete();
    }
  }
  const allLevelsTEMP2 = await Level.getAllLevels();
  console.log('après insert() et après delete()', allLevelsTEMP2);
};

test();