import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import '../../css/buttons.css'
import '../style.css'
import LeftBar from './leftBar/LeftBar';
// import Center from './centerBar/centerBar';
import Dashboard from './centerBar/dashboard';
import ViewGroup from './centerBar/viewGroup'
import RecentActivity from './centerBar/recentActivity'
import MyGroups from './centerBar/myGroups'
import axios from 'axios';
import exportData from '../../config/config';

class Home extends Component {
    state = {
        tabSelected: 1,
        groupSelected: 0,
        tabs: [
            {
                key: 1,
                name: "Dashboard",
                logo: "",
                heading: false
            },
            {
                key: 2,
                name: "Recent Activity",
                logo: "fa fa-flag",
                heading: false
            },
            {
                key: 3,
                name: "My Groups",
                logo: "",
                heading: false
            },
            {
                key: 4,
                name: "Groups",
                logo: "",
                heading: true
            },

        ],
        groups: [],
        rerender: 0

    }

    changeTab = (id) => {
        // console.log("inside change tab - ",id)
        this.setState({
            tabSelected: id,
            rerender: this.state.rerender
        })
        let data = JSON.parse(localStorage.getItem('selectedTab'))
        data.tabSelected = id
        localStorage.setItem('selectedTab', JSON.stringify(data))
        
    }

    changeGroup = (tabSelectedId, groupSelectedId) => {
        // console.log("inside change group - ",tabSelected,groupSelected)
        this.setState({
            tabSelected: tabSelectedId,
            groupSelected: groupSelectedId,
            rerender: this.state.rerender
        });
        let data = JSON.parse(localStorage.getItem('selectedTab'))
        data.tabSelected = tabSelectedId
        data.groupSelected = groupSelectedId
        localStorage.setItem('selectedTab', JSON.stringify(data))
    }

    acceptInvite = async (groupId) => {
        if(localStorage.getItem('userProfile')){
            let userId = JSON.parse(localStorage.getItem('userProfile')).user_id
            const data = {
                user_id: userId,
                group_id: groupId
            }
            axios.defaults.withCredentials = true;
            await axios.post(exportData.backendURL+'acceptInvite', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    this.setState({
                        rerender: this.state.rerender + 1
                    })
                    // console.log("State -> ",this.state)
                    // this.props.history.push('/home')
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    componentWillMount = async () => {
        // console.log(this.state)
        if(localStorage.getItem('selectedTab')){
            let selectedTabData = JSON.parse(localStorage.getItem('selectedTab'))
            // console.log('data',data)
            this.setState({
                groupSelected: selectedTabData.groupSelected,
                tabSelected: selectedTabData.tabSelected
            })
        } else {
            let setItem = {
                tabSelected: 1,
                groupSelected: 0
            }
            localStorage.setItem('selectedTab', JSON.stringify(setItem))
        }
        if(localStorage.getItem('userProfile')){
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            // console.warn(userProfile)
            let userId = userProfile.user_id
            const data = {
                user_id: userId
            }
            axios.defaults.withCredentials = true;
            await axios.post(exportData.backendURL+'getGroups', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                // console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    // this.setState({
                    //     groups.
                    // })
                    // console.log(res.data)
                    this.setState({
                        groups: res.data,
                        rerender: 0
                    })
                }
            }).catch((err) => {
                console.log(err)
            });

            await axios.get(exportData.backendURL+'getAllUsersNames', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                // console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    // this.setState({
                    //     groups.
                    // })
                    // console.log(res.data)
                    localStorage.setItem('allUsers', JSON.stringify(res.data))
                    
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(localStorage.getItem('userProfile') && (this.state.rerender > prevState.rerender)){
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            let userId = userProfile.user_id
            const data = {
                user_id: userId
            }
            axios.defaults.withCredentials = true;
            await axios.post(exportData.backendURL+'getGroups', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                if (res.status === 200) {
                    this.setState({
                        groups: res.data,
                        rerender: 0
                    })
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    render = () => {
        // console.log(this.props, "in home");
        // console.log('DATA', JSON.parse(localStorage.getItem('selectedTab')))
        // console.log('STATE', this.state)
        let redirectVar = null;
        if (!localStorage.getItem('userProfile')) {
            redirectVar = <Redirect to="/login" />
        }
        var comp = ""
        if(this.state.tabSelected===1 || this.state.tabSelected===0){
            comp = <Dashboard />
        } else if(this.state.tabSelected===2){
            comp = <RecentActivity />
        } else if(this.state.tabSelected===3){
            comp = <MyGroups tabs={this.state.tabs} groups={this.state.groups} tabSelected={this.state.tabSelected} groupSelected={this.state.groupSelected} changeTab={this.changeTab} changeGroup={this.changeGroup} acceptInvite={this.acceptInvite}/>
        }else if(this.state.tabSelected === 4){
            comp = <ViewGroup groupID={this.state.groupSelected}/>
        }
        return (
            <div>
                {redirectVar}
                <div style={{ width: "75%" }} className="container">
                    <div className="row">
                        <div className="col-2 leftBar" style={{marginRight:'10px', width:'18%'}}>
                            <div className="inner">
                                <LeftBar tabs={this.state.tabs} groups={this.state.groups} tabSelected={this.state.tabSelected} groupSelected={this.state.groupSelected} changeTab={this.changeTab} changeGroup={this.changeGroup}/>
                            </div>
                        </div>
                        <div className="col centerBar" style={{padding:'0'}}>
                            <div className="inner">
                                {/* <Center selected={this.state.tabSelected} groupSelected={this.state.groupSelected}/> */}
                                {/* <Dashboard />
                                <ViewGroup /> */}
                                {comp}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;