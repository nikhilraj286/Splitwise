import axios from 'axios';
import exportData from '../../../config/config';

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
            localStorage.setItem('userProfile', JSON.stringify(res.data))
            dispatch({
                type: 'SIGNUP',
                payload: res.data
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: 'SIGNUP',
            payload: 404
        })
    })
}