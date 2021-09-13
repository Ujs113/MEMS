import axios from 'axios';
import update from 'immutability-helper';
import React, { Fragment } from 'react';

class SongInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uname: null,
            namelist: [],
            solosong: {
                songname: '',
                artist: ''
            },
            duetsong: [{songname: '', artist: '', type: 'same', preference: 0}, {songname: '', artist: '', type: 'same', preference: 0}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSoloChange = this.handleSoloChange.bind(this);
        this.handleDuetChange = this.handleDuetChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/participant')
        .then(response => {
            console.log(response);
            this.setState({namelist: response.data});
        })
    }

    handleSoloChange(name, value){
        let newState = update(this.state, {
            solosong: {
                [name]: {$set: value}
            }
        });
        this.setState(newState);
    }

    handleDuetChange(index, name, value){
        let newState = update(this.state, {
            duetsong: {
                [index]: {
                    [name]: {$set: value}
                }
            }
        });
        this.setState(newState);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.patch('http://localhost:8080/songs/' + this.state.uname, this.state)
        .then(res => {
            console.log(res);
        })
        
    }

    render(){
        const namelist = this.state.namelist;
        return(
            <form onSubmit={this.handleSubmit}>
                Select your name: 
                <select name="uname" id="uname" onChange={this.handleChange}>
                    <option value={null}>Select a name</option>
                    {namelist.map((option) => (
                        <option value={option.mobileno}>{option.firstname + " " + option.lastname}</option>
                    ))}
                </select>
                <br />
                Solo Song:
                <br />
                <Solo parentCallback={this.handleSoloChange}/>
                <br />
                Duet Song 1:
                <br />
                <Duet index={0} partList={this.state.namelist} parentCallback={this.handleDuetChange}/>
                <br />
                Duet Song 2:
                <br />
                <Duet index={1} partList={this.state.namelist} parentCallback={this.handleDuetChange}/>
                <br />
                <input type="submit" />
            </form>
        );
    }
}

class Solo extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.props.parentCallback(name, value);
    }
    render(){
        return(
            <Fragment>
                <label htmlFor="songname">Song Name: </label>
                <input type="text" id="songname" name="songname" onChange={this.handleChange}/>
                <label htmlFor="artist">Artist Name: </label>
                <input type="text" id="artist" name="artist" onChange={this.handleChange}/>
            </Fragment>  
        );
    }
    
}

class Duet extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const index = this.props.index;
        this.props.parentCallback(index, name, value);
    }
    render(){
        const list = this.props.partList;
        return(
            <Fragment>
                <label htmlFor="songname">Song Name: </label>
                <input type="text" id="songname" name="songname" onChange={this.handleChange}/>
                <label htmlFor="artist">Artist Name: </label>
                <input type="text" id="artist" name="artist" onChange={this.handleChange}/>
                <label htmlFor="type">Select Duet Type: </label>
                <select name="type" id="type" onChange={this.handleChange}>
                    <option value="same">Same Gender</option>
                    <option value="mixed">Mixed Gender</option>
                </select>
                <label htmlFor="preference">Select Preferred Partner: </label>
                <select name="preference" id="preference" onChange={this.handleChange}>
                    <option value={null}>Select a name</option>
                    {list.map((option) => (
                        <option value={option.mobileno}>{option.firstname + " " + option.lastname}</option>
                    ))}
                </select>
            </Fragment>
        );
    }
}


export default SongInfo;