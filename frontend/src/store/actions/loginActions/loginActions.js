import axios from 'axios';

export const login = (data) => async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:3001/login', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(async res => {
        console.log(res);
        if(res.status === 200) {
            console.log(res);
            dispatch({
                type: 'LOGIN',
                payload: res.data
            })
        } else {
            console.log(res);
        }
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: 'LOGIN',
            payload: 404
        })
    })
}