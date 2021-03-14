import React, { Component } from 'react';
import '../style.css';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/loginActions/loginActions';
import PropTypes from 'prop-types'

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
        // console.log(this.props.loginDetails)
        // if (this.props.loginDetails.status === 200) {
        //     localStorage.setItem('userProfile', JSON.stringify(this.props.loginDetails.user))
        // }

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
    }
    render() {
        // if(this.state.errMessage){
        //     details = <p className="alert alert-warning" style={{marginTop: '20px'}}><strong>Incorrect email or password</strong></p>
        // }
        // let redirctVar = ""
        // if (this.props.loginDetails.user && this.props.loginDetails.user.user_id) {
        //     localStorage.setItem('userProfile', JSON.stringify(this.props.loginDetails.user))
        //     redirctVar = <Redirect to="/home"/>
        // }
        return (
            <div>
                {/* {redirctVar} */}
                <div className="container-fluid">
                    <div className="container userProfile-main" style={{}}>
                        <h3>Your account</h3>

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">

                                    </div>
                                    <div className="col">

                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <p>Your default currency</p>
                                <p>(for new expenses)</p>
                            </div>
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
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return { loginDetails : state.loginDetails }
}

export default connect(mapStateToProps, {login})(Login);