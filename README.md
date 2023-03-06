# MSL Stats

![MSL logo](https://mslstats.azurewebsites.net/images/android/android-launchericon-96-96.png)

MSL Stats est une application en JavaScript basée sur l'architecture Next.js 12 qui utilise l'authentification Auth0 et une base de données MongoDB. La librairie Tailwind UI est utilisée pour la mise en page de l'application.

Bien que ce ne soit pas nécessairement un code extraordinaire, l'application fournit des fonctions préfaites pour l'API Twitch.

## Fonctionnalités
L'application MSL Stats est conçue pour gérer et afficher des statistiques sur les diffusions en direct de Mathieu Sommet( voir [about](https://mslstats.azurewebsites.net/about)), mais elle permet également aux utilisateurs de voir les rediffusions par jour ou semaine des streamers de votre choix (après login).

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