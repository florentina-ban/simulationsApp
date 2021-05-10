import { IonButton, IonCard, IonContent, IonImg, IonPage } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './Home.css';
import { RouteComponentProps, useHistory } from 'react-router';
import MenuComponent from '../components/menuStuff/MenuComponent';
import ToolbarComponent from '../components/menuStuff/ToolbarComponent';

const Home: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();

  const goToMonitor = () => {
    history.push("/monitor")
  }

  const goToRoutes = () => {
    history.push( { pathname: "/routes"  })
  }
  const goToSimulations = () => {
    history.push({pathname: "/simulations"})
  }

  return (
    <IonPage >
      <ToolbarComponent></ToolbarComponent>
      <MenuComponent/> 
      <IonContent>
        <IonCard class="locationCard" onClick={goToMonitor}></IonCard>
        <IonCard id="routeCard" onClick={goToRoutes}></IonCard>
        <IonCard id="simCard" onClick={goToSimulations}></IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
