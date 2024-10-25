const express = require('express');
const app = express();
const port = 3000;

// Middleware pour traiter les données JSON envoyées dans le body
app.use(express.json());

app.post("/", (req, res) => {
    // Extraire les données du body
    const { firstName, lastName, role } = req.body;

    // Afficher les données reçues dans le terminal
    console.log("Requête reçue:", req.body);

    // Vérification de base pour s'assurer que tous les champs sont présents
    if (!firstName || !lastName || !role) {
        return res.status(400).json({ message: "Tous les champs (firstName, lastName, role) sont requis." });
    }

    // Répondre avec un message de confirmation et les données envoyées
    res.json({
        msg: "Nouvel utilisateur ajouté avec succès!",
        user: {
            firstName,
            lastName,
            role
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
