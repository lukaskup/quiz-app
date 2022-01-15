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
    updateUser: async (id: string, body: User) => {
        console.log(id);
    },
};
