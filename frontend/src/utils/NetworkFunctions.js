const headers = {
};

//const API_URL = 'http://192.168.56.101:3030/';
const API_URL = 'http://192.168.56.101/backend/';

const isGoodStatus = (res) => (
    res.status >= 200 && res.status < 300
);

export const getBasicSummonerDetails = (name) => {
    return fetch(API_URL + 'summonerDetails/' + name, headers)
        .then(res => {
            if (isGoodStatus(res)){
                return res.json();
            } else {
                throw Error("Bad response status:" + res.status + " " + res.statusText);
            }
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
};

export const getSummonerMatches = (name, beginIndex = 0, endIndex = 9) => {
    return fetch(API_URL + 'summonerMatches/' + name + '?beginIndex=' + beginIndex + '&endIndex=' + endIndex, headers)
        .then(res => {
            if (isGoodStatus(res)){
                return res.json();
            } else {
                throw Error("Bad response status:" + res.status + " " + res.statusText);
            }
        })
        //.then(json => console.log(json))
        .catch(err => console.error(err));
};

export const getSummonerMatchDetails = (name) => {
    return fetch(API_URL + 'matchDetailsForSummoner/' + name, headers)
        .then(res => {
            if (isGoodStatus(res)){
                return res.json();
            } else {
                throw Error("Bad response status:" + res.status + " " + res.statusText);
            }
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
}
