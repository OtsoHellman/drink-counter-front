import axios from 'axios';

const URL = 'http://localhost:3001'

export const sendUserData = (data) => {
    return axios.post(`${URL}/api/user`, {
        username: data.username,
        mass: data.mass,
        gender: data.gender
    })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
}

export const addDrinkByUsername = (username, drinkSize) => {
    return axios.post(`${URL}/api/drink`, {
        username,
        drinkSize
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

export const getAllWithKonni = () => {
    return axios.get(`${URL}/api/user/allWithKonni`)
}

export const getUserData = (username) => {
    return axios.get(`${URL}/api/user/getUser/${username}`)
}