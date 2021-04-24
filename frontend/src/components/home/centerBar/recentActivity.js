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
            groupBy: 'none',
            orderBy: -1,
            groupById: null,
            page: 1,
            size: 2,
            total_pages: 0
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
                // if(this.state.groupBy === "none"){
                //     this.props.getGroupsDetails.forEach(item => {
                //         group_list.push(item.group_id)
                //     })
                // } else {
                //     group_list.push(this.state.group_id)
                // }
                this.props.getGroupsDetails.forEach(item => {
                    group_list.push(item.group_id)
                })
            }
            data = {
                user_id: userId,
                groupList: group_list,
                page: this.state.page - 1,
                size: this.state.size,
                orderBy: this.state.orderBy
            }
            console.log(data)
            await this.props.getTransactionsForUser(data)
            console.log('get trans for user after', this.props)
            if(this.props.getTransactionsForUserDetails !== 400 && this.props.getTransactionsForUserDetails !== []){
                console.log(this.props.getTransactionsForUserDetails.length)
                this.setState({
                    total_pages: Math.ceil(this.props.getTransactionsForUserDetails.length/this.state.size),
                    transactions: this.props.getTransactionsForUserDetails.data
                })
            }
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if((this.state.page !== prevState.page) || (this.state.size !== prevState.size) || (this.state.groupById !== prevState.groupById) || (this.state.orderBy !== prevState.orderBy)){
            let group_list = []
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            let userId = userProfile.user_id
            if(this.state.groupBy === "none"){
                this.props.getGroupsDetails.forEach(item => {
                    group_list.push(item.group_id)
                })
            } else {
                group_list.push(this.state.groupById)
            }
            let data = {
                user_id: userId,
                groupList: group_list,
                page: this.state.page - 1,
                size: this.state.size,
                orderBy: this.state.orderBy
            }
            console.log(data)
            await this.props.getTransactionsForUser(data)
            console.log('get trans for user after in update', this.props)
            if(this.props.getTransactionsForUserDetails !== 400 && this.props.getTransactionsForUserDetails !== []){
                console.log(this.props.getTransactionsForUserDetails.length)
                this.setState({
                    total_pages: Math.ceil(this.props.getTransactionsForUserDetails.length/this.state.size),
                    transactions: this.props.getTransactionsForUserDetails.data
                })
            }
        }
    }

    // <img src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png" className="square">
    render = () => {
        console.log(this.state)
        let groupBy = []
        let element = []
        let allGroups = []
        if (this.state.transactions && this.state.groups && localStorage.getItem('userProfile')) {
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            // let allUsers = JSON.parse(localStorage.getItem('allUsers'))
            let allUsers = this.props.getAllUsersNamesDetails
            // console.log(allUsers)
            let userId = userProfile.user_id
            let trans = this.state.transactions
            let groups = this.state.groups
            let keys = []
            keys = Object.keys(groups)
            keys.forEach(item => {
                let data = groups[item]
                let grp = {}
                grp.group_name = data.Group.group_name
                grp.group_id = data.Group.group_id
                allGroups.push(grp)
            })
            console.log(allGroups)
            // console.log(trans)
            // let iter = this.state.sortBy === 'dec' ? trans : trans.slice().reverse()
            let iter = trans
            iter.forEach(item => {
                // console.log(item)
                if((item.paid_by === userId || item.paid_to === userId) && (item.paid_by !== item.paid_to) && (this.state.groupBy === 'none' || this.state.groupBy === item.Group.group_name)){
                    // console.log(this.state.groupBy , item.Group.group_name)
                    let date = new Date(item.date_paid)
                    // console.log('date', date)
                    let status = (item.payment_status === 'due')? 'paid':'settled with'
                    let amount = (item.payment_status === 'due')? JSON.parse(localStorage.getItem('currency'))+ Number(item.amount) :''
                    let temp2 = (item.payment_status === 'due')? 'to' : '' 
                    // let temp3 = (item.payment_status === 'due')? 'in' : ''
                    // let grp = (item.payment_status === 'due')? item.Group.group_name : ''
                    let temp3 = 'in'
                    let grp = item.Group.group_name
                    let imag = (item.payment_status === 'due')?"https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-p.png":"https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png"
                    element.push(<div>
                        <div className='row recent_row' style={{margin:'0', padding:'10px 40px', borderBottom:'1px solid #ddd'}}>
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
                groupBy.push(<option id={item.group_id} value={item.group_name}>{item.group_name}</option>)
            })
        }
        let entryCount = {}
        console.log((this.state.page - 1)*this.state.size + this.state.size, this.props.getTransactionsForUserDetails.length)
        if(((this.state.page - 1)*this.state.size + this.state.size) < this.props.getTransactionsForUserDetails.length){
            entryCount = (<div>{((this.state.page - 1)*this.state.size) + 1} - {(((this.state.page - 1)*this.state.size) + this.state.size)} of {this.props.getTransactionsForUserDetails.length}</div>)
        } else {
            if(((this.state.page - 1)*this.state.size) + 1 === this.props.getTransactionsForUserDetails.length){
                entryCount = (<div>{this.props.getTransactionsForUserDetails.length} of {this.props.getTransactionsForUserDetails.length}</div>)
            } else {
                entryCount = (<div>{((this.state.page - 1)*this.state.size) + 1} - {this.props.getTransactionsForUserDetails.length} of {this.props.getTransactionsForUserDetails.length}</div>)
            }
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
                                if(e.target.value === "none"){
                                    this.setState({
                                        groupBy: e.target.value,
                                        groupById: null
                                    })
                                } else {
                                allGroups.forEach(item => {
                                    if(item.group_name === e.target.value){
                                        this.setState({
                                            groupBy: e.target.value,
                                            groupById: item.group_id
                                        })
                                    }
                                })}
                                
                            }}>
                                <option value="none">None</option>
                                <hr></hr>
                                {groupBy}
                            </select>
                        </div>
                        <div className='col-4' style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <label for="sortBy" style={{marginBottom:'5px', fontSize:'12px', marginLeft:'5px'}}>Sort By</label>
                            <select name="sortBy" id="sortByy" style={{fontSize:'13px', padding:'3px 4px', color:'#555', width:'85%'}} value={this.state.sortBy} onChange={(e) => {
                                this.setState({
                                    sortBy: e.target.value,
                                    orderBy: this.state.orderBy * (-1)
                                })
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
                    <div className="row" style={{margin:'0', padding:'15px 0', borderBottom:'1px solid #ddd', borderTop:'1px solid #ddd', backgroundColor:'rgb(238, 238, 238)'}}>
                        <div className="col-1"></div>
                        <div className='col' style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:'0 12px 0 0'}}>
                            <div style={{marginRight:'10px'}}>Rows per page:</div>
                            <div>
                                <select name="pagesize" id="pagesize" onChange={(e) => {
                                    this.setState({
                                        size: Number(e.target.value),
                                        page: 1
                                    })
                                }}>
                                    <option selected="selected" value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-2" style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'0', textAlign: 'center'}}>
                            {entryCount}
                        </div>
                        <div className="col pagination-icons" style={{display:'flex', flexDirection:'row', justifyContent:'center', paddingRight:'0'}}>
                            <div onClick={(e)=> {
                                this.setState({
                                    page: 1
                                })
                            }}><i class="fa fa-angle-double-left"></i></div>
                            <div onClick={(e)=> {
                                if(this.state.page > 1){
                                    this.setState({
                                        page: this.state.page - 1
                                    })
                                }
                            }}><i class="fa fa-angle-left"></i></div>
                            <div class="pageno">{this.state.page}</div>
                            <div onClick={(e)=> {
                                if(this.state.page < this.state.total_pages){
                                    this.setState({
                                        page: this.state.page + 1
                                    })
                                }
                            }}><i class="fa fa-angle-right"></i></div>
                            <div onClick={(e)=> {
                                this.setState({
                                    page: this.state.total_pages
                                })
                            }}><i class="fa fa-angle-double-right"></i></div>
                        </div>
                        <div className='col-1'></div>
                    </div>
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
        getTransactionsForUserDetails:state.getTransactionsForUserDetails.user,
        getAllUsersNamesDetails:state.getAllUsersNamesDetails.user
    })
}

export default connect(mapStateToProps, {getGroups, getTransactionsForUser})(RecentActivity)

