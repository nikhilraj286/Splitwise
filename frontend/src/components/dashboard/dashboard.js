import React, {Component} from 'react';
import '../../App.css';
// import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../css/buttons.css'
import '../style.css'
import LeftBar from './leftBar/LeftBar';
import Center from './centerBar/centerBar';

class Home extends Component {
    state={
        tabSelected:1,
        groupSelected:1,
        usersSelected:1,
        tabs:[
            {
                key:1,
                name:"Dashboard",
                logo:"",
                heading:false
            },
            {
                key:2,
                name:"Recent Activity",
                logo:"",
                heading:false
            },
            {
                key:3,
                name:"Groups",
                logo:"",
                heading:true
            },

        ],
        groups:[
            {
                id:1,
                title:"group 1"
            },
            {
                id:2,
                title:"group 2"
            }
        ],

    }

    changeTab=(id)=>{
        this.setState({
            tabSelected:id
        })
    }

    selectgroup=(tabSelected,groupSelected)=>{
        this.setState({
            tabSelected:tabSelected,
            groupSelected:groupSelected
        });
    }

    // componentDidMount=()=>{
    //     axios.get('http://localhost:3001/dashboard')
    //             .then((response) => {
    //             //update the state with the response data
                
    //             this.setState({ 
    //             });
    //         });
    // }

    render=()=>{
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div style={{width:"70%"}} className="container">
                    <div className="row">
                        <div className="col-2 leftBar">
                            <div className="inner">
                            <LeftBar tabs={this.state.tabs} groups={this.state.groups} tabSelected={this.state.tabSelected} groupSelected={this.state.groupSelected}  changeTab={this.changeTab}  changeGroup={this.selectgroup}/>
                            </div>
                        </div>
                        <div className="col-7 centerBar">
                            <div className="inner">
                            <Center selected={this.state.tabSelected} groupSelected={this.state.groupSelected}/>
                            </div>
                        </div>
                        <div className="col-3 rightBar">
                            <div id="right_sidebar_content">
                                <h4>Get Splitwise Pro!</h4>
                                <img height="128" style={{margin:'5px 0'}} alt="purple-logo" src="https://assets.splitwise.com/assets/pro/logo-337b1a7d372db4b56c075c7893d68bfc6873a65d2f77d61b27cb66b6d62c976c.svg"/>
                                <div><p>Subscribe to <strong>Splitwise Pro</strong> for no ads, currency conversion, charts, search, and more.</p></div>
                                <button className="btn btn-primary btn-orange disabled"  style={{fontWeight:'bold', marginTop:"8px"}}>Learn more</button>
                            </div>
                            {/* <div className="ads_container">
                                <h2 style={{marginTop:"20px"}}>Hey there!</h2>
                                <div style="background: #eee; padding: 10px; margin: 5px 20px 10px -5px">
                                    <div class="share">
                                        It looks like you use an ad blocker. That’s cool! So do we :)
                                        <div style="height: 10px">&nbsp;</div>
                                        Please support Splitwise by telling your friends about us!

                                <div class="social">
                                    <a href="http://www.facebook.com/dialog/share?app_id=293864780643203&amp;display=popup&amp;redirect_uri=https%3A%2F%2Fwww.splitwise.com%2Fthanks&amp;href=&amp;href=https%3A%2F%2Fwww.splitwise.com" target="_blank" data-action="adblock share" class="btn btn-facebook track">
                                        <img alt="Facebook" src="/assets/fat_rabbit/social/facebook.png">
                                        Share
                                    </a>
                                    <a href="https://twitter.com/intent/tweet?text=Splitwise+makes+it+easy+to+split+expenses+with+housemates%2C+trips%2C+groups%2C+friends%2C+and+family.+Check+it+out%21&amp;url=https%3A%2F%2Fwww.splitwise.com" target="_blank" data-action="adblock tweet" class="btn btn-twitter track">
                                        <img alt="Twitter" src="/assets/fat_rabbit/social/twitter.png">
                                        Tweet
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
//export Home Component
export default Home;