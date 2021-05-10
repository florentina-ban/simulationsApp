import { IonButton, IonButtons, IonCard, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"
import { CoordonatesProps } from "../interfaces/CoordonatesProps";
import { SimpleCoordProps } from "../interfaces/SimpleCoordProps";
import { AuthContext } from "../login/AuthProvider";
import MenuComponent from "../menuStuff/MenuComponent";
import { MenuContext } from "../menuStuff/MenuProvider";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { getAllDestinations, getAllInitPoints, getRoutesForUser, getRoutesForUser1 } from "../../utils/ServerApi";
import { MyRouteMap } from "./Routes"
import './Routes.css'
import AlertComponent from "../menuStuff/AlertComponent";

const RoutesComponet: React.FC = () => {  
    const [showRoute, setWhowRoute] = useState(false);
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const {token} = useContext(AuthContext)
    const [message, setMessage]=useState("")
    const [errorMes, setErrorMes] = useState(false)
    // const [start, setStart] = useState(0)
    // const [end, setEnd] = useState(0)

    let myRoute: { latitude: number; longitude: number; timestamp: number }[] = []
    const [route, setRoute] = useState(myRoute);
   
    const initFunc = async () => {
        const start = Math.round(new Date(from).getTime()/1000)
        const end = Math.round(new Date(to).getTime()/1000)
        getRoutesForUser1(token, start, end).then((myRoute29)=>{
            if (myRoute){
                console.log("route length: "+route.length)
                setRoute(myRoute29)
                setWhowRoute(true)
                setMessage("Got your routes")
                setErrorMes(false)
            }
            else {
                setMessage("Cannot get routes")
                setErrorMes(true)
            }
        },()=>{ 
            setMessage("Cannot get routes")
            setErrorMes(true)})
        // const myRoute29: CoordonatesProps[] = (await getRoutesForUser(token));
        // const myRoute29: CoordonatesProps[] = (await getAllInitPoints(token, userId));
        // const myRoute29: CoordonatesProps[] = (await getAllDestinations(token, userId));
        // setRoute(myRoute29)
        // setWhowRoute(true)
    }
    const updateMessage = (mes:string) =>{
        setMessage(mes)
    }
    return(
        <IonPage>
           <ToolbarComponent/>
           <AlertComponent message={message} errorMes={errorMes} updateMessage={updateMessage}/> 
            <IonContent>
                <IonCard>
                    <IonItem key="startDate">
                        <IonLabel>Start</IonLabel>
                        <IonDatetime displayFormat={"DD-MM-YYYY HH:mm"} value={from} onIonChange={(e)=>setFrom(e.detail.value!)} placeholder="Select start date"></IonDatetime>
                    </IonItem>
                    <IonItem key="endDate">
                        <IonLabel>End</IonLabel>
                        <IonDatetime displayFormat={"DD-MM-YYYY HH:mm"} value={to} onIonChange={(e)=>{
                            console.log(from);
                            setTo(e.detail.value!) }} placeholder="Select end date"></IonDatetime>
                    </IonItem>
                    <div id="showRouteButtonContainer">
                        {/* <IonButton color="success" onClick={()=> {setWhowRoute(true)}}>Show Route</IonButton> */}
                        <IonButton color="warning" onClick={() => initFunc()}>Show Routes</IonButton>
                    </div>
                </IonCard>
                {showRoute &&
                <div id="routesMapContainer">
                    <MyRouteMap route={route} markPosition={true} forSimulation={false}/>
                </div>
                }
                <MenuComponent/>
            </IonContent>
        </IonPage>
    )
}
export default RoutesComponet;