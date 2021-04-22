import axios from 'axios';
import exportData from '../../../config/config';

export const deleteUserFromGroup = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'deleteUserFromGroup', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(async (res) => {
            if(res.status === 200){
            dispatch({
                type: 'DELETEUSERFROMGROUP',
                payload: 200
            })
        }
        }).catch((err) => {
            dispatch({
                type: 'DELETEUSERFROMGROUP',
                payload: 400
            })
        });
}