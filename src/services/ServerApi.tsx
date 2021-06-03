import axios from 'axios';
import { CoordonatesProps } from '../utils/CoordonatesProps';
import { clearCoords } from './LocalStorageApi';
import { ResponseProps, withLogs } from '../utils/utils';
import Region from '../components/regions/RegionProps';
import {SimulationDayProps, SimulationProps } from '../components/view/SimulationComp';

//export const baseUrl = '192.168.100.2:8083/staySafe';
export const baseUrl = '34.134.243.62:3389/staySafe';
const addLocationsUrl = `http://${baseUrl}/addLocations`;
const addregionUrl = `http://${baseUrl}/addRegion`;
const coordsUrl = `http://${baseUrl}/coordsForUser1`;
const initPointsUrl = `http://${baseUrl}/allInitCoords`;
const destinationsUrl =`http://${baseUrl}/allDestinations`;
const allSimUrl=`http://${baseUrl}/simulations`;
const simDaysUrl=`http://${baseUrl}/simDays`;
const delSimUrl=`http://${baseUrl}/deleteSim`;
const startSimUrl=`http://${baseUrl}/startSimulation`;
const updateScenarioLUrl =`http://${baseUrl}/scenarios`;
const updateScenarioLimUrl =`http://${baseUrl}/scenarioLimits`;
const getSimToCompareUrl = `http://${baseUrl}/compare`;


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

export const startSim: (token: string, simDays: number, infNo: number,pop: number, mortality: number, immunity: number, maskEff: number) => Promise<number> = (token: string, simDays: number, infNo: number, pop: number, mortality: number, immunity: number, maskEff: number) => {
  return withLogs(axios.post(startSimUrl,{regionId: 14, infOnStart:infNo, dayNo: simDays, noUsersToPlayWith:pop, mortality, immunity, maskEfficiency: maskEff}, addTokenConfig(token)),'startSimulation');
}

export const updateScenariosL: (token: string, green: string, yellow: string, red: string) => Promise<string> = (token: string, green: string, yellow: string, red: string) => {
  return withLogs(axios.post(updateScenarioLUrl,{green, yellow, red}, addTokenConfig(token)),'update scenarios');
}
export const updateScenariosLim: (token: string, green: number, yellow: number, red: number) => Promise<string> = (token: string, green: number, yellow: number, red: number) => {
  return withLogs(axios.post(updateScenarioLimUrl,{green, yellow, red}, addTokenConfig(token)),'update scenario limits');
}
export const getSimToCompare: (token: string, ids: number[]) => Promise<SimulationDayProps[][]> = (token: string, ids: number[]) =>{
  return withLogs(axios.post(getSimToCompareUrl, {ids: ids}, addTokenConfig(token)),'compare simulations');
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

