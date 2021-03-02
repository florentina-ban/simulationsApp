import { IonButton, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { menuController } from '@ionic/core';
import './Home.css';
import { RouteComponentProps, useHistory } from 'react-router';

const Home: React.FC<RouteComponentProps> = () => {
const history = useHistory();
  const openMenu = () => {
    console.log("open")
    menuController.open()
  }

  const goToMonitor = () => {
    menuController.toggle()
    history.push("/monitor")
  }

  const goToMap = () => {
   
    menuController.toggle()
    history.push( { pathname: "/map" , state: { loc: {lat:20,lng:20 } } })
    //location.state = { loc: {lat:20,lng:20 } } 
    
  }

console.log("compiling")
  return (
      <IonContent>
        <IonSplitPane contentId="main" id="mainMenuPane">
          {/*--  the side menu  --*/}
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem onClick={goToMap}>Map</IonItem>
                <IonItem>Show my routes</IonItem>
                <IonItem onClick={goToMonitor}>Show current location</IonItem>
              </IonList>
            </IonContent>
          </IonMenu>

          {/*-- the main content --*/}
          <IonPage id="main">
            <IonHeader >
              <IonToolbar >
                <IonTitle id="mainHeader">GeoApp_StaySafe</IonTitle>
              </IonToolbar>
            </IonHeader>
          </IonPage>
        </IonSplitPane>

    </IonContent>
  );
};

export default Home;
