const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js")

// Middleware pour traiter les données JSON envoyées dans le body
app.use(express.json());
app.use("/api/", usersRouter)


// GET : Récupérer tous les utilisateurs
app.get("/", (req, res) => {
	res.json({
		msg: "welcome to my users API"
	});
});

// Démarrer le serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
