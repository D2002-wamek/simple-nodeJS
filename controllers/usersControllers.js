const db = require("../database");

// Fonction pour récupérer tous les utilisateurs de la base de données
exports.getAllUsers = (req, res) => {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
};

// Fonction pour insérer un nouvel utilisateur dans la base de données
exports.createNewUser = (req, res) => {
	const { firstName, lastName } = req.body;

	// Vérifier que le prénom est fourni
	if (!firstName) {
		return res.status(400).json({ error: "Le prénom est requis !" });
	}

	// Insérer le nouvel utilisateur dans la base de données
	db.run(
		"INSERT INTO users (firstName, lastName) VALUES (?, ?)",
		[firstName, lastName],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(201).json({
					id: this.lastID,
					firstName,
					lastName
				});
			}
		}
	);
};
