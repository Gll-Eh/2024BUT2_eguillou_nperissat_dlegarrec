const express= require('express');
const app = express();
const UserModel = require("./models/user.js");

app.set('view engine', 'ejs');

app.use(express.static('public'));



//EXEMPLE A UTILISER ET A MODIFIER

app.get('/', async function (req, res) {
    try {
        const user = await UserModel.getUserById(2);
        res.render('index', {user});
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


