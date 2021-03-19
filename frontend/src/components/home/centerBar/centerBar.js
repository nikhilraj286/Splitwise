// import React from 'react'
import '../../style.css'
import React from 'react'
// import { Link } from 'react-router-dom'
import '../../style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../logo.png'


const MyGroup = (props) => {

    console.log(props)
    let selectedId = null
    // let invitedTo = null
    if (props.tabSelected) {
        if (props.tabSelected === 4 && props.groupSelected > 0) {
            selectedId = 'group' + props.tabSelected + props.groupSelected
        } else if (props.tabSelected < 4) {
            selectedId = 'tab' + props.tabSelected
        }
    }
    let groupIdSelected = null
    let allGroupsList = []
    let keys = Object.keys(props.groups)

    keys.forEach((item) => {
        let data = props.groups[item]
        allGroupsList.push(<option key={data.user_id} dataId={data.user_id}>{data.Group.group_name}</option>)
    })
    if (selectedId && document.getElementById(selectedId)) {
        // console.log(document.getElementById(selectedId).classList)
        document.getElementById(selectedId).classList.add("selected-tab")
    }
    return (<div>
        <div className="row my_groups_main">
            <div className="col-8" style={{ paddingRight: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', height: '100vh' }}>
                <div className="main_row">
                    <div className="row" style={{ backgroundColor: '#eee', padding: '20px 10px', margin: '0' }}>
                        <div className="col-4"><h3>My Groups</h3></div>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }} />
                    <div class='invited_to' style={{ backgroundColor: '#eee', padding: '10px 20px', margin: '0 0 5px 0' }}>
                        <div><p style={{margin:'0'}}>Groups you have been invited to:</p></div>
                    </div>
                    <div className='invited_to_list'>
                        {props.tabs.map((tabItem) => {
                            return(<div>
                            {tabItem.heading ?(<div>
                                {props.groups.map((groupItem) => {
                                    {/* console.log(groupItem) */}
                                    let item = null
                                    if(groupItem.has_invite){
                                        item = (
                                            <div className="left-group-item row" style={{borderBottom:'1px dotted #ddd', padding:'20px 50px', margin:'0', cursor:'auto'}}>
                                                <div className="col-8" href={'/home/groups/' + groupItem.group_id} id={'group'+tabItem.key+groupItem.group_id}>{groupItem.Group.group_name}</div>
                                                <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                                        <button className="btn btn-green" style={{padding:'4px 8px', margin:'0 8px', fontSize:'14px', color:'#fff'}} onClick={() => {
                                                            props.acceptInvite(groupItem.group_id)
                                                        }}><strong>Accept Invite</strong></button>
                                                </div>
                                            </div>
                                    )}
                                    return item
                                })} </div>):null}
                        </div>)
                        })}
                        <p style={{textAlign:'center', margin:'5px 0', fontSize:'10px', color:'#777', backgroundColor:'#f7f7f7'}}>-------- End of section --------</p>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }} />

                    <div className='row' style={{margin:'0'}}>
                        <div className="col-4" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <input class="form-control" list="dashboard" id="newGroup" placeholder="Group name" onInput={(e)=> {
                            let keys = Object.keys(props.groups)
                            keys.forEach((item) => {
                                let data = props.groups[item]
                                if(e.target.value.includes(data.Group.name)) {
                                    groupIdSelected = data.group_id
                                }
                            })
                        }

                        } style={{ height: '38px', margin:'10px 0' }} />
                            <datalist id="dashboard">
                                {allGroupsList}
                            </datalist>
                        </div>
                        <div className="col-2" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <button className="btn btn-green">Open</button>
                        </div>
                    </div>



                    <hr style={{ margin: 0, color: '#555' }} />
                    <div class='accepted_groups' style={{ backgroundColor: '#eee', padding: '10px 20px', margin: '0 0 5px 0' }}>
                        <div><p style={{margin:'0'}}>Groups you are part of:</p></div>
                    </div>
                    <div className='acceepted_groups_list'>
                        {props.tabs.map((tabItem) => {
                            return(<div>
                            {tabItem.heading ?(<div>
                                {props.groups.map((groupItem) => {
                                    {/* console.log(groupItem) */}
                                    let item = null
                                    if(!groupItem.has_invite){
                                        item = (
                                            <div className="left-group-item row" style={{borderBottom:'1px dotted #ddd', padding:'20px 50px', margin:'0'}} onClick={() => { 
                                                    props.changeGroup(4, groupItem.group_id)
                                                    document.getElementById(selectedId).classList.remove("selected-tab")
                                                }}>
                                                <div className="col-8" href={'/home/groups/' + groupItem.group_id} id={'group'+tabItem.key+groupItem.group_id}>{groupItem.Group.group_name}</div>
                                                <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                                    <div style={{fontSize:'10px', margin:'0 22px'}}>
                                                        view Group -------&gt;
                                                    </div>
                                                </div>
                                            </div>
                                    )}
                                    return item
                                })} </div>):null}
                        </div>)
                        })}
                        <p style={{textAlign:'center', margin:'5px 0', fontSize:'10px', color:'#777', backgroundColor:'#f7f7f7'}}>-------- End of section --------</p>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }} />
                </div>
            </div>
            <div className='col-4' style={{fontSize:'14px'}}>
                    <div id="right_sidebar_content">
                        <h5>Get Splitwise Pro!</h5>
                        <img height="128" style={{ margin: '5px 0' }} alt="purple-logo" src="https://assets.splitwise.com/assets/pro/logo-337b1a7d372db4b56c075c7893d68bfc6873a65d2f77d61b27cb66b6d62c976c.svg" />
                        <div><p style={{width:'80%', marginTop:'10px'}}>Subscribe to <strong>Splitwise Pro</strong> for no ads, currency conversion, charts, search, and more.</p></div>
                        <button className="btn btn-orange disabled" style={{ fontWeight: 'bold', marginTop: "8px" }}>Learn more</button>
                    </div>
                </div>
        </div>
    </div>)
}

export default MyGroup;