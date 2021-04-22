import axios from 'axios';
import { baseUrl } from '../../utils/ServerApi';
import { config, withLogs } from '../../utils/utils';

const authUrl = `http://${baseUrl}/login`;
const registerUrl = `http://${baseUrl}/register`;

export interface AuthProps {
  token: string;
  infected: number;
}

export const login: (userName?: string, password?: string) => Promise<AuthProps> = (userName, password) => {
  return withLogs(axios.post(authUrl, { userName: userName, password }, config), 'login');
}

export const register: (username?: string, password?: string, email?: string, infected?: number) => Promise<AuthProps> = (username, password, email, infected) => {
  console.log("inside authAPi: "+username+" "+password+" "+email+" "+infected)
  return withLogs(axios.post(registerUrl, { userName:username, password, email, infected }, config), 'signup');
}


