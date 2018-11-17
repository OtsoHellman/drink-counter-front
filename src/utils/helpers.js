import axios from 'axios';

export const sendUserData = (data) => {
    axios.post('api/user', {
        userName: data.userName,
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