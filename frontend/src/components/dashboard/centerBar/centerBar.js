import React from 'react'
import {Link} from 'react-router-dom';

export default class Center extends React.Component{

    state={
        groupData:{},
        dashboardData:{},
        recentActivtyData:{},
        number:3
        
    }
    
    componentDidMount=()=>{
        if(this.props.selected===3){
            // let groupId=this.props.groupSelected;
            //axios get with group Id

            //Set state group details
        }else{
            // axios get 1 or 2
        }
    }

    changeNumber=()=>{
        this.setState({
            number:this.state.number+1
        })
    }

    
    render=()=>{

        // let texts=[]

//         for(let i=0;i<this.state.number;i++){
//             texts.push(
//                 (
//                     <div className="row">
//     <input type="text"/>
// </div>
//                 )
//             )
//         }

        let datatobeDisplayed=null

        if(this.props.selected===1){
            datatobeDisplayed=<div> DashBoard</div>
        }else if(this.props.selected===2){
            datatobeDisplayed=<div>
                Recent Activity
            </div>
        }else{
            datatobeDisplayed=<div>
                group Selected is {this.props.groupSelected}
            </div>
        }
        console.log(this.props)
        return (<div className="row">
           <div className="col-4"><h3>{datatobeDisplayed}</h3></div>
           <div className="col-8">
           <ul class="nav navbar-nav navbar-right"  style={{flexDirection:'row', float:'right'}}>
                <button className="btn btn-primary btn-green" style={{paddingTop:'0px', paddingBottom:'0px', marginRight:'10px', maxHeight:'35px'}}><Link to="/userAccount" style={{color:'#fff', textDecoration:'none', fontWeight:'bold'}}>Add Group</Link></button>
                <button onClick = {this.handleLogout} className="btn btn-primary btn-orange" style={{paddingTop:'0px', paddingBottom:'0px', height:'35px'}}><Link to="/" style={{color:'#fff', textDecoration:'none', fontWeight:'bold'}}>Settle Up</Link></button>
            </ul>
           </div>
           {/* {texts} */}

           {/* <button onClick={this.changeNumber}>Add a person</button> */}
        </div>)
    }
}

