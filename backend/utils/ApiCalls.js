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

const getSummonerMatchesByName = (name) => {
    return getSummonerDetails(name)
        .then(res => {
            if (res.hasOwnProperty('accountId')){
                return res.accountId;
            } else {
                throw Error("This summoner doesn't have an accountId??");
            }
        })
        .then(id => {
            return kayn.Matchlist.by.accountID(id)
                .then(res => res);
        });
};

const getMatchDetails = (id) => {
    return kayn.Match.get(id)
        .then(res => {
            console.log(res);
            return res;
        });
}

const getSummonerMatchDetails = (name, id) => {
    return getMatchDetails(id)
        .then(res => {
            // Find player in participant identity list
            const matchingParticipants = res.participantIdentities.filter(item => (item.player.summonerName == name));
            console.log("MATCHING PARTS", matchingParticipants);
            const participantId = matchingParticipants[0].participantId;
            const participantDetails = res.participants.filter(item => item.participantId == participantId);
            //console.log("PART DETAILS", participantDetails);
            return participantDetails[0];
        })
}

module.exports = {
    getSummonerDetails,
    getSummonerMatchesByName,
    getMatchDetails,
    getSummonerMatchDetails
};
