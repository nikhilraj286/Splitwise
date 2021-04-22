import axios from 'axios';
import exportData from '../../../config/config';

export const getTransactionsForUser = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'getTransactionsForUser', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'GETTRANSACTIONSFORUSER',
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'GETTRANSACTIONSFORUSER',
            payload: 400
        })
    });
}