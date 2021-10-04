import React from "react";
import axios from "axios";
import update from 'immutability-helper';
//import w3cwebsocket from 'WebSocket';

var client = new WebSocket('ws://localhost:8080');


class SongTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        
    }

    componentDidMount() {
        client.addEventListener('open', this.openEventListener);
        client.addEventListener('message', this.messageListener);
    }

    openEventListener = event => {
        console.log('websocket connected');
    }

    messageListener(message) {
        const data = JSON.parse(message.data);
        console.log(data);
    }

    render() {
        var tablelist
        return(
            <table>
                <thead>
                    <tr>
                        <th>Participant Name</th>
                        <th>Solo Song</th>
                        <th>Duet song 1</th>
                        <th>Duet song 2</th>
                    </tr>
                </thead>
                <tr>
                    <td>A</td>
                    <td>songsolo1</td>
                    <td>songsame1</td>
                    <td>songmixed1</td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>songsolo2</td>
                    <td>songsame2</td>
                    <td>songmixed2</td>
                </tr>
            </table>
        )
    }
};

export default SongTable;