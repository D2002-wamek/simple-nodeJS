const express = require('express');
const app = express();
const port = 3000;

const usersRouter = require("./routes/users.js")

// Middleware pour traiter les données JSON envoyées dans le body
app.use(express.json());
app.use("/api/", usersRouter)

const users = [
	{ id: 1, firstName: "John", lastName: "Doe", role: "admin" },
	{ id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
	{ id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
	{ id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
	{ id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
];

// GET : Récupérer tous les utilisateurs
app.get("/", (req, res) => {
	res.json(users);
});

// GET : Récupérer un utilisateur spécifique en fonction de son ID
app.get("/users/:id", (req, res) => {
	// Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
	const id = parseInt(req.params.id);

	// Trouver l'utilisateur correspondant à l'ID
	const userIndex = users.findIndex((user) => user.id === id);

	// Vérifier si l'utilisateur existe
	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	// Si l'utilisateur est trouvé, retourner ses informations
	res.json(users[userIndex]);
});

// POST : Ajouter un nouvel utilisateur
app.post("/", (req, res) => {
	const { firstName, lastName } = req.body;
	const lastId = users[users.length - 1].id;
	const newId = lastId + 1;

	const newUser = {
		id: newId,
		firstName,
		lastName
	};

	users.push(newUser);
	res.status(201).json(newUser);
});

// PUT : Modifier un utilisateur existant en fonction de son ID
app.put("/users/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { firstName, lastName } = req.body;
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	if (firstName) users[userIndex].firstName = firstName;
	if (lastName) users[userIndex].lastName = lastName;

	res.json({
		msg: "Utilisateur mis à jour",
		user: users[userIndex],
	});
});

// DELETE : Supprimer un utilisateur en fonction de son ID
app.delete("/users/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	users.splice(userIndex, 1);
	res.json({ msg: "Utilisateur supprimé" });
});

// Démarrer le serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
