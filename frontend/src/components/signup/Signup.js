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
            email : null,
            password : null,
            full_name : null,
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
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            full_name: this.state.full_name
        }
        await this.props.signup(data);
        this.setState({ login: true })
    }
    render(){
        let redirctVar = ""
        let invalidSignupMsg = ""
        if(this.state.login){
        if (this.props.signupDetails && this.props.signupDetails.user && this.props.signupDetails.user.user_id) {
            redirctVar = <Redirect to="/home"/>
        } else if(this.props.signupDetails && this.props.signupDetails.user && this.props.signupDetails.user === 400){
            invalidSignupMsg = (<div className="alert alert-success" style={{margin:'70px auto', width:'20%', textAlign:'center'}} role="alert">
            Email id already exists
          </div>)
        }}
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
                                    <form onSubmit={this.submitSignUp}>
                                        <div className="mb-3">
                                            <input type="text" onChange={this.fullNameChangeHandler} required  className="form-control" id="fullname" placeholder="Your full name" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" onChange={this.emailChangeHandler} required  className="form-control" id="email" placeholder="Email Id" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" onChange={this.passwordChangeHandler}  required className="form-control" id="password" placeholder="Password" />
                                        </div>
                                        <button type="submit" className="btn btn-orange" style={{ fontWeight: 'bold', color: '#fff' }}>Sign me up!</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-4"></div>
                        </div>
                        <div className="row">
                        {invalidSignupMsg}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    signup: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return { signupDetails: state.signupDetails }
}

export default connect(mapStateToProps, {signup})(SignUp);