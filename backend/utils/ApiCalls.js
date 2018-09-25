const _kayn = require('kayn');
const Kayn = _kayn.Kayn;
const REGIONS = _kayn.REGIONS;

const options = {
    region: REGIONS.NORTH_AMERICA,
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
};

const kayn = Kayn(process.env.RIOT_API_KEY)(options)

const getSummonerDetails = (name) => {
    // TODO sanitize here
    console.log("Finding name:", name);
    return kayn.Summoner.by.name(name)
        .then(res => {
            console.log(res);
            return res
        })
}

const getSummonerMatchesByName = (name, beginIndex = 0, endIndex = 9) => {
    return getSummonerDetails(name)
        .then(res => {
            if (res.hasOwnProperty('accountId')){
                return res.accountId;
            } else {
                throw Error("This summoner doesn't have an accountId??");
            }
        })
        .then(id => {
            return kayn.Matchlist.by.accountID(id).query({ beginIndex: 0, endIndex: 9})
                .then(res => res);
        });
};

const getSummonerMatchesByAccountId = (accountId, beginIndex = 0, endIndex = 9) => {
    return kayn.Matchlist.by.accountID(accountId).query({ beginIndex, endIndex })
        .then(result => {
            console.log("Got summoner matches", result);
            let promises = result.matches.map(item => getSummonerMatchDetailsByAccountId(accountId, item.gameId));
            return Promise.all(promises);
        })
};


const getMatchDetails = (id) => {
    return kayn.Match.get(id)
        .then(res => {
            //console.log(res);
            return res;
        });
}

const getSummonerMatchDetailsByAccountId = (accountId, id) => {
    return getMatchDetails(id)
        .then(res => {
            // Find player in participant identity list
            //console.log("Match:", res);
            const matchingParticipants = res.participantIdentities.filter(item => (item.player.accountId == accountId));
            //console.log("MATCHING PARTS", matchingParticipants);
            const participantId = matchingParticipants[0].participantId;
            const participant = res.participants.filter(item => item.participantId == participantId)[0];
            const teamId = participant.teamId;
            const teamDetails = res.teams.filter(item => item.teamId == teamId);
            const participantDetails = res.participants.filter(item => item.participantId == participantId);
            //console.log("PART DETAILS", participantDetails);
            return {
                gameCreation: res.gameCreation,
                gameDuration: res.gameDuration,
                mapId: res.mapId,
                gameMode: res.gameMode,
                gameType: res.gameType,
                summonerName: matchingParticipants[0].player.summonerName,
                team: teamDetails,
                ...participantDetails[0],
            };
        })
}

const getSummonerMatchDetails = (name, id) => {
    return getMatchDetails(id)
        .then(res => {
            // Find player in participant identity list
            console.log("Match:", res.participantIdentities);
            const matchingParticipants = res.participantIdentities.filter(item => (item.player.summonerName == name));
            //console.log("MATCHING PARTS", matchingParticipants);
            const participantId = matchingParticipants[0].participantId;
            const participantDetails = res.participants.filter(item => item.participantId == participantId);
            //console.log("PART DETAILS", participantDetails);
            return participantDetails[0];
        })
}

module.exports = {
    getSummonerDetails,
    getSummonerMatchesByName,
    getSummonerMatchesByAccountId,
    getMatchDetails,
    getSummonerMatchDetails,
    getSummonerMatchesByAccountId,
};
