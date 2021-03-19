import axios from 'axios'
import React from 'react'
// import { Link, BrowserRouter, Route } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router'




export default class ViewGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // group_id:null
            groups: null,
            show: false,
            expense_desc: null,
            expense_amount: null,
            rerender: 0,
            userleft: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.leaveGroup = this.leaveGroup.bind(this)
        // alert('hello')
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    leaveGroup = async () => {
        let user_id = JSON.parse(localStorage.getItem('userProfile')).user_id
        const data = {
            group_id: this.props.groupID,
            user_id: user_id
        }
        // console.log(data)
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:3001/deleteUserFromGroup', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async (res) => {
                console.log(res.status)
                if (res.status === 200) {
                    // console.log(res.data)
                    let setItem = {
                        tabSelected: 1,
                        groupSelected: 0
                    }
                    localStorage.setItem('selectedTab', JSON.stringify(setItem))
                    this.setState({ 
                        userleft: true,
                        rerender: (this.state.rerender) + 1 
                    })
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    handleSubmit = async () => {
        let user_id = JSON.parse(localStorage.getItem('userProfile')).user_id
        this.handleClose()
        if (this.state.expense_amount && this.state.expense_desc) {
            const data = {
                group_id: this.props.groupID,
                no_users: this.state.groups.total_users,
                amount: this.state.expense_amount,
                desc: this.state.expense_desc,
                user_list: this.state.groups.UserToGroups,
                paid_by: user_id
            }
            // console.log(data)
            axios.defaults.withCredentials = true;
            await axios.post('http://localhost:3001/newExpense', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(async (res) => {
                    console.log(res.status)
                    if (res.status === 200) {
                        // console.log(res.data)


                        let setItem = {
                            tabSelected: 1,
                            groupSelected: 0
                        }
                        localStorage.setItem('selectedTab', JSON.stringify(setItem))
                        window.location.reload()

                        this.setState({ 
                            rerender: (this.state.rerender) + 1 
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    componentDidMount = async () => {
        if (this.props.groupID) {
            let groupId = this.props.groupID
            const data = {
                group_id: groupId
            }
            axios.defaults.withCredentials = true;
            await axios.post('http://localhost:3001/getGroupData', data, {
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
                            groups: res.data[0]
                        })
                        // console.log('res', res.data[0])
                    }
                }).catch((err) => {
                    console.log(err)
                });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('inside did update', this.state, prevState.groups)
        if (this.state.groups && prevState.groups) {
            // console.log('in update 1', this.state.groups.Transactions.length)
            // console.log('in update 2', prevState)
            // || (this.state.groups.Transactions.length > prevState.groups.Transactions.length)
            let index = 0
            for (index; index < 2; index++) {
                if ((this.props.groupID !== prevProps.groupID) || (this.state.rerender > prevState.rerender) || (this.state.groups.Transactions.length > prevState.groups.Transactions.length)) {
                    let groupId = this.props.groupID
                    const data = {
                        group_id: groupId
                    }
                    axios.defaults.withCredentials = true;
                    await axios.post('http://localhost:3001/getGroupData', data, {
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
                                    groups: res.data[0]
                                })
                                // console.log('res', res.data[0])
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                }
            }
        }
    }


    // prepareNumber = (num) => {
    //     return Number(num.toFixed(2))
    // }

    render = () => {
        // console.log('state',this.state)
        // console.log('props', this.props)
        // console.clear()
        let redirectvar = null
        if(this.state.userleft){
            redirectvar = <Redirect to='/'/>
        }
        let Expense_disp = []
        let leaveGroupClass = ''
        if (this.state.groups) {
            let users_data = []
            let temp = null
            let trans = this.state.groups.Transactions
            let expense_sum = {}

            // console.log('state', this.state.groups);
            temp = this.state.groups.UserToGroups
            console.log(temp)
            temp.forEach((item) => {
                if(!item.has_invite){
                    users_data.push(item.user_id)
                    expense_sum[item.user_id] = 0
                }
                
            })

            console.log('users', expense_sum)
            
            trans.forEach(item => {
                // console.log('item',item)
                // console.log('************************************************************')
                // console.log('inside loop',item.paid_by, item.paid_to)
                
                if(item.paid_by !== item.paid_to){
                    // console.log(typeof(item.amount), typeof(expense_sum[item.paid_to]), typeof(expense_sum[item.paid_by]))
                    // console.log('values before adding', (item.amount), (expense_sum[item.paid_by]), (expense_sum[item.paid_to]))
                    expense_sum[item.paid_by] = (expense_sum[item.paid_by]) + (item.amount)
                    expense_sum[item.paid_to] = ((expense_sum[item.paid_to]) - (item.amount))
                    // console.log('values after adding', (item.amount), (expense_sum[item.paid_by]), (expense_sum[item.paid_to]))
                    // console.log('expenses',expense_sum)
                }
                // console.log('expenses',expense_sum)
                // console.log('************************************************************')
            })

            let allUsers = JSON.parse(localStorage.getItem('allUsers'))
            // console.log(allUsers)
            temp.forEach(item => {
                if(!item.has_invite){
                    var amount = expense_sum[item.user_id]
                    amount = Number(amount.toFixed(2))
                    var owe_status = []
                    if(amount<0){
                        amount = amount * (-1)
                        owe_status.push(<div style={{color:'#ff652f'}}><strong>owes ${amount}</strong></div>)
                    } else if(amount>0){
                        owe_status.push(<div style={{color:'#5bc5a7'}}><strong>gets back ${amount}</strong></div>)
                    } else {
                        owe_status.push(<div style={{color:'#666'}}><strong>settled up</strong></div>)
                    }

                    Expense_disp.push(<div>
                        <div className="row" style={{margin:'20px 0'}}>
                            <div className='col-3' style={{paddingRight:'0', display:'flex', flexDirection:'column', justifyContent:'center'}}> 
                                <img alt="" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange47-100px.png" class="avatar" style={{width:'65%', borderRadius:'25px'}}/>
                            </div>
                            <div className="col-8" style={{paddingLeft:'0'}}>
                                <div style={{marginBottom:'5px'}}>{allUsers[item.user_id].name}</div>
                                <div style={{fontSize:'12px'}}>{owe_status}</div>
                            </div>
                        </div>
                    </div>)
                }
            })
            let user_id = JSON.parse(localStorage.getItem('userProfile')).user_id
            if(expense_sum[user_id] === 0){
                leaveGroupClass = (<div>
                    <button className="btn btn-green" style={{padding:'4px 8px', margin:'0 8px', fontSize:'14px', color:'#fff'}} onClick={this.leaveGroup}>Leave Group</button>
                </div>)
            } else {
                leaveGroupClass = (<div>
                    <button className="btn btn-green" disabled style={{padding:'4px 8px', margin:'0 8px', fontSize:'14px', color:'#fff'}}>Leave Group</button>
                </div>)
            }
        





            // console.log('state', this.state.groups)
            // console.log('trans', trans)
        }

        let all_users = (localStorage.getItem('allUsers')) ? JSON.parse(localStorage.getItem('allUsers')) : null




        // var keys1 = Object.keys(this.state.usersToAdd)
        // if (this.state.usersToAdd && keys1.length > 0) {
        //     keys1.forEach(item => {
        //         // {(item === current_user.user_id}
        //         var data = this.state.usersToAdd[item]
        //         if ((item !== current_user.user_id) && (data.canBeDeleted === 1)) {
        //             personList.push(<div className="row personList" style={{ margin: '0 0 15px 0' }}>
        //                 <div className="col-1" style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //                     <img style={{ borderRadius: '25px' }} src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png" alt="" />
        //                 </div>
        //                 <div className="col-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //                     <p style={{ margin: '0 0 0 10px' }} id={data.user_id}>{data.full_name} ({data.email})</p>
        //                 </div>


        //                 <div className="col-1" style={{ padding: '0' }}>
        //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="#ff652f" class="bi bi-trash-fill" viewBox="0 0 16 16" style={{ cursor: 'pointer' }} onClick={(e) => {
        //                         let data = { ...this.state.usersToAdd }
        //                         console.log('before', data)
        //                         console.log(e.target.id)
        //                         delete data[e.target.id]
        //                         // console.log(data)
        //                         console.log('after', data)
        //                         this.setState({
        //                             usersToAdd: data
        //                         })

        //                     }}>
        //                         <path id={data.user_id} d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        //                     </svg>
        //                 </div>


        //             </div>)
        //         }

        //     })
        // }

        let groupname = (this.state.groups) ? this.state.groups.group_name : null
        let expenses = (this.state.groups) ? this.state.groups['Expenses'] : null
        let expenseList = []
        // console.log(expenses, typeof(expenses)) 
        if (expenses) {
            expenses = expenses.slice().reverse()
            expenses.forEach((item) => {
                let date = new Date(item.date_paid)
                // console.log(date)
                // console.log(item)
                expenseList.push(
                    <div className="expense_row row" style={{ margin: '0', padding: '15px 0', boxShadow: '0 1px 1px -1px gray' }}>
                        <div className="col-2" style={{ padding: '0', textAlign: 'center' }}>
                            <div>{date.toLocaleString('default', { month: 'short' })}</div>
                            <div>{date.getDate()}</div>
                        </div>
                        <div className="col-1" style={{ padding: '0', textAlign: 'center', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                            <img alt="" width="80%" src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/groceries@2x.png" class="receipt"></img>
                        </div>
                        <div className="col-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '18px', paddingLeft: '10px' }}><strong>{item.desc}</strong></div>
                        <div className='col-3'>
                            <div style={{ fontSize: '12px', color: '#777' }}>{all_users[item.paid_by].name} paid</div>
                            <div><strong>$ {item.amount}</strong></div>
                        </div>
                    </div>

                )


            })
        }

        // <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/groceries@2x.png" class="receipt"></img>


        return (
            <div>
            {/* {redirectvar} */}
                <div className="main_row row" style={{ margin: '0' }}>
                    <div className="col-8" style={{ padding: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', height: '100vh' }}>
                        <div className="row" style={{ backgroundColor: '#eee', padding: '20px 10px', margin: '0' }}>
                            <div className="col-4"><h3>{groupname}</h3></div>
                            <div className="col-8">
                                <ul className="nav navbar-nav navbar-right" style={{ flexDirection: 'row', float: 'right' }}>
                                    <div className="btn btn-green" onClick={this.handleShow} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>Add Expense</div>
                                    <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false} style={{ maxHeight: "700px" }}>
                                        <Modal.Header>
                                            <Modal.Title>Add an expense</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>Paid by <strong>you</strong> and <strong>split equally</strong> among all</div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-1"></div>
                                                <div className="col-3">
                                                    <img alt="" src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" class="category" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder="Enter a description" style={{ marginBottom: '15px' }} onChange={(e) => {
                                                        this.setState({
                                                            expense_desc: e.target.value
                                                        })
                                                    }} />
                                                    <input type="text" placeholder="0.00" onChange={(e) => {
                                                        this.setState({
                                                            expense_amount: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div className="col-2"></div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button className="btn btn-primary" onClick={this.handleClose}>cancel</Button>
                                            <Button className="btn btn-green" onClick={this.handleSubmit}>save</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {/* <Link className="btn link-orange" to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>Settle Up</Link> */}
                                </ul>
                            </div>
                        </div>
                        <hr style={{ margin: 0, color: '#555' }} />
                        {expenseList}

                    </div>
                    <div className="col-4" style={{ paddingTop: '15px' }}>
                        {leaveGroupClass}
                        {Expense_disp}
                    </div>
                </div>
            </div>
        )
    }
}