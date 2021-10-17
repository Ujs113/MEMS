import axios from 'axios';
import update from 'immutability-helper';
import React, { Fragment } from 'react';

class SongInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uname: null,
            gender: '',
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
        if(name === "uname"){
            let ret = this.state.namelist.find(participant => participant.mobileno == value);
            this.setState({gender: ret.gender});
        }
    }

    checksong(songlist, songs){
        for(let x in songlist){
            for(let y in songs){
                if((x.songname === y.songname) && (x.artist === y.artist)){
                    return true;
                }
            }
        }
        return false;
    }

    handleSubmit(event){
        event.preventDefault();
        let check = false;
        axios.get('http://localhost:8080/songs/solos/')
        .then(res => {
            const sololist = res.data;
            if(sololist.some(song => song.songname === this.state.solosong.songname && song.artist === this.state.solosong.artist)){
                check = true;
            }
        })
        axios.get('http://localhost:8080/songs/duets/')
        .then(res => {
            const duetlist = res.data;
            if(this.checksong(duetlist, this.state.duetsong)){
                check = true;
            }
        })

        if(check){
            alert('Someone else seems to have already taken that song! Please check your song details and select a different song.');
        }else if(this.state.uname === null) {
            alert('Please select your name!');
        }else{
            axios.patch('http://localhost:8080/songs/' + this.state.uname, this.state)
            .then(res => {
                console.log(res);
            })
        }        
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
                <Duet index={0} uname={this.state.uname} gender={this.state.gender} pref={this.state.duetsong[1].preference} partList={this.state.namelist} parentCallback={this.handleDuetChange}/>
                <br />
                Duet Song 2:
                <br />
                <Duet index={1} uname={this.state.uname} gender={this.state.gender} pref={this.state.duetsong[0].preference} partList={this.state.namelist} parentCallback={this.handleDuetChange}/>
                <br />
                <input type="submit" />
            </form>
        );
    }
};

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
    
};

class Duet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'same'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const index = this.props.index;
        if(name === 'type'){
            this.setState({[name]: value});
        }
        this.props.parentCallback(index, name, value);
    }
    requiredGender(){
        if(this.props.gender === 'male'){
            if(this.state.type === 'same'){
                return 'male';
            }else{
                return 'female';
            }
        }else{
            if(this.state.type === 'same'){
                return 'female';
            }else{
                return 'male';
            }
        }
    }
    render(){
        const list = this.props.partList.filter(participant => participant.duetSize != 0 && participant.gender === this.requiredGender() && participant.mobileno != this.props.pref && participant.mobileno != this.props.uname);
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
};


export default SongInfo;