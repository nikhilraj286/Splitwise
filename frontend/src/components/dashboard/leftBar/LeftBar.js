import React from 'react'
import '../../style.css'

const LeftBar = (props) => {
    return (<div>
        {props.tabs.map((item) => {
            return (
                <div>
                    {item.heading ? (<div className="leftbarHeading"><p><b>{item.name}</b></p>
                        {props.groups.map((item) => {
                            console.log(item)
                            return (
                                <div  className="left-inner" onClick={() => { props.changeGroup(3, item.id) }}>{item.title}</div>
                            )
                        })}
                    </div>) : (<div  className="leftbarItem" onClick={() => { props.changeTab(item.key) }}>{item.name}
                    </div>)}
                </div>)
        })
        }
    </div>)
}

export default LeftBar;

