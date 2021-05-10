import axios from 'axios';
import { CoordonatesProps } from '../components/interfaces/CoordonatesProps';
import { clearCoords } from './LocalStorageApi';
import { ResponseProps, withLogs } from './utils';
import Region from '../components/regions/RegionProps';
import {SimulationDayProps, SimulationFull, SimulationProps } from '../components/simulations/SimulationComp';

export const baseUrl = '192.168.100.2:8083/staySafe';
//export const baseUrl = '35.232.204.158:3389/staySafe';
const addLocationsUrl = `http://${baseUrl}/addLocations`;
const addregionUrl = `http://${baseUrl}/addRegion`;
const coordsUrl = `http://${baseUrl}/coordsForUser1`;
const initPointsUrl = `http://${baseUrl}/allInitCoords`;
const destinationsUrl =`http://${baseUrl}/allDestinations`;
const allSimUrl=`http://${baseUrl}/simulations`;
const simDaysUrl=`http://${baseUrl}/simDays`;
const delSimUrl=`http://${baseUrl}/deleteSim`;
const startSimUrl=`http://${baseUrl}/startSimulation`;
const updateStateUrl=`http://${baseUrl}/updateState`;


export const sendLocations: (list: CoordonatesProps[], token: string) => Promise<string> = (list: CoordonatesProps[], token:string) => {
  return updateLocalStorage(axios.post(addLocationsUrl, { coords: list }, addTokenConfig(token)), 'sendLocations');
}

export const sendBoundaries: (region: Region, token: string) => Promise<string> = (region: Region, token:string) => {
  return withLogs(axios.post(addregionUrl, region , addTokenConfig(token)), 'sendRegion');
}
export const addTokenConfig = (token: string) => ({
  headers: {
    Authorization: token,
    'Content-Type': 'application/json'
  }
});

export const getRoutesForUser: (token: string) => Promise<CoordonatesProps[]> = (token: string) => {
  console.log("inside send function- token: "+token)
  return withLogs(axios.post(coordsUrl,{},addTokenConfig(token)),'getRoute');
}
export const getRoutesForUser1: (token: string, start: number, end: number) => Promise<CoordonatesProps[]> = (token: string, start: number, end: number) => {
  console.log("inside send function- token: "+token)
  return withLogs(axios.post(coordsUrl,{start: start, end: end},addTokenConfig(token)),'getRoute');
}
export const getAllInitPoints: (token: string, idUser: number) => Promise<CoordonatesProps[]> = (token: string, idUser: number) => {
  return withLogs(axios.get(initPointsUrl,addTokenConfig(token)),'getInitPoints');
}

export const getAllDestinations: (token: string, idUser: number) => Promise<CoordonatesProps[]> = (token: string, idUser: number) => {
  return withLogs(axios.get(destinationsUrl,addTokenConfig(token)),'getAllDestinations');
}

export const getAllSimulations: (token: string) => Promise<SimulationProps[]> = (token: string) => {
  console.log(addTokenConfig(token))
  return withLogs(axios.post(allSimUrl,{}, addTokenConfig(token)),'getAllSimulations');
}

export const getSimulationDays: (token: string, simId:number) => Promise<SimulationDayProps[]> = (token: string, simId: number) => {
  return withLogs(axios.post(simDaysUrl,{id: simId},addTokenConfig(token)),'getSimulationDays');
}

export const deleteSim: (token: string, simId:number) => Promise<SimulationProps[]> = (token: string, simId: number) => {
  return withLogs(axios.post(delSimUrl,{id: simId}, addTokenConfig(token)),'deleteSimulation');
}

export const startSim: (token: string, simDays: number, infNo: number) => Promise<number> = (token: string, simDays: number, infNo: number) => {
  return withLogs(axios.post(startSimUrl,{regionId: 14, infOnStart:infNo, dayNo: simDays}, addTokenConfig(token)),'startSimulation');
}

export const updateUserState: (token: string, infState: number) => Promise<number> = (token: string, infState: number) => {
  console.log("in ServerApi")
  return withLogs(axios.post(updateStateUrl, { id: infState }, addTokenConfig(token)),'updateState');
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

