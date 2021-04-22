import axios from 'axios';
import exportData from '../../../config/config';

export const getAllUsersNames = () => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(exportData.backendURL + 'getAllUsersNames', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(async (res) => {
            if(res.status === 200){
            dispatch({
                type: 'GETALLUSERNAMES',
                payload: res.data
            })
        }
        }).catch((err) => {
            dispatch({
                type: 'GETALLUSERNAMES',
                payload: 400
            })
        });
}