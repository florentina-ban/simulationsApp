import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SimulationProps } from './SimulationComp';
import { AuthContext } from '../login/AuthProvider';
import { getAllSimulations } from '../ServerApi';


type getSimFn = () => void;

export interface SimState {
  getSimError: Error | null;
  gotSimulations: boolean;
  gettingSimulations: boolean;
  allSimulations?: SimulationProps[];
  getSim?: getSimFn;
}

const initialState: SimState = {
    getSimError: null,
    gotSimulations: false,
    gettingSimulations: false
};

export const SimContext = React.createContext<SimState>(initialState);

interface SimProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const SimulationProvider: React.FC<SimProviderProps> = ({ children }) => {
  const [state, setState] = useState<SimState>(initialState);
  const { getSimError, gotSimulations, gettingSimulations, allSimulations} = state;
  const getSim = useCallback<getSimFn>(getSimCallback, []);
  const {token} = useContext(AuthContext);
  useEffect(getSimulationsEfect, [gettingSimulations])
 // useEffect(localStorageEffect, []);

  const value = { getSimError, gotSimulations, gettingSimulations, getSim, allSimulations};
  return (
    <SimContext.Provider value={value}>
      {children}
    </SimContext.Provider>
  );

  function getSimCallback(): void {
    console.log('getSimulationsCallBack');
    setState({
      ...state,
     gettingSimulations: true
    });
  }

  function getSimulationsEfect() {
        getSimulations();

        async function getSimulations(){
        if (! gettingSimulations) {
            console.log('register, !pendingRegistration, return');
            return;
          }
         
      try {
        console.log('getting all simulations...');
        const sims: SimulationProps[] = await getAllSimulations(token);
        console.log('get all simulations succeded');
        setState({
          ...state,
          gotSimulations: true,
          gettingSimulations: false,
          allSimulations: sims
          
        });
      } catch (error) {
        console.log('get all simulations failed');
        setState({
          ...state,
          getSimError: error,
          gettingSimulations: false,
          gotSimulations: false
        });
      }
    }
}
}
      

