import { CreateAnimation, IonItem, IonList,IonModal, IonTitle} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { menuController } from '@ionic/core';
import '../../pages/Home.css';
import { useHistory } from 'react-router';
import { MenuContext } from './MenuProvider';
import { createAnimation, Animation } from '@ionic/core';
import { AuthContext } from '../login/AuthProvider';

const MenuComponent: React.FC = () => {
  const { isMenuOpened, updateMenuState} = useContext(MenuContext);
  const { logout } = useContext(AuthContext);
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

  const addRegion = () => {
    updateMenuState && updateMenuState(false);
    history.push({pathname: "/region"})
  }

  const goToSimulations = () => {
    updateMenuState && updateMenuState(false);
    history.push({pathname: "/simulations"})
  }

  const logOut = () => {
    localStorage.clear();
    if (logout)
      logout();
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
        { offset: 1, transform: 'translateY(-50px)'},
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
        <IonItem key="ShowLocationMenuItem" onClick={goToMonitor}>My state</IonItem>
        <IonItem key="ShowRoutesMenuItem" onClick={goToRoutes}>My routes</IonItem>
        <IonItem key="AddRegionMenuItem" onClick={addRegion}>Add region</IonItem>
        <IonItem key="SimulationMenuItem" onClick={goToSimulations}>Simulations</IonItem>
        <IonItem key="LogoutItem" onClick={logOut}>Logout</IonItem>
        <IonItem key="CloseMenuItem" onClick={closeMenu}>Close menu</IonItem>
      </IonList>
    </IonModal>
  );
};

export default MenuComponent;
