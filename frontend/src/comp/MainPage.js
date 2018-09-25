import React, { Component } from 'react';
import {
    getBasicSummonerDetails,
    getSummonerMatchDetails,
    getSummonerMatches
} from '../utils/NetworkFunctions';
import {
    Container,
    Menu,
    Segment,
    Input,
    Grid,
    Button,
    Header,
    Loader,
    Image
} from 'semantic-ui-react';
import moment from 'moment';

const testObj = {
    "gameCreation": 1537826517129,
    "gameDuration": 2344,
    "mapId": 11,
    "gameMode": "CLASSIC",
    "gameType": "MATCHED_GAME",
    "team": [
        {
            "teamId": 100,
            "win": "Win",
            "firstBlood": false,
            "firstTower": true,
            "firstInhibitor": true,
            "firstBaron": true,
            "firstDragon": false,
            "firstRiftHerald": false,
            "towerKills": 10,
            "inhibitorKills": 3,
            "baronKills": 1,
            "dragonKills": 1,
            "vilemawKills": 0,
            "riftHeraldKills": 0,
            "dominionVictoryScore": 0,
            "bans": []
        }
    ],
    "participantId": 4,
    "teamId": 100,
    "championId": 8,
    "spell1Id": 4,
    "spell2Id": 6,
    "highestAchievedSeasonTier": "UNRANKED",
    "stats": {
        "participantId": 4,
        "win": true,
        "item0": 3165,
        "item1": 3907,
        "item2": 3157,
        "item3": 3089,
        "item4": 3158,
        "item5": 3135,
        "item6": 3363,
        "kills": 17,
        "deaths": 8,
        "assists": 14,
        "largestKillingSpree": 6,
        "largestMultiKill": 2,
        "killingSprees": 3,
        "longestTimeSpentLiving": 990,
        "doubleKills": 1,
        "tripleKills": 0,
        "quadraKills": 0,
        "pentaKills": 0,
        "unrealKills": 0,
        "totalDamageDealt": 181703,
        "magicDamageDealt": 166162,
        "physicalDamageDealt": 11626,
        "trueDamageDealt": 3914,
        "largestCriticalStrike": 0,
        "totalDamageDealtToChampions": 53112,
        "magicDamageDealtToChampions": 51014,
        "physicalDamageDealtToChampions": 1535,
        "trueDamageDealtToChampions": 562,
        "totalHeal": 33177,
        "totalUnitsHealed": 1,
        "damageSelfMitigated": 30466,
        "damageDealtToObjectives": 7156,
        "damageDealtToTurrets": 5205,
        "visionScore": 10,
        "timeCCingOthers": 14,
        "totalDamageTaken": 43702,
        "magicalDamageTaken": 8461,
        "physicalDamageTaken": 26696,
        "trueDamageTaken": 8543,
        "goldEarned": 17964,
        "goldSpent": 16725,
        "turretKills": 3,
        "inhibitorKills": 0,
        "totalMinionsKilled": 194,
        "neutralMinionsKilled": 8,
        "neutralMinionsKilledTeamJungle": 0,
        "neutralMinionsKilledEnemyJungle": 8,
        "totalTimeCrowdControlDealt": 262,
        "champLevel": 18,
        "visionWardsBoughtInGame": 1,
        "sightWardsBoughtInGame": 0,
        "wardsPlaced": 7,
        "wardsKilled": 3,
        "firstBloodKill": false,
        "firstBloodAssist": false,
        "firstTowerKill": true,
        "firstTowerAssist": false,
        "firstInhibitorKill": false,
        "firstInhibitorAssist": true,
        "combatPlayerScore": 0,
        "objectivePlayerScore": 0,
        "totalPlayerScore": 0,
        "totalScoreRank": 0,
        "playerScore0": 0,
        "playerScore1": 0,
        "playerScore2": 0,
        "playerScore3": 0,
        "playerScore4": 0,
        "playerScore5": 0,
        "playerScore6": 0,
        "playerScore7": 0,
        "playerScore8": 0,
        "playerScore9": 0,
        "perk0": 8112,
        "perk0Var1": 3028,
        "perk0Var2": 0,
        "perk0Var3": 0,
        "perk1": 8139,
        "perk1Var1": 2088,
        "perk1Var2": 0,
        "perk1Var3": 0,
        "perk2": 8138,
        "perk2Var1": 30,
        "perk2Var2": 0,
        "perk2Var3": 0,
        "perk3": 8106,
        "perk3Var1": 5,
        "perk3Var2": 0,
        "perk3Var3": 0,
        "perk4": 8275,
        "perk4Var1": 13,
        "perk4Var2": 0,
        "perk4Var3": 0,
        "perk5": 8234,
        "perk5Var1": 34,
        "perk5Var2": 0,
        "perk5Var3": 0,
        "perkPrimaryStyle": 8100,
        "perkSubStyle": 8200
    },
    "timeline": {
        "participantId": 4,
        "creepsPerMinDeltas": {
            "10-20": 6.8,
            "0-10": 7,
            "30-end": 4.4,
            "20-30": 3.2
        },
        "xpPerMinDeltas": {
            "10-20": 542.9,
            "0-10": 453,
            "30-end": 820.8,
            "20-30": 479.9
        },
        "goldPerMinDeltas": {
            "10-20": 522.6,
            "0-10": 244.89999999999998,
            "30-end": 749.2,
            "20-30": 479.2
        },
        "csDiffPerMinDeltas": {
            "10-20": 2.5,
            "0-10": 1.1,
            "30-end": 1.2000000000000002,
            "20-30": -2
        },
        "xpDiffPerMinDeltas": {
            "10-20": 201.2,
            "0-10": 26,
            "30-end": 41.799999999999955,
            "20-30": 77.50000000000003
        },
        "damageTakenPerMinDeltas": {
            "10-20": 652.5999999999999,
            "0-10": 202.89999999999998,
            "30-end": 2704.6,
            "20-30": 1232.5
        },
        "damageTakenDiffPerMinDeltas": {
            "10-20": -576.2,
            "0-10": -130,
            "30-end": -285.8000000000002,
            "20-30": 188.39999999999998
        },
        "role": "SOLO",
        "lane": "TOP"
    }
};

class MainMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            summonerName: ""
        }
    }
    render(){
        return (
            <Menu pointing>
                <Menu.Item
                    name='Details'
                    active
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input placeholder='Search...' onChange={(e, data) => {this.setState({summonerName: data.value})}}/>
                        <Button icon='search' onClick={() => {this.props.showSpinner();this.props.setSearchName(this.state.summonerName)}}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

const ITEM_URL='http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/';

const Item = ({id}) => (
    id ?
        <Image src={ITEM_URL + id + '.png'} />
        :
        null
);

const MatchItem = ({match}) => (
    <Grid.Row>
        <Grid.Column>
            <Header as='h3'>General</Header>
            <Segment.Group style={{padding: '1em'}}>
                <Segment>
                    {match.stats.win ?
                            <Header as='h5' color='green'>Victory</Header>
                            :
                            <Header as='h5' color='red'>Defeat</Header>
                    }
                </Segment>
                <Segment>
                    <Header as='h4'>Summoner Name:</Header> {match.summonerName}
                </Segment>
            </Segment.Group>
        </Grid.Column>
        <Grid.Column>
            <Header as='h3'>Items/Spells</Header>
            <Segment.Group style={{padding: '1em'}}>
                <Segment>
                    <Header as='h4'>Spells:</Header> {match.spell1Id}/{match.spell2Id}
                </Segment>
                <Segment>
                    <Header as='h4'>Items:</Header>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column><Item id={match.stats.item0} /></Grid.Column>
                            <Grid.Column><Item id={match.stats.item1} /></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column><Item id={match.stats.item2} /></Grid.Column>
                            <Grid.Column><Item id={match.stats.item3} /></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column><Item id={match.stats.item4} /></Grid.Column>
                            <Grid.Column><Item id={match.stats.item5} /></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column><Item id={match.stats.item6} /></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
        </Grid.Column>
        <Grid.Column>
            <Header as='h3'>Times</Header>
            <Segment>
                <Header as='h4'>Game Length:</Header> {moment(match.gameDuration, 'X').format("mm:ss")}
            </Segment>
        </Grid.Column>
        <Grid.Column>
            <Header as='h3'>Champion Details</Header>
            <Segment.Group style={{padding: '1em'}}>
                <Segment basic vertical>
                    <Header as='h4'>Champion:</Header> {match.championId}
                </Segment>
                <Segment basic vertical>
                    <Header as='h4'>Champion Level:</Header> {match.stats.champLevel}
                </Segment>
                <Segment basic vertical>
                    <Header as='h4'>KDA:</Header> {match.stats.kills}/{match.stats.deaths}/{match.stats.assists}
                </Segment>
            </Segment.Group>
        </Grid.Column>
    </Grid.Row>
);

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            summonerName: "",
            showSpinner: false,
            matches: []
        };
        this.setSearchName = this.setSearchName.bind(this);
        this.processMatches = this.processMatches.bind(this);
        this.hideSpinner = this.hideSpinner.bind(this);
        this.showSpinner = this.showSpinner.bind(this);
    }

    async setSearchName(summonerName){
        await this.setState({ summonerName, matches: [] });
        if (summonerName){
            getBasicSummonerDetails(summonerName);
            getSummonerMatches(summonerName)
                .then(json => this.processMatches(json));
        }
    }

    processMatches(json){
        this.hideSpinner();
        console.log("Got matches:", json);
        this.setState({ matches: json });
    }

    hideSpinner(){
        this.setState({ showSpinner: false });
    }

    showSpinner(){
        this.setState({ showSpinner: true });
    }

    componentDidMount(){
        //getBasicSummonerDetails('RiotSchmick');
        //getSummonerMatchDetails('RiotSchmick');
    }

    render(){
        return (
            <Container>
                <MainMenu {...this}/>
                <Segment.Group>
                    <Segment>
                        <Header as='h1'>{this.state.summonerName}</Header>
                    </Segment>
                    <Segment>
                        <Loader active={this.state.showSpinner} />
                        <Grid columns="equal" divided='vertically'>
                            {this.state.matches.map((match, index) => (<MatchItem key={index} match={match} />))}
                            {/*<MatchItem match={testObj} />*/}
                        </Grid>
                    </Segment>
                </Segment.Group>
            </Container>
        );
    }
}
