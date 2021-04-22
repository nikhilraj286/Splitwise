import axios from 'axios';
import exportData from '../../../config/config';
import jwt_decode from 'jwt-decode';

export const signup = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post(exportData.backendURL+'signup', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(async res => {
        // console.log(res);
        if(res.status === 200) {
            // console.log(res);
            const jwttoken = res.data
            localStorage.setItem("token", jwttoken)
            var decoded = jwt_decode(jwttoken.split(' ')[1])
            // console.log(decoded);
            let userprofile = {
                user_id: decoded.user_id,
                full_name: decoded.full_name,
                email: decoded.email
            }
            localStorage.setItem('userProfile', JSON.stringify(userprofile))
            dispatch({
                type: 'SIGNUP',
                payload: userprofile
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: 'SIGNUP',
            payload: 400
        })
    })
}