const db = require("../database");

// Fonction pour insérer un nouvel utilisateur dans la base de données
exports.createNewUser = function (req, res) {

    const { firstName, lastName } = req.body;  // Extraire les valeurs depuis le corps de la requête

    // regex pour alphanumérique seulement
	function isAlphanumeric(str) {
		const regex = /^[a-zA-Z0-9]+$/
		return regex.test(str)
	}


    if (!firstName || !lastName) {
        return res.status(400).json({error: "the first name and the name are required ! "})
    }
    if (typeof firstName !== "string") {
        return res.status(400).json({error: "that's a weird name ! "})
    }
    if (!isAlphanumeric(firstName)){
		return res.status(400).json({ error: "Ce nom n'est pas autorisé !" })

    }


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
exports.getAllUsers = function (req, res) {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
}