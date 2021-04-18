import axios from 'axios';
import { CoordonatesProps } from './interfaces/CoordonatesProps';
import { clearCoords } from './LocalStorageApi';
import { ResponseProps, withLogs } from './login/utils';
import Region from './regions/RegionProps';
import { SimulationDayProps, SimulationProps } from './simulations/SimulationComp';

export const baseUrl = '192.168.100.2:8083/staySafe';
const addLocationsUrl = `http://${baseUrl}/addLocations`;
const addregionUrl = `http://${baseUrl}/addRegion`;
const coordsUrl = `http://${baseUrl}/coordsForUser`;
const initPointsUrl = `http://${baseUrl}/allInitCoords`;
const destinationsUrl =`http://${baseUrl}/allDestinations`;
const allSimUrl=`http://${baseUrl}/simulations`;
const simDaysUrl=`http://${baseUrl}/simDays`;


export const sendLocations: (list: CoordonatesProps[], token: string) => Promise<string> = (list: CoordonatesProps[], token:string) => {
  return updateLocalStorage(axios.post(addLocationsUrl, { coords: list }, addTokenConfig(token)), 'sendLocations');
}

export const sendBoundaries: (region: Region, token: string) => Promise<string> = (region: Region, token:string) => {
  return withLogs(axios.post(addregionUrl, region , addTokenConfig(token)), 'sendRegion');
}
export const addTokenConfig = (token?: string) => ({
  headers: {
    'Content-Type': 'application/json',
     'Authorization': token ,
  }
});

export const getRoutesForUser: (token: string, idUser: number) => Promise<CoordonatesProps[]> = (token: string, idUser: number) => {
  return withLogs(axios.post(coordsUrl,{userId: idUser},addTokenConfig(token)),'getRoute');
}

export const getAllInitPoints: (token: string, idUser: number) => Promise<CoordonatesProps[]> = (token: string, idUser: number) => {
  return withLogs(axios.get(initPointsUrl,addTokenConfig(token)),'getInitPoints');
}

export const getAllDestinations: (token: string, idUser: number) => Promise<CoordonatesProps[]> = (token: string, idUser: number) => {
  return withLogs(axios.get(destinationsUrl,addTokenConfig(token)),'getAllDestinations');
}

export const getAllSimulations: (token: string) => Promise<SimulationProps[]> = (token: string) => {
  return withLogs(axios.post(allSimUrl, addTokenConfig(token)),'getAllSimulations');
}

export const getSimulationDays: (token: string, simId:number) => Promise<SimulationDayProps[]> = (token: string, simId: number) => {
  return withLogs(axios.post(simDaysUrl,{id: simId},addTokenConfig(token)),'getSimulationDays');
}

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

