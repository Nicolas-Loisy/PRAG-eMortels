# Installation de MongoDB

Documentation pour installer MongoDB sur Windows et sur Mac.

## Installation de MongoDB Compass sur Windows

Installer le fichier exe depuis cette URL :

Ouvrir une invite de commande en administrateur et exécuter : 
`net localgroup "Performance Monitor Users" /add`

Lancer l'installation.
Poursuivre l'installation.

Une fois l'installation terminé :
- Etablir une nouvelle connexion : `mongodb://localhost:27017`
- Ajouter une database : `academie`
- Ajouter une collection : `categories`
- Importer le Json avec les données 


## Installation de MongoDB Compass sur Mac

**Prérequis** :
Avoir installé homebrew et xcode.
Ouvrir son terminal et exécuter la commande suivante :
-	xcode-select –install

Exécuter les commandes suivantes :
-	brew tap mongodb/brew
-	brew update
-	brew install mongodb-community@6.0

Pour démarrer le service MongoDB :
-	brew services start mongodb-community@6.0

Pour stopper le service MongoDB :
-	brew services stop mongodb-community@6.0

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
- Importer le Json avec les données 
