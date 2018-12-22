import axios from 'axios';

const URL = 'http://localhost:3001'

export const sendUserData = (data) => {
    axios.post(`${URL}/api/user`, {
        username: data.username,
        mass: data.mass,
        gender: data.gender
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}