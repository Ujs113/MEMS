import React from 'react';
import './App.css';
import GeneralInfo from './GeneralInfo';
import SongInfo from './SongInfo';
import PrefInfo from './PrefInfo';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOrganized: false,
            partInfoCollected: false,
            songInfoCollected: false,
        };
    }
    
    render(){
        let screen = <PrefInfo />;
        // if(!this.state.isOrganized){
        //     screen = (
        //         <p>Looks like no event has been organized! If you think there is a mistake, contact the organizer</p>
        //     );
        // }   
        // else if(!this.state.partInfoCollected){
        //     screen = <GeneralInfo />;
        // }
        // else if(!this.state.songInfoCollected){
        //     screen = <SongInfo />;
        // }
        // else{
        //     screen = <PrefInfo />;
        // }
        return (
            <div>
                <h1>Welcome to MEMS</h1>
                {screen}
            </div>
        );
    }
}


export default App;
