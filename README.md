# OQuiz

## Jour 2 : Active Record factorisé

Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans `test.js`, par exemple :

- Trouver tous les User.
- Trouver la question dont l'id est 3.
- Créer un Level avec le nom "très difficile" et l'insérer en BDD.

Ensuite, rajouter 2 méthodes dans CoreModel :

- `findBy(params)` qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.

<details>
<summary>Un exemple</summary>

```js
Level.findBy({name:"difficile"}); // trouve le(s) level(s) dont le nom est "difficile"
User.findBy({email: "michel@oclock.io"}); // trouve le(s) user(s) dont l'email est "michel@oclock.io"
Tag.findBy({
  name: "Histoire"
}); // trouve le(s) tag(s) dont le name est "Histoire".

// trouve le(s) user(s) dont le prénom est "Paul" et le nom "Dupont"
User.findBy({
  firstname: "Paul",
  lastname: "Dupont"
});

```

</details>

- `save()` : cette méthode appelle soit `insert` soit `update`, selon que l'instance existe déjà dans la BDD ou pas.


## Jour 1 : Active Record

Les méthodes Active Record du modèle `Level` ont été codées.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `test.js`.

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir coder les méthodes Active Record du modèle `User` :

- `findAll()`, qui trouve tous les Users dans la base de données.
- `findById(id)`, qui trouve un User en fonction de son ID.
- `insert()`, qui insert l'instance courante dans la base de données.
- `update()`, qui met à jour l'instance courante dans la base de données.
- `delete()`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)

## Jour Zéro : Le début du commencement

Pour commencer, il faut mettre en place la base de données !
*Vous n'allez pas l'utiliser dans ce challenge, mais ca sera fait et ça vous rafraichit la mémoire.*

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

---

**Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.**

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

**Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".**

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

**Créer les tables grâce au fichier "import_tables.sql".**

- `psql -U oquiz -f data/import_tables.sql`

**Importer les données grâce au fichier "import_data.sql".**

- `psql -U oquiz -f data/import_data.sql`

---

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Du code classe !

L'architecture basique à base d'Express est déjà en place avec une route `/` et le controller pour y répondre.

Créer un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

---

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {

  id;
  name;
  
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
  }

};
```

---

</details>

## Don't Repeat Yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.
- Penser à supprimer les propriété `id` de toutes les classes "fille"

## Bonus 1 : ne pas autoriser de valeurs absurdes

Dans les mutateurs, rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class Tag … {

  name;

  constructor(obj) {

    …

    if(typeof obj.name !== 'string') {
      throw Error("Tag name must be a string!");
      // on "lève" une erreur => ça arrête tout !
    }

    this.name = obj.name;

  }

};
```

</details>

## Bonus 2 : Accesseurs

Dans le `CoreModel` passer la propriété `id` en propriété privée, puis ajouté un accesseur permettant de lire cette propriété. Cela aura pour effet de ne pas permettre la modification manuelle de celle-ci.

Puis rechercher des modèles qui auraient potentiellement besoin d'un accesseur (getter) afin de faciliter la récupération d'informations composites.