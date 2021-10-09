import React from 'react';
import './App.css';
import GeneralInfo from './GeneralInfo';
import SongInfo from './SongInfo';
import PrefInfo from './PrefInfo';
import axios from 'axios';
import Stub from './SongTable';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOrganized: false,
            partInfoCollected: false,
            songInfoCollected: false,
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8080/event')
        .then(response => {
            this.setState({
                isOrganized: response.data[0].isOrganized,
                partInfoCollected: response.data[0].partInfoCollected,
                songInfoCollected: response.data[0].partInfoCollected
            }, () => {console.log(this.state)});

        }).catch(err => {
            console.log(err);
        })
    }
    
    render(){
        let screen;
        if(!this.state.isOrganized){
            screen = (
                <p>Looks like no event has been organized! If you think there is a mistake, contact the organizer</p>
            );
        }   
        else if(!this.state.partInfoCollected){
            screen = <GeneralInfo />;
        }
        else if(!this.state.songInfoCollected){
            screen = <SongInfo />;
        }
        else{
            screen = <PrefInfo />;
        }
        return (
            <div>
                <h1>Welcome to MEMS</h1>
                {screen}
            </div>
        );
    }
}


export default App;
