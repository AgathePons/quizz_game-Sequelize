# This

Le **this** est le **contexte**.

Le contexte représente en fait où on se trouve.
Dans une instance, `this` est l'instance.
Dans une méthode statique, `this` est la classe.

`this` ⇒ contexte de la classe quand on est dans une méthode statique de la classe

## this.constructor

Le `this.constructor` n'est accessible que dans le contexte d'une instance.

`this.constructor` représente la classe de l'instance

**donc**

`this.constructor.properties` ⇒ constructor propriétés statiques de la classe

Dans le cas de notre exercice, on utilise :

```js
this.constructor.tableName
```

On va chercher depuis l'instance (`this`), la classe (`constructor`) et la propriété statique (`tableName`)

## this.property

Dans le contexte d'une instance

`this[property]` => propriété de l'instance

par exemple, si on a un `User {"firstname":"Chuck"}`

**alors**

`this["firstname"]` => "Chuck"

-------------

Dans le contexte d'une méthode statique

`this[property]` ⇒ propeiété statique de la classe

par exemple, si on a une classe `Level { static tableName="level";}`

**alors**

this["tableName"] => "level";
