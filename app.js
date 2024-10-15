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



app.get('/', async function (req, res) {
    if (!req.session.userId) {
        return res.redirect("/connexion");
    }

    try {
        const user = await userModel.getUserById(req.session.userId);
        res.render('index', {user});
        console.log(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});


app.get('/produit', function (req, res) {
        res.render('produit');
    }
);

app.get('/catalogue', function (req, res) {
    res.render('catalogue');
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



app.use( function (req, res) {
    res.status(404).render("404");
})

app.listen(3000, function () {
    console.log('Server running on port 3000');
});
