import axios from 'axios';
import { useContext } from 'react';
import { CoordonatesProps } from './interfaces/CoordonatesProps';
import { clearCoords } from './LocalStorageApi';
import { AuthContext } from './login/AuthProvider';
import { ResponseProps } from './login/utils';

export const baseUrl = '192.168.100.2:8080/staySafe';
const addLocationsUrl = `http://${baseUrl}/addLocations`;


export const sendLocations: (list: CoordonatesProps[], token: string) => Promise<string> = (list: CoordonatesProps[], token:string) => {
  return updateLocalStorage(axios.post(addLocationsUrl, { coords: list }, addTokenConfig(token)), 'sendLocations');
}

export const addTokenConfig = (token?: string) => ({
  headers: {
    'Content-Type': 'application/json',
     'Authorization': token ,
  }
});

export function updateLocalStorage<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
  console.log(`${fnName} - started`);
  return promise
    .then(res => {
      console.log(`${fnName} - succeeded`);
      clearCoords();
      return Promise.resolve(res.data);
    })
    .catch(err => {
      console.log(`${fnName} - failed`);
      return Promise.reject(err);
    });
}
export const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};