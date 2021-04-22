import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkDoneOutline, sunnyOutline, thunderstormOutline } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { updateUserState } from "../../utils/ServerApi";
import { AuthContext } from "../login/AuthProvider";
import { MenuContext } from "./MenuProvider";

const ToolbarComponent: React.FC = () => {
    const { updateMenuState, updateInfectedState} = useContext(MenuContext)
    const {infected, token} = useContext(AuthContext);

    const openMenu = () => {
        console.log("button clicked")
        if  (updateMenuState)
            updateMenuState(true); 
    } 

    const setInfected = () => {
      if (updateInfectedState){
        console.log("infected?")
        updateInfectedState(true);
      }
    }

    return (
        <IonHeader>
        <IonToolbar color="success">
          <IonButtons>
            <IonMenuButton  auto-hide="false" onClick={openMenu}></IonMenuButton>
            <IonTitle>Stay Safe App</IonTitle>
            <IonMenuButton  auto-hide="false" onClick={setInfected}>
               {infected==0 && <IonIcon icon={sunnyOutline}></IonIcon>}
               {infected==1 && <IonIcon icon={thunderstormOutline}></IonIcon>}
               {infected==2 && <IonIcon icon={checkmarkDoneOutline}></IonIcon>}
            </IonMenuButton>
          </IonButtons>
        
        </IonToolbar>
        </IonHeader>
    )
}
export default ToolbarComponent;