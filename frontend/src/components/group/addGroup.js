import axios from 'axios';
import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import '../style.css'
import exportData from '../../config/config'
import { Redirect } from 'react-router';

export default class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scroll: false,
            allUsers: {},
            usersToAdd: {},
            selected: false,
            selectedPerson: 0,
            groupName: '',
            groupCreated:false,
        }
        this.createGroup = this.createGroup.bind(this)
    }

    createGroup = async () => {
        let data = {
            user_list:{...this.state.usersToAdd},
            group_name:this.state.groupName,
            no_of_users:Object.keys(this.state.usersToAdd).length,
        }
        console.log(data)
        axios.defaults.withCredentials = true;
        await axios.post(exportData.backendURL+'createGroup', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            console.log("group creation Status Code : ", res.status);
            console.log('group created - ', res)
            this.setState({
                groupCreated:true
            })
            this.props.history.push('/home')
            
        }).catch((err) => {
            console.log('group creation error -',err)
        });
    }



    // changeNumber = () => {
    //     this.setState({
    //         number: this.state.number + 1
    //     })
    // }

    componentDidMount = async () => {
        axios.defaults.withCredentials = true;
        await axios.post(exportData.backendURL+'getUsers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async (res) => {
                // console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    // console.log(res.data)
                    let index = 0
                    let current_user_id = JSON.parse(localStorage.getItem('userProfile')).user_id
                    let temp_data = res.data
                    // console.log(temp_data)
                    // let user_data = []
                    let user_data_1 = {}
                    let user_data_2 = {}
                    for (index; index < temp_data.length; index++) {
                        let temp_val = temp_data[index]
                        let data = {
                            user_id: temp_val.user_id,
                            email: temp_val.email,
                            full_name: temp_val.full_name,
                            canBeDeleted: 0
                        }
                        if (temp_val.user_id === current_user_id) {
                            user_data_1[temp_val.user_id] = data
                            // user_data.splice(0, 0, data)
                            // temp_data.splice(index, 1)
                            // console.log(temp_data)
                        } else {
                            data.canBeDeleted = 1
                            user_data_2[temp_val.user_id] = data
                        }
                    }
                    this.setState({
                        allUsers: user_data_2,
                        usersToAdd: user_data_1
                    })
                    // console.log('all users - ', this.state.allUsers)
                    // console.log('users to add - ', this.state.usersToAdd)
                }
            }).catch((err) => {
                console.log(err)
            });
    }

    render = () => {
        // console.log('current state', this.state)
        // let redirect = ""
        // if(this.state.groupCreated){
        //     redirect = <Redirect to="/home"/>
        // }

        let redirectVar = null;
        if (!localStorage.getItem('userProfile')) {
            redirectVar = <Redirect to="/login" />
        }

        let current_user=null
        if (this.state.scroll) {
            document.getElementById('dropdown').classList.add("secondary_fields-scroll")
        }
        if(localStorage.getItem('userProfile')){
            current_user = JSON.parse(localStorage.getItem('userProfile'))
        }
        // console.log(current_user)

        var personList = []
        var keys1 = Object.keys(this.state.usersToAdd)
        if (this.state.usersToAdd && keys1.length > 0) {
            keys1.forEach(item => {
                // {(item === current_user.user_id}
                var data = this.state.usersToAdd[item]
                if ((item !== current_user.user_id) && (data.canBeDeleted === 1)) {
                    personList.push(<div className="row personList" style={{ margin: '0 0 15px 0' }}>
                        <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png" alt="" />
                        </div>
                        <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 0 10px' }} id={data.user_id}>{data.full_name} ({data.email})</p>
                        </div>


                        <div className="col-1" style={{ padding: '0' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#ff652f" class="bi bi-trash-fill" viewBox="0 0 16 16" style={{ cursor: 'pointer' }} onClick={(e) => {
                                let data = { ...this.state.usersToAdd }
                                console.log('before', data)
                                console.log(e.target.id)
                                delete data[e.target.id]
                                // console.log(data)
                                console.log('after', data)
                                this.setState({
                                    usersToAdd: data
                                })

                            }}>
                                <path id={data.user_id} d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </div>


                    </div>)
                }

            })
        }

        var availableUserList = [];
        var keys2 = Object.keys(this.state.allUsers)
        if (this.state.allUsers && keys2.length > 0) {
            keys2.forEach(item => {
                var data = this.state.allUsers[item]
                // console.log(item,'--------',data)
                // console.log(data.full_name , data.email, data.user_id)
                availableUserList.push(<option key={data.user_id} dataId={data.user_id}>{data.full_name} / {data.email}</option>)
            })
        }






        return (<div>
            {redirectVar}
            <div className="container">
                <div className="row" style={{ width: '50%', margin: 'auto', height: '100vh', padding: '100px 0px', textAlign: 'center' }}>
                    <div className="col-5" style={{ padding: 0 }}>
                        <img height="200" width="200" className="envelope" alt="" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" />
                        <input type="file" id="myFile" name="filename" disabled style={{ width: '60%', fontSize: '11px', margin: '10px 0' }} />
                    </div>
                    <div className="col" style={{ textAlign: 'left' }}>
                        <h4>START A NEW GROUP</h4>
                        <form>
                            <label htmlFor="groupName">My group shall be called..</label><br></br>
                            <input type="text" id="groupName" placeholder="Funkytown" style={{ width: '100%', height: '38px', paddingLeft: '10px', marginTop: '10px' }} onChange={(e) => {
                                // console.log(e.target.value)
                                this.setState({
                                    scroll: true,
                                    groupName: e.target.value
                                })
                            }} onKeyUp={this.handleDropDown} />
                            <div className="secondary_fields" id="dropdown">
                                <hr />
                                <p style={{ fontSize: '18px' }}>GROUP MEMEBERS</p>
                                <p style={{ fontSize: '12px' }}>Tip: Lots of people to add? Send you friends an <span style={{ color: '#0088cc' }}>invite link</span></p>


                                {/* <div className="row personList" style={{ marginBottom: '15px' }}>
                                <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png" alt="" />
                                </div>
                                <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <p style={{ margin: '0 0 0 10px' }}>Nikhil Raj (nikhilraj286@gmail.com)</p>
                                </div>
                                <div className="col-1" style={{ padding: '0' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#fff" class="bi bi-record-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                                    </svg>
                                </div>
                            </div> */}

                                <div className="row personList" style={{ margin: '0 0 15px 0' }}>
                                    <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png" alt="" />
                                    </div>
                                    <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <p style={{ margin: '0 0 0 10px' }} id={(current_user)?current_user.user_id:''}>{(current_user)?current_user.full_name:''} ({(current_user)?current_user.email:''})</p>
                                    </div>
                                    <div className="col-1" style={{ padding: '0' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#fff" class="bi bi-record-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                                        </svg>
                                    </div>
                                </div>

                                {personList}


                                


                                <div className="row addPerson" style={{ margin: '0 0 15px 0' }} id="addPerson">
                                    <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png" alt="" />
                                    </div>
                                    <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <input class="form-control" list="datalistOptions" id="newPerson" placeholder="Name or Email address" onInput={async (e) => {
                                            // console.log(e.target.value)
                                            var keys = Object.keys(this.state.allUsers)
                                            if (this.state.allUsers && keys.length > 0) {
                                                keys.forEach(item => {
                                                    let data = this.state.allUsers[item]
                                                    if (e.target.value.includes(data.email)) {
                                                        // console.log(e.target.value.includes(data.email))
                                                        this.setState({
                                                            selectedPerson: data.user_id,
                                                            selected: true
                                                        })
                                                    }
                                                })
                                            }
                                            // console.log(this.state)
                                        }} style={{ height: '38px' }} />
                                        <datalist id="datalistOptions">
                                            {/* <option value="San Francisco" />
                                        <option value="New York" />
                                        <option value="Seattle" />
                                        <option value="Los Angeles" />
                                        <option value="Chicago" /> */}
                                            {availableUserList}
                                        </datalist>
                                    </div>
                                    <div className="col-1" style={{ padding: '0' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#5bc5a7" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" style={{ cursor: 'pointer' }} disabled={!this.state.selected} onClick={(e) => {
                                            var keys = Object.keys(this.state.usersToAdd)
                                            if (!keys.includes(this.state.selectedPerson) && this.state.selectedPerson > 0) {
                                                let data = { ...this.state.allUsers[this.state.selectedPerson] }
                                                let selectedData = { ...this.state.usersToAdd }
                                                selectedData[this.state.selectedPerson] = data
                                                // console.log('selected data',selectedData)
                                                this.setState({
                                                    usersToAdd: selectedData,
                                                    selected: false,
                                                    selectedPerson: 0
                                                })
                                                document.getElementById('newPerson').value = ''
                                                document.getElementById('addPerson').classList.add('hidden')
                                            }

                                        }}>
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="addPersonButton" style={{ margin: '0 0 15px 10px' }}>
                                    <div style={{ color: '#0088cc', cursor: 'pointer', fontSize: '13px' }} onClick={(e) => {
                                        document.getElementById('addPerson').classList.remove('hidden')
                                    }}>+ Add a person</div>
                                </div>

                                <hr />

                                <div className='row'>
                                    <div onClick={this.createGroup} href="/" className="btn btn-primary btn-orange" style={{ width: '25%', paddingTop: '10px', paddingBottom: '10px', fontWeight: 'bold', margin: '0 0 0 15px' }}>
                                        Save
                                    </div>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }



}

