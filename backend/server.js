const express = require('express');
const port = 3030;
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

const ApiCalls = require('./utils/ApiCalls');
const { getSummonerDetails, getSummonerMatchesByName, getMatchDetails, getSummonerMatchDetails } = ApiCalls;
const NUM_MATCHES = 10;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/summonerDetails/:summonerName', (req, res) => {
    console.log(req.params.summonerName);
    getSummonerDetails(req.params.summonerName)
        .then(result => {
            console.log("GOt " + result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

// TODO allow begin/end indices
app.get('/summonerMatches/:summonerName', (req, res) => {
    console.log(req.params.summonerName);
    getSummonerMatchesByName(req.params.summonerName)
        .then(result => {
            console.log("Got " + result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.get('/matchDetails/:matchId', (req, res) => {
    getMatchDetails(req.params.matchId)
        .then(result => {
            console.log("got " + result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.get('/matchDetailsForSummoner/:summonerName', (req, res) => {
    getSummonerMatchesByName(req.params.summonerName)
        .then(result => {
            const matchId = result.matches[0].gameId;
            console.log("finding match id", matchId);
            return getSummonerMatchDetails(req.params.summonerName, matchId);
        })
        .then(result => {
            //console.log("got participant details", result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});
