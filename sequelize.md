# Sequelize

## Colonnes par défaut

Par défaut, Sequelize utilise les colonnes "id","createAt","updatedAt".

Si on souhaite passer en snake_case, on peut utiliser l'option "underscored".

## Créer une instance

Pour créer une instance avec Sequelize, je peux utiliser le mot clef "new", j'ai également à disposition dans mon model deux méthodes :

- `Build` : crèe une instance (il faut faire save pour l'enregistrer en BDD)
- `Create` : crèe une instance et la sauvegarde en BDD

## Associations

Suivant l'association entre deux modèles (table), on va définir un verbe.

`1,1` association => hasOne ou belongsTo

`1,N` association => hasMany

`N,N` association => belongsToMany **(cas d'une table d'assciation)**

Dans le cas d'une association 1,1 ça sous-entend qu'il y a une clef étrangère référençant l'autre modèle dans une des deux tables.

Par exemple, Question a une colonne quiz_id mais Quiz n'a pas de question_id.
Donc on va définir comme relation :

```js
Question.belongsTo(Quiz,{ // on doit utiliser belongs
    foreignKey:"quiz_id",
    as:"quiz"
});

Quiz.hasMany(Question,{
    foreignKey:"quiz_id",
    as:"questions"
});
```

Pour savoir si on doit utiliser belongsTo ou hasOne. La règle est la suivante :

- `belongsTo` : la clef étrangère se trouve dans le modèle(table) de gauche
- `hasOne` : la clef étrangère se trouve dans le modèle(table) de droite

## A retenir

Les choses importantes à retenir de la journée :

- création des modèles
- paramétrage des associations
- utilisation des méthodes mises à disposition par Sequelize pour retrouver nos données
  - build
  - create
  - save
  - findOne (retourne un élément)
  - findAll (retourne un tableau d'éléments)
  - findOneByPk