import React, { Component } from 'react';
import {
    getBasicSummonerDetails,
    getSummonerMatches
} from '../utils/NetworkFunctions';
import {
    Container,
    Menu,
    Segment
} from 'semantic-ui-react';

const MainMenu = (props) => (
    <Menu pointing>
        <Menu.Item
            name='test1'
        />
        <Menu.Item
            name='test2'
        />
    </Menu>
);

export default class MainPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        getBasicSummonerDetails('RiotSchmick');
        getSummonerMatches('RiotSchmick');
    }

    render(){
        return (
            <Container>
                <MainMenu />
                <Segment>
                    haha here
                </Segment>
            </Container>
        );
    }
}
