import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useState } from "react";
import { MenuContext } from "./MenuProvider";

const ToolbarComponent: React.FC = () => {
    const { isMenuOpened, updateMenuState} = useContext(MenuContext)

    const openMenu = () => {
        console.log("button clicked")
        if  (updateMenuState)
            updateMenuState(true);
    } 

    return (
        <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton  auto-hide="false" onClick={openMenu}></IonMenuButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton >
              <IonIcon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Stay Safe App</IonTitle>
        </IonToolbar>
        </IonHeader>
    )
}
export default ToolbarComponent;