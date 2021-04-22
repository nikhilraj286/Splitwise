import axios from 'axios';
import exportData from '../../../config/config';

export const settleup = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL+'settleup', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'SETTLEUP',
                payload: res.status
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'SETTLEUP',
            payload: 400
        })
    });
}