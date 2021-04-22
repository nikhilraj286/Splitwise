import axios from 'axios';
import exportData from '../../../config/config';

export const uploadPic = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(exportData.backendURL+"uploadPic", data.formD, data.conf)
    .then(async (res) => {
        if (res.status === 200) {
            dispatch({
                type: 'UPLOADPIC',
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: 'UPLOADPIC',
            payload: 400
        })
    });
}