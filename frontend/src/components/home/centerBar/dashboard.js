import React from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends React.Component{
    state={}

    

    render = () => {
        return(
            <div className="row">
           <div className="col-4"><h3>Dashboard</h3></div>
           <div className="col-8">
           <ul className="nav navbar-nav navbar-right"  style={{flexDirection:'row', float:'right'}}>
                <Link className="btn btn-green" to="/userAccount" style={{color:'#fff', textDecoration:'none', fontWeight:'bold', marginRight:'15px'}}>Add Group</Link>
                <Link className="btn btn-orange" to="/" style={{color:'#fff', textDecoration:'none', fontWeight:'bold', marginRight:'15px'}}>Settle Up</Link>
            </ul>
           </div>
           {/* {texts} */}

           {/* <button onClick={this.changeNumber}>Add a person</button> */}
        </div>
        )
    }
}