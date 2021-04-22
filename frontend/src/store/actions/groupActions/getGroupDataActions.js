import axios from 'axios';
import exportData from '../../../config/config';

export const getGroupData = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'getGroupData', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'GETGROUPDATA',
                payload: res.data
            })
        }
    }).catch((err) => {
        dispatch({
            type: 'GETGROUPDATA',
            payload: 400
        })
    });
}