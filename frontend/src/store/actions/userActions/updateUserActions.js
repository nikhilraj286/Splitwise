import axios from 'axios';
import exportData from '../../../config/config';

export const updateUser = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'updateUser', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'UPDATEUSER',
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'UPDATEUSER',
            payload: 400
        })
    });
}