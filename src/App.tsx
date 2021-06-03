import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import React from 'react';
import Login from './components/authentification/Login';
import { AuthProvider } from './components/authentification/AuthProvider';
import { PrivateRoute } from './components/authentification/PrivateRoute';
import SimulationComp from './components/view/SimulationComp';
import { SimulationProvider } from './components/view/SimulationProvider';
import AddSimulationComp from './components/create/AddSimulationComponent';
import CompareComp from './components/compare/CompareComp';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>   
          <Route exact path="/login" component={Login}></Route>
              <Route exact path="/" render={() => <Redirect to="/create" />} />
              <PrivateRoute exact path="/create" component={AddSimulationComp} />
              <PrivateRoute exact path="/view" component={SimulationComp}/>
              <PrivateRoute exact path="/compare" component={CompareComp}/>
              <SimulationProvider>
                <PrivateRoute exact path="/simulations" component={SimulationComp}/>
              </SimulationProvider>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
