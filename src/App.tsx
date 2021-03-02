import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonHeader, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import MapContainer from './components/googleMaps/MapContainer'

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
import { CurrentLocationProvider } from './components/currentLocationProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <CurrentLocationProvider>
        <Route exact path="/home" component={Home} />
        <Route exact path="/map" component={MapContainer} />
        <Route exact path="/" > <Redirect to="/home" />  </Route>
        <Route exact path="/monitor" component={MonitorComponent}></Route>
        </CurrentLocationProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
