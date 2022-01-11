# DataMapper vs Active Record

## Méthodes

Le DataMapper regroupe l'ensemble des requêtes SQL quelque soit l'objet (quiz,question..)

AR découpe les requêtes par instance de classe (quiz,question...)

Si on a la méthode FindAllQuiz et FindAllQuestion,

- le DataMapper va contenir les deux méthodes
- AR va contenir findAll dans Question (class) et dans Quiz (class)

## Appels

Les requêtes à la base de données vont être plus conséquentes quand on va utiliser AR.

**Pourquoi ?**

Le principe du DataMapper va permettre de procéder à plusieurs enregistrements (insertion, mise à jour...) en une requête.

Le principe de AR va envoyer une requête à chaque instruction. On procède ici directement via l'instance de classe, elle se gère.

AR traite instance par instance alors que DataMapper est capable de travailler sur plusieurs enregistrements à la fois.
