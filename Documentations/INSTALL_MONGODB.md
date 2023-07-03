# Installation de MongoDB

Documentation pour installer MongoDB sur Windows et sur Mac.

## Installation de MongoDB Compass sur Windows

Installation de MongoDB (server + Compass) :

1.  Rendez-vous sur le lien suivant pour télécharger MongoDB (serveur + Compass) : [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
    
2.  Avant de cliquer pour installer MongoDB, suivez ces étapes supplémentaires dans l'invite de commandes (cmd) :

    -   Tapez la commande suivante : `net localgroup "Performance Monitor Users" /add`
        
    -   Cette commande permet d'éviter un message d'erreur “Failed to add user to group. Performance Monitor Users” lors de l'installation.

4.  Après avoir effectué les étapes précédentes, lancez l’installation de MongoDB. Une fois fait, cliquez "Suivant" pour continuer l'installation de MongoDB.
    
5.  Lorsque vous arrivez à l'étape de configuration de l'instance de la base de données, choisissez l'option de base de données locale en utilisant le point (.). Concernant les identifiants, entrez vos identifiants Microsoft associés à votre ordinateur pour la création de MongoDB.
    
(**Attention** : concernant le mot de passe, c’est soit le mot de passe de l'ordinateur lui-même, soit le mot de passe du compte Microsoft associé.)

5.  Cliquez sur "Suivant" et attendez que l'installation de MongoDB se termine.
    
6.  Voilà, MongoDB est maintenant installé avec succès.

Une fois l'installation terminé :
- Etablir une nouvelle connexion : `mongodb://localhost:27017`
(**Attention**, si il y a une erreur à la création de la connexion, taper la ligne suivante : `mongodb://127.0.0.1:27017` )
- Ajouter une database : `academie`
- Ajouter une collection : `categories`
- Importer le Json avec les données (`bdd_exo.json`)

## Installation de MongoDB Compass sur Mac

**Prérequis** :
Avoir installé homebrew et xcode.
Ouvrir son terminal et exécuter la commande suivante :
-	`xcode-select –install`

Exécuter les commandes suivantes :
-	`brew tap mongodb/brew`
-	`brew update`
-	`brew install mongodb-community@6.0`

Pour démarrer le service MongoDB :
-	`brew services start mongodb-community@6.0`

Pour stopper le service MongoDB :
-	`brew services stop mongodb-community@6.0`

Se rendre sur le lient : https://www.mongodb.com/fr-fr/products/compass
-	Cliquez sur « Télécharger Maintenant »

Dans l’onglet « MongoDB Compass Download (GUI) »
Entrez les infos correspondantes à votre Mac : 
-	Version : laissez la version par défaut 
-	Platform : MacOS arm64 pour les puces M1 sinon MacOS 64-bit
-	Package : dmg

Une fois le dmg téléchargé, il faut l’ouvrir et placer l’application MongoDB Compass dans ses « Applications ».

**Lien utile** :
https://www.youtube.com/watch?v=QfTGtPKfaW4 (vidéo Youtube)

Une fois l'installation terminé :
- Etablir une nouvelle connexion : `mongodb://localhost:27017`
- Ajouter une database : `academie`
- Ajouter une collection : `categories`
- Importer le Json avec les données (`bdd_exo.json`)
