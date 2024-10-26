const db = require("../database")

exports.getAllUsers = function (req, res) {
    db.run(
		"INSERT INTO users (firstName, lastName) VALUES (?, ?)",
		[firstName, lastName],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.status(201).json({ id: this.lastID, firstName })
			}
		}
	)

}

exports.createNewUser = (req, res) => {
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
}