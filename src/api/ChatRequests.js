import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api/' });

export const createChat = data => API.post('/chat', data);

export const userChats = id => API.get(`/chat/${id}`);
