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


function addToFav() {


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
    const sql = "INSERT INTO utilisateur (nom, prenom, login, password, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'agent')";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [nom, prenom, login, password, ddn, email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


async function createClient(nom, prenom, login, password, ddn, email) {
    const sql = "INSERT INTO utilisateur (nom, prenom, login, password, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ?, ?, 'client')";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [nom, prenom, login, password, ddn, email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
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


module.exports = { getUserById, checkLogin, get_catalogue, get_accueil, createAgent, createClient, get_produit };
async function updateUser(id, nom, prenom, ddn, email, login) {
    const sql = "UPDATE utilisateur SET nom = ?, prenom = ?, ddn = ?, email = ?, login = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        bdd.query(sql, [nom, prenom, ddn, email, login, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


module.exports = { getUserById, checkLogin, get_catalogue, get_accueil, createAgent, createClient, updateUser, get_produit, locWait, locProgress, locFinish };