import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonLoading, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext } from './AuthProvider';
import './login.css'
import { logIn, personAdd } from 'ionicons/icons';

interface LoginState {
  username?: string;
  password?: string;
  email?: string;
  infected?: number;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { isAuthenticated, login, register ,authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { username, password, email, infected } = state;
  const [registerOn, setResigter] = useState(false);
  const handleLogin = () => {
    console.log('handleLogin...');
    login?.(username, password);
  };
  const handleRegister = () => {
    console.log('handleRegister...');
    register?.(username, password, email, infected);
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
              <IonInput placeholder="Username" value={username} onIonChange={e => setState({
                  ...state,
                  username: e.detail.value || ''
                })}
                />
              <IonInput placeholder="Password" value={password} onIonChange={e => setState({
                  ...state,
                  password: e.detail.value || ''
                })}
                />
              {authenticationError && (
                <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )} 
              <div className="loginDiv">
                <IonFabButton id="loginButton" color="success" onClick={handleLogin}> <IonIcon icon={logIn}></IonIcon></IonFabButton>                     
                <IonFabButton id="registerButton" color="success" onClick={()=>setResigter(true)}> <IonIcon icon={personAdd}></IonIcon></IonFabButton>                      
              </div>  
            </div>  
          }

          { registerOn &&
            <div>
              <IonInput placeholder="Username" value={username} onIonChange={e => setState({
                  ...state,
                  username: e.detail.value || ''
                })}
                />
              <IonInput placeholder="Password" value={password} onIonChange={e => setState({
                  ...state,
                  password: e.detail.value || ''
                })} />
              <IonInput placeholder="Email" value={email} onIonChange={e => setState({
                  ...state,
                  email: e.detail.value || ''
                })}
                />
              <IonSelect className="addMarginClass" placeholder="infected?" value={infected} onIonChange={(e)=>{setState({...state, infected: e.detail.value})}}>
                <IonSelectOption value={0}>All Good</IonSelectOption>
                <IonSelectOption value={1}>Got Infected</IonSelectOption>
                <IonSelectOption value={2}>Already behind</IonSelectOption>
              </IonSelect>
              {authenticationError && (
                  <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )} 

              <div className="loginDiv">
                <IonFabButton id="loginButton" color="success" onClick={()=>setResigter(false)}> <IonIcon icon={logIn}></IonIcon></IonFabButton>                     
                <IonFabButton id="registerButton" color="success" onClick={()=>handleRegister()}> <IonIcon icon={personAdd}></IonIcon></IonFabButton>                      
              </div>  
            </div>
          }      
            </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;