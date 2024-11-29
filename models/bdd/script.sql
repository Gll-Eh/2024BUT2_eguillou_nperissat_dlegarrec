CREATE TABLE `utilisateur` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `login` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `nom` VARCHAR(50) NOT NULL,
  `prenom` VARCHAR(50) NOT NULL,
  `ddn` DATE NOT NULL,
  `email` VARCHAR(50) UNIQUE NOT NULL,
  `type_utilisateur` VARCHAR(10) NOT NULL
);

CREATE TABLE `location` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `date_debut` DATE NOT NULL,
  `date_retour_prevue` DATE NOT NULL,
  `date_retour_effective` DATE,
  `prix_total` FLOAT,
  `utilisateur_id` INTEGER NOT NULL,
  `produit_id` INTEGER NOT NULL,
  `location_etat` VARCHAR(50) 
);

CREATE TABLE `produit` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `type` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255),
  `marque` VARCHAR(100) NOT NULL,
  `modele` VARCHAR(100) NOT NULL,
  `prix_location` FLOAT NOT NULL,
  `etat` VARCHAR(20) NOT NULL,
  `image` VARCHAR(20) NOT NULL, 
  `magasin` VARCHAR(100) NOT NULL,
  `prix_fixe` FLOAT
);


ALTER TABLE `location` ADD FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;
ALTER TABLE `location` ADD FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`) ON DELETE CASCADE;


INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) 
VALUES 
("jdupont", "81dc9bdb52d04dc20036dbd8313ed055", "Dupont", "Jean", '1990-05-12', "jdupont@example.com", "client"),
("sleclerc", "81dc9bdb52d04dc20036dbd8313ed055", "Leclerc", "Sophie", '1985-09-21', "sleclerc@example.com", "client"),
("plefebvre", "81dc9bdb52d04dc20036dbd8313ed055", "Lefebvre", "Pierre", '1988-12-05', "plefebvre@example.com", "client"),
("mleroy", "81dc9bdb52d04dc20036dbd8313ed055", "Leroy", "Marie", '1995-07-18', "mleroy@example.com", "client"),
("amartin", "81dc9bdb52d04dc20036dbd8313ed055", "Martin", "Alex", '1982-03-28', "amartin@example.com", "agent"),
("lpetit", "81dc9bdb52d04dc20036dbd8313ed055", "Petit", "Laura", '1989-11-15', "lpetit@example.com", "agent"),
("adufrene", "81dc9bdb52d04dc20036dbd8313ed055", "Dufrène", "Alice", '1975-01-01', "adufrene@example.com", "admin");

INSERT INTO produit (id, type, description, marque, modele, prix_location, etat, image, magasin, prix_fixe)
VALUES
(1, "Kettlebell", "Kettlebell en fonte, idéal pour le crossfit et les entraînements de musculation.", "Reebok", "IronKettle 20kg", 8, "Neuf", "IronKettle.png", "Lannion", 15),
(2, "Corde à sauter", "Corde à sauter en acier, avec poignées ergonomiques pour un meilleur confort.", "Nike", "SpeedRope", 3, "Neuf", "SpeedRope.png", "Perros-Guirec", 10),
(3, "Ballon de gym", "Ballon de gym anti-éclatement, diamètre de 65 cm, parfait pour les exercices de posture.", "Fitball", "ProGym 65cm", 5, "Très bon état", "ProGym.png", "Tréguier", 15),
(4, "Tapis de yoga", "Tapis de yoga antidérapant, léger et confortable.", "Lululemon", "The Reversible Mat", 4, "Bon état", "YogaMat.png", "Ploubezre", 25),
(5, "Élastiques de résistance", "Set d'élastiques de résistance pour divers exercices de renforcement musculaire.", "TheraBand", "Resistance Set", 6, "Très bon état", "ResistanceBands.png", "Pleumeur-Bodou", 15),
(6, "Haltères", "Haltères ajustables de 5 à 40 kg, parfaits pour la musculation.", "Bowflex", "SelectTech 552", 15, "Neuf", "SelectTech_.png", "Lannion", 50),
(7, "Rameur", "Rameur à résistance magnétique, idéal pour un entraînement cardio complet.", "Concept2", "Model D", 25, "Très bon état", "Model_D.png", "Perros-Guirec", 220),
(8, "Vélo d'appartement", "Vélo d'intérieur avec résistance réglable, écran connecté.", "Peloton", "Bike+", 30, "Neuf", "Bike.png", "Tréguier", 350),
(9, "Tapis de course", "Tapis de course pliable avec amortissement avancé, idéal pour la course à domicile.", "NordicTrack", "Commercial 1750", 35, "Bon état", "Commercial.png", "Ploubezre", 400),
(10, "Banc de musculation", "Banc inclinable pour divers exercices de musculation.", "Domyos", "Training Bench 500", 10, "Très bon état", "Training_Bench.png", "Pleumeur-Bodou", 60);

