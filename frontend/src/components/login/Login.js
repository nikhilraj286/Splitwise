import React, { Component } from 'react';
import '../style.css';
// import axios from 'axios';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/loginActions/loginActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    submitLogin = async e => {
        // var headers = new Headers();
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        await this.props.login(data);

        if (this.props.loginDetails.status === 200) {
            this.setState({
                authFlag: true,
                Redirect: <Redirect to="/home"/>
            })
        } else {
            this.setState({
                authFlag: false,
                Redirect: <Redirect to="/signup"/>
            })
        }
    }
    render() {
        // if(this.state.errMessage){
        //     details = <p class="alert alert-warning" style={{marginTop: '20px'}}><strong>Incorrect email or password</strong></p>
        // }
        return (
            <div>
                {this.state.Redirect}
                <div className="container-fluid">
                    <div className="container login-main" style={{ padding: '100px 0' }}>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-2" style={{ textAlign: 'center' }}>
                                <img width="200" height="200" className="login_logo" src={'https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg'} alt="splitwise-logo" />
                            </div>
                            <div className="col-3">
                                <div className="login-form form" style={{ paddingTop: '20px' }}>
                                    <h4>WELCOME TO SPLITWISE</h4>
                                    <div className="mb-3">
                                        <input type="emaill" onChange={this.emailChangeHandler} className="form-control" id="exampleInputemaill1" placeholder="emaill Id" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" onChange={this.passwordChangeHandler} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <button onClick={this.submitLogin} className="btn btn-primary">Log in</button>
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

// export default Login;

const mapStateToProps = (state) => {
    return { loginDetails: state.loginDetails }
}

export default connect(mapStateToProps, {login})(Login);