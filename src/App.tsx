import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import RoutesComponet from './components/myRoutes/RoutesComponent';
import { CurrentLocationProvider } from './components/currentLocationProvider';
import { PrivateRoute } from './components/login/PrivateRoute';
import MyDirection from './components/directions/MyDirection';
import DirectionComponent from './components/directions/DirectionComponent';
import RegionComponent from './components/regions/RegionComponent';
import SimulationComp from './components/simulations/SimulationComp';
import { SimulationProvider } from './components/simulations/SimulationProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>   
          <Route exact path="/login" component={Login}></Route>
          <MenuProvider>
            <CurrentLocationProvider>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/routes" component={RoutesComponet} />
              <PrivateRoute exact path="/monitor" component={MonitorComponent}/>
              <PrivateRoute exact path="/directions" component={DirectionComponent}/>
              <PrivateRoute exact path="/region" component={RegionComponent}/>
              <SimulationProvider>
                <PrivateRoute exact path="/simulations" component={SimulationComp}/>
              </SimulationProvider>
            </CurrentLocationProvider>
          </MenuProvider>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYRUwvMWxSjJgyG1MFleM4v692c3u0io4"></script>
  </IonApp>
);

export default App;
