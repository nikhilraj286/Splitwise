import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import login from './login/Login'
import signup from './signup/Signup';
import home from './home/Home'
import navbar from './navbar/Navbar'


class Main extends Component {
    render(){
        return(
            <div>
                <Route path='/' component={navbar}/>
                <Route path='/login' component={login}/>
                <Route path='/signup' component={signup}/>
                <Route path="/home" component={home}/>
            </div>
        );
    }

}

export default Main;