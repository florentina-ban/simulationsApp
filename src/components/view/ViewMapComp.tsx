import { IonCard, IonFabButton, IonIcon, IonNote, IonText } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import React, { useState } from "react";
import { MyRouteMap } from "../map/MapComponent";
import { SimulationDayProps, SimulationProps } from "./SimulationComp";

export interface SimDays{
    days: SimulationDayProps[]
    sim: SimulationProps
}

const ViewMapComponent: React.FC<SimDays> = ({days, sim}) =>{
    const [currentDay, setCurrentDay]=useState(0);
    const [someError, setSomeError] = useState(false);
    const [message, setMessage] = useState("");
    const [noCont, setNoCont] = useState(0);
   
    const showNoContacts = (no: number) => {
        setNoCont(no)
    }

    const infRate = (days[currentDay]) ? ((days[currentDay].infNo/sim.noUsers)*100) : Infinity 
    const infRateReal = isFinite(infRate) ? infRate.toFixed(2) : "--";
    
    const updateAlertComponent = (message: string, isError: boolean) => {
        setSomeError(isError)
        setMessage(message)
    }

    const goForward = () => {
        if (sim.id>0 && currentDay+1<days.length){
            setCurrentDay(currentDay+1)
        }
        else 
            updateAlertComponent("No more days", true)
    }

    const goBackward = () => {
        if (sim.id>0 && currentDay>0){
            setCurrentDay(currentDay-1)
        }
        else
            updateAlertComponent("First day", true)
    }

    return (
        <IonCard id="mapDiv">
        <div className="daysDiv" key="leftDivOnMap">
                <div className="dayButtons">
                    <IonFabButton color="warning" size="small" onClick={goBackward}><IonIcon icon={arrowBack}></IonIcon></IonFabButton>
                    <div className="textBoxSmallMargin">
                        <IonText><em><strong>{currentDay+1}</strong></em></IonText>
                    </div>
                    <IonFabButton color="warning" size="small" onClick={goForward}><IonIcon icon={arrowForward}></IonIcon></IonFabButton>
                </div>
            </div>
        <div id="infectedDiv" key="RightDivOnMap">
            <div id="addMarginTop">
                <IonNote className="block">Infected</IonNote>
                <div className="textBox">
                    <IonText className="centerText"><em><strong>{
                        days[currentDay].infNo}</strong></em></IonText>
                </div>
            </div>
                <div className="flexDiv">
                    <IonNote className="block">Inf. Rate</IonNote>
                    <IonText className="block textBox centerText"><em><strong>{infRateReal}</strong></em></IonText>
                </div>
                <div className="flexDiv">
                    <IonNote className="block">Contacts</IonNote>
                    <IonText className="block textBox centerText"><em><strong>{noCont}</strong></em></IonText>
                </div>
            </div>
        <MyRouteMap key={'contactMap'} forSimulation={true} currentDay={currentDay} onMarkerClick={showNoContacts} route={days[currentDay].contactPoints.map(cp=> {return {latitude: cp.lat, longitude: cp.lng, timestamp: 0, noEncouters:cp.noEncouters}; })} markPosition={true} />
    </IonCard>
    )
}

export default ViewMapComponent