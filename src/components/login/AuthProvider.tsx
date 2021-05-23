import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { login as loginApi } from './authApi';
import { register as registerApi } from './authApi';
import { getFromStorage, clear as clearStorage, addValueToStorage } from '../../utils/LocalStorageApi';


type LoginFn = (username?: string, password?: string) => void;
type LogoutFn = () => void;
type RegisterFn = (username?: string, password?: string, email?: string, infected?: number) => void;
type ChangeInfState = (infState: number) => void;


export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isRegistering: boolean;
  isRegistered: boolean;
  registerError: Error | null;
  login?: LoginFn;
  register?: RegisterFn;
  logout? : LogoutFn;
  changeInfState? : ChangeInfState;
  pendingAuthentication?: boolean;
  pendingRegistration?:boolean;
  username?: string;
  password?: string;
  email?: string;
  token: string;
  infected: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  authenticationError: null,
  isRegistered: false,
  isRegistering: false,
  registerError: null,
  pendingAuthentication: false,
  pendingRegistration: false,
  token: '',
  infected: -1,
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { isAuthenticated, authenticationError,isRegistered, isRegistering, registerError, pendingAuthentication,pendingRegistration, token, infected} = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const register = useCallback<RegisterFn>(registerCallback, []);
  const logout = useCallback<LogoutFn>(logoutCallback, []);
  const chState = function changeStateCallback(newS: number){
    setState({
      ...state,
      infected: newS,
      isAuthenticated: true
    });
    addValueToStorage("infected", newS);
  }

  useEffect(authenticationEffect, [pendingAuthentication]);
  useEffect(registerEffect, [pendingRegistration]);
  useEffect(localStorageEffect, []);

  const value = { isAuthenticated, isRegistered, isRegistering, registerError, login, logout, register, changeInfState: chState, authenticationError, token, infected };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  function loginCallback(username?: string, password?: string): void {
    console.log('login');
    setState({
      ...state,
      pendingAuthentication: true,
      username,
      password
    });
  }

  function registerCallback(username?: string, password?: string, email?: string): void {
    console.log('register');
    setState({
      ...state,
      pendingRegistration: true,
      username,
      password,
      email,
    });   
  }
  
  function logoutCallback(): void {
    console.log('logout');
    clearStorage();
    setState({
      isAuthenticated: false,
      authenticationError: null,
      isRegistered: false,
      isRegistering: false,
      registerError: null,
      pendingAuthentication: false,
      pendingRegistration: false,
      token: '',
      infected: 0,
    });   
  }

  function localStorageEffect(){
    if (isAuthenticated)
      return;
    getToken();
    async function getToken() {    
      getFromStorage('token').then(function (res) {
        if ( res.value && res.value.length>0){
            const { myValue } = JSON.parse(res.value);
            const token_get = myValue;
            console.log("inside local storage effect - got token: "+token_get);
            getFromStorage('infected').then(function (res) {
              if ( res.value && res.value.length>0){
                  const { myValue } = JSON.parse(res.value);
                  const infected = +myValue;
                  console.log("inside local storage effect - got infected: "+infected);
                  setState({
                    ...state,
                    infected: infected,
                    token: token_get,
                    pendingAuthentication: false,
                    isAuthenticated: true
                });
        }
      });
    }
  });
}
  }

  function registerEffect() {
    let canceled = false;
    register();
    return () => {
      canceled = true;
    }

    async function register() {
      if (! pendingRegistration) {
        console.log('register, !pendingRegistration, return');
        return;
      }
      try {
        console.log('register...');
        setState({
          ...state,
          isRegistering: true,
        });
        const { username, password, email, infected } = state;
        const { token } = await registerApi(username, password, email, infected);
        if (canceled) {
          return;
        }
        console.log('register succeeded');
        addValueToStorage('token', token);
     
        setState({
          ...state,
          token,
          pendingRegistration: false,
          isAuthenticated: true,
          isRegistering: false,
          
        });
      } catch (error) {
        if (canceled) {
          return;
        }
        console.log('register failed');
        setState({
          ...state,
          registerError: error,
          pendingRegistration: false,
          isRegistering: false,
        });
      }
    }
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    }

    async function authenticate() {
      if (!pendingAuthentication) {
        console.log('authenticate, !pendingAuthentication, return');
        return;
      }
      try {   
        console.log('authenticate...');
        const token_storage = (await getFromStorage("token")).value;
        const infected_storage = (await getFromStorage("infected")).value;
        console.log("got from storage: "+token_storage+" infected: "+infected_storage);
        if (token_storage && token_storage.length>0){
            console.log('authenticate succeeded');
          setState({
            ...state,
            token: JSON.parse(token_storage).myValue,
            infected: +(JSON.parse(infected_storage!).myValue),
            pendingAuthentication: false,
            isAuthenticated: true,
            });
          }
          else{
            const { username, password } = state;
            const { token, infected } = await loginApi(username, password);
            if (canceled) {
              return;
            }
            console.log('authenticate succeeded from server: '+token);
            addValueToStorage('token',token);
            addValueToStorage('infected', infected);
         
            setState({
              ...state,
              token,
              infected,
              pendingAuthentication: false,
              isAuthenticated: true,
            });
            }
        }catch (error) {
          if (canceled) {
            return;
          }
          console.log('authenticate failed');
          setState({
            ...state,
            authenticationError: error,
            pendingAuthentication: false,
          });
        }
    }
  }
}


