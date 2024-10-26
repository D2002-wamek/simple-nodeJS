const express = require("express")
const router = express.Router()

const db = require ("../database")

// GET METHOD
router.get("/users", )

// POST METHOD
router.post("/users", (req, res) => {
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
})

// PUT METHOD
router.put("/users", (req, res) => {
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
})

// DELETE METHOD
router.delete("/users", (req, res) => {
    const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	users.splice(userIndex, 1);
	res.json({ msg: "Utilisateur supprimé" });
})

module.exports = router
