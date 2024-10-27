const db = require("../database");

// Fonction pour insérer un nouvel utilisateur dans la base de données
exports.getAllUsers = function (req, res) {
	const { firstName, lastName } = req.body;  // Extraire les valeurs depuis le corps de la requête

	db.run(
		"INSERT INTO users (firstName, lastName) VALUES (?, ?)",
		[firstName, lastName],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(201).json({ id: this.lastID, firstName, lastName });
			}
		}
	);
};

// Fonction pour récupérer tous les utilisateurs de la base de données
exports.createNewUser = (req, res) => {
	const { firstName, lastName } = req.body;

    if (!firstName) return res.status(400).json({error: "the first name is required ! "})

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
