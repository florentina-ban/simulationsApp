import { IonButton, IonCard, IonContent, IonItem, IonItemOption, IonLabel, IonList, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../login/AuthProvider";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import MapContainer, { MyMap } from "../myRoutes/MapContainer";
import { MyRouteMap } from "../myRoutes/Routes";
import { getAllSimulations, getSimulationDays } from "../ServerApi";
import "./simulation.css";

export interface SimulationProps{
    id: number,
    startInf: number,
    regionName: String,
    noDays: number
}

export interface ContactPointProps{
    id: number,
    noEncouters: number,
    lat: number,
    lng: number
}

export interface SimulationDayProps{
    id: number,
    dayNo: number,
    infNo: number,
    contactPoints: ContactPointProps[]
}

const SimulationComp: React.FC = () => {  
    const emptyList: SimulationProps[] = [];
    const emptyDayList: SimulationDayProps[] = [];
    const emptySim: SimulationProps = {id: 0, startInf:0, regionName: "", noDays: 0}
    const {token} = useContext(AuthContext)
    const [allSimulations, setAllSim] = useState(emptyList)
    const [selectedSim, setSelectedSim] = useState(emptySim)
    const [simulationDays, setSimulationDays] = useState(emptyDayList)
    const [stateUpdated, setStateUpdated] = useState(false)
    const [currentDay, setCurrentDay]=useState(0);

    const getAllSim = () =>{
        getAllSimulations(token).then(sims =>{
            console.log(sims[0].regionName.toString())
            setAllSim(sims)
            setStateUpdated(!stateUpdated)
            
        })
    }

    useEffect(getAllSim, [])
    useEffect(()=>{console.log(allSimulations)},[allSimulations])
    useEffect(()=>{console.log(selectedSim.id+"_____")},[selectedSim])


    const simulate = () => {
        getSimulationDays(token, selectedSim.id).then(days=>{
            console.log(days.length)
            setSimulationDays(days)
            setStateUpdated(!stateUpdated)
        })
    }

    const goForward = () => {
        if (currentDay+1<simulationDays.length)
            setCurrentDay(currentDay+1)
    }

    const goBackward = () => {
        if (currentDay>0)
            setCurrentDay(currentDay-1)
    }

    return(
        <IonPage>
        <ToolbarComponent/>
        <IonContent>
        <IonCard>
            <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} onIonChange={e => setSelectedSim(e.detail.value)}>
                {allSimulations?.map(sim=>{
                    return <IonSelectOption key={sim.id} value={sim}> 
                               {sim.regionName} - {sim.startInf}
                        </IonSelectOption>
                })}
            </IonSelect>
            <IonButton color="success" onClick={simulate}>Start</IonButton>
        </IonCard>
        <div id="dayButtons">
            <IonButton color="success" size="small" onClick={goBackward}>before</IonButton>
            <div className="textBox">
                <IonNote >Day No. </IonNote> 
                <IonText><em><strong>{currentDay}</strong></em></IonText>
            </div>
            <IonButton color="success" size="small" onClick={goForward}>after</IonButton>
            { simulationDays.length>0 && 
            <div className="textBox">
            <IonNote>Infected </IonNote>
            <IonText ><em><strong>{
            simulationDays[currentDay].infNo}</strong></em></IonText>
            </div>
            }
        </div>
        { simulationDays.length>0 && 
        <MyRouteMap route={simulationDays[currentDay].contactPoints.map(cp=> {return {latitude: cp.lat, longitude: cp.lng, timestamp: 0}; })} markPosition={true} />
}
        </IonContent>
        </IonPage>
    );
}
export default SimulationComp;