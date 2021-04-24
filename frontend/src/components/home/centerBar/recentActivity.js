// import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { getGroups } from '../../../store/actions/groupActions/getGroupsActions'
import { getTransactionsForUser } from '../../../store/actions/transactionActions/getTransactionsForUserActions'
// import exportData from '../../../config/config'
// import { Link } from 'react-router-dom'
import '../../style.css'

class RecentActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions:null,
            groups:null,
            sortBy: 'dec',
            groupBy: 'none'
        }
    }

    componentDidMount = async () => {
        let userProfile = JSON.parse(localStorage.getItem('userProfile'))
        let userId = userProfile.user_id
        // axios.defaults.withCredentials = true;
        let data = {user_id: userId}

        await this.props.getGroups(data)
        console.log('get groups after', this.props)
        if(this.props.getGroupsDetails !== 400 && this.props.getGroupsDetails !== []){
            this.setState({
                groups: this.props.getGroupsDetails
            })
            let group_list = []
            // console.log(typeof(this.props.getGroupsDetails) === 'object')
            if(this.props.getGroupsDetails && typeof(this.props.getGroupsDetails) === 'object'){
                this.props.getGroupsDetails.forEach(item => {
                    group_list.push(item.group_id)
                })
            }
            data = {groupList: group_list}
            console.log(data)
            await this.props.getTransactionsForUser(data)
            console.log('get trans for user after', this.props)
            if(this.props.getTransactionsForUserDetails !== 400 && this.props.getTransactionsForUserDetails !== []){
                this.setState({
                    transactions: this.props.getTransactionsForUserDetails
                })
            }
        }
    }

    // <img src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png" className="square">
    render = () => {
        console.log(this.props)
        let groupBy = []
        let element = []
        if (this.state.transactions && this.state.groups && localStorage.getItem('userProfile')) {
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            let allUsers = JSON.parse(localStorage.getItem('allUsers'))
            // console.log(allUsers)
            let userId = userProfile.user_id
            let trans = this.state.transactions
            let groups = this.state.groups
            let allGroups = []
            let keys = []
            keys = Object.keys(groups)
            keys.forEach(item => {
                let data = groups[item]
                allGroups.push(data.Group.group_name)
            })
            // console.log(allGroups)
            // console.log(trans)
            let iter = this.state.sortBy === 'dec' ? trans : trans.slice().reverse()
            iter.forEach(item => {
                // console.log(item)
                if((item.paid_by === userId || item.paid_to === userId) && (item.paid_by !== item.paid_to) && (this.state.groupBy === 'none' || this.state.groupBy === item.Group.group_name)){
                    // console.log(this.state.groupBy , item.Group.group_name)
                    let date = new Date(item.date_paid)
                    console.log('date', date)
                    let status = (item.payment_status === 'due')? 'paid':'settled with'
                    let amount = (item.payment_status === 'due')? '$' + Number(item.amount):''
                    let temp2 = (item.payment_status === 'due')? 'to' : '' 
                    // let temp3 = (item.payment_status === 'due')? 'in' : ''
                    // let grp = (item.payment_status === 'due')? item.Group.group_name : ''
                    let temp3 = 'in'
                    let grp = item.Group.group_name
                    let imag = (item.payment_status === 'due')?"https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-p.png":"https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png"
                    element.push(<div>
                        <div className='row recent_row' style={{margin:'0', padding:'10px 40px', borderBottom:'1px solid #eee'}}>
                            <div className="col-3" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <img alt="" src={imag} className="square" style={{width:'55%'}}/>
                            </div>
                            <div className="col-9" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <div>
                                    <strong>{allUsers[item.paid_by].name}</strong> {status} <strong>{amount}</strong> {temp2} <strong>{allUsers[item.paid_to].name}</strong> {temp3} <strong>{grp}</strong>
                                </div>
                                <div>{date.toLocaleString('default', { month: 'short' })} {date.getDate()}</div>
                            </div>
                        </div>
                    </div>)
                }
                
            })
            allGroups.forEach(item => {
                groupBy.push(<option value={item}>{item}</option>)
            })
        }
        
        return(<div>
            <div className="row" style={{minHeight:'100vh'}}>
                <div className="col-8" style={{ paddingRight: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', minHeight:'100vh'}}>
                    <div className="main_row" style={{ backgroundColor: '#eee', padding: '20px 20px', margin: '0',  borderBottom:'1px solid #ddd'  }}>
                        <div><h3>Recent Activity</h3></div>
                    </div>
                    <div className="row" style={{margin:'0', backgroundColor:'#eee', padding:'15px 5px'}}>
                        <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <label for="groupBy" style={{marginBottom:'5px', fontSize:'12px', marginLeft:'5px'}}>Group By</label>
                            <select name="groupBy" id="groupBy" style={{fontSize:'13px', padding:'3px 4px', color:'#555', width:'85%'}} value={this.state.groupBy} onChange={(e) => {
                                this.setState({groupBy: e.target.value})
                            }}>
                                <option value="none">None</option>
                                <hr></hr>
                                {groupBy}
                            </select>
                        </div>
                        <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <label for="sortBy" style={{marginBottom:'5px', fontSize:'12px', marginLeft:'5px'}}>Sort By</label>
                            <select name="sortBy" id="sortByy" style={{fontSize:'13px', padding:'3px 4px', color:'#555', width:'85%'}} value={this.state.sortBy} onChange={(e) => {
                                this.setState({sortBy: e.target.value})
                            }}>
                                <option value="dec">Most Recent: First</option>
                                <option value="inc">Most Earliest: First</option>
                            </select>
                        </div>
                    </div>
                    <hr style={{ margin: 0, color: '#555' }}></hr>
                    <div>
                    {element}
                    {element.length === 0? <div>
                        <div class="alert alert-light" style={{textAlign: 'center'}} role="alert">
                            No data to display
                        </div>
                    </div>: null}
                    </div>
                </div>
                <div className='col-4' style={{ fontSize: '14px' }}>
                    <div id="right_sidebar_content">
                        <h5>Get Splitwise Pro!</h5>
                        <img height="128" style={{ margin: '5px 0' }} alt="purple-logo" src="https://assets.splitwise.com/assets/pro/logo-337b1a7d372db4b56c075c7893d68bfc6873a65d2f77d61b27cb66b6d62c976c.svg" />
                        <div><p style={{ width: '80%', marginTop: '10px' }}>Subscribe to <strong>Splitwise Pro</strong> for no ads, currency conversion, charts, search, and more.</p></div>
                        <button className="btn btn-orange disabled" style={{ fontWeight: 'bold', marginTop: "8px" }}>Learn more</button>
                    </div>
                </div>
            </div>
        </div>)
    }

}

const mapStateToProps = (state) => {
    console.log(state)
    return({
        getGroupsDetails:state.getGroupsDetails.user,
        getTransactionsForUserDetails:state.getTransactionsForUserDetails.user
    })
}

export default connect(mapStateToProps, {getGroups, getTransactionsForUser})(RecentActivity)

