import { IonItem, IonList,IonModal} from '@ionic/react';
import React, { useContext} from 'react';
import '../../pages/Home.css';
import { createAnimation} from '@ionic/core';
import { MenuContext } from './MenuProvider';
import { AuthContext } from '../login/AuthProvider';
const infState = ['All Good','Got Infected',"It's all behind"]

const InfectedComponent: React.FC = () => {
  const {isInfectedOpened, updateInfectedState}= useContext(MenuContext);
  const {token, infected, changeInfState} = useContext(AuthContext);
  const enterAnimation = (baseEl: any) => {
    const backdropAnimation = createAnimation()
      .addElement(baseEl.querySelector('ion-backdrop')!)
  
    const wrapperAnimation = createAnimation()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, transform: 'translateY(-500px)' },
        { offset: 0, opacity: '1'},
        { offset: 1, transform: 'translateY(-10px)'},
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
const setHealthy = () =>{
    changeInfState && changeInfState(0);
    updateInfectedState && updateInfectedState(false);
}
const setSick = () =>{
    changeInfState && changeInfState(1);
    updateInfectedState && updateInfectedState(false);
}
const setImmune = () =>{
    changeInfState && changeInfState(2);
    updateInfectedState && updateInfectedState(false);
}

  return (
    <IonModal isOpen={isInfectedOpened} id="infModal" enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
      <IonList>
        <IonItem key="healthyItem" onClick={setHealthy}>All Good</IonItem>
        <IonItem key="infectedItem" onClick={setSick}>Got Infected</IonItem>
        <IonItem key="vaccinatedItem" onClick={setImmune}>It's all behind</IonItem>
        <IonItem key="CloseModalItem" onClick={()=>updateInfectedState && updateInfectedState(false)}>Close</IonItem>
      </IonList>
    </IonModal>
  );
};

export default InfectedComponent;
