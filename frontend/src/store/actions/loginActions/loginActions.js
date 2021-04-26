import axios from 'axios';
import exportData from '../../../config/config';
import jwt_decode from 'jwt-decode';

export const login = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post(exportData.backendURL+'login', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(async res => {
        if(res.status === 200) {
            const jwttoken = res.data
            localStorage.setItem("token", jwttoken)
            var decoded = jwt_decode(jwttoken.split(' ')[1])
            let userprofile = {
                user_id: decoded.user_id,
                full_name: decoded.full_name,
                email: decoded.email
            }
            localStorage.setItem('userProfile', JSON.stringify(userprofile))
            let currency = ''
            if(decoded.currency === 'BHD'){currency = 'BD'}
            if(decoded.currency === 'KWD'){currency = 'KWD'}
            if(decoded.currency === 'USD'){currency = '$'}
            if(decoded.currency === 'GBP'){currency = '£'}
            if(decoded.currency === 'EUR'){currency = '€'}
            if(decoded.currency === 'CAD'){currency = '$'}
            localStorage.setItem('currency', JSON.stringify(currency))
            dispatch({
                type: 'LOGIN',
                payload: userprofile
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => {
        dispatch({
            type: 'LOGIN',
            payload: 400
        })
    })
}