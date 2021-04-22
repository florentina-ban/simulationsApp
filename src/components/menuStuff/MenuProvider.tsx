import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../login/AuthProvider';

type UpdateMenuState = (isOpened: boolean) => void;

export interface MenuState {
    isMenuOpened: boolean,
    updateMenuState?: UpdateMenuState,
    isInfectedOpened: boolean,
    updateInfectedState?: UpdateMenuState

}

const initialState: MenuState = {
    isMenuOpened: false,
    isInfectedOpened: false
};

export const MenuContext = React.createContext<MenuState>(initialState);

interface MenuProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [ state, setState ] = useState<MenuState>(initialState);
  const { isMenuOpened, updateMenuState, isInfectedOpened, updateInfectedState } = state;
  const { token }= useContext(AuthContext);
  const updateMenu = useCallback(updateMenuStateActual,[])
  const updateInfected = useCallback(updateInfectedActual,[])



  const value = {isMenuOpened, updateMenuState: updateMenu, isInfectedOpened, updateInfectedState: updateInfected};
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );

  function updateMenuStateActual (isOpened: boolean){
      console.log("update menu state "+isOpened.valueOf());
      setState({...state, isMenuOpened: isOpened})
  }

  function updateInfectedActual (isOpened: boolean){
    console.log("update inf state "+isOpened.valueOf());
    setState({...state, isInfectedOpened: isOpened})
}
};
