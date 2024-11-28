ALTER TABLE `produit`
ADD COLUMN `image` VARCHAR(255) AFTER `etat`;
INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Kettlebell', 'Kettlebell en fonte, idéal pour le crossfit et les entraînements de force.', 'Reebok', 'IronKettle 20kg', 8.0, 'Neuf', 'IronKettle.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Corde à sauter', 'Corde à sauter en acier, avec poignées ergonomiques et réglables.', 'Nike', 'SpeedRope', 3.0, 'Neuf', 'SpeedRope.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Ballon de gym', 'Ballon de gym anti-éclatement, diamètre de 65 cm, pour renforcement musculaire.', 'Fitball', 'ProGym 65cm', 5.0, 'Très bon état', 'ProGym.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Tapis de yoga', 'Tapis de yoga antidérapant, léger et confortable.', 'Lululemon', 'The Reversible Mat', 4.0, 'Bon état', 'YogaMat.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Élastiques de résistance', 'Set d\'élastiques de résistance pour divers exercices de fitness.', 'TheraBand', 'Resistance Set', 6.0, 'Très bon état', 'ResistanceBands.png');
INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Haltères', 'Haltères ajustables de 5 à 40 kg, parfaits pour la musculation à domicile.', 'Bowflex', 'SelectTech 552', 15.0, 'Neuf', 'SelectTech_.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Rameur', 'Rameur à résistance magnétique, idéal pour un entraînement complet du corps.', 'Concept2', 'Model D', 25.0, 'Très bon état', 'Model_D.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Vélo d\'appartement', 'Vélo d\'intérieur avec résistance réglable, écran connecté.', 'Peloton', 'Bike+', 30.0, 'Neuf', 'Bike.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Tapis de course', 'Tapis de course pliable avec amortissement avancé, vitesse max 20 km/h.', 'NordicTrack', 'Commercial 1750', 35.0, 'Bon état', 'Commercial.png');

INSERT INTO `produit` (type, description, marque, modele, prix_location, etat, image)
VALUES ('Banc de musculation', 'Banc inclinable pour divers exercices de musculation.', 'Domyos', 'Training Bench 500', 10.0, 'Très bon état', 'Training_Bench.png');


INSERT INTO `location` (date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id)
VALUES ('2024-10-01', '2024-10-07', '2024-10-06', 90.0, 1, 1);

INSERT INTO `location` (date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id)
VALUES ('2024-09-15', '2024-09-22', '2024-09-22', 175.0, 2, 2);

INSERT INTO `location` (date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id)
VALUES ('2024-08-20', '2024-08-27', '2024-08-26', 210.0, 3, 3);

INSERT INTO `location` (date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id)
VALUES ('2024-07-10', '2024-07-17', '2024-07-17', 245.0, 4, 4);

INSERT INTO `location` (date_debut, date_retour_prevue, date_retour_effective, prix_total, utilisateur_id, produit_id)
VALUES ('2024-06-05', '2024-06-10', '2024-06-10', 50.0, 5, 5);