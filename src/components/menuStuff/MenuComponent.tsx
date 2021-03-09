import { CreateAnimation, IonItem, IonList,IonModal, IonTitle} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { menuController } from '@ionic/core';
import '../../pages/Home.css';
import { useHistory } from 'react-router';
import { MenuContext } from './MenuProvider';
import { createAnimation, Animation } from '@ionic/core';

const MenuComponent: React.FC = () => {
  const { isMenuOpened, updateMenuState} = useContext(MenuContext);
    const history = useHistory();

  const goToMonitor = () => {
    updateMenuState && updateMenuState(false)
    history.push("/monitor")
  }

  const goToRoutes = () => {
    updateMenuState && updateMenuState(false)
    history.push( { pathname: "/routes"  })
  }

  const closeMenu = () => {
    updateMenuState && updateMenuState(false)
  }

  const getDirections = () => {
    updateMenuState && updateMenuState(false);
    history.push({pathname: "/directions"})
  }

  const enterAnimation = (baseEl: any) => {
    const backdropAnimation = createAnimation()
      .addElement(baseEl.querySelector('ion-backdrop')!)
      // .fromTo('opacity', '0.01', 'var(--backdrop-opacity)')
      // .fromTo('transform', 'translateY(-600px)', 'translateY(0px)' )
      // .fromTo('opacity', '0', '1' );
 

    const wrapperAnimation = createAnimation()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, transform: 'translateY(-500px)' },
        { offset: 0, opacity: '1'},
        { offset: 1, transform: 'translateY(0px)'},
        { offset: 1, opacity: 1}
      ]);
    
    return createAnimation()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(800)
    .addAnimation([ wrapperAnimation]);
}

const leaveAnimation = (baseEl: any) => {
  return enterAnimation(baseEl).direction('reverse');
}

  return (
    <IonModal isOpen={isMenuOpened} id="modalMenu" enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
      <IonList>
        <IonItem key="ShowLocationMenuItem" onClick={goToMonitor}>Current location</IonItem>
        <IonItem key="ShowRoutesMenuItem" onClick={goToRoutes}>My routes</IonItem>
        <IonItem key="ZoneMonitorMenuItem">Zone Monitor</IonItem>
        <IonItem key="GetDirectionMenuItem"onClick={getDirections}>Directions</IonItem>
        <IonItem key="CloseMenuItem" onClick={closeMenu}>Close menu</IonItem>
      </IonList>
    </IonModal>
  );
};

export default MenuComponent;
