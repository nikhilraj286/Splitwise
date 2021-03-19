import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import login from './login/Login'
import signup from './signup/Signup';
import Home from './home/home'
import Navbar from './navbar/Navbar'
import landing from './landing/landing'
import AddGroup from './group/addGroup';
import userProfile from './userProfile/userProfile';
// import ViewGroup from './home/centerBar/viewGroup';
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
                <Route path="/userAccount"  component={userProfile}/>
                {/* <Route path="/home/groups/:id" component={ViewGroup}/> */}
                {/* <Route path="/home/dashboard" component={dashboard}/> */}
            </div>
        );
    }

}

export default Main;