import React from 'react';
import axios from 'axios';
import { number } from 'prop-types';

class GeneralInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            gender: '',
            mobileno: null,
            list: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/participant')
        .then(response => {
            this.setState({list: response.data});
        })
    }

    handleChange(event){
        const nam = event.target.name;
        const value = event.target.value;
        this.setState({[nam]: value});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.list);
        if(this.state.firstname === '' || this.state.lastname === ''){
            alert('Please enter a name!');
        }else if(this.state.gender === ''){
            alert('Please enter your gender');
        }else if(this.state.mobileno === null || isNaN(+this.state.mobileno) || this.state.mobileno.toString().length != 10){

            alert('Invalid mobile number!');
        }else if(this.state.list.some(participant => participant.firstname === this.state.firstname && participant.lastname === this.state.lastname && participant.mobileno === Number(this.state.mobileno))){
            alert('You have already entered your details!');
        }
        else{
            axios.post('http://localhost:8080/participant', this.state)
            .then(respose=> {
                console.log(respose);
            })
            .catch(error => {
                console.log(error);
            })
        }
        
    }
    
    render(){
        return(
            <div>
                <h2>Enter your basic details</h2>
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
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default GeneralInfo;