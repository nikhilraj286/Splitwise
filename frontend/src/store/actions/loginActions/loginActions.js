import axios from 'axios';
import exportData from '../../../config/config';

export const login = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post(exportData.backendURL+'login', data, {
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
                type: 'LOGIN',
                payload: res.data
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: 'LOGIN',
            payload: 404
        })
    })
}