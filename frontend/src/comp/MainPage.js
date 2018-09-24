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
    Header
} from 'semantic-ui-react';

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
                        <Button icon='search' onClick={() => this.props.setSearchName(this.state.summonerName)}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

const MatchItem = (props) => (
    <Grid.Row divided>
    </Grid.Row>
);

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            summonerName: "",
            matches: []
        };
        this.setSearchName = this.setSearchName.bind(this);
        this.processMatches = this.processMatches.bind(this);
    }

    async setSearchName(summonerName){
        await this.setState({ summonerName });
        if (summonerName){
            getBasicSummonerDetails(summonerName);
            getSummonerMatches(summonerName)
                .then(json => this.processMatches(json));
        }
    }

    processMatches(json){
        console.log("Got matches:", json);
    }

    componentDidMount(){
        getBasicSummonerDetails('RiotSchmick');
        getSummonerMatchDetails('RiotSchmick');
    }

    render(){
        return (
            <Container>
                <MainMenu {...this}/>
                <Segment>
                    <Header as='h1'>{this.state.summonerName}</Header>
                </Segment>
                <Segment>
                    <Grid>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}
