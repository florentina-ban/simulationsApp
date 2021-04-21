import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext } from './AuthProvider';
import './login.css'
import { logIn, personAdd } from 'ionicons/icons';

interface LoginState {
  username?: string;
  password?: string;
  email?: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { isAuthenticated, login, register ,authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const [email, setEmail] = useState("");
  const { username, password } = state;
  const [registerOn, setResigter] = useState(false);
  const handleLogin = () => {
    console.log('handleLogin...');
    login?.(username, password);
  };
  const handleRegister = () => {
    console.log('handleRegister...');
    register?.(username, password);
  };
  
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
        <IonTitle>Stay Safe App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard id="loginCard">
          <IonCardTitle id="cardTitle">Login</IonCardTitle>
          <IonCardContent id="cardContent">
            { !registerOn &&
            <div>
            <IonInput
              placeholder="Username"
              value={username}
              onIonChange={e => setState({
                ...state,
                username: e.detail.value || ''
              })}
              />
            <IonInput
              placeholder="Password"
              value={password}
              onIonChange={e => setState({
                ...state,
                password: e.detail.value || ''
              })}
              />
              {authenticationError && (
                <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )} </div>
              }

          { registerOn &&
            <div>
            <IonInput
              placeholder="Username"
              value={username}
              onIonChange={e => setState({
                ...state,
                username: e.detail.value || ''
              })}
              />
            <IonInput
              placeholder="Password"
              value={password}
              onIonChange={e => setState({
                ...state,
                password: e.detail.value || ''
              })} />
              <IonInput
              placeholder="Email"
              value={email}
              onIonChange={e => setState({
                ...state,
                email: e.detail.value || ''
              })}
              />
              {authenticationError && (
                <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )} </div>
              }


              <div id="loginDiv">
              <IonFabButton id="loginButton" color="success" onClick={handleLogin}> <IonIcon icon={logIn}></IonIcon></IonFabButton>                     
              <IonFabButton id="registerButton" color="success" onClick={()=>setResigter(true)}> <IonIcon icon={personAdd}></IonIcon></IonFabButton>                      
              </div>            
            </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;