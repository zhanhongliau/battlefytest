const express = require('express');
const port = 3030;
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

const ApiCalls = require('./utils/ApiCalls');
const { getSummonerDetails, getSummonerMatchesByName, getMatchDetails, getSummonerMatchDetails, getSummonerMatchesByAccountId } = ApiCalls;
const NUM_MATCHES = 10;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/summonerDetails/:summonerName', (req, res) => {
    console.log(req.params.summonerName);
    getSummonerDetails(req.params.summonerName)
        .then(result => {
            console.log("Got summonerDetails" + result);
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
    getSummonerDetails(req.params.summonerName)
        .then(res => {
            return res.accountId;
        })
        .then(accountId => getSummonerMatchesByAccountId(accountId))
        .then(result => {
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

// TODO will get the first 10 matches only. Should accept some list of IDs?
app.get('/matchDetailsForSummoner/:summonerName', (req, res) => {
    getSummonerMatchesByName(req.params.summonerName)
        .then(result => {
            let matchIds = [];
            for (let i = 0; i < NUM_MATCHES; i++){
                const matchId = result.matches[i] ? result.matches[i].gameId : null;
                //console.log("finding match id", matchId);
                if (matchId){
                    matchIds.push(matchId);
                }
            }
            let promises = matchIds.map(matchId => getSummonerMatchDetails(req.params.summonerName, matchId));
            return Promise.all(promises);
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
