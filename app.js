const express= require('express');
const session = require('express-session');
const md5 = require('md5');
const app = express();
const userModel = require("./models/user.js");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret : 'mdp',
    resave : false,
    saveUninitialized : false
}));



app.get('/login', async function (req, res) {
    if (!req.session.userId) {
        return res.redirect("/connexion");
    }

    try {
        const user = await userModel.getUserById(req.session.userId);
        res.render('index', {user});
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});


app.get('/', async function (req, res) {
    try {
        const bestSellers = await userModel.get_accueil();

        let user = null;
        if (req.session.userId) {
            user = await userModel.getUserById(req.session.userId);
        }

        res.render('index', { bestSellers, user });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});


app.get('/produit', function (req, res) {
        res.render('produit');
    }
);

app.get('/inscription', function (req, res) {
    res.render('inscription');
}
);

app.get('/catalogue', async function (req, res) {

    try {
        const products = await userModel.get_catalogue();
        res.render('catalogue', {products});
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
}
);

app.get('/location', function (req, res) {
    res.render('location');
}
);

app.get('/connexion', function (req, res) {
    res.render('login', {error:null});
}
);

app.get('/deconnexion', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(500).send("Erreur lors de la déconnexion");
        }
        res.redirect('/');
    });
});

app.post('/connexion', async function(req, res){
    const login = req.body.login;
    let mdp = req.body.password;

    mdp = md5(mdp);

    const user = await userModel.checkLogin(login);   
    
    if (user != false && user.password == mdp){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;
        return res.redirect("/");
    }
    else{
        res.render("login", {error: "Mauvais Login/Mot de passe"});
    }

});





app.get('/creationagent', function(req, res) {
    if (!req.session.userId || req.session.role !== 'admin') {
        return res.status(403).send('Accès interdit'); // Accès interdit pour les utilisateurs non-admin
    }
    res.render('creationagent');
});

// Route pour traiter le formulaire de création d'agent
app.post('/create-agent', async function(req, res) {
    const { nom, prenom, login, password, ddn, email } = req.body;

    // Hasher le mot de passe
    const hashedPassword = md5(password);

    try {
        // Insérer le nouvel agent dans la base de données
        await userModel.createAgent(nom, prenom, login, hashedPassword, ddn, email);
        res.redirect('/'); // Rediriger vers la page d'accueil après la création
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la création de l\'agent');
    }
});





app.use( function (req, res) {
    res.status(404).render("404");
})

app.listen(3000, function () {
    console.log('Server running on port 3000');
});
