import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addToStorage, getFromStorage, clear as clearStorage, removeFromStorage } from './LocalStorageApi';
import {SimpleCoordProps} from './interfaces/SimpleCoordProps'
import { CoordonatesProps } from './interfaces/CoordonatesProps';

type UpdateCurrentLocationFn = (newCurrentLocation: CoordonatesProps) => void;

export interface AuthState {
    haveCurrentLocation: boolean,
    currentLocationError: string | null,
    currentLocation?: CoordonatesProps,
    updateCurrentLocation?: UpdateCurrentLocationFn
    
}

const initialState: AuthState = {
  haveCurrentLocation: false,
  currentLocationError: null,
};

export const CurrentLocationContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const CurrentLocationProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { haveCurrentLocation, currentLocationError } = state;
  const updateCurrentLocation = useCallback<UpdateCurrentLocationFn>(updateCurrentLocationActual,[])
  //useEffect(getCurrentLocationEffect, []);
  //useEffect(localStorageEffect, []);


  const value = { haveCurrentLocation, currentLocationError, updateCurrentLocation};
  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );
/*
  function localStorageEffect(){
    if (!haveCurrentLocation)
      return;
    
    getToken();
    async function getToken() {    
      getFromStorage('token').then(function (res) {
        if ( res.value && res.value.length>0){
            const { myValue } = JSON.parse(res.value);
            const token  = myValue;
            setState({
              ...state,
              token,
              pendingRegistration: false,
              isAuthenticated: true,
              isAuthenticating: false,  
          });
        }
      });
    }
  }
*/
  function updateCurrentLocationActual (newLoc: CoordonatesProps){
      console.log("update current location");
      setState({...state, haveCurrentLocation: true, currentLocation: newLoc})
  }
};
