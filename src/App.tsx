import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonHeader, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import MapContainer from './components/myRoutes/MapContainer'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MonitorComponent from './components/MonitorPositionComponent';
import React from 'react';
import { MenuProvider } from './components/menuStuff/MenuProvider';
import Login from './components/login/Login';
import { AuthProvider } from './components/login/AuthProvider';
import Routes from './components/myRoutes/Routes';
import RoutesComponet from './components/myRoutes/RoutesComponent';
import { CurrentLocationContext, CurrentLocationProvider } from './components/currentLocationProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>   
        <Route exact path="/login" component={Login}></Route>
        <MenuProvider>
        <CurrentLocationProvider>
          <Route exact path="/home" component={Home} />
          <Route exact path="/routes" component={RoutesComponet} />
          <Route exact path="/" > <Redirect to="/login" />  </Route>
          <Route exact path="/monitor" component={MonitorComponent}></Route>
        </CurrentLocationProvider>
        </MenuProvider>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
