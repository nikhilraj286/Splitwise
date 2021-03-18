// import React from 'react'
import '../../style.css'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../logo.png'

const LeftBar = (props) => {
    return (<div>
        {props.tabs.map((tabItem) => {
            return (
                // <div className="leftbar-item" onClick={() => { props.changeTab(item.key)}}>{item.name}</div>)
                // <div className="leftbar-item" onClick={() => { props.changeTab(tabItem.key) }}>{tabItem.name}</div>)
                <div>

                    {tabItem.heading ?
                        (<div className="left-group-division" onClick={() => { props.changeTab(tabItem.key) }}>
                            <div className="left-group-heading" style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '2px 0 2px 10px', color: 'gray', margin: '8px 0' }}>{tabItem.name}</div>
                            {props.groups.map((groupItem) => {
                                return (
                                    <div className="left-group-item" >
                                        {/* <Link to={'/home/groups/'+groupItem.group_id}>{groupItem.Group.group_name}</Link> */}
                                        <div href={'/home/groups/' + groupItem.group_id} onClick={() => { props.changeGroup(3, groupItem.group_id) }}><i class="fa fa-tag" style={{ color: '#666', marginRight: '10px' }}></i>{groupItem.Group.group_name}</div>
                                    </div>
                                    // <div className="left-group-item" onClick={() => { props.changeGroup(3, groupItem.group_id) }}><a href={'/home/groups/'+groupItem.group_id}>{groupItem.Group.group_name}</a></div>
                                )
                            })}
                        </div>)
                        :
                        (
                            <div className="left-tab-item" key={tabItem.key} onClick={() => { props.changeTab(tabItem.key) }}>
                                {tabItem.name === 'Dashboard' ? <img alt="" src={logo} style={{ width: '15px', height: '100%', marginTop: '-3px', marginRight: '8px' }} /> : <i class="fa fa-flag" style={{ color: '#666', marginRight: '8px' }}></i>}
                                {tabItem.name}</div>
                        )
                    }

                        





                </div>
            )
        })}
        <div className="left-group-heading" style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '2px 0 2px 10px', color: 'gray', margin: '8px 0' }}>Users</div> 
    </div>)
}




export default LeftBar;


// {
    // tabItem.heading ?
    // (<div className="left-group-division" onClick={() => { props.changeTab(tabItem.key) }}>
    //     <div className="left-group-heading">{tabItem.name}</div>
    //     {props.groups.map((groupItem) => {
    //         return (
    //             <div className="left-group-item" onClick={() => { props.changeGroup(3, groupItem.group_id) }}>{groupItem.Group.group_name}</div>
    //         )
    //     })}
    // </div>)
    // :
    // (
    //     <div className="left-tab-item" key={tabItem.key} onClick={() => { props.changeTab(tabItem.key) }}>{tabItem.name}</div>
        // )}/
