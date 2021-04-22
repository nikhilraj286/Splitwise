import React, { Component } from 'react';
import '../style.css';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { login } from '../../store/actions/loginActions/loginActions';
// import PropTypes from 'prop-types'
import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios';
import { Redirect } from 'react-router';
// import exportData from '../../config/config';
import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/userActions/updateUserActions'
import { getUser } from '../../store/actions/userActions/getUserActions'
import { uploadPic } from '../../store/actions/userActions/uploadPicActions'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: null,
            email: null,
            fullname:null,
            mobile:null,
            currency:null,
            timezone: null,
            language: null,
            profilepic: null,
            file: null,
            fileText: null,
            datasubmitted: false,
            rerender: 0,
            invalidEmail: false,
            invalidMobile: false,
            imageUrl: null,
            timeout: false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this)
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.mobileChangeHandler = this.mobileChangeHandler.bind(this);
        this.timeZoneChangeHandler = this.timeZoneChangeHandler.bind(this);
        this.languageChangeHandler = this.languageChangeHandler.bind(this)
        this.profilePicChangeHandler = this.profilePicChangeHandler.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    fullNameChangeHandler = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }
    currencyChangeHandler = (e) => {
        this.setState({
            currency: e.target.value
        })
    }
    mobileChangeHandler = (e) => {
        
        this.setState({
            mobile: e.target.value
        })
    }
    timeZoneChangeHandler = (e) => {
        this.setState({
            timezone: e.target.value
        })
    }
    languageChangeHandler = (e) => {
        this.setState({
            language: e.target.value
        })
    }
    
    profilePicChangeHandler = (e) => {
        if (e.target.files)
            this.setState({
                profilepic:e.target.files[0]
            })
    }
    submitData = async e => {
        this.setState({
            invalidEmail: false,
            datasubmitted: false,
            invalidMobile: false
        })
        console.log('1111111111 ',(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)))
        if (this.state.email || this.state.fullname || this.state.mobile || this.state.currency || this.state.timezone || this.state.language || this.state.imageUrl) {
            if ((this.state.mobile === null || (this.state.mobile && this.state.mobile.length === 10 && /^\d{10}$/.test(this.state.mobile)))
                && (this.state.email === null || (this.state.email && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))))) {
                    console.log('2222222222 ', (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)))
                let userProf = JSON.parse(localStorage.getItem('userProfile'))
                let userId = userProf.user_id
                const data = {
                    user_id: userId,
                    email: this.state.email,
                    full_name: this.state.fullname,
                    phone: this.state.mobile,
                    currency: this.state.currency,
                    time_zone: this.state.timezone,
                    language: this.state.language,
                    profile_picture: this.state.imageUrl
                }
                this.setState({
                    email: null,
                    fullname: null,
                    mobile: null,
                    currency: null,
                    timezone: null,
                    language: null,
                    profilepic: null
                })
                document.getElementById('nameInput').value = ''
                document.getElementById('emailInput').value = ''
                document.getElementById('mobileInput').value = ''
                // await axios.post(exportData.backendURL + 'updateUser', data, {
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     }
                // })
                //     .then(async (res) => {
                //         if (res.status === 200) {
                //             console.log(res.data);
                //             if (res.data === "failed") {
                //                 this.setState({
                //                     rerender: this.state.rerender + 1,
                //                     invalidEmail: true,
                //                     // email: null,
                //                     // fullname: null,
                //                     // mobile: null,
                //                     // currency: null,
                //                     // timezone: null,
                //                     // language: null,
                //                     // profilepic: null
                //                 })
                //             } else {
                //                 this.setState({
                //                     rerender: this.state.rerender + 1,
                //                     datasubmitted: true,
                //                     // email: null,
                //                     // fullname: null,
                //                     // mobile: null,
                //                     // currency: null,
                //                     // timezone: null,
                //                     // language: null,
                //                     // profilepic: null
                //                 })
                //             }
                //         }


                //     }).catch((err) => {
                //         console.log(err)
                //     });

                await this.props.updateUser(data)
                if(this.props.updateUserDetails !== 400){
                    if(this.props.updateUserDetails === "failed"){
                        this.setState({
                            invalidEmail: true,
                            timeout: true
                        })
                    } else {
                        this.setState({
                            datasubmitted: true,
                            timeout: true
                        })
                    }
                }
            } else {
                console.log('here')
                document.getElementById('emailInput').value = ''
                document.getElementById('mobileInput').value = ''
                this.setState({
                    invalidMobile: true,
                    timeout: true,
                    mobile: null,
                    email: null,
                })
            }
        }
    }

    componentDidMount = async () => {
        if(localStorage.getItem('userProfile')){
            let userProf = JSON.parse(localStorage.getItem('userProfile'))
            let userId = userProf.user_id
            const data = {
                user_id: userId
            }
            // axios.defaults.withCredentials = true;
            // await axios.post(exportData.backendURL+'getUser', data, {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(async (res) => {
            //     console.log('status',res.status)
            //     if (res.status === 200) {
            //         console.log(res.data);
            //         this.setState({
            //             userProfile: res.data
            //             // email: res.data.email,
            //             // fullname: res.data.full_name,
            //             // mobile: res.data.phone,
            //             // currency: res.data.currency,
            //             // timezone: res.data.time_zone,
            //             // language: res.data.language,
            //             // profilepic: res.data.profile_picture,
            //         })
            //     }
            // }).catch((err) => {
            //     console.log(err)
            // });

            await this.props.getUser(data)
            if(this.props.getUserDetails !== 400){
                this.setState({
                    userProfile: this.props.getUserDetails
                })
            }
        }

    }

    componentWillUpdate = async (prevProps, prevState) => {
        // console.log(this.state, prevState)
        if ((this.state.invalidEmail === true && prevState.invalidEmail === false)
            || (this.state.invalidMobile === true && prevState.invalidMobile === false)
            || (this.state.datasubmitted === true && prevState.datasubmitted === false)) {
            let userProf = JSON.parse(localStorage.getItem('userProfile'))
            let userId = userProf.user_id
            const data = {
                user_id: userId
            }
            // axios.defaults.withCredentials = true;
            // await axios.post(exportData.backendURL+'getUser', data, {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(async (res) => {
            //     // console.log('status',res.status)
            //     if (res.status === 200) {
            //         console.log(res.data);
            //         this.setState({
            //             userProfile: res.data
            //             // email: res.data.email,
            //             // fullname: res.data.full_name,
            //             // mobile: res.data.phone,
            //             // currency: res.data.currency,
            //             // timezone: res.data.time_zone,
            //             // language: res.data.language,
            //             // profilepic: res.data.profile_picture,
            //         })
            //     }
            // }).catch((err) => {
            //     console.log(err)
            // });
            await this.props.getUser(data)
            if(this.props.getUserDetails !== 400){
                this.setState({
                    userProfile: this.props.getUserDetails
                })
            }
        }
    }



    render() {
        let redirectVar = null;
        let errMessage = ''
        let submitted_status = ''
        let invalidMobileMsg = ''
        if (!localStorage.getItem('userProfile')) {
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.state)
        if(this.state.datasubmitted && this.state.timeout){
            // this.setState({datasubmitted: false})
            submitted_status = (<div className="alert alert-success" id="successDisp" style={{margin:'60px 30% 0 30%', textAlign:'center'}} role="alert">
            User profile has been updated sucessfully
          </div>)
          setTimeout(() => {
              this.setState({timeout: false})
            },3500)
        }
        if (this.state.invalidEmail) {
            // this.setState({invalidEmail: false})
            errMessage = (<div className="alert alert-warning" id="failDisp" style={{margin:'60px 30% 0 30%', textAlign:'center'}} role="alert">
                Email Id has been taken. Try again.
            </div>)
            setTimeout(() => {
                this.setState({timeout: false})
            },3500)
        }
        if (this.state.invalidMobile) {
            // this.setState({invalidMobile: false})
            invalidMobileMsg = (<div className="alert alert-warning" id="invalidMobileDisp" style={{margin:'60px 30% 0 30%', textAlign:'center'}} role="alert">
                Invalid Details Entered
            </div>)
            setTimeout(() => {
                this.setState({timeout: false})
            },3500)
        }
        // if(this.state.errMessage){
        //     details = <p className="alert alert-warning" style={{marginTop: '20px'}}><strong>Incorrect email or password</strong></p>
        // }
        // let redirctVar = ""
        // if (this.props.loginDetails.user && this.props.loginDetails.user.user_id) {
        //     localStorage.setItem('userProfile', JSON.stringify(this.props.loginDetails.user))
        //     redirctVar = <Redirect to="/home"/>
        // }
        
        // <img className="picture-frame" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-200px.png">
        // let img_src = this.state.profilepic?exportData.backendURL+'profile/'+this.state.profilepic:'https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-200px.png'
        // axios.get(exportData.backendURL+'profile/'+this.state.profilepic).then(async (res) => {
        //     this.setState({

        //     })
        // })
        let img_src = this.state.profilepic?this.state.profilepic
            :'https://spitwise.s3-us-west-2.amazonaws.com/' + (this.state.imageUrl?this.state.imageUrl
                :(this.state.userProfile?this.state.userProfile.profile_picture
                    :null))
        // if (user.profile_picture && user.profile_picture !== '') {
        //     img_src = user.profile_picture
        // }
        // console.log(user)
        return (
            <div>
                {redirectVar}
                <div className="container-fluid">
                    <div className="container userProfile-main">
                    <div style={{margin:'40px 105px'}}><h2>Your account</h2></div>
                        

                        <div className="row justify-content-center">
                            <div className='col-1'></div>
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-5">
                                        <div>
                                            <img className="picture-frame" alt='' src={img_src}  style={{width:'200px', height:'200px'}}/>
                                        </div>
                                        <div style={{display:'flex', flexDirection:'row'}}>
                                            <input type="file" id="myFile" onChange={this.profilePicChangeHandler} name="profilePic" style={{ width: '80%', fontSize: '11px', margin: '10px 0px' }} />
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', cursor:'pointer'}} onClick={async ()=>{

                                                let formData = new FormData();
                                                formData.append('myImage', this.state.profilepic);
                                                const config = { headers: { 'content-type': 'multipart/form-data' } };
                                                let data = {
                                                    formD: formData,
                                                    conf: config
                                                }
                                                // await axios.post(exportData.backendURL+"uploadPic", formData, config).then(async (res) => {
                                                //     console.log('image', res)
                                                //     this.setState({imageUrl:res.data, profilepic:null})
                                                // }).catch((err) => {
                                                //     console.log(err)
                                                // });

                                                await this.props.uploadPic(data)
                                                if(this.props.uploadPicDetails !== 400){
                                                    this.setState({
                                                        imageUrl: this.updateUserDetails,
                                                        profilepic: null
                                                    })
                                                }

                                                // await axios.get(exportData.backendURL+'profile/'+this.state.profilepic).then(async (res) => {
                                                //     if(res.status === 200){
                                                //         this.setState({
                                                //             imageUrl: 'https://spitwise.s3-us-west-2.amazonaws.com/' + 
                                                //         })
                                                //     }
                                                // })

                                            }}><i className="fa fa-check"></i></div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className='name field'>
                                            <p>Your Name</p>
                                            <div className="initial_disp" id='name1'>
                                                <strong>{(this.state.fullname)?this.state.fullname:(this.state.userProfile?this.state.userProfile.full_name:'')}</strong>
                                                <div onClick={(e)=>{
                                                    document.getElementById('name1').classList.add('hidden')
                                                    document.getElementById('name2').classList.remove('hidden')
                                                }}>
                                                    <i className="fa fa-edit"></i> <span>Edit</span>
                                                </div>
                                            </div>
                                            <div className='hidden_disp hidden' id='name2'>
                                                <input type='text' id='nameInput' onChange={this.fullNameChangeHandler} placeholder={this.state.userProfile?this.state.userProfile.full_name:''} />
                                                <div onClick={(e)=>{
                                                    document.getElementById('name1').classList.remove('hidden')
                                                    document.getElementById('name2').classList.add('hidden')
                                                }}><i className="fa fa-check"></i></div>
                                            </div>
                                        </div>

                                        <div className='email field'>
                                            <p>Your Email ID</p>
                                            <div className="initial_disp" id='email1' onClick={(e)=> {
                                                document.getElementById('email1').classList.add('hidden')
                                                document.getElementById('email2').classList.remove('hidden')
                                            }}>
                                                <strong>{(this.state.email)?this.state.email:(this.state.userProfile?this.state.userProfile.email:'')}</strong>
                                                <div>
                                                    <i className="fa fa-edit"></i> <span>Edit</span>
                                                </div>
                                            </div>
                                            <div className='hidden_disp  hidden' id='email2'>
                                                <input type='email' id='emailInput' onChange={this.emailChangeHandler} placeholder={this.state.userProfile?this.state.userProfile.email:''} />
                                                <div onClick={(e)=>{
                                                    // if(this.state.email === null || (this.state.email && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)))){
                                                    //     document.getElementById('email1').classList.remove('hidden')
                                                    //     document.getElementById('email2').classList.add('hidden')
                                                    // }
                                                    // if(this.state.email === null || (this.state.email && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)))){
                                                        document.getElementById('email1').classList.remove('hidden')
                                                        document.getElementById('email2').classList.add('hidden')
                                                    // }
                                                }}><i className="fa fa-check"></i></div>
                                            </div>
                                        </div>

                                        <div className='mobile field'>
                                            <p>Your Mobile</p>
                                            <div className="initial_disp" id='phone1' onClick={(e)=>{
                                                document.getElementById('phone1').classList.add('hidden')
                                                document.getElementById('phone2').classList.remove('hidden')
                                            }}>
                                                <strong>{(this.state.mobile)?this.state.mobile:(this.state.userProfile?this.state.userProfile.phone:'')}</strong>
                                                <div>
                                                    <i className="fa fa-edit"></i> <span>Edit</span>
                                                </div>
                                            </div>
                                            <div className='hidden_disp hidden' id='phone2'>
                                                <input type='number' id='mobileInput' onChange={this.mobileChangeHandler} placeholder={this.state.userProfile?this.state.userProfile.phone:''} />
                                                <div onClick={(e)=> {
                                                    document.getElementById('phone1').classList.remove('hidden')
                                                    document.getElementById('phone2').classList.add('hidden')
                                                }}><i className="fa fa-check"></i></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-1'></div>
                            <div className="col-4">
                                <div className='currency field'>
                                    <p>Your Default Currency</p>
                                    <p style={{fontSize:'12px'}}>(for new expenses)</p>
                                    <select className="btn btn-light dropdown-toggle" onChange={this.currencyChangeHandler} name="currency" id="currency" value={(this.state.currency)?this.state.currency:(this.state.userProfile?this.state.userProfile.currency:'USD')}>
                                        <option value="USD">USD ($)</option>
                                        <option value="KWD">KWD (KWD)</option>
                                        <option value="BHD">BHD (BD)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="CAD">CAD ($)</option>
                                    </select>
                                </div>
                                <div className='timezone field'>
                                    <p>Your Time Zone</p>
                                    <select className="btn btn-light dropdown-toggle" onChange={this.timeZoneChangeHandler} name="timezone" id="timezone" value={(this.state.timezone)?this.state.timezone:(this.state.userProfile?this.state.userProfile.time_zone:'-8')} style={{ width: '80%' }}>
                                        <option timeZoneId="1" gmtAdjustment="GMT-12:00" useDaylightTime="0" value="-12">(GMT-12:00) International Date Line West</option>
                                        <option timeZoneId="2" gmtAdjustment="GMT-11:00" useDaylightTime="0" value="-11">(GMT-11:00) Midway Island, Samoa</option>
                                        <option timeZoneId="3" gmtAdjustment="GMT-10:00" useDaylightTime="0" value="-10">(GMT-10:00) Hawaii</option>
                                        <option timeZoneId="4" gmtAdjustment="GMT-09:00" useDaylightTime="1" value="-9">(GMT-09:00) Alaska</option>
                                        <option timeZoneId="5" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                                        <option timeZoneId="6" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Tijuana, Baja California</option>
                                        <option timeZoneId="7" gmtAdjustment="GMT-07:00" useDaylightTime="0" value="-7">(GMT-07:00) Arizona</option>
                                        <option timeZoneId="8" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                        <option timeZoneId="9" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
                                        <option timeZoneId="10" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Central America</option>
                                        <option timeZoneId="11" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Central Time (US & Canada)</option>
                                        <option timeZoneId="12" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                        <option timeZoneId="13" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Saskatchewan</option>
                                        <option timeZoneId="14" gmtAdjustment="GMT-05:00" useDaylightTime="0" value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                        <option timeZoneId="15" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
                                        <option timeZoneId="16" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Indiana (East)</option>
                                        <option timeZoneId="17" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
                                        <option timeZoneId="18" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Caracas, La Paz</option>
                                        <option timeZoneId="19" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Manaus</option>
                                        <option timeZoneId="20" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Santiago</option>
                                        <option timeZoneId="21" gmtAdjustment="GMT-03:30" useDaylightTime="1" value="-3.5">(GMT-03:30) Newfoundland</option>
                                        <option timeZoneId="22" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Brasilia</option>
                                        <option timeZoneId="23" gmtAdjustment="GMT-03:00" useDaylightTime="0" value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
                                        <option timeZoneId="24" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Greenland</option>
                                        <option timeZoneId="25" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Montevideo</option>
                                        <option timeZoneId="26" gmtAdjustment="GMT-02:00" useDaylightTime="1" value="-2">(GMT-02:00) Mid-Atlantic</option>
                                        <option timeZoneId="27" gmtAdjustment="GMT-01:00" useDaylightTime="0" value="-1">(GMT-01:00) Cape Verde Is.</option>
                                        <option timeZoneId="28" gmtAdjustment="GMT-01:00" useDaylightTime="1" value="-1">(GMT-01:00) Azores</option>
                                        <option timeZoneId="29" gmtAdjustment="GMT+00:00" useDaylightTime="0" value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                                        <option timeZoneId="30" gmtAdjustment="GMT+00:00" useDaylightTime="1" value="0">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                                        <option timeZoneId="31" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                        <option timeZoneId="32" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                        <option timeZoneId="33" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                        <option timeZoneId="34" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                        <option timeZoneId="35" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) West Central Africa</option>
                                        <option timeZoneId="36" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Amman</option>
                                        <option timeZoneId="37" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                                        <option timeZoneId="38" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Beirut</option>
                                        <option timeZoneId="39" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Cairo</option>
                                        <option timeZoneId="40" gmtAdjustment="GMT+02:00" useDaylightTime="0" value="2">(GMT+02:00) Harare, Pretoria</option>
                                        <option timeZoneId="41" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                        <option timeZoneId="42" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Jerusalem</option>
                                        <option timeZoneId="43" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Minsk</option>
                                        <option timeZoneId="44" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Windhoek</option>
                                        <option timeZoneId="45" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                                        <option timeZoneId="46" gmtAdjustment="GMT+03:00" useDaylightTime="1" value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                        <option timeZoneId="47" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Nairobi</option>
                                        <option timeZoneId="48" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Tbilisi</option>
                                        <option timeZoneId="49" gmtAdjustment="GMT+03:30" useDaylightTime="1" value="3.5">(GMT+03:30) Tehran</option>
                                        <option timeZoneId="50" gmtAdjustment="GMT+04:00" useDaylightTime="0" value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
                                        <option timeZoneId="51" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Baku</option>
                                        <option timeZoneId="52" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Yerevan</option>
                                        <option timeZoneId="53" gmtAdjustment="GMT+04:30" useDaylightTime="0" value="4.5">(GMT+04:30) Kabul</option>
                                        <option timeZoneId="54" gmtAdjustment="GMT+05:00" useDaylightTime="1" value="5">(GMT+05:00) Yekaterinburg</option>
                                        <option timeZoneId="55" gmtAdjustment="GMT+05:00" useDaylightTime="0" value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                        <option timeZoneId="56" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
                                        <option timeZoneId="57" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                        <option timeZoneId="58" gmtAdjustment="GMT+05:45" useDaylightTime="0" value="5.75">(GMT+05:45) Kathmandu</option>
                                        <option timeZoneId="59" gmtAdjustment="GMT+06:00" useDaylightTime="1" value="6">(GMT+06:00) Almaty, Novosibirsk</option>
                                        <option timeZoneId="60" gmtAdjustment="GMT+06:00" useDaylightTime="0" value="6">(GMT+06:00) Astana, Dhaka</option>
                                        <option timeZoneId="61" gmtAdjustment="GMT+06:30" useDaylightTime="0" value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
                                        <option timeZoneId="62" gmtAdjustment="GMT+07:00" useDaylightTime="0" value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                        <option timeZoneId="63" gmtAdjustment="GMT+07:00" useDaylightTime="1" value="7">(GMT+07:00) Krasnoyarsk</option>
                                        <option timeZoneId="64" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                        <option timeZoneId="65" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
                                        <option timeZoneId="66" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                        <option timeZoneId="67" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Perth</option>
                                        <option timeZoneId="68" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Taipei</option>
                                        <option timeZoneId="69" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                        <option timeZoneId="70" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Seoul</option>
                                        <option timeZoneId="71" gmtAdjustment="GMT+09:00" useDaylightTime="1" value="9">(GMT+09:00) Yakutsk</option>
                                        <option timeZoneId="72" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Adelaide</option>
                                        <option timeZoneId="73" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Darwin</option>
                                        <option timeZoneId="74" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Brisbane</option>
                                        <option timeZoneId="75" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                        <option timeZoneId="76" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Hobart</option>
                                        <option timeZoneId="77" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Guam, Port Moresby</option>
                                        <option timeZoneId="78" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Vladivostok</option>
                                        <option timeZoneId="79" gmtAdjustment="GMT+11:00" useDaylightTime="1" value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                                        <option timeZoneId="80" gmtAdjustment="GMT+12:00" useDaylightTime="1" value="12">(GMT+12:00) Auckland, Wellington</option>
                                        <option timeZoneId="81" gmtAdjustment="GMT+12:00" useDaylightTime="0" value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                        <option timeZoneId="82" gmtAdjustment="GMT+13:00" useDaylightTime="0" value="13">(GMT+13:00) Nuku'alofa</option>
                                    </select>
                                </div>
                                <div className='language field'>
                                    <p>Your Language</p>
                                    <select className="btn btn-light dropdown-toggle" onChange={this.languageChangeHandler} name="language" id="language" value={(this.state.language)?this.state.language:(this.state.userProfile?this.state.userProfile.language:'EN')}>
                                        <option value="AF">Afrikaans</option>
                                        <option value="SQ">Albanian</option>
                                        <option value="AR">Arabic</option>
                                        <option value="HY">Armenian</option>
                                        <option value="EU">Basque</option>
                                        <option value="BN">Bengali</option>
                                        <option value="BG">Bulgarian</option>
                                        <option value="CA">Catalan</option>
                                        <option value="KM">Cambodian</option>
                                        <option value="ZH">Chinese (Mandarin)</option>
                                        <option value="HR">Croatian</option>
                                        <option value="CS">Czech</option>
                                        <option value="DA">Danish</option>
                                        <option value="NL">Dutch</option>
                                        <option value="EN">English</option>
                                        <option value="ET">Estonian</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FI">Finnish</option>
                                        <option value="FR">French</option>
                                        <option value="KA">Georgian</option>
                                        <option value="DE">German</option>
                                        <option value="EL">Greek</option>
                                        <option value="GU">Gujarati</option>
                                        <option value="HE">Hebrew</option>
                                        <option value="HI">Hindi</option>
                                        <option value="HU">Hungarian</option>
                                        <option value="IS">Icelandic</option>
                                        <option value="ID">Indonesian</option>
                                        <option value="GA">Irish</option>
                                        <option value="IT">Italian</option>
                                        <option value="JA">Japanese</option>
                                        <option value="JW">Javanese</option>
                                        <option value="KO">Korean</option>
                                        <option value="LA">Latin</option>
                                        <option value="LV">Latvian</option>
                                        <option value="LT">Lithuanian</option>
                                        <option value="MK">Macedonian</option>
                                        <option value="MS">Malay</option>
                                        <option value="ML">Malayalam</option>
                                        <option value="MT">Maltese</option>
                                        <option value="MI">Maori</option>
                                        <option value="MR">Marathi</option>
                                        <option value="MN">Mongolian</option>
                                        <option value="NE">Nepali</option>
                                        <option value="NO">Norwegian</option>
                                        <option value="FA">Persian</option>
                                        <option value="PL">Polish</option>
                                        <option value="PT">Portuguese</option>
                                        <option value="PA">Punjabi</option>
                                        <option value="QU">Quechua</option>
                                        <option value="RO">Romanian</option>
                                        <option value="RU">Russian</option>
                                        <option value="SM">Samoan</option>
                                        <option value="SR">Serbian</option>
                                        <option value="SK">Slovak</option>
                                        <option value="SL">Slovenian</option>
                                        <option value="ES">Spanish</option>
                                        <option value="SW">Swahili</option>
                                        <option value="SV">Swedish </option>
                                        <option value="TA">Tamil</option>
                                        <option value="TT">Tatar</option>
                                        <option value="TE">Telugu</option>
                                        <option value="TH">Thai</option>
                                        <option value="BO">Tibetan</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TR">Turkish</option>
                                        <option value="UK">Ukrainian</option>
                                        <option value="UR">Urdu</option>
                                        <option value="UZ">Uzbek</option>
                                        <option value="VI">Vietnamese</option>
                                        <option value="CY">Welsh</option>
                                        <option value="XH">Xhosa</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-1'></div>
                        </div>

                        <div style={{margin:'100px 425px'}}>
                            <div href="/" className="btn btn-primary btn-orange" onClick={this.submitData} style={{ width: '100px', paddingTop: '10px', paddingBottom: '10px', fontWeight: 'bold', margin: '0 0 0 15px', float:'right' }}>
                                Save
                            </div>
                        </div>
                    </div>
                    <div className="row">{submitted_status}</div>
                    <div className="row">{errMessage}</div>
                    <div className="row">{invalidMobileMsg}</div>
                </div>
            </div>
        );
    }
}

// export default Login;

const mapStateToProps = (state) => {
    // console.log(state)
    return({
        updateUserDetails:state.updateUserDetails.user,
        getUserDetails:state.getUserDetails.user,
        uploadPicDetails:state.uploadPicDetails.user
    })
}

export default connect(mapStateToProps, {updateUser, getUser, uploadPic})(UserProfile)