import { IonButton, IonButtons, IonCard, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"
import { CoordonatesProps } from "../interfaces/CoordonatesProps";
import { SimpleCoordProps } from "../interfaces/SimpleCoordProps";
import { AuthContext } from "../login/AuthProvider";
import InfectedComponent from "../menuStuff/InfectedComponent";
import MenuComponent from "../menuStuff/MenuComponent";
import { MenuContext } from "../menuStuff/MenuProvider";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { getAllDestinations, getAllInitPoints, getRoutesForUser } from "../../utils/ServerApi";
import { MyRouteMap } from "./Routes"
import './Routes.css'

const RoutesComponet: React.FC = () => {  
    const [showRoute, setWhowRoute] = useState(false);
    const {token} = useContext(AuthContext);
    const [updated, setUpdated] = useState(false);

    let myRoute: { latitude: number; longitude: number; timestamp: number }[] = []
    const [route, setRoute] = useState(myRoute);
   
    const initFunc = async () => {
       const myRoute29: CoordonatesProps[] = (await getRoutesForUser(token));
        // const myRoute29: CoordonatesProps[] = (await getAllInitPoints(token, userId));
        //  const myRoute29: CoordonatesProps[] = (await getAllDestinations(token, userId));
        console.log(myRoute29[0])
        setRoute(myRoute29);
    }

    console.log(myRoute)
    return(
        <IonPage>
           <ToolbarComponent/>
            <IonContent>
                <IonCard>
                    <IonItem key="startDate">
                        <IonLabel>Start</IonLabel>
                        <IonDatetime displayFormat={"DD-MM-YYYY HH:mm"}></IonDatetime>
                    </IonItem>
                    <IonItem key="endDate">
                        <IonLabel>End</IonLabel>
                        <IonDatetime displayFormat={"DD-MM-YYYY HH:mm"}></IonDatetime>
                    </IonItem>
                    <div id="showRouteButtonContainer">
                        <IonButton color="success" onClick={()=> {setWhowRoute(true)}}>Show Route</IonButton>
                        <IonButton color="success" onClick={() => initFunc()}>Get Route</IonButton>
                    </div>
                </IonCard>
                {showRoute &&
                <div id="routesMapContainer">
                    <MyRouteMap route={route} markPosition={true} forSimulation={false}/>
                </div>
                }
                <MenuComponent/>
                <InfectedComponent/>
            </IonContent>
        </IonPage>
    )
}
export default RoutesComponet;