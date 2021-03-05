import { IonButton, IonButtons, IonCard, IonContent, IonDatetime, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useState } from "react"
import { SimpleCoordProps } from "../interfaces/SimpleCoordProps";
import MenuComponent from "../menuStuff/MenuComponent";
import { MenuContext } from "../menuStuff/MenuProvider";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { MyRouteMap } from "./Routes"
import './Routes.css'

const RoutesComponet: React.FC = () => {  
    const [showRoute, setWhowRoute] = useState(false);
    const myRoute: SimpleCoordProps[] = [
        { lat: 46.765509, lng: 23.624215 },
        { lat: 46.765707, lng: 23.624306 },
        { lat: 46.765953, lng: 23.624402 },
        { lat: 46.766435, lng: 23.624440 },
        { lat: 46.767155, lng: 23.623903 }
    ]
    const {isMenuOpened, updateMenuState} = useContext(MenuContext);

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

                    <IonButton color="success" onClick={()=> {setWhowRoute(true)}}>Show route</IonButton>
                </IonCard>
                <div id="routesMapContainer">
                    <MyRouteMap route={myRoute} markPosition={true}/>
                </div>
                {isMenuOpened &&
                <MenuComponent/>}
            </IonContent>
        </IonPage>
    )
}
export default RoutesComponet;