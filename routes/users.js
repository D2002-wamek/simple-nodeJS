const express = require("express")
const router = express.Router()
const { 
	getAllUsers,
	createNewUser,
	updateUser,
 } = require("../controllers/usersControllers")

const db = require ("../database")

// GET METHOD
router.get("/users", getAllUsers)

// POST METHOD
router.post("/users", createNewUser)

// PUT METHOD
router.put("/users/:id", updateUser)

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
