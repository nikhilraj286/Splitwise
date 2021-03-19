import axios from 'axios'
import React from 'react'
// import { Link } from 'react-router-dom'
import '../../style.css'

export default class RecentActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions:null,
            groups:null
        }
    }

    componentDidMount = async () => {
        let userProfile = JSON.parse(localStorage.getItem('userProfile'))
        let userId = userProfile.user_id
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:3001/getTransactions', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async (res) => {
                if (res.status === 200) {
                    this.setState({
                        transactions: res.data
                    })
                }
            }).catch((err) => {
                console.log(err)
            });

        const data = {
            user_id: userId
        }
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:3001/getGroups', data, {
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

    }

    // <img src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png" class="square">
    render = () => {
        let element = []
        if (this.state.transactions && this.state.groups) {
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            let allUsers = JSON.parse(localStorage.getItem('allUsers'))
            console.log(allUsers)
            let userId = userProfile.user_id
            let trans = this.state.transactions
            let groups = this.state.groups
            let allGroups = []
            let keys = []
            keys = Object.keys(groups)
            keys.forEach(item => {
                let data = groups[item]
                allGroups.push(data.group_id)
            })
            console.log(allGroups)
            console.log(trans)
            trans.forEach(item => {
                if(item.paid_by === userId || item.paid_to === userId){
                    let date = new Date(item.updatedAt)
                    let status = (item.payment_status === 'due')? 'paid':'settled with'
                    let amount = (item.payment_status === 'due')? '$' + Number(item.amount):''
                    let temp2 = (item.payment_status === 'due')? 'to' : ''
                    let temp3 = (item.payment_status === 'due')? 'in' : ''
                    let grp = (item.payment_status === 'due')? item.Group.group_name : ''
                    element.push(<div>
                        <div className='row recent_row' style={{margin:'0', padding:'10px 40px', borderBottom:'1px solid #eee'}}>
                            <div className="col-3" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <img alt="" src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2/0-p.png" class="square" style={{width:'55%'}}/>
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
        }
        
        return(<div>
            <div className="row" style={{height:'100vh'}}>
                <div className="col-8" style={{ paddingRight: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', height:'100%'}}>
                    <div className="main_row" style={{ backgroundColor: '#eee', padding: '20px 20px', margin: '0',  borderBottom:'1px solid #ddd'  }}>
                        <h3>Recent Activity</h3>
                    </div>
                    <div>
                    {element}
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


