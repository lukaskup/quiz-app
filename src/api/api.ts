import { UserQuizDTO } from './../models/UserQuiz';
import { Quiz } from './../models/Quiz';
import { User, UserAuth } from './../models/User';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

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

    //quizes
    getQuizes: async () => {
        return (await axios.get(`${apiUrl}quizes`)).data;
    },
    getQuiz: async (id: string) => {
        return (await axios.get(`${apiUrl}quizes/${id}`)).data;
    },
    updateQuiz: async (body: Quiz) => {
        return (await axios.patch(`${apiUrl}quizes`, body)).data;
    },
    addQuiz: async (body: Quiz) => {
        return (await axios.post(`${apiUrl}quizes`, body)).data;
    },
    deleteQuiz: async (id: string) => {
        return (await axios.delete(`${apiUrl}quizes/${id}`)).data;
    },

    //userQuizes
    getUserQuizes: async () => {
        return (await axios.get(`${apiUrl}usersQuizes`)).data;
    },
    getUserQuiz: async (id: string) => {
        return (await axios.get(`${apiUrl}usersQuizes/${id}`)).data;
    },
    updateUserQuiz: async (body: UserQuizDTO) => {
        return (await axios.patch(`${apiUrl}usersQuizes`, body)).data;
    },
    addUserQuiz: async (body: UserQuizDTO) => {
        return (await axios.post(`${apiUrl}usersQuizes`, body)).data;
    },
    deleteUserQuiz: async (id: string) => {
        return (await axios.delete(`${apiUrl}usersQuizes/${id}`)).data;
    },

    //auth
    login: async (body: UserAuth) => {
        return await axios.post(`${apiUrl}login`, body);
    },
    register: async (body: UserAuth) => {
        return await axios.post(`${apiUrl}register`, body);
    },
};
