Ce projet est un gestionnaire de rendez-vous avec affichage sur un calendrier.
Il comprend une API Symfony et un front ReactJs.

Sur la fin du projet, ma machine a décidé de ne plus reconnaître mysql donc j'ai développé le reste "à l'aveuglette".

# Backend

## Prérequis
- Avoir une base de données accessible
- Avoir php

### Installation
Une fois le projet téléchargé, faire la commande ci-dessous pour installer toutes les dépendances :
  `composer install`

Dans le fichier .env, renseigner la connection string a la base données sous 'DATABASE_URL'.
Ensuite, il va falloir créer les clés privés et publiques pour l'authentification avec JWT. Vous allez devoir renseigner leur chemin d'accès dans 'JWT_PUBLIC_KEY' et 'JWT_SECRET_KEY' ainsi que le mot de passe utilisé pour générer la clé privée dans 'JWT_PASSPHRASE'
Les commandes pour créer les clés sont : 
- CLe privé : `openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048`
- Clé publique : openssl rsa -pubout -in private_key.pem -out public_key.pem

Une fois toutes ces infos renseignées, allez dans le dossier calendar/back et lancez la commande `php bin/console d:s:c` puis `php bin/console d:f:l` pour importer les données facultatives dans la base de données. Ceci vous permettra de tester le tout.


### Lancement
Lancer la commande : `symfony serve`

# Front

## Prérequis

Avoir npm sur sa machine

### Installation
  Lancer la commande : `npm i`

### Lancement

Lancer la commande : `npm start`
