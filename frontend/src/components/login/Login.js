import React, { Component } from 'react';
import '../style.css';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/loginActions/loginActions';
import PropTypes from 'prop-types'
import '../../css/buttons.css'
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
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
        if(this.state.email && this.state.password){
            e.preventDefault();
            const data = {
                email: this.state.email,
                password: this.state.password
            }
            await this.props.login(data);
        }
    }
    render() {
        // if(this.state.errMessage){
        //     details = <p className="alert alert-warning" style={{marginTop: '20px'}}><strong>Incorrect email or password</strong></p>
        // }
        let redirctVar = ""
        if (localStorage.getItem('userProfile')) {
            redirctVar = <Redirect to="/home"/>
        }
        return (
            <div>
                {redirctVar}
                <div className="container-fluid">
                    <div className="container login-main" style={{ padding: '150px 0' }}>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-2" style={{ textAlign: 'center' }}>
                                <img width="200" height="200" className="login_logo" src={'https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg'} alt="splitwise-logo" />
                            </div>
                            <div className="col-3">
                                <div className="login-form form" style={{ paddingTop: '20px' }}>
                                    <h4>WELCOME TO SPLITWISE</h4>
                                    <div className="mb-3">
                                        <input type="emaill" onChange={this.emailChangeHandler} className="form-control" id="exampleInputemaill1" placeholder="Email Id" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" onChange={this.passwordChangeHandler} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <Link onClick={this.submitLogin} className="btn link-orange"  style={{fontWeight:'bold', color:'#fff'}}>Log in</Link>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return { loginDetails : state.loginDetails }
}

export default connect(mapStateToProps, {login})(Login);