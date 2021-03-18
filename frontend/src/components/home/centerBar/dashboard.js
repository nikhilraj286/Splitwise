import React from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalBalance:'0.0',
            youOwe:'0.0',
            youAreOwed:'0.0'
        }
    }



    render = () => {

        let userProfile = JSON.parse(localStorage.getItem('userProfile'))
        return (
            <div>
                <div className="main_row">
                    <div className="row" style={{backgroundColor:'#eee', padding:'20px 10px', margin:'0'}}>
                        <div className="col-4"><h3>Dashboard</h3></div>
                        <div className="col-8">
                            <ul className="nav navbar-nav navbar-right" style={{ flexDirection: 'row', float: 'right' }}>
                                <Link className="btn link-green" to="/group/new" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>Add Group</Link>
                                <Link className="btn link-orange" to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>Settle Up</Link>
                            </ul>
                        </div>
                    </div>
                    <hr style={{margin:0, color:'#555'}}/>
                    <div className="summary_data row" style={{textAlign:'center', backgroundColor:'#eee', margin:'0', padding:'5px 10px'}}>
                        <div className="col" style={{padding:'15px 0'}}>
                            <div>total balance</div>
                            <div>{this.state.totalBalance}</div>
                        </div>
                        <div className="col" style={{boxShadow:'3px 0 3px -4px rgba(31, 73, 125, 0.8), -3px 0 3px -4px rgba(31, 73, 125, 0.8)', padding:'15px 0'}}>
                            <div>you owe</div>
                            <div>{this.state.youOwe}</div>
                        </div>
                        <div className="col" style={{padding:'15px 0'}}>
                            <div>you are owed</div>
                            <div>{this.state.youAreOwed}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}