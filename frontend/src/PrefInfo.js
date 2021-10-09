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
            complist: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePrefChange = this.handlePrefChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/participant')
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
        this.setState({[name]: value});
        let part = this.state.list.find(participant => participant.mobileno == value);
        this.setState({duetsize: part.duetSize}, () => {
            const freeduets = this.state.duetlist.filter(duet => duet.preference === 0);
            let cpmlist = [];
            for(let i = 0; i < this.state.duetsize; i++){
                cpmlist.push(<DuetOpt key={i} index={i} duetlist={freeduets} handleChange={this.handlePrefChange}/>);
            }
            this.setState({complist: cpmlist});
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
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