import { IonPage } from '@ionic/react';
import React, { useContext, useState } from 'react';
import './Home.css';
import { RouteComponentProps, useHistory } from 'react-router';
import MenuComponent from '../components/menuStuff/MenuComponent';
import ToolbarComponent from '../components/menuStuff/ToolbarComponent';
import { MenuContext } from '../components/menuStuff/MenuProvider';

const Home: React.FC<RouteComponentProps> = (props) => {
  const { isMenuOpened, updateMenuState} = useContext(MenuContext)


  return (
    <IonPage >
      <ToolbarComponent></ToolbarComponent>
      {isMenuOpened && 
      <MenuComponent/> 
      }
    </IonPage>
  );
};

export default Home;
