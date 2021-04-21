import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonModal, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../login/AuthProvider";
import InfectedComponent from "../menuStuff/InfectedComponent";
import MenuComponent from "../menuStuff/MenuComponent";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { MyRouteMap } from "../myRoutes/Routes";
import { deleteSim, getAllSimulations, getSimulationDays } from "../../utils/ServerApi";
import AddSimulationComp from "./AddSimulationComponent";
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
    const [isModalOpened, setIsModalOpened]=useState(false);

    const getAllSim = () =>{
        console.log("token: "+token)
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
            setSimulationDays(days.sort((a,b) => (a.dayNo - b.dayNo) ))
            setCurrentDay(0)
            setStateUpdated(!stateUpdated)
        })
    }

    const goForward = () => {
        if (selectedSim.id>0 && currentDay+1<simulationDays.length)
            setCurrentDay(currentDay+1)
    }

    const goBackward = () => {
        if (selectedSim.id>0 && currentDay>0)
            setCurrentDay(currentDay-1)
    }

    const delSim = () => {
        if (selectedSim.id>0)
            deleteSim(token, selectedSim.id).then(sims =>{
                    console.log(sims[0].regionName.toString())
                    setAllSim(sims)
                    setSelectedSim(emptySim)
                    setCurrentDay(0);
                    setStateUpdated(!stateUpdated)
            })
    }

     const openCloseAddModal = (isOpened: boolean) => {
        setIsModalOpened(isOpened);
    }


    return(
        <IonPage>
        <ToolbarComponent/>
        <MenuComponent/>
        <InfectedComponent/>
        <IonContent>
        <IonCard id="simcard">
            <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} onIonChange={e => setSelectedSim(e.detail.value)}>
                {allSimulations?.map(sim=>{
                    return <IonSelectOption key={sim.id} value={sim}> 
                               {sim.regionName} - {sim.startInf}
                        </IonSelectOption>
                })}
            </IonSelect>
            <div id="simDiv">
            <IonButton color="warning" onClick={simulate}>View</IonButton>
            <IonButton color="warning" onClick={delSim}>Delete</IonButton>
            <IonButton color="warning" onClick={()=>setIsModalOpened(true)}>New</IonButton>
            </div>
        </IonCard>
        <div id="dayButtons">
            <IonButton color="warning" size="small" onClick={goBackward}>before</IonButton>
            <div className="textBox">
                <IonNote >Day No. </IonNote> 
                <IonText><em><strong>{currentDay+1}</strong></em></IonText>
            </div>
            <IonButton color="warning" size="small" onClick={goForward}>after</IonButton>
            { simulationDays.length>0 && 
            <div className="textBox">
            <IonNote>Infected </IonNote>
            <IonText ><em><strong>{
                simulationDays[currentDay].infNo}</strong></em></IonText>
            </div>
            }
        </div>
        { simulationDays.length>0 && 
        <div id="mapDiv">
        <MyRouteMap forSimulation={true} route={simulationDays[currentDay].contactPoints.map(cp=> {return {latitude: cp.lat, longitude: cp.lng, timestamp: 0, noEncouters:cp.noEncouters}; })} markPosition={true} />
        </div>
        }
        {isModalOpened && 
             <IonModal isOpen={isModalOpened} id="simModal"> 
               <IonCard id="modalContainer">
                <IonCardTitle id="modalTitle">Create new simulation</IonCardTitle>
                <IonCardContent>
                <AddSimulationComp openClose={openCloseAddModal}/>
                </IonCardContent>
                </IonCard>
             </IonModal>  
           }
            </IonContent>
        </IonPage>
    );
}
export default SimulationComp;