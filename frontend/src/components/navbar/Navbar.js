import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../../css/buttons.css'
import imageUser from '../icon.png';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/logoutActions/logoutActions';

class Navbar extends Component {
    render() {

        let navLogin = null;
        if (localStorage.getItem('userProfile')) {
            const user1 = JSON.parse(localStorage.getItem('userProfile'))
            navLogin = (
                <div style={{ width: '100%' }}>
                    <Link to='/' onClick={() => {
                        let setItem = {
                            tabSelected: 1,
                            groupSelected: 0
                        }
                        localStorage.setItem('selectedTab', JSON.stringify(setItem))
                    }}><img id="logo" width="110px" alt="logo" style={{ float: 'left', margin: '7px 0' }} src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"></img></Link>

                    <ul className="nav navbar-nav navbar-right" style={{ flexDirection: 'row', float: 'right' }}>
                        <Link className="btn link-green" to="/userAccount" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '20px' }}><img src={imageUser} style={{ width: '17px' }} alt="userIcon" /> {user1.full_name}</Link>
                        <Link onClick={() => {
                            localStorage.clear();
                            this.props.logout();
                        }} className="btn link-orange" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '20px' }}>Logout</Link>
                    </ul>
                </div>
            );
        } else {
            navLogin = (
                <div style={{ width: '100%' }}>
                    <Link to='/'><img id="logo" width="110px" alt="logo" style={{ float: 'left', margin: '7px 0' }} src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"></img></Link>
                    <ul className="nav navbar-nav navbar-right" style={{ flexDirection: 'row', float: 'right' }}>
                        <Link className="btn link-green" to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Log in</Link>
                        <p style={{ margin: '5px 15px' }}>or</p>
                        <Link className="btn link-orange" to="/signup" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
                    </ul>
                </div>
            );
        }
        let redirectVar = null;
        if (localStorage.getItem('userProfile')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <nav className="navbar navbar-inverse" style={{ backgroundColor: '#5BC5A7', boxShadow: '0px 1px 5px 2px #bbb' }}>
                    <div className="container-fluid" style={{ width: '75%', margin: 'auto', padding: '0' }}>
                        <div className="navbar-header">

                        </div>
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default connect(null, { logout })(Navbar);
