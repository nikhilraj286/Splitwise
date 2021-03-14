import React, {Component} from 'react';
import '../style.css';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { signup } from '../../store/actions/signupActions/signupActions';
import PropTypes from 'prop-types'
import '../../css/buttons.css'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            full_name : "",
            authFlag : false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    fullNameChangeHandler = (e) => {
        this.setState({
            full_name : e.target.value
        })
    }
        
    submitSignUp = async e => {
        // var headers = new Headers();
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
            full_name: this.state.full_name
        }
        await this.props.signup(data);
        // console.log(this.props.signupDetails)      
    }
    render(){
        // let details = null;
        // if(this.state.errMessage){
        //     details = <p className="alert alert-warning" style={{marginTop: '20px'}}><strong>Incorrect email or password</strong></p>
        // }
        let redirctVar = ""
        console.log("SIGN UP ************");
        console.log(this.props);
        console.log(this.state);
        if (localStorage.getItem('userProfile')) {
            // localStorage.setItem('userProfile', JSON.stringify(this.props.signupDetails.user))
            redirctVar = <Redirect to="/home"/>
        }
        // if(localStorage.getItem('userProfile')){
        //     this.setState({
        //         authFlag: true,
        //         Redirect: <Redirect to="/home"/>
        //     })
        // } else {
        //     this.setState({
        //         authFlag: false,
        //         Redirect: <Redirect to="/signup"/>
        //     })
        // }
        return(
            <div>
                {redirctVar}
                <div className="container-fluid">
                    <div className="container login-main" style={{padding: '150px 0'}}>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-2" style={{textAlign: 'center'}}>
                                <img width="200" height="200" className="login_logo" src={'https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg'} alt="splitwise-logo"/>
                            </div>
                            <div className="col-3">
                                <div className="login-form form" style={{paddingTop: '20px'}}>
                                    <h4>INTRODUCE YOURSELF</h4>
                                    <div className="mb-3">
                                        <input type="text" onChange = {this.fullNameChangeHandler} className="form-control" id="fullname" placeholder="Your full name" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" onChange = {this.emailChangeHandler} className="form-control" id="email" placeholder="Email Id" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" onChange = {this.passwordChangeHandler} className="form-control" id="password" placeholder="Password"/>
                                    </div>
                                    <button onClick = {this.submitSignUp} className="btn btn-primary btn-orange" style={{fontWeight:'bold'}}>Sign me up!</button>
                                </div>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    signup: PropTypes.func.isRequired,
    // user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return { signupDetails: state.signupDetails }
}

export default connect(mapStateToProps, {signup})(SignUp);