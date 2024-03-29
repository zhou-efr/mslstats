# [MSL Stats](https://mslstats.vercel.app/)

[![MSL logo](https://raw.githubusercontent.com/zhou-efr/mslstats/main/src/images/newmslstat.png)](https://mslstats.vercel.app/)

MSL Stats est une application en JavaScript basée sur l'architecture Next.js 12 qui utilise l'authentification Auth0 et une base de données MongoDB. La librairie Tailwind UI est utilisée pour la mise en page de l'application.

Bien que ce ne soit pas nécessairement un code extraordinaire, l'application fournit des fonctions préfaites pour l'API Twitch (voir [src/lib/twitch](https://github.com/zhou-efr/mslstats/tree/main/src/lib/twitch)).

## Fonctionnalités
L'application MSL Stats est conçue pour gérer et afficher des statistiques sur les diffusions en direct de Mathieu Sommet (voir [about](https://mslstats.azurewebsites.net/about)), mais elle permet également aux utilisateurs de voir les rediffusions par jour ou semaine des streamers de votre choix (après login).

## Prérequis

Pour tester l'application en local, vous aurez besoin d'une application Twitch pour les développeurs, d'une base de données MongoDB et d'un compte de développeur Auth0.
## Configuration

Vous devez remplir les secrets nécessaires dans le fichier `.env` en suivant l'exemple donné dans le fichier `.env.template`.
## Installation et utilisation

Après avoir rempli les secrets, exécutez `npm i` pour installer les dépendances, puis `npm run dev` pour lancer l'application.

## Licence

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Contact

Open an issue on the [GitHub repository](https://github.com/zhou-efr/mslstats/issues) if you have any questions or suggestions.