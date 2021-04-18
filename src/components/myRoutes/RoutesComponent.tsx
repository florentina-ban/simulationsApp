import { IonButton, IonButtons, IonCard, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"
import { CoordonatesProps } from "../interfaces/CoordonatesProps";
import { SimpleCoordProps } from "../interfaces/SimpleCoordProps";
import { AuthContext } from "../login/AuthProvider";
import MenuComponent from "../menuStuff/MenuComponent";
import { MenuContext } from "../menuStuff/MenuProvider";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { getAllDestinations, getAllInitPoints, getRoutesForUser } from "../ServerApi";
import { MyRouteMap } from "./Routes"
import './Routes.css'

const RoutesComponet: React.FC = () => {  
    const [showRoute, setWhowRoute] = useState(false);
    const {token} = useContext(AuthContext);
    const [updated, setUpdated] = useState(false);
    const [userId, setUserId] = useState(-1);

    let myRoute: { latitude: number; longitude: number; timestamp: number }[] = []
    const [route, setRoute] = useState(myRoute);
    
    // let myRoute: SimpleCoordProps[] = [
    //     { lat: 46.750856175214054, lng: 23.54668000938106 },
    //     { lat: 46.74981525597679, lng: 23.563329016392498 },
    //     { lat: 46.74877431663644, lng: 23.581763298057165},
    //     { lat: 46.75227271236733, lng: 23.599323740636464 },
    //     { lat: 46.76035810237332, lng: 23.615835425880505 }
    // ]

    const initFunc = async () => {
        if (userId>0){
       // const myRoute29: CoordonatesProps[] = (await getRoutesForUser(token, userId));
        // const myRoute29: CoordonatesProps[] = (await getAllInitPoints(token, userId));
         const myRoute29: CoordonatesProps[] = (await getAllDestinations(token, userId));

       
        console.log(myRoute29[0])
        setRoute(myRoute29);
        }
    }
    


    const {isMenuOpened} = useContext(MenuContext);

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
                    <IonItem key="userId">
                        <IonLabel>userId</IonLabel>
                        <IonInput onIonChange={e => {setUserId(parseInt(e.detail.value || '-1'))}} value={userId}></IonInput>
                    </IonItem>
                    <div id="showRouteButtonContainer">
                        <IonButton color="success" onClick={()=> {setWhowRoute(true)}}>Show Route</IonButton>
                        <IonButton color="success" onClick={() => initFunc()}>Get Route</IonButton>
                    </div>
                </IonCard>
                <div id="routesMapContainer">
                    <MyRouteMap route={route} markPosition={true}/>
                </div>
                {isMenuOpened &&
                <MenuComponent/>}
            </IonContent>
        </IonPage>
    )
}
export default RoutesComponet;