import {IonButtons, IonHeader,IonTitle } from "@ionic/react";
import React, { useContext} from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../login/AuthProvider";
import '../../pages/Home.css'

const ToolbarComponent: React.FC = () => {
    const history = useHistory();
    const { logout } = useContext(AuthContext);

    const logOut = () => {
        localStorage.clear();
        if (logout)
          logout();
      }

    return (
        <IonHeader className="header">
        <div>
          <IonButtons>
            <IonTitle>Simulations' App</IonTitle>
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