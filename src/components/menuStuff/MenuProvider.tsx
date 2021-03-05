import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

type UpdateMenuState = (isOpened: boolean) => void;

export interface MenuState {
    isMenuOpened: boolean,
    updateMenuState?: UpdateMenuState
}

const initialState: MenuState = {
    isMenuOpened: false
};

export const MenuContext = React.createContext<MenuState>(initialState);

interface MenuProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [ state, setState ] = useState<MenuState>(initialState);
  const { isMenuOpened, updateMenuState } = state;
  const update = useCallback(updateMenuStateActual,[])
  //useEffect(getCurrentLocationEffect, []);
  //useEffect(localStorageEffect, []);


  const value = {isMenuOpened, updateMenuState: update};
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );

  function updateMenuStateActual (isOpened: boolean){
      console.log("update menu state");
      setState({...state, isMenuOpened: isOpened})
  }
};
