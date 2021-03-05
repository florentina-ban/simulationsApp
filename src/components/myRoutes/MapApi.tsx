import axios from 'axios';
import { CoordonatesProps } from '../interfaces/CoordonatesProps';
import { coordUrl, locationUrl } from './MyMapKey'

interface ResponseProps<T> {
  data: T;
}


function withLogs<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    console.log(`${fnName} - started`);
    return promise
      .then(res => {
        console.log(`${fnName} - succeeded`);
        return Promise.resolve(res.data);
      })
      .catch(err => {
        console.log(`${fnName} - failed`);
        return Promise.reject(err);
      });
  }
  
  
export const getCurrentLocation: () => Promise<CoordonatesProps> = () => {
    return withLogs(axios.post(coordUrl), 'getCurrentCoordonates');
  }

 