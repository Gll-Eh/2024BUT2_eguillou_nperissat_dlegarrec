const bdd = require("./database.js");

async function getUserById(id) {
  const sql = "SELECT * FROM utilisateur WHERE id = ?";
  return new Promise((resolve, reject) => {
    bdd.query(sql, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

async function checkLogin(login) {
  const sql = "SELECT * FROM utilisateur WHERE login = ?";
  return new Promise((resolve, reject) => {
    bdd.query(sql, login, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

async function get_catalogue() {
  const sql = "SELECT * FROM produit";
  return new Promise((resolve, reject) => {
    bdd.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function get_produit(id) {
  const sql = "SELECT * FROM produit WHERE id = ?";
  return new Promise((resolve, reject) => {
    bdd.query(sql, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

async function get_accueil() {
  const sql = "SELECT * FROM produit";
  return new Promise((resolve, reject) => {
    bdd.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function createAgent(nom, prenom, login, password, ddn, email) {
  const sql =
    "INSERT INTO utilisateur (nom, prenom, login, password, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'agent')";
  return new Promise((resolve, reject) => {
    bdd.query(
      sql,
      [nom, prenom, login, password, ddn, email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
}

async function createClient(nom, prenom, login, password, ddn, email) {
  const sql =
    "INSERT INTO utilisateur (nom, prenom, login, password, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'client')";
  return new Promise((resolve, reject) => {
    bdd.query(
      sql,
      [nom, prenom, login, password, ddn, email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
}

async function VerifDateDeResa(idProduct, dateDebut, dateRetourPrevue) {
  const sql = `
        SELECT * FROM location
        WHERE produit_id = ?
        AND (
          (date_debut <= ? AND date_retour_prevue >= ? AND (location_etat = "progress" OR location_etat = "en attente de confirmation" ))  -- Si la nouvelle date de début est comprise dans une location existante
          OR
          (date_debut <= ? AND date_retour_prevue >= ?AND (location_etat = "progress" OR location_etat = "en attente de confirmation" ))  -- Si la nouvelle date de fin est comprise dans une location existante
          OR
          (date_debut >= ? AND date_retour_prevue <= ?AND (location_etat = "progress" OR location_etat = "en attente de confirmation" ))  -- Si la nouvelle location est totalement incluse dans une location existante
        )
      `;

  const values = [
    idProduct,
    dateDebut,
    dateDebut, // Vérification de la date de début
    dateRetourPrevue,
    dateRetourPrevue, // Vérification de la date de retour
    dateDebut,
    dateRetourPrevue, // Vérification si les dates sont incluses dans une location existante
  ];

  return new Promise((resolve, reject) => {
    bdd.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length > 0) {
        resolve(false); // Les dates sont déjà prises
      } else {
        resolve(true); // Les dates sont disponibles
      }
    });
  });
}

async function locWait() {
  const sql = `
    SELECT * FROM location WHERE location_etat = "en attente de confirmation";
    `;
  return new Promise((resolve, reject) => {
    bdd.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function locProgress() {
  const sql = `
    SELECT * FROM location WHERE location_etat = "en cours de location";
    `;
  return new Promise((resolve, reject) => {
    bdd.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function locFinish() {
  const sql = `
    SELECT * FROM location WHERE location_etat = "location terminée";
    `;
  return new Promise((resolve, reject) => {
    bdd.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function updateUser(id, nom, prenom, ddn, email, login) {
  const sql =
    "UPDATE utilisateur SET nom = ?, prenom = ?, ddn = ?, email = ?, login = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    bdd.query(sql, [nom, prenom, ddn, email, login, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function verifResaByProductId(id) {
  const sql =
    "SELECT * FROM produit P JOIN location L ON P.id = L.produit_id WHERE L.produit_id = ? AND L.location_etat = 'progress'";
  const values = [id];

  return new Promise((resolve, reject) => {
    bdd.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

async function ShowPrixDeLoc(idProduct) {
  const sql = "SELECT * FROM produit WHERE id = ?";
  const values = [idProduct];

  return new Promise((resolve, reject) => {
    bdd.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

async function calculateTotalPrice(nbjours, basePrice) {


    let totalPrice = 0;
  
    if (nbjours <= 3) {
      totalPrice = basePrice; // les 3 premiers jours sont égaux au prix de base de location
    } else if (nbjours > 3 && nbjours <= 7) {
      totalPrice = basePrice + basePrice * 0.04 * (nbjours - 3);
    } else if (nbjours > 7 && nbjours <= 14) {
      totalPrice =
        basePrice + basePrice * 0.04 * 4 + basePrice * 0.02 * (nbjours - 7);
    } else if (nbjours > 14 && nbjours <= 30) {
      totalPrice =
        basePrice +
        basePrice * 0.04 * 4 +
        basePrice * 0.02 * 7 +
        basePrice * 0.01 * (nbjours - 14);
    }
  
    // Si plus de 7 jours, enlever 10%
    if (nbjours > 7) {
      totalPrice *= 0.9;
    }
  
    // Si plus de 30 jours, rajouter 20%
    if (nbjours > 30) {
      totalPrice += basePrice * 0.2;
    }
  
  
  
    return Math.round(totalPrice * 100) / 100;
  }
async function addPanier(idProduct, idClient, dateDebut, dateRetourPrevue, elprecio) {
    try {
      // Calculer le nombre de jours entre dateDebut et dateRetourPrevue
      const dateDebutObj = new Date(dateDebut);
      const dateRetourPrevueObj = new Date(dateRetourPrevue);
      const timeDiff = Math.abs(dateRetourPrevueObj - dateDebutObj);
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
      // Calculer le prix total en utilisant le nombre de jours et le prix de base (ex. 15)
      console.log("ceci est le precio : ", elprecio)
      const basePrice = elprecio;
      const totalPrice = await calculateTotalPrice(days, basePrice);
  
      // Insérer le panier avec le prix total calculé
      const sql = `
              INSERT INTO location (produit_id, utilisateur_id, date_debut, date_retour_prevue, prix_total, location_etat)
              VALUES (?, ?, ?, ?, ?, 'en attente de confirmation')
          `;
  
      const values = [
        idProduct,
        idClient,
        dateDebut,
        dateRetourPrevue,
        totalPrice,
      ];
  
      return new Promise((resolve, reject) => {
        bdd.query(sql, values, (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    } catch (error) {
      console.error("Erreur dans addPanier:", error);
      throw error;
    }
  }

  async function showPanier(idClient) {
    const sql = `
        SELECT * FROM location L JOIN utilisateur U ON U.id = L.utilisateur_id JOIN produit P ON L.produit_id = P.id WHERE utilisateur_id = ? AND L.location_etat = 'en attente de confirmation'; 
      `;
    const values = [idClient];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  async function deleteToPanier(idProduct, idClient) {
    const sql =
      "DELETE FROM location WHERE produit_id = ? AND utilisateur_id = ?";
  
    const values = [idProduct, idClient];
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, values, (err, results) => {
        if (err) {
          return reject(false);
        }
        resolve(true);
      });
    });
  }

  async function deleteClient(userId) {
    const sql = "DELETE FROM utilisateur WHERE id = ?";
  
    return new Promise((resolve, reject) => {
      bdd.query(sql, [userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  

  
async function calculateTotalPrice(nbjours, basePrice) {


    let totalPrice = 0;
  
    if (nbjours <= 3) {
      totalPrice = basePrice; // les 3 premiers jours sont égaux au prix de base de location
    } else if (nbjours > 3 && nbjours <= 7) {
      totalPrice = basePrice + basePrice * 0.04 * (nbjours - 3);
    } else if (nbjours > 7 && nbjours <= 14) {
      totalPrice =
        basePrice + basePrice * 0.04 * 4 + basePrice * 0.02 * (nbjours - 7);
    } else if (nbjours > 14 && nbjours <= 30) {
      totalPrice =
        basePrice +
        basePrice * 0.04 * 4 +
        basePrice * 0.02 * 7 +
        basePrice * 0.01 * (nbjours - 14);
    }
  
    // Si plus de 7 jours, enlever 10%
    if (nbjours > 7) {
      totalPrice *= 0.9;
    }
  
    // Si plus de 30 jours, rajouter 20%
    if (nbjours > 30) {
      totalPrice += basePrice * 0.2;
    }
  
  
  
    return Math.round(totalPrice * 100) / 100;
  }
 

  
module.exports = {
  getUserById,
  checkLogin,
  get_catalogue,
  get_accueil,
  createAgent,
  createClient,
  updateUser,
  get_produit,
  locWait,
  locProgress,
  locFinish,
  verifResaByProductId,
  VerifDateDeResa,
  ShowPrixDeLoc,
addPanier,
showPanier,
deleteToPanier,
deleteClient,
calculateTotalPrice

};
