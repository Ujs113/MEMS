//import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
    return (
        <div>
            <h1>Welcome to MEMS</h1>
            <GeneralInfo />
        </div>
    );
}

class GeneralInfo extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            gender: '',
            mobileno: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const nam = event.target.name;
        const value = event.target.value;
        this.setState({[nam]: value});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8080/participant', this.state)
        .then(respose=> {
            console.log(respose);
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="fname">First name: </label>
                <input type="text" id="fname" name="firstname" onChange={this.handleChange}/>
                <br />
                <label htmlFor="lname">Last name: </label>
                <input type="text" id="lname" name="lastname" onChange={this.handleChange}/>
                <br />
                Gender: 
                <input type="radio" id="male" name="gender" value="male" onChange={this.handleChange}/>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange}/>
                <label htmlFor="female">Female</label>
                <br />
                <label htmlFor="mnumber">Mobile No.: </label>
                <input type="tel" id="mnumber" name="mobileno" onChange={this.handleChange} />
                <br />
                <input type="submit"/>
            </form>
        );
    }
}

export default App;
