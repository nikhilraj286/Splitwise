// import React from 'react'
import '../../style.css'
import React from 'react'
// import { Link } from 'react-router-dom'
import '../../style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../logo.png'


export default class MyGroup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            groupSelected: null,
            groupId: null,
            groupName:''
        }
    }


    render = () => {
    console.log(this.props)
    console.log("---------------------------------------", this.state)
    let selectedId = null
    // let invitedTo = null
    if (this.props.tabSelected) {
        if (this.props.tabSelected === 4 && this.props.groupSelected > 0) {
            selectedId = 'group' + this.props.tabSelected + this.props.groupSelected
        } else if (this.props.tabSelected < 4) {
            selectedId = 'tab' + this.props.tabSelected
        }
    }
    // let groupIdSelected = null
    let allGroupsList = []
    let keys = Object.keys(this.props.groups)

    keys.forEach((item) => {
        let data = this.props.groups[item]
        allGroupsList.push(<option key={data.user_id} dataId={data.user_id}>{data.Group.group_name}</option>)
    })
    if (selectedId && document.getElementById(selectedId)) {
        // console.log(document.getElementById(selectedId).classList)
        document.getElementById(selectedId).classList.add("selected-tab")
    }
    return (<div>
        <div className="row my_groups_main">
            <div className="col-8" style={{ paddingRight: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', minHeight: '100vh' }}>
                <div className="main_row">
                    <div className="row" style={{ backgroundColor: '#eee', padding: '20px 10px', margin: '0' }}>
                        <div className="col-4"><h3>My Groups</h3></div>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }} />
                    <div className='invited_to' style={{ backgroundColor: '#eee', padding: '10px 20px', margin: '0 0 5px 0' }}>
                        <div><p style={{margin:'0'}}>Groups you have been invited to:</p></div>
                    </div>
                    <div className='invited_to_list'>
                        {this.props.tabs.map((tabItem) => {
                            return(<div>
                            {tabItem.heading ?(<div>
                                {this.props.groups.map((groupItem) => {
                                    
                                    let item = null
                                    if(groupItem.has_invite){
                                        item = (
                                            <div className="left-group-item row" style={{borderBottom:'1px dotted #ddd', padding:'20px 50px', margin:'0', cursor:'auto'}}>
                                                <div className="col-8" href={'/home/groups/' + groupItem.group_id} id={'group'+tabItem.key+groupItem.group_id} style={{fontWeight: 'bold', textTransform:'capitalize', fontSize:'20px'}}>{groupItem.Group.group_name}</div>
                                                <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                                        <button className="btn btn-green" style={{padding:'4px 8px', margin:'0 8px', fontSize:'14px', color:'#fff'}} onClick={() => {
                                                            this.props.acceptInvite(groupItem.group_id)
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

                    



                    <hr style={{ margin: 0, color: '#555' }} />
                    <div className='accepted_groups' style={{ backgroundColor: '#eee', padding: '10px 20px'}}>
                        <div><p style={{margin:'0'}}>Groups you are part of:</p></div>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }} />
                    <div className='row' style={{margin:'0'}}>
                        <div className="col" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <input className="form-control" placeholder="Group name" onChange={(e)=>{this.setState({ groupName: e.target.value })}} style={{ height: '38px', margin:'10px 0' }} />
                        </div>
                        <hr style={{ margin: 0, color: '#555' }} />
                    </div>
                    <div className='acceepted_groups_list'>
                        {this.props.tabs.map((tabItem) => {
                            return(<div>
                            {tabItem.heading ?(<div>
                                {this.props.groups.map((groupItem) => {
                                    
                                    let item = null
                                    if(!groupItem.has_invite  && ((this.state.groupName === '') || (groupItem.Group.group_name.toLowerCase().includes(this.state.groupName.toLowerCase())))){
                                        item = (
                                            <div className="left-group-item row" style={{borderBottom:'1px dotted #ddd', padding:'20px 50px', margin:'0'}} onClick={() => { 
                                                    this.props.changeGroup(4, groupItem.group_id)
                                                    document.getElementById(selectedId).classList.remove("selected-tab")
                                                }}>
                                                <div className="col-8" href={'/home/groups/' + groupItem.group_id} id={'group'+tabItem.key+groupItem.group_id} style={{fontWeight: 'bold', textTransform:'capitalize', fontSize:'20px'}}>{groupItem.Group.group_name}</div>
                                                <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                                    <div style={{fontSize:'10px', margin:'0 22px', cursor: 'pointer' }}>
                                                        view Group -----&gt;
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
}
