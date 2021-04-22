import axios from 'axios';
import exportData from '../../../config/config';

export const createGroup = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL + 'createGroup', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(async (res) => {
            if(res.status === 200){
            dispatch({
                type: 'CREATEGROUP',
                payload: 200
            })
        }
        }).catch((err) => {
            dispatch({
                type: 'CREATEGROUP',
                payload: 400
            })
        });
}