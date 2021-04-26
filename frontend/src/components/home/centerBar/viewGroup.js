import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { deleteUserFromGroup } from '../../../store/actions/groupActions/deleteUserFromGroupActions'
import { newComment } from '../../../store/actions/expenseActions/newCommentActions'
import { deleteComment } from '../../../store/actions/expenseActions/deleteCommentActions'
import { newExpense } from '../../../store/actions/expenseActions/newExpenseActions'
import { getGroupData } from '../../../store/actions/groupActions/getGroupDataActions'
import { getTransactionsForGroup } from '../../../store/actions/transactionActions/getTransactionsForGroupActions'
import { getExpensesForGroup } from '../../../store/actions/expenseActions/getExpensesForGroupActions'

class ViewGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: null,
            show: false,
            expense_desc: null,
            expense_amount: null,
            rerender: 0,
            transactions: [],
            expenses: [],
            newComment: null,
            commentFor: null,
            deleteComment: null,
            deleteCommentFor: null,
            ddeleteExpense: null,
            commentCreated: null,
            commentDeleted: null,
            expenseCreated: null,
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.leaveGroup = this.leaveGroup.bind(this)
        this.postComent = this.postComent.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
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

        await this.props.deleteUserFromGroup(data)
        if(this.props.deleteUserFromGroupDetails === 200){
            let setItem = {
                tabSelected: 1,
                groupSelected: 0
            }
            localStorage.setItem('selectedTab', JSON.stringify(setItem))
            this.setState({
                userleft: true,
            })
        }

    }

    postComent = async e => {
        e.preventDefault()
        if(this.state.commentFor && this.state.newComment){
            let userProfile = JSON.parse(localStorage.getItem('userProfile'))
            let data = {
                expense_id: this.state.commentFor,
                comment: this.state.newComment,
                user_id: userProfile.user_id,
                user_name: userProfile.full_name
            }
            this.setState({
                newComment: null,
                commentCreated: false
            })
            document.getElementById('ta' + this.state.commentFor).value = ""

            await this.props.newComment(data)
            if(this.props.newCommentDetails === 200){
                this.setState({
                    commentCreated: true
                })
            }
        }
    }

    deleteComment = async e => {
        e.preventDefault()
        if(this.state.deleteCommentFor && this.state.deleteComment){
            let data = {
                expense_id: this.state.deleteCommentFor,
                comment_id: this.state.deleteComment,
            }
            this.setState({
                commentDeleted: false
            })
            await this.props.deleteComment(data)
            if(this.props.deleteCommentDetails === 200){
                this.setState({
                    commentDeleted: true
                })
            }
        }
    }

    handleSubmit = async () => {
        this.handleClose()
        if (this.state.expense_amount > 0) {

            let user_id = JSON.parse(localStorage.getItem('userProfile')).user_id
            let userList = []
            this.state.groups.userToGroups.forEach(item => {
                if (!item.has_invite) {
                    userList.push(item)
                }
            })
            if (this.state.expense_amount && this.state.expense_desc) {
                const data = {
                    group_id: this.props.groupID,
                    no_users: userList.length,
                    amount: this.state.expense_amount,
                    desc: this.state.expense_desc,
                    user_list: userList,
                    paid_by: user_id
                }
                this.setState({
                    expenseCreated: false
                })
                await this.props.newExpense(data)
                if(this.props.newExpenseDetails === 200){
                    this.setState({
                        expenseCreated: true
                    })
                }
            }
        }

    }

    componentDidMount = async () => {
        if (this.props.groupID) {
            let groupId = this.props.groupID
            const data = {
                group_id: groupId
            }

            await this.props.getGroupData(data)
            if(this.props.getGroupDataDetails !== 400){
                this.setState({
                    groups: this.props.getGroupDataDetails
                })
            }

            await this.props.getTransactionsForGroup(data)
            if(this.props.getTransactionsForGroupDetails !== 400){
                this.setState({
                    transactions: this.props.getTransactionsForGroupDetails
                })
            }

            await this.props.getExpensesForGroup(data)
            if(this.props.getExpensesForGroupDetails !== 400){
                this.setState({
                    expenses: this.props.getExpensesForGroupDetails
                })
            }
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if((prevState.commentCreated === false && this.state.commentCreated === true)
            || (prevState.commentDeleted === false && this.state.commentDeleted === true)
            || (prevState.expenseCreated === false && this.state.expenseCreated === true)
            || (this.props.groupID !== prevProps.groupID)
        ){
            let groupId = this.props.groupID
            const data = {
                group_id: groupId
            }
            
            await this.props.getGroupData(data)
            if(this.props.getGroupDataDetails !== 400){
                this.setState({
                    groups: this.props.getGroupDataDetails
                })
            }

            await this.props.getTransactionsForGroup(data)
            if(this.props.getTransactionsForGroupDetails !== 400){
                this.setState({
                    transactions: this.props.getTransactionsForGroupDetails
                })
            }
            
            await this.props.getExpensesForGroup(data)
            if(this.props.getExpensesForGroupDetails !== 400){
                this.setState({
                    expenses: this.props.getExpensesForGroupDetails
                })
            }
        }
    }


    render = () => {
        let redirectvar = null
        let currencyIcon = JSON.parse(localStorage.getItem('currency'))
        if (this.state.userleft) {
            redirectvar = <Redirect to='/' />
        }
        let Expense_disp = []
        let leaveGroupClass = ''
        if (this.state.groups) {
            let users_data = []
            let temp = null
            let trans = this.state.transactions
            let expense_sum = {}

            temp = this.state.groups.userToGroups
            temp.forEach((item) => {
                if (!item.has_invite) {
                    users_data.push(item.user_id)
                    expense_sum[item.user_id] = 0
                }

            })


            trans.forEach(item => {
                if (item.paid_by !== item.paid_to) {
                    expense_sum[item.paid_by] = (expense_sum[item.paid_by]) + (Number(item.amount))
                    expense_sum[item.paid_to] = ((expense_sum[item.paid_to]) - (Number(item.amount)))
                }
            })

            let allUsers = (this.props.getAllUsersNamesDetails) ? this.props.getAllUsersNamesDetails : null
            temp.forEach(item => {
                if (!item.has_invite) {
                    var amount = expense_sum[item.user_id]
                    amount = Number(amount.toFixed(2))
                    var owe_status = []
                    if (amount < 0) {
                        amount = amount * (-1)
                        owe_status.push(<div style={{ color: '#ff652f' }}><strong>owes {currencyIcon}{amount}</strong></div>)
                    } else if (amount > 0) {
                        owe_status.push(<div style={{ color: '#5bc5a7' }}><strong>gets back {currencyIcon}{amount}</strong></div>)
                    } else {
                        owe_status.push(<div style={{ color: '#666' }}><strong>settled up</strong></div>)
                    }

                    Expense_disp.push(<div>
                        <div className="row" style={{ margin: '20px 0' }}>
                            <div className='col-3' style={{ paddingRight: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <img alt="" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange47-100px.png" className="avatar" style={{ width: '65%', borderRadius: '25px' }} />
                            </div>
                            <div className="col-8" style={{ paddingLeft: '0' }}>
                                <div style={{ marginBottom: '5px' }}>{ allUsers ? allUsers[item.user_id].name: ''}</div>
                                <div style={{ fontSize: '12px' }}>{owe_status}</div>
                            </div>
                        </div>
                    </div>)
                }
            })

            let user_id = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')).user_id : null
            if (expense_sum[user_id] === 0) {
                leaveGroupClass = (<div>
                    <button className="btn btn-green" style={{ padding: '4px 8px', margin: '0 8px', fontSize: '14px', color: '#fff' }} onClick={this.leaveGroup}>Leave Group</button>
                    <div style={{ margin: '10px', fontSize: '13px', color: '#444' }}>You can leave this group</div>
                    <hr></hr>
                </div>)
            } else {
                leaveGroupClass = (<div>
                    <button className="btn btn-green" dataToggle="tooltip" style={{ padding: '4px 8px', margin: '0 8px', fontSize: '14px', color: '#fff' }} title="Clear the dues to leave this group" disabled>Leave Group</button>
                    <div style={{ margin: '10px', fontSize: '13px', color: '#444' }}>Clear the dues to leave this group</div>
                    <hr></hr>
                </div>)
            }
        }

        let all_users = (this.props.getAllUsersNamesDetails) ? this.props.getAllUsersNamesDetails : null

        let groupname = (this.state.groups) ? this.state.groups.group_name : null
        let expenses = (this.state.expenses) ? this.state.expenses : null
        let expenseList = []
        let user_id = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')).user_id : null
        if (expenses) {
            expenses = expenses.slice().reverse()
            expenses.forEach((item) => {
                let comments = item.comments ? item.comments : []
                let commentIcon = (comments.length > 0) ? <div style={{marginLeft:'10px'}}><i class="fa fa-comments"></i></div>: null
                let date = new Date(item.date_paid)
                let comment_disp = []
                if(comments.length > 0){
                    comments.forEach((comment) => {
                        let commentDeleteButton = (comment.user_id === user_id) ? <i class="fa fa-trash"></i> : null
                        comment_disp.push(
                            <div className="comment_div row" key={comment._id} id={comment._id} style={{ backgroundColor:'white', borderRadius:'5px', padding:'7px 10px 7px 20px', margin:'10px 0', border:'1px solid #ced4da'}}>
                                <div className='col-11' style={{fontSize:'15px', padding: 0}}>
                                    <div style={{textTransform:'capitalize', fontSize: '13px', color:'#ff7240', fontWeight: 'bold'}}>{comment.name}</div>
                                    <div style={{whiteSpace:'pre-wrap', paddingRight:'60px'}}>{comment.comment}</div>
                                </div>
                                <div className='col-1 delete-comment' style={{display:'flex', flexDirection:'column', justifyContent:'center'}} onClick={ async e => {
                                    await this.setState({
                                        deleteComment: comment._id,
                                        deleteCommentFor: item.exp_id
                                    })
                                    this.deleteComment(e)
                                }}>
                                    {commentDeleteButton}
                                </div>
                            </div>
                        )
                    })
                }
                let commentBody = (
                    <div className='comment-pane hidden' id={item.exp_id} style={{backgroundColor: '#eee', padding:'10px 110px', borderBottom:'1px solid #ddd'}}>
                        <hr style={{ margin: 0, marginBottom:'15px' }}/>
                        <div style={{fontSize: '12px', fontWeight: 'bold', color:'#777'}}>NOTES AND COMMENTS</div>
                        {comment_disp}
                        <textarea class="form-control" id={'ta' + item.exp_id} rows="2" style={{width:'75%'}} onChange={(e)=>{
                            this.setState({newComment: e.target.value})
                        }}></textarea>
                        <div className='btn btn-orange' style={{fontSize: '14px', color:'white', margin:'10px 0'}} onClick={ async e => {
                            await this.setState({commentFor: item.exp_id})
                            this.postComent(e)
                        }}>Post</div>
                    </div>)
                expenseList.push(
                    <div>
                    <div className="expense_row row" id={'e' + item.exp_id} style={{ margin: '0', padding: '15px 0', boxShadow: '0 1px 1px -1px gray' }} onClick={(e)=>{
                        if (document.getElementById(item.exp_id)) {
                            let comm = document.getElementById(item.exp_id)
                            if (comm.classList.contains('hidden')) {
                                document.getElementById('e' + item.exp_id).classList.add('bg_gray')
                                comm.classList.remove('hidden')
                            } else {
                                document.getElementById('e' + item.exp_id).classList.remove('bg_gray')
                                comm.classList.add('hidden')
                            }
                        }
                    }}>
                        <div className="col-2" style={{ padding: '0', textAlign: 'center' }}>
                            <div>{date.toLocaleString('default', { month: 'short' })}</div>
                            <div>{date.getDate()}</div>
                        </div>
                        <div className="col-1" style={{ padding: '0', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <img alt="" width="80%" src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/groceries@2x.png" className="receipt"></img>
                        </div>
                        <div className="col-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '18px', paddingLeft: '10px' }}>
                            <div className="expense-desc" style={{display: 'flex'}}><strong>{item.desc}</strong> {commentIcon}</div>
                        </div>
                        <div className='col-3'>
                            <div style={{ fontSize: '12px', color: '#777' }}><strong style={{textTransform:'capitalize'}}>{all_users ? all_users[item.paid_by].name : null}</strong> paid</div>
                            <div><strong>{currencyIcon} {item.amount}</strong></div>
                        </div>
                        
                    </div>
                        {commentBody}
                    </div>
                )
            })
        }

        return (
            <div>
                {redirectvar}
                <div className="main_row row" style={{ margin: '0' }}>
                    <div className="col-9" style={{ padding: '0', boxShadow: '3px 0 3px -4px rgba(31, 73, 125, 0.8)', minHeight: '100vh' }}>
                        <div className="row" style={{ backgroundColor: '#eee', padding: '20px 10px', margin: '0' }}>
                            <div className="col-8"><h3>{groupname}</h3></div>
                            <div className="col-4">
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
                                                    <img alt="" src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" className="category" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder="Enter a description" style={{ marginBottom: '15px' }} onChange={(e) => {
                                                        this.setState({
                                                            expense_desc: e.target.value
                                                        })
                                                    }} />
                                                    <input type="number" placeholder="0.01" min="0.01" onChange={(e) => {
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
                                </ul>
                            </div>
                        </div>
                        <hr style={{ margin: 0, color: '#555' }} />
                        {expenseList}
                        {expenseList.length === 0? <div>
                            <div class="alert alert-light" style={{textAlign: 'center'}} role="alert">
                                No data to display
                            </div>
                        </div>: null}

                    </div>
                    <div className="col-3" style={{ paddingTop: '15px' }}>
                        {leaveGroupClass}
                        {Expense_disp}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        deleteUserFromGroupDetails:state.deleteUserFromGroupDetails.user,
        newCommentDetails:state.newCommentDetails.user,
        deleteCommentDetails:state.deleteCommentDetails.user,
        newExpenseDetails:state.newExpenseDetails.user,
        getGroupDataDetails:state.getGroupDataDetails.user,
        getTransactionsForGroupDetails:state.getTransactionsForGroupDetails.user,
        getExpensesForGroupDetails:state.getExpensesForGroupDetails.user,
        getAllUsersNamesDetails:state.getAllUsersNamesDetails.user
    })
}

export default connect(mapStateToProps, 
    {deleteUserFromGroup, newComment, deleteComment, newExpense,
        getGroupData, getTransactionsForGroup, getExpensesForGroup
    })(ViewGroup)