import { IonItem, IonList,IonModal} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { menuController } from '@ionic/core';
import '../../pages/Home.css';
import { useHistory } from 'react-router';
import { MenuContext } from './MenuProvider';

const MenuComponent: React.FC = () => {
  const { isMenuOpened, updateMenuState} = useContext(MenuContext);
    const history = useHistory();

  const openMenu = () => {
    console.log("open")
    menuController.open()
  }

  const goToMonitor = () => {
    menuController.toggle()
    history.push("/monitor")
  }

  const goToRoutes = () => {
   
    menuController.toggle()
    history.push( { pathname: "/routes"  })
    
  }

  const closeMenu = () => {
    if (updateMenuState)
      updateMenuState(false);
  }

console.log("compiling: "+isMenuOpened)
  return (
      <IonModal isOpen={isMenuOpened} id="modalMenu">
           <IonList>
                 <IonItem key="ShowRoutesMenuItem" onClick={goToRoutes}>Show my routes</IonItem>
                 <IonItem key="ShowLocationMenuItem" onClick={goToMonitor}>Show current location</IonItem>
                 <IonItem key="ZoneMonitorMenuItem">Zone Monitor</IonItem>
                 <IonItem key="CloseMenuItem" onClick={closeMenu}>Close menu</IonItem>
            </IonList>

      </IonModal>
  );
};

export default MenuComponent;
