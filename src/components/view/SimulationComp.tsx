import { IonButton, IonCard,IonCardTitle, IonContent, IonFabButton, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonSelect, IonSelectOption, IonSpinner, IonText } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../authentification/AuthProvider";
import ToolbarComponent from "../toolbar/ToolbarComponent";
import { deleteSim, getAllSimulations, getSimulationDays } from "../../services/ServerApi";
import AlertComponent from "../toolbar/AlertComponent";
import ChartsComp from "./ChartComponent";

import "./style/simulation.css";
import "./style/sim.css"
import "./style/mapCmpCss.css";
import ViewMapComponent from "./ViewMapComp";

export interface SimulationProps{
    id: number,
    startInf: number,
    regionName: String,
    noDays: number,
    noUsers: number,
    noInfUsers: number,
    immunity: number,
    mortality: number,
    maskEfficiency: number;
    greens: string,
    yellows: string,
    reds: string,
    greenl: number,
    yellowl: number,
    redl: number,
    name: string,
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
    contactPoints: ContactPointProps[],
    noImuneUsers: number,
    noDeadUsers: number,
    noNewInfected: number,
    scenario: number
}

export interface SimulationFull{
    days: SimulationDayProps[],
    options: string,
    population: number
}

const SimulationComp: React.FC = () => {  
    const emptyList: SimulationProps[] = [];
    const emptyDayList: SimulationDayProps[] = [];
    const emptySim: SimulationProps = {id: 0, startInf:0, regionName: "", noDays: 0, 
    noInfUsers: 0, noUsers:0, immunity:0, mortality:0, maskEfficiency:0, 
    greens: "", yellows: "", reds: "", greenl: 0, yellowl: 0, redl: 0, name:""  }
    const {token} = useContext(AuthContext)
    const [allSimulations, setAllSim] = useState(emptyList)
    const [selectedSim, setSelectedSim] = useState(emptySim)
    const [simulationDays, setSimulationDays] = useState(emptyDayList)
    const [stateUpdated, setStateUpdated] = useState(false)
    const [message, setMessage] = useState("");
    const [someError, setSomeError] = useState(false);
    const [selectSpinner, setSelectSpinner] = useState(false);
   
    const getAllSim = (value?: number) =>{
        if (value){
            if (value = 0){
                setMessage("Simulation started")
                setSomeError(false)
            }
            else {
                setMessage("Start simulation failed")
                setSomeError(true)
                return
            }
        }
        
        console.log("token: "+token)
        setSelectSpinner(true)
        getAllSimulations(token).then(sims =>{
            if (sims){
                setMessage("Got simulations")
                setAllSim(sims)
                setSomeError(false)
            }
            else {
                // setStateUpdated(!stateUpdated) 
                setMessage("Get Simulations failed")
                setSomeError(true)
            }   
            setSelectSpinner(false)
        })
    }

    const updateAlertComponent = (message: string, isError: boolean) => {
        setSomeError(isError)
        setMessage(message)
    }

    useEffect(getAllSim, [])

    const viewSimulation = () => {
        getSimulationDays(token, selectedSim.id).then(sim=>{
            if (sim){
            setSimulationDays(sim)
            // setStateUpdated(!stateUpdated)
            updateAlertComponent("Got simulation", false)
            }
            else{
                updateAlertComponent("Get simulation failed", true)
            }
        })
    }

    const delSim = () => {
        if (selectedSim.id>0)
            deleteSim(token, selectedSim.id).then(sims =>{
                if (sims){
                    setAllSim(sims)
                    setSelectedSim(emptySim)
                    setSimulationDays(emptyDayList)
                    updateAlertComponent("Simulation deleted", false)
                }
                else{
                    updateAlertComponent("Cannot delete simulation", true)
                }
            })
    }

    const updateMessage = (mes:string) =>{
        setMessage(mes)
    }
  
    return(
        <IonPage>
        <ToolbarComponent/>
        <AlertComponent message={message} errorMes={someError} updateMessage={updateMessage}/> 
        <IonContent>
            <div id="SimCompTopDiv">
            <IonCard id="simMenu">
                <IonCardTitle className="title">Choose simulation</IonCardTitle>
                <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} onIonChange={e => { 
                        if (e.detail.value){
                            setSelectedSim(e.detail.value)
                            setSimulationDays(emptyDayList)
                        }
                        }}>
                    {allSimulations?.map(sim=>{
                        return <IonSelectOption className="selectOption" key={sim.id} value={sim}> 
                                {sim.name}
                            </IonSelectOption>
                    })}
                </IonSelect>
                <div id="simDiv">
                    <IonButton color="warning" onClick={viewSimulation}>View</IonButton>
                    <IonButton color="warning" onClick={delSim}>Delete</IonButton>
                </div>
                {selectSpinner &&
                    <IonSpinner color="warning" className="alignRight" name='dots' />
                }
            </IonCard>
            { selectedSim.id>0 &&
                <IonCard id="detailsCard">
                    <IonCardTitle className="title">Simulation details: </IonCardTitle>
                        <IonItem key="regionItem" id="regionItem" className="simItem1">
                            <IonLabel>Region</IonLabel>
                            <IonText>Cluj-Napoca</IonText>
                        </IonItem>
                        <IonItem key="noInfItem" id="noInfItem" className="simItem1">
                            <IonLabel className="labelChild">Infected start</IonLabel>
                            <IonText slot="end" className="inputNo" typeof="number">{selectedSim.startInf}</IonText>
                        </IonItem>
                        <IonItem key="simDaysItem" id="simDaysItem"className="simItem1">
                            <IonLabel className="labelChild">Days</IonLabel>
                            <IonText slot="end" className="inputNo">{selectedSim.noDays}</IonText>
                        </IonItem>
                        <IonItem key="populationItem" id="populationItem"className="simItem1">
                            <IonLabel className="labelChild">Population</IonLabel>
                            <IonText slot="end" className="inputNo">{selectedSim.noUsers}</IonText>
                        </IonItem>
                        <IonItem key="dead" className="simItem1">
                            <IonLabel>Mortality</IonLabel>
                            <IonText>{selectedSim.mortality} %</IonText>
                        </IonItem>
                        <IonItem key="immune" className="simItem1">
                            <IonLabel>Immunity</IonLabel>
                            <IonText>{selectedSim.immunity} %</IonText>
                        </IonItem>
                        <IonItem key="maskEfficiency" id="maskEfficiency"className="simItem1">
                            <IonLabel className="labelChild">Mask Efficiency</IonLabel>
                            <IonText>{selectedSim.maskEfficiency} %</IonText>
                        </IonItem>
                </IonCard>
            }
            { simulationDays.length>0 &&
               <ViewMapComponent days={simulationDays} sim={selectedSim}/>
            }
        </div>
        { simulationDays.length>0 &&
            <ChartsComp  options={""} days={simulationDays} population={selectedSim.noUsers}/>}
        </IonContent>
        </IonPage>
    );
}
export default SimulationComp;