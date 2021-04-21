import { IonPage } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './Home.css';
import { RouteComponentProps, useHistory } from 'react-router';
import MenuComponent from '../components/menuStuff/MenuComponent';
import ToolbarComponent from '../components/menuStuff/ToolbarComponent';
import InfectedComponent from '../components/menuStuff/InfectedComponent';

const Home: React.FC<RouteComponentProps> = (props) => {
  //const { isMenuOpened, updateMenuState} = useContext(MenuContext)

console.log("render home")
  return (
    <IonPage >
      <ToolbarComponent></ToolbarComponent>
      <MenuComponent/> 
      <InfectedComponent/>
    </IonPage>
  );
};

export default Home;
