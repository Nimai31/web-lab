const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = "mongodb+srv://ngvuser:25538098@cluster0.9rsdwyc.mongodb.net/football_mern?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define your schema and model
const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    age: Number,
    team: String
});

const Player = mongoose.model('Player', playerSchema);

// POST route to add a new player
app.post('/api/register', (req, res) => {
    const newPlayer = new Player(req.body);
    newPlayer.save()
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
});

// GET route to retrieve all players
app.get('/api/players', (req, res) => {
    Player.find()
        .then(players => res.json(players))
        .catch(err => res.status(400).json(err));
});

// GET route to retrieve a specific player by ID
app.get('/api/players/:id', (req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
});

// PUT route to update a specific player by ID
app.put('/api/players/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
});

// DELETE route to delete a specific player by ID
app.delete('/api/players/:id', (req, res) => {
    Player.findByIdAndDelete(req.params.id)
        .then(player => {
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json({ message: 'Player deleted successfully' });
        })
        .catch(err => res.status(400).json(err));
});

// Start the server
const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Server running on port ${port}`));
