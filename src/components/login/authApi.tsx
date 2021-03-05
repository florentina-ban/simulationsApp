import axios from 'axios';
import { config, withLogs } from './utils';

export const baseUrl = '192.168.100.2:3000';
const authUrl = `http://${baseUrl}/api/auth/login`;
const registerUrl = `http://${baseUrl}/api/auth/signup`;

export interface AuthProps {
  token: string;
}

export const login: (username?: string, password?: string) => Promise<AuthProps> = (username, password) => {
  return withLogs(axios.post(authUrl, { username, password }, config), 'login');
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
