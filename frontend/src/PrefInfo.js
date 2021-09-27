import React, { Fragment } from "react";
import axios from "axios";
import update from "immutability-helper";
class PrefInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            duetlist: [],
            uname: null,
            preferences: [],
            duetsize: null,
            complist: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        try{
            const res = await axios.get('http://localhost:8080/participant');
            this.setState({list: res.data});
            const ret = await axios.get('http://localhost:8080/songs/duets');
            this.setState({duetlist: ret.data});
        }catch(err){
            console.log(err);
        }
    }
    handlePrefChange(key, value){
        let newState = update(this.state, {
            preferences: {[key]:{$set: value}}
        });
        this.setState(newState);
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
        let part = this.state.list.find(participant => participant.mobileno == value);
        this.setState({duetsize: part.duetSize});
        console.log(part.duetSize);

        const freeduets = this.state.duetlist.filter(duet => duet.preferences == 0);
        for(let i = 0; i < part.duetSize; i++){
            let newState = update(this.state, {
                complist:{
                    [i]: {$set: <DuetOpt key={i} duetlist={freeduets} handleChange={this.handlePrefChange}/>}
                }
            });
            this.setState(newState);
        }
    }
    render(){
        const namelist = this.state.list.filter(participant => participant.duetSize != 0);

        if(freeduets.length > 0){
            return(
                <form>
                Select your name: 
                <select name="uname" id="uname" onChange={this.handleChange}>
                    <option value={null}>Select a name</option>
                    {namelist.map((option) => (
                        <option value={option.mobileno}>{option.firstname + " " + option.lastname}</option>
                    ))}
                </select>
                <br />
                
                {this.state.complist}
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
        this.props.handleChange(this.props.key, value)
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