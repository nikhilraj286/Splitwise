import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import login from './login/Login'
import signup from './signup/Signup';
import Dashboard from './dashboard/dashboard'
import navbar from './navbar/Navbar'
import landing from './landing/landing'


class Main extends Component {
    render(){
        return(
            <div>
                <Route exact path='/' component={landing}/>
                <Route path='/' component={navbar}/>
                <Route path='/login' component={login}/>
                <Route path='/signup' component={signup}/>
                <Route path="/dashboard" component={Dashboard}/>
            </div>
        );
    }

}

export default Main;