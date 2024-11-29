const express = require("express");
const session = require("express-session");
const md5 = require("md5");
const app = express();
const userModel = require("./models/user.js");


app.set("view engine", "ejs");


app.use(express.static("public"));


app.use(express.urlencoded({ extended: false }));


app.use(
    session({
        secret: "mdp",
        resave: false,
        saveUninitialized: false,
    })
);


app.use(function (req, res, next) {
    if (req.session.userId) {
        res.locals.isAuth = true;
        res.locals.id = req.session.userId;
        res.locals.role = req.session.role;
    } else {
        res.locals.isAuth = false;
        res.locals.id = null;
        res.locals.role = null;
    }
    next();
});


app.get("/login", async function (req, res) {
    if (!req.session.userId) {
        return res.redirect("/connexion");
    }


    try {
        const user = await userModel.getUserById(req.session.userId);
        res.render("index", { user });
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur");
    }
});


app.get("/", async function (req, res) {
    try {
        const bestSellers = await userModel.get_accueil();


        let user = null;
        if (req.session.userId) {
            user = await userModel.getUserById(req.session.userId);
        }


        res.render("index", { bestSellers, user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur");
    }
});


app.get("/inscription", function (req, res) {
    if (req.session.userId) {
        return res.redirect("/modif");
    }
    res.render("inscription");
});




app.get("/catalogue", async function (req, res) {
    try {
        const products = await userModel.get_catalogue();
        res.render("catalogue", { products });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur");
    }
});


app.get("/produit/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const produits = await userModel.get_produit(productId);
        res.render("produit", { produits });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur");
    }
});


app.get("/modif", async function (req, res) {
    if (!req.session.userId) {
        return res.redirect("/connexion");
    }


    try {
        const user = await userModel.getUserById(req.session.userId);
        const favoris = [];
        res.render("modif", { user, favoris });
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send("Erreur lors de la récupération des informations utilisateur");
    }
});


app.post("/modif-compte", async function (req, res) {
    const { nom, prenom, ddn, email, login } = req.body;
    const userId = req.session.userId;


    try {
        await userModel.updateUser(userId, nom, prenom, ddn, email, login);
        res.redirect("/modif");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour des informations");
    }
});

app.get("/location", async function (req, res) {
document.getElementById('rentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = 'ID_DU_PRODUIT'; // Remplacez par l'ID du produit
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
      const response = await fetch(`/products/${productId}/rent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate, endDate })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Produit loué avec succès !');
      } else {
        alert(data.message || 'Erreur lors de la location.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Une erreur s’est produite.');
    }
})});


app.get("/location", async function (req, res) {
    try {
        if (res.locals.isAuth) {
            if (res.locals.role === "agent") {
                const WaitList = await userModel.locWait();
                const ProgressList = await userModel.locProgress();
                const FinishList = await userModel.locFinish();
                res.render("location", { WaitList, ProgressList, FinishList });

            }
        }
        res.render("index");



    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour des informations");
    }




});


app.post("/valid", async function (req, res) {
    const { idProduct } = req.body
    const userId = req.session.userId;


    try {
        await userModel.verifResaByProductId(idProduct);
        const WaitList = await userModel.locWait();
                const ProgressList = await userModel.locProgress();
                const FinishList = await userModel.locFinish();
                res.render("location", { WaitList, ProgressList, FinishList });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour des informations");
    }
});


app.get("/connexion", function (req, res) {
    res.render("login", { error: null });
});


app.get("/deconnexion", function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(500).send("Erreur lors de la déconnexion");
        }
        res.redirect("/");
    });
});


app.post("/connexion", async function (req, res) {
    const login = req.body.login;
    let mdp = req.body.password;


    mdp = md5(mdp);


    const user = await userModel.checkLogin(login);


    if (user != false && user.password == mdp) {
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;
        return res.redirect("/");
    } else {
        res.render("login", { error: "Mauvais Login/Mot de passe" });
    }
});


app.get("/creationagent", function (req, res) {
    if (!req.session.userId || req.session.role !== "admin") {
        return res.status(403).send("Accès interdit"); // Accès interdit pour les utilisateurs non-admin
    }
    res.render("creationagent");
});


// Route pour traiter le formulaire de création d'agent
app.post("/creationagent", async function (req, res) {
    const { nom, prenom, login, password, ddn, email } = req.body;


    // Hasher le mot de passe
    const hashedPassword = md5(password);


    try {
        // Insérer le nouvel agent dans la base de données
        await userModel.createAgent(nom, prenom, login, hashedPassword, ddn, email);
        res.redirect("/"); // Rediriger vers la page d'accueil après la création
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la création de l'agent");
    }
});


app.post("/inscription", async function (req, res) {
    const { nom, prenom, login, password, ddn, email } = req.body;


    // Hasher le mot de passe
    const hashedPassword = md5(password);


    try {
        // Insérer le nouvel agent dans la base de données
        await userModel.createClient(
            nom,
            prenom,
            login,
            hashedPassword,
            ddn,
            email
        );
        res.redirect("/"); // Rediriger vers la page d'accueil après la création
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la création de l'agent");
    }
});




// Route pour supprimer un compte
app.post("/supprimer-compte", async function (req, res) {
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect("/connexion"); // Redirige l'utilisateur s'il n'est pas connecté
    }

    try {
        // Appel à la méthode du modèle pour supprimer l'utilisateur de la base de données
        await userModel.deleteUser(userId);

        // Détruire la session de l'utilisateur
        req.session.destroy(function (err) {
            if (err) {
                return res.status(500).send("Erreur lors de la suppression du compte");
            }
            // Rediriger vers la page d'accueil après suppression
            res.redirect("/");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression du compte");
    }
});




// Middleware pour initialiser le panier dans la session
app.use(function (req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.locals.cart = req.session.cart; // Rendre le panier accessible dans toutes les vues
    next();
});


// Route pour ajouter un produit au panier
app.post("/add-to-cart", async function (req, res) {
    const { productId } = req.body;


    try {
        const product = await userModel.get_produit(productId); // Récupération des infos du produit
        if (product) {
            const existingProduct = req.session.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Augmenter la quantité si déjà dans le panier
            } else {
                req.session.cart.push({ ...product, quantity: 1 });
            }
        }
        res.redirect("/cart"); // Rediriger vers la page panier
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout au panier");
    }
});


// Route pour afficher le panier
app.get("/cart", function (req, res) {
    res.render("cart", { cart: req.session.cart });
});


// Route pour retirer un produit du panier
app.post("/remove-from-cart", function (req, res) {
    const { productId } = req.body;
    req.session.cart = req.session.cart.filter((item) => item.id !== parseInt(productId, 10));
    res.redirect("/cart");
});






app.get("/cart", function (req, res) {
    res.render("cart", { cart: req.session.cart || [] });
});








app.use(function (req, res) {
    res.status(404).render("404");
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
});
