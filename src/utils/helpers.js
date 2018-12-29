import axios from 'axios';
import { API_URL } from '../config';

export const sendUserData = (data) => {
    return axios.post(`${API_URL}/api/user`, {
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
    return axios.post(`${API_URL}/api/drink`, {
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
    return (axios.get(`${API_URL}/api/user`))
}

export const getAllWithKonni = () => {
    return axios.get(`${API_URL}/api/user/allWithKonni`)
}

export const getUserData = (username) => {
    return axios.get(`${API_URL}/api/user/getUser/${username}`)
}