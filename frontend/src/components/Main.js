import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import login from './login/Login'
import signup from './signup/Signup';
import Home from './home/home'
import Navbar from './navbar/navbar'
import landing from './landing/landing'
import AddGroup from './group/addGroup';
// import dashboard from './home/centerBar/dashboard'


class Main extends Component {
    render(){
        // let navbar_display = null
        // if(localStorage.getItem('userprofile')){
        //     navbar_display = navbar
        // }
        // console.log(localStorage)
        return(
            <div>
                <Route exact path='/' component={landing}/>
                <Route path='/' component={Navbar}/>
                <Route path='/login' component={login}/>
                <Route path='/signup' component={signup}/>
                <Route path="/home" component={Home}/>
                <Route path="/group/new" component={AddGroup}/>
                {/* <Route path="/home/dashboard" component={dashboard}/> */}
            </div>
        );
    }

}

export default Main;