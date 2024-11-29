# 2024BUT2_eguillou_nperissat_dlegarrec

# Compte rendu SAE 3.O1 : Création du site LocFit
<p align="center">
<img src="public/img/Locfit_logo.png" alt="Logo de FitLoc" width="500" >
</p>    

Notre équipe, composée de **Diane Le Garrec**, **Nathan Perissat** et **Elijah Guillou**, a réalisé un site de location de matériel sportif, nommé **Locfit**, dans le cadre de la **SAE 3.O1**.

Nous avons du éxécuter plusieurs parcours utilisateurs : **L'agent**, **L'administrateur** et le **client**.


Pour pouvoir faire fonctionner ce site sur n'importe quel machine, il faut d'abord éxécuter le script sql : *script_locfit.sql* qui se trouve dans le dossier **BDD**.

* Le fichier `script_locfit.sql` créé 3 tables 
    - La table ```utilisateur ``` 
    - La table ```produit ``` 
    - La table ```location ``` 
* Le fichier `scriptData.sql` insère les données dans la Base De Donnée mais il n'y a pas de réservation en cours ! C'est à vous de créer une/des réservation(s)

## Description du site

Notre site internet comporte plusieurs pages :
- **Accueil**
- **Catalogue**
- **Description des produits**
- **Panier**
- **Compte** : pour obtenir toutes ses informations enregistrés sur Locfit et les modifier si besoin. Elle n'est accessible que lorsque l'utilisateur est connecté.
- **Connexion** & **Inscription** si vous n'avez pas de compte. 
- **Création agent** : Disponible seulement pour les administrateurs

Ces pages sont accessibles dès l'accès au site et sans être connecté à un compte, pour certaines pages néammoins cela renvoie un message si l'utilisateur n'est pas connecté.

Puis chaque rôle à des pages spécifiques. 

L'admin, a une page en plus :
- **Création agent** : qui va permettre à l'admin d'inscrire et de créer un compte pour un agent sans pouvoir le supprimer par la suite.

Et pour finir le client a également une page en plus qui est : 
- **Locations** : qui va permettre au client de voir ses commandes en cours et terminées.



## Problèmes recontrés 

- Comme gros problème rencontré, il y avait la fonctionalités de modifier ses informations lorsque le client est connecté, et pouvoir enregistrer ce changement dans la base de donnée.<br></br>

- Nous avons eu un gros problème pour afficher comme produit sur notre page des éléments que nous avons implémenté dans notre base de donnée.<br></br>

- Nous avons aussi eu un problème au niveau des validations de location par un agent.



## Solutions apportées
- Transformer un recap des informations en formulaire HTML pour modifier ses infos était compliqué, donc ce que nous avons fait c'est : Faire un récap des infos avec un bouton modifier, et lorsque ce bouton est pressé afficher un formulaire qui était "caché" tant que le bouton n'était pas pressé.<br></br>

- Nous avons créer une fonction get_catalogue dans le fichier user.js qui effectue une requette SQL sur nos produits présents dans la base de donnée, nous affichons cette fonction ensuite dans la page catalogue avec une route depuis app.js.<br></br>

- Nous n'avons pas encore réglé ce problème :(.

##  Extensions et modules

Aucune extension et aucun module n'a été installé. 

## Fonctionnement

Le **client** se connecte, réserve du matérielsà des dates données. 
- Si il réserve moins de 3 jours il y a un message d'erreur.
- Si il réserve plus de 30 jours il y a un message d'erreur.

Autrement, ça **envoie** une demande de valdiation de commange a/aux agent(s). Le statut de la location est en `wait`.

L'**agent** se connecte, va dans l'onglet "Location(s)". 
Il peut voir les commandes à valider, les commandes en cours ainsi que les commandes terminées.

En validant la commande, le statut de la commande passe de "wait" à "progress". 
La commande passe donc dans la case *Location(s) en cours*. 

Pour valider le retour de la commande il doit cocher la case et remplir la date de retour effective.

Un fois le bouton *finaliser* cliqué, cela rajoute le prix du surcout en fonction du nombre de jour de retard (+20%/jrs).

Le client verra donc apparaitre un message dans l'onglet *commandes* avec le prix du surcout à payer.
