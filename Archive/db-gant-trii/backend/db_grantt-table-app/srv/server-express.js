t express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Pour servir les fichiers statiques
app.use(express.json()); // Pour parser les requêtes JSON

// Endpoint pour obtenir les données de db_gantt-table
app.get('/api/gantt-data', (req, res) => {
    fs.readFile('db_gantt-table.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier');
            return;
        }
        res.json(JSON.parse(data));
    });
});
