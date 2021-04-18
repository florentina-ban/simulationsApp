import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

  const value = { haveCurrentLocation, currentLocationError, updateCurrentLocation};
  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );

  function updateCurrentLocationActual (newLoc: CoordonatesProps){
      console.log("update current location");
      setState({...state, haveCurrentLocation: true, currentLocation: newLoc})
  }
};
