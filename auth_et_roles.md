# Auth & Roles

Pour gérer les droits et utilisateurs sur un site web.

L'architecture en BDD doit être la suivante :

- une table USER pour les utilisateurs
- une table ROLE pour indiquer le nom d'un rôle
- une table PERMISSION pour indiquer le nom d'une permission

Un utilisateur pourra avoir 0 à N rôle(s) et chaque rôle aura 0 à N permission(s)