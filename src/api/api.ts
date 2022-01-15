import { User } from './../models/User';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const api = {
    //users
    getUsers: async () => {
        return (await axios.get(`${apiUrl}users`)).data;
    },
    getUser: async (id: string) => {
        return (await axios.get(`${apiUrl}users/${id}`)).data;
    },
    updateUser: async (body: User) => {
        return (await axios.patch(`${apiUrl}users`, body)).data;
    },
    addUser: async (body: User) => {
        return (await axios.post(`${apiUrl}users`, body)).data;
    },
    deleteUser: async (id: string) => {
        return (await axios.delete(`${apiUrl}users/${id}`)).data;
    },
};
