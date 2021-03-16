import axios from 'axios';
import React, { Component } from 'react';
import '../style.css'

export default class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scroll: false,
            allUsers: {},
            usersToAdd: {},
            selected: false,
            selectedPerson: 0,
            groupName: ''
        }
    }



    // changeNumber = () => {
    //     this.setState({
    //         number: this.state.number + 1
    //     })
    // }

    componentDidMount = async () => {
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:3001/getUsers', {
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
        if (this.state.scroll) {
            document.getElementById('dropdown').classList.add("secondary_fields-scroll")
        }

        var personList = []
        var keys1 = Object.keys(this.state.usersToAdd)
        if (this.state.usersToAdd && keys1.length > 0) {
            keys1.forEach(item => {
                var data = this.state.usersToAdd[item]
                personList.push(<div className="row personList" style={{ marginBottom: '15px' }}>
                    <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png" alt="" />
                    </div>
                    <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ margin: '0 0 0 10px' }} id={data.user_id}>{data.full_name} ({data.email})</p>
                    </div>
                    {(data.canBeDeleted === 0) &&
                        <div className="col-1" style={{ padding: '0' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#fff" class="bi bi-record-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                            </svg>
                        </div>
                    }
                    {(data.canBeDeleted === 1) &&
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
                    }

                </div>)
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
                                this.setState({
                                    scroll: true,
                                    groupName: e.target.value
                                })
                            }} onKeyUp={this.handleDropDown} />
                            <div className="secondary_fields" id="dropdown">
                                <hr />
                                <p style={{ fontSize: '18px' }}>GROUP MEMEBERS</p>
                                <p style={{ fontSize: '12px' }}>Tip: Lots of people to add? Send you friends an <span style={{ color: '#0088cc' }}>invite link</span></p>
                                {personList}

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


                                <div className="addPersonButton" style={{ marginBottom: '15px' }}>
                                    <div style={{ color: '#0088cc', cursor: 'pointer', fontSize: '13px' }} onClick='this.newRow'>+ Add a person</div>
                                </div>


                                <div className="row addPerson">
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
                                                        this.setState((state) => ({
                                                            selectedPerson: data.user_id,
                                                            selected: true
                                                        }))
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
                                            }
                                            document.getElementById('newPerson').value = ''
                                        }}>
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
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


{/* <Button style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}} disabled={!this.state.selected} onClick={(event) => {
                                                var tempList = this.state.selectedList;
                                                tempList.push(this.state.selected);
                                                var uniqueList = [...new Set(tempList)];
                                                this.setState({ selectedList: uniqueList });
                                                document.getElementById("newGroupPersons").value = '';
                                            }}>Add</Button> */}


                                        //     var keys = Object.keys(this.state.usersToAdd)
                                        // if(!keys.includes(e.target.key)){
                                        //     let data = {...this.state.allUsers[e.target.key]}
                                        //     let selectedData = {...this.state.usersToAdd}
                                        //     selectedData[e.target.key] = data
                                        //     console.log(selectedData)
                                        //     this.setState({
                                        //         usersToAdd: selectedData,
                                        //     })
                                        // }

