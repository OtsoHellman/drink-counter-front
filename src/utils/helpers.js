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

export const getAllUserData = () => {
    return (axios.get(`${URL}/api/user`))
}

export const getUserData = (username) => {
    return(axios.get(`${URL}/api/user/${username}`))
}