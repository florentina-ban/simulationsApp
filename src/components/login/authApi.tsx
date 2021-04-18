import axios from 'axios';
import { config, withLogs } from './utils';

export const baseUrl = '192.168.100.2:8083/staySafe';
const authUrl = `http://${baseUrl}/login`;
const registerUrl = `http://${baseUrl}/register`;

export interface AuthProps {
  token: string;
}

export const login: (userName?: string, password?: string) => Promise<AuthProps> = (userName, password) => {
  return withLogs(axios.post(authUrl, { userName: userName, password }, config), 'login');
}

export const register: (username?: string, password?: string) => Promise<AuthProps> = (username, password) => {
  return withLogs(axios.post(registerUrl, { username, password }, config), 'signup');
}

export const authConfig = (token?: string) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
});
