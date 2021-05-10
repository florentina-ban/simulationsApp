import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkDoneOutline, sunnyOutline, thunderstormOutline } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../login/AuthProvider";
import { MenuContext } from "./MenuProvider";

const ToolbarComponent: React.FC = () => {
    const { updateMenuState, updateInfectedState} = useContext(MenuContext)
    const history = useHistory();
    const { logout } = useContext(AuthContext);
    const {infected, token} = useContext(AuthContext);

    const openMenu = () => {
        console.log("button clicked")
        if  (updateMenuState)
            updateMenuState(true); 
    } 

    const logOut = () => {
        localStorage.clear();
        if (logout)
          logout();
      }

    return (
        <IonHeader>
        <div>
          <IonButtons>
            <IonTitle>Simulation App</IonTitle>
            <div className="menuButton" onClick={()=> history.push({pathname: "/create"})}>Create</div>
            <div className="menuButton" onClick={()=> history.push({pathname: "/view"})}>View</div>
            <div className="menuButton" onClick={()=> history.push({pathname: "/compare"})}>Compare</div>
            <div className="menuButton" onClick={()=> history.push({pathname: "/help"})}>Help</div>
            <div className="menuButton" onClick={logOut}>LogOut</div>
          </IonButtons>
        
        </div>
        </IonHeader>
    )
}
export default ToolbarComponent;