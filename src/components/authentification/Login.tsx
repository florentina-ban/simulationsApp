import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton,IonIcon, IonInput,IonPage, IonSelect, IonSelectOption, IonText} from '@ionic/react';
import { AuthContext } from './AuthProvider';
import './login.css'
import { logInOutline, personAddOutline } from 'ionicons/icons';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import AlertComponent from '../toolbar/AlertComponent';
import { isNull } from 'node:util';

interface LoginState {
  username?: string;
  password?: string;
  email?: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { isAuthenticated, login, register, authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { username, password, email }= state;
  const [registerOn, setResigter] = useState(false);
  const [message, setMessage]= useState("")
  const handleLogin = () => {
    console.log('handleLogin...');
    login?.(username, password);
  };

  const handleRegister = () => {
    register?.(username, password, email);
  };

  useEffect(()=>{
    console.log("ath error: ")
    console.log(authenticationError)
    setMessage( (authenticationError ) ? "UserName or password incorrect" : "")},[authenticationError])
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const updateMessage = (mes:string) =>{
    setMessage(mes)
}
  return (
    <IonPage>
      <ToolbarComponent/>
       <AlertComponent message={message} errorMes={true} updateMessage={updateMessage}/> 
    
      <IonContent>
        <IonCard id="loginCard">
          {!registerOn &&
          <IonCardTitle id="cardTitle">Login</IonCardTitle>
          }
        {registerOn &&
          <IonCardTitle id="cardTitle">Register</IonCardTitle>
          }

          <IonCardContent id="cardContent">
            { !registerOn &&
            <div>
              <IonInput placeholder="Username" value={username} onIonChange={e => setState({
                  ...state,
                  username: e.detail.value || ''
                })}
                />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setState({
                  ...state,
                  password: e.detail.value || ''
                })}
                />
              {/* {authenticationError && (
                <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )}  */}
              <div className="loginDiv">
                <IonFabButton id="loginButton" color="warning" onClick={handleLogin}> <IonIcon icon={logInOutline}></IonIcon></IonFabButton>                     
                <IonFabButton id="registerButton" color="warning" onClick={()=>setResigter(true)}> <IonIcon icon={personAddOutline}></IonIcon></IonFabButton>                      
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
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setState({
                  ...state,
                  password: e.detail.value || ''
                })} />
              <IonInput placeholder="Email" value={email} onIonChange={e =>{ 
                console.log(e.detail.value);
                setState({
                  ...state,
                  email: e.detail.value || ''
                });
              } }
                />
              {/* {authenticationError && (
                  <IonText id="errorText">{'Failed to authenticate: '+authenticationError.message }</IonText>
              )}  */}

              <div className="loginDiv">
                <IonFabButton id="loginButton" color="warning" onClick={()=>setResigter(false)}> <IonIcon icon={logInOutline}></IonIcon></IonFabButton>                     
                <IonFabButton id="registerButton" color="warning" onClick={()=>handleRegister()}> <IonIcon icon={personAddOutline}></IonIcon></IonFabButton>                      
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