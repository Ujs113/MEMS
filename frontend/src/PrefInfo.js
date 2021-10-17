import React, { Fragment } from "react";
import axios from "axios";
import update from "immutability-helper";

class PrefInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            duetlist: [],
            preferences: [],
            complist: [],
            validlist: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePrefChange = this.handlePrefChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validSongs=  this.validSongs.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/participant/populated')
        .then(response => {
            this.setState({list: response.data});
        }).catch(err => {
            console.log(err);
        });

        axios.get('http://localhost:8080/songs/duets')
        .then(response => {
            this.setState({duetlist: response.data});
        }).catch(err => {
            console.log(err);
        });
    }
    handlePrefChange(key, value){
        this.setState({preferences: [...this.state.preferences, value] }, () => {console.log(this.state)});
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, () => {console.log(this.state.uname)});
        let part = this.state.list.find(participant => participant.mobileno == value);
        this.setState({duetsize: part.duetSize}, () => {
            const freeduets = this.state.duetlist.filter(duet => duet.preference === 0);
            let cpmlist = [];
            const list = this.validSongs(this.state.list, freeduets, part.gender);
            for(let i = 0; i < this.state.duetsize; i++){
                cpmlist.push(<DuetOpt key={i} index={i} duetlist={list} handleChange={this.handlePrefChange}/>);
            }
            this.setState({complist: cpmlist});
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        if(this.state.uname === null){
            alert('Please select your name!');
        }else{

            for(let i = 0; i < this.state.duetsize; i++){
                console.log(this.state.preferences[i]);
                axios.patch("http://localhost:8080/songs/duets/" + this.state.preferences[i], {name: Number(this.state.uname)})
                .then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        
    }

    requiredGender(gender, type){
        if(gender === 'male'){
            if(type === 'same'){
                return 'male';
            }else{
                return 'female';
            }
        }else{
            if(type === 'same'){
                return 'female';
            }else{
                return 'male';
            }
        }
    }

    validSongs(namelist, freelist, gen){
        var gender;
        //var gen;
        for(var i = 0; i < freelist.length; i++){
            for(var j = 0; j < namelist.length; j++){
                for(var s = 0; s < namelist[j].duetSong.length; s++){
                    if(freelist[i]._id === namelist[j].duetSong[s]._id){
                        gender = namelist[j].gender;
                        break;
                    }
                }
            }
        }
        // for(var i = 0; i < this.state.list.length; i++){
        //     if(this.state.list[i].mobileno === Number(this.state.uname)){
        //         gen = this.state.list[i].gender;
        //     }
        // }
        var validList = freelist.filter(song => this.requiredGender(gen, song.type) === gender);
        return validList;
    }

    render(){
        const namelist = this.state.list.filter(participant => participant.duetSize != 0);
        const freeduets = this.state.duetlist.filter(duet => duet.preference == 0);
        
        if(freeduets.length > 0){
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
                
                {this.state.complist}
                <input type="submit" />
            </form>
            );
        }else{
            return(<h2>No duets remainging to be taken up!</h2>)
        }
    }
}

class DuetOpt extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const value = event.target.value;
        this.props.handleChange(this.props.index, value);
    }
    render(){
        return(
            <Fragment>
                <label htmlFor="preference">Select Preferred Duet: </label>
                <select name="preference" id="preference" onChange={this.handleChange}>
                    <option value={null}>Select a song</option>
                    {this.props.duetlist.map((option) => (
                        <option value={option._id}>{option.songname + " (" + option.artist + ")"}</option>
                    ))}
                </select>
                <br />
            </Fragment>
        )
    }
}

export default PrefInfo;