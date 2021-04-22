import axios from 'axios';
import exportData from '../../../config/config';

export const getExpensesForGroup = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'getExpensesForGroup', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'GETEXPENSESFORGROUP',
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'GETEXPENSESFORGROUP',
            payload: 400
        })
    });
}