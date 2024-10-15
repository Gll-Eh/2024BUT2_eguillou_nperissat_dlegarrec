router.get("/logout", function (req, res){
    req.session.destroy(function(err) {
        if (err) {
            return res.status(500).send("Erreur lors de la deconnexion");
        }
        res.redirect("/login");
    });
});