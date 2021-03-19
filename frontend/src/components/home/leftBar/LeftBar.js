// import React from 'react'
import '../../style.css'
import React from 'react'
// import { Link } from 'react-router-dom'
import '../../style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../logo.png'



const LeftBar = (props) => {
    // console.log('PROPS',props)
    let selectedId = null
    if(props.tabSelected){
        if(props.tabSelected === 4 && props.groupSelected > 0){
            selectedId = 'group' + props.tabSelected + props.groupSelected
        } else if(props.tabSelected < 4){
            selectedId = 'tab' + props.tabSelected
        }
    }
    // console.log('tab selected',props.tabSelected,'group selected',props.groupSelected)
    // console.log('ID -', selectedId)
    if(selectedId && document.getElementById(selectedId)){
        // console.log(document.getElementById(selectedId).classList)
        document.getElementById(selectedId).classList.add("selected-tab")
    }
    return (<div>
        {props.tabs.map((tabItem) => {
            let tabLogo = []
            if(tabItem.name==='Dashboard'){
                tabLogo.push(<img alt="" src={logo} style={{ width: '15px', height: '100%', marginTop: '-3px', marginRight: '8px' }} />)
            } else if (tabItem.name === 'Recent Activity'){
                tabLogo.push(<i class="fa fa-flag" style={{marginRight: '8px' }}></i>)
            } else {
                tabLogo.push(<i class="fa fa-users" style={{marginRight: '8px' }}></i>)
            }
            
            
            return (
                // <div className="leftbar-item" onClick={() => { props.changeTab(item.key)}}>{item.name}</div>)
                // <div className="leftbar-item" onClick={() => { props.changeTab(tabItem.key) }}>{tabItem.name}</div>)
                <div>

                    {tabItem.heading ?
                        (<div className="left-group-division" onClick={() => { props.changeTab(tabItem.key) }}>
                            <div className="left-group-heading" style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '2px 0 2px 10px', color: 'gray', margin: '8px 0' }}>{tabItem.name}</div>
                            {props.groups.map((groupItem) => {
                                
                                let item = null
                                if(!groupItem.has_invite){
                                    item = (
                                            <div className="left-group-item" href={'/home/groups/' + groupItem.group_id} id={'group'+tabItem.key+groupItem.group_id} onClick={() => { 
                                                props.changeGroup(4, groupItem.group_id)
                                                if(document.getElementById(selectedId)){
                                                document.getElementById(selectedId).classList.remove("selected-tab")
                                                }
                                                }}><i class="fa fa-tag" style={{marginRight: '10px' }}></i>{groupItem.Group.group_name}</div>
                                )}
                                return item
                            })}
                        </div>)
                        :
                        (
                            <div className="left-tab-item" key={tabItem.key} id={'tab'+tabItem.key} onClick={() => {
                                 props.changeTab(tabItem.key)
                                 if(document.getElementById(selectedId)){
                                    document.getElementById(selectedId).classList.remove("selected-tab")
                                 }
                                 
                                 }}>
                                {/* {tabItem.name === 'Dashboard' ? <img alt="" src={logo} style={{ width: '15px', height: '100%', marginTop: '-3px', marginRight: '8px' }} /> : <i class="fa fa-flag" style={{ color: '#666', marginRight: '8px' }}></i>} */}
                                {tabLogo}
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
