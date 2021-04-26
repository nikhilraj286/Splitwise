import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import login from './login/Login'
import signup from './signup/Signup';
import Home from './home/home'
import Navbar from './navbar/Navbar'
import landing from './landing/landing'
import AddGroup from './group/addGroup';
import userProfile from './userProfile/userProfile';

class Main extends Component {
    render(){
        return(
            <div>
                <Route exact path='/' component={landing}/>
                <Route path='/' component={Navbar}/>
                <Route path='/login' component={login}/>
                <Route path='/signup' component={signup}/>
                <Route path="/home" component={Home}/>
                <Route path="/group/new" component={AddGroup}/>
                <Route path="/userAccount"  component={userProfile}/>
            </div>
        );
    }

}

export default Main;