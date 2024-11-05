const bdd = require("./database.js"); 

async function getUserById (id) {
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

async function checkLogin (login) {
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

async function get_catalogue () {
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

async function get_accueil () {
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

module.exports = { getUserById, checkLogin, get_catalogue, get_accueil, createAgent, createClient, updateUser };

