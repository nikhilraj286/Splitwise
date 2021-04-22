import axios from 'axios';
import exportData from '../../../config/config';

export const getTransactions = () => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(exportData.backendURL + 'getTransactions', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'GETTRANSACTIONS',
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'GETTRANSACTIONS',
            payload: 400
        })
    });
}