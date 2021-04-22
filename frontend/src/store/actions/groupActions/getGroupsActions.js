import axios from 'axios';
import exportData from '../../../config/config';

export const getGroups = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'getGroups', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'GETGROUPS',
                payload: res.data
            })
        }
    }).catch((err) => {
        dispatch({
            type: 'GETGROUPS',
            payload: 400
        })
    });
}