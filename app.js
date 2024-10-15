const express= require('express');
const app = express();
const userModel = require("./models/user.js");

app.set('view engine', 'ejs');

app.use(express.static('public'));



//EXEMPLE A UTILISER ET A MODIFIER
//CA MARCHE POUR LUTILISATEUR 2 SOPHIE LECLERC

app.get('/', async function (req, res) {
    try {
        const user = await userModel.getUserById(2);
        res.render('index', {user});
        console.log(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});

app.get('/catalogue', async function (req, res) {
    try {
        const user = await userModel.getUserById(2);
        res.render('catalogue', {user});
        console.log(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});

app.get('/location', async function (req, res) {
    try {
        const user = await userModel.getUserById(2);
        res.render('location', {user});
        console.log(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur');
    }
});

//FIN DE LEXEMPLE

app.use( function (req, res) {
    res.status(404).render("404");
})

app.listen(3000, function () {
    console.log('Server running on port 3000');
});


