import React, { Component }  from 'react'
import imageHome from '../HomeImg.png'

class Landing extends Component {
    render () {
    return (
        <div style={{position:"absolute", width:'100%', marginTop:"100px"}}>
            <img width="100%" src={imageHome} alt=""/>
        </div>
    )
    }
}


export default Landing;