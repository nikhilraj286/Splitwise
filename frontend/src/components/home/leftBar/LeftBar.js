// import React from 'react'
import '../../style.css'
import React from 'react'

const LeftBar = (props) => {
    return (<div>
        {props.tabs.map((tabItem) => {
            return (
                // <div className="leftbar-item" onClick={() => { props.changeTab(item.key)}}>{item.name}</div>)
                // <div className="leftbar-item" onClick={() => { props.changeTab(tabItem.key) }}>{tabItem.name}</div>)
                <div>

            {
                tabItem.heading ?
                (<div className="left-group-heading">
                    <p>{tabItem.name}</p>
                    {props.groups.map((groupItem) => {
                        return (
                            <div className="left-group-item" onClick={() => { props.changeGroup(3, groupItem.id) }}>{groupItem.title}</div>
                        )
                    })}
                </div>)
                :
                (
                    <div className="left-tab-item" onClick={() => { props.changeTab(tabItem.key) }}>{tabItem.name}</div>
                    )}
                    </div>
        )
        })}
        </div>)
}




export default LeftBar;

