import React, { Fragment } from 'react';

class SongInfo extends React.Component{
    render(){
        return(
            <form>
                Solo Song:
                <br />
                <Solo />
                <br />
                Duet Song 1:
                <br />
                <Duet partList={list}/>
                <br />
                Duet Song 2:
                <br />
                <Duet partList={list}/>
                <br />
                <input type="submit" />
            </form>
        );
    }
}

function Solo(props){
    return(
        <Fragment>
            <label htmlFor="soloname">Song Name: </label>
            <input type="text" id="soloname" name="soloname" />
            <label htmlFor="soloartistname">Artist Name: </label>
            <input type="text" id="soloartistname" name="soloartistname" />
        </Fragment>  
    );
}

function Duet(props){
    const list = props.partList;
    return(
        <Fragment>
            <label htmlFor="duetname">Song Name: </label>
            <input type="text" id="duetname" name="duetname" />
            <label htmlFor="duet1artistname">Artist Name: </label>
            <input type="text" id="artistname" name="artistname" />
            <laber htmlFor="type">Select Duet Type: </laber>
            <select name="type" id="type">
                <option value="same">Same Gender</option>
                <option value="mixed">Mixed Gender</option>
            </select>
            <laber htmlFor="preference">Select Preferred Partner: </laber>
            <select name="preference" id="preference">
                {list.map((option) => (
                    <option value={option.mobileno}>{option.firstname + " " + option.lastname}</option>
                ))}
            </select>
        </Fragment>
    );
}

const list = [
    {
        firstname: "Abcd",
        lastname: "Efgh",
        mobileno: 1234567890
    },
    {
        firstname: "Bcd",
        lastname: "Fgh",
        mobileno: 1023456789
    }
];

export default SongInfo;