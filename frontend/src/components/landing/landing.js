import React, { Component }  from 'react'
import { Redirect } from 'react-router'
import imageHome from '../HomeImg.png'

class Landing extends Component {
    render () {
        let redirctVar = ""
        if (localStorage.getItem('userProfile')) {
            redirctVar = <Redirect to="/home"/>
        }
    return (
        <div>
            {redirctVar}
            <div style={{position:"absolute", width:'100%', marginTop:"100px"}}>
                <img width="100%" src={imageHome} alt=""/>
            </div>
        </div>
    )
    }
}


export default Landing;