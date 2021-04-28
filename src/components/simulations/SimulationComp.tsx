import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton, IonIcon, IonModal, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../login/AuthProvider";
import InfectedComponent from "../menuStuff/InfectedComponent";
import MenuComponent from "../menuStuff/MenuComponent";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { MyRouteMap } from "../myRoutes/Routes";
import { deleteSim, getAllSimulations, getSimulationDays } from "../../utils/ServerApi";
import AddSimulationComp from "./AddSimulationComponent";
import { Line, Pie } from 'react-chartjs-2';

import "./simulation.css";
import { arrowBack, arrowForward, barChartOutline } from "ionicons/icons";
import AlertComponent from "../menuStuff/AlertComponent";

export interface SimulationProps{
    id: number,
    startInf: number,
    regionName: String,
    noDays: number,
    noUsers: number,
    noInfUsers: number
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
    noImuneUsers: number
}

const SimulationComp: React.FC = () => {  
    const emptyList: SimulationProps[] = [];
    const emptyDayList: SimulationDayProps[] = [];
    const emptySim: SimulationProps = {id: 0, startInf:0, regionName: "", noDays: 0, noInfUsers: 0, noUsers:0}
    const {token} = useContext(AuthContext)
    const [allSimulations, setAllSim] = useState(emptyList)
    const [selectedSim, setSelectedSim] = useState(emptySim)
    const [simulationDays, setSimulationDays] = useState(emptyDayList)
    const [stateUpdated, setStateUpdated] = useState(false)
    const [currentDay, setCurrentDay]=useState(0);
    const [isModalOpened, setIsModalOpened]=useState(false);
    const [showCharts, setShowCharts]= useState(false)
    const [message, setMessage] = useState("");
    const [someError, setSomeError] = useState(false);
    
    const barData={
        labels: simulationDays.map(sim=>sim.dayNo),
        datasets: [
            {label: "Infected",
            data: simulationDays.map(sim=>sim.infNo),
            backgroundColor: '#f08d13',
            borderColor: '#f01313',
            borderWidth: 2,
            hoverBackgroundColor: '#f2f531'
        },
        {label: "Immune",
            data: simulationDays.map(sim=>sim.noImuneUsers),
            backgroundColor: '#0990e3',
            borderColor: '#04127d',
            borderWidth: 2,
            hoverBackgroundColor: '#07e3df'
        },
        ],       
    }

    const reducer = (acc: number, val: number) => acc + val;
    // simulationDays.forEach(sim=> console.log(sim.dayNo + " "+sim.noImuneUsers))
    console.log("infec: "+selectedSim.noInfUsers);
    console.log("no of users: "+selectedSim.noUsers);
    console.log( simulationDays.map(simD=>simD.noImuneUsers).reduce(reducer,0) + "-----");
    const pieData={ 
        labels: ['Infected','Healthy','Immune'],
        datasets: [
            {data: [selectedSim.noInfUsers, selectedSim.noUsers-selectedSim.noInfUsers,  simulationDays.map(simD=>simD.noImuneUsers).reduce(reducer,0)],
            backgroundColor: ['#f08d13','#05e30c','#0990e3'],
            borderColor: ['#f01313','#046107','#04127d'],
            borderWidth: 2,
            hoverBackgroundColor: '#f2f531',
        }],
    }


    const getAllSim = () =>{
        console.log("token: "+token)
        getAllSimulations(token).then(sims =>{
            console.log("sims: " +sims)
            if (sims){
                setMessage("Got your simulations")
                setAllSim(sims)
                setSomeError(false)
            }
            else {
                setStateUpdated(!stateUpdated) 
                setMessage("Get Simulations failed")
                setSomeError(true)
            }   
        })
    }

    useEffect(getAllSim, [])

    const viewSimulation = () => {
        getSimulationDays(token, selectedSim.id).then(days=>{
            if (days){
            setSimulationDays(days.sort((a,b) => (a.dayNo - b.dayNo) ))
            setCurrentDay(0)
            setStateUpdated(!stateUpdated)
            setSomeError(false);
            }
            else{
                setSomeError(true);
                setMessage("Can not view simulation")
            }
        })
    }

    const goForward = () => {
        if (selectedSim.id>0 && currentDay+1<simulationDays.length){
            console.log(JSON.stringify(simulationDays[currentDay+1]))
            setCurrentDay(currentDay+1)
        }
    }

    const goBackward = () => {
        if (selectedSim.id>0 && currentDay>0){
            console.log(JSON.stringify(simulationDays[currentDay-1]))
            setCurrentDay(currentDay-1)
        }
    }

    const delSim = () => {
        if (selectedSim.id>0)
            deleteSim(token, selectedSim.id).then(sims =>{
                if (sims){
                    setAllSim(sims)
                    setSelectedSim(emptySim)
                    setCurrentDay(0)
                    setMessage("Simulation deleted")
                    setSomeError(false)
                    setStateUpdated(!stateUpdated)
                }
                else{
                    setMessage("Cannot delete simulation")
                    setSomeError(true)
                }
            })
    }

     const openCloseAddModal = (isOpened: boolean) => {
        setIsModalOpened(isOpened);
    }

    const updateMessage = (mes:string) =>{
        setMessage(mes)
    }
    

    return(
        <IonPage>
        <ToolbarComponent/>
        <MenuComponent/>
        <AlertComponent message={message} errorMes={someError} updateMessage={updateMessage}/> 
        <InfectedComponent/>
        <IonContent>
        <IonCard id="simcard">
            <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} onIonChange={e => {e.detail.value && setSelectedSim(e.detail.value);}}>
                {allSimulations?.map(sim=>{
                    return <IonSelectOption key={sim.id} value={sim}> 
                               {sim.regionName} - {sim.startInf}
                        </IonSelectOption>
                })}
            </IonSelect>
            <div id="simDiv">
            <IonButton color="warning" onClick={viewSimulation}>View</IonButton>
            <IonButton color="warning" onClick={delSim}>Delete</IonButton>
            <IonButton color="warning" onClick={()=>setIsModalOpened(true)}>New</IonButton>
            </div>
        </IonCard>
        { simulationDays.length>0 &&
            <div id="dayButtons">
                <IonNote>Days</IonNote>
                <IonFabButton color="warning" size="small" onClick={goBackward}><IonIcon icon={arrowBack}></IonIcon></IonFabButton>
                <div className="textBox">
                    <IonText><em><strong>{currentDay+1}</strong></em></IonText>
                </div>
                <IonFabButton color="warning" size="small" onClick={goForward}><IonIcon icon={arrowForward}></IonIcon></IonFabButton>
            </div>
        }
        { simulationDays.length>0 &&
            <div id="infectedDiv">
                <IonNote>Infected</IonNote>
                <div className="textBox">
                <IonText><em><strong>{
                    simulationDays[currentDay].infNo}</strong></em></IonText>
                </div>
                <IonFabButton size="small" color="warning" onClick={()=>{setShowCharts(true)}}><IonIcon icon={barChartOutline}></IonIcon></IonFabButton>
            </div>
        }
           { simulationDays.length>0 &&
            <div id="mapDiv">
                <MyRouteMap forSimulation={true} currentDay={currentDay} route={simulationDays[currentDay].contactPoints.map(cp=> {return {latitude: cp.lat, longitude: cp.lng, timestamp: 0, noEncouters:cp.noEncouters}; })} markPosition={true} />
               
            </div>
        }
       
        {isModalOpened && 
             <IonModal isOpen={isModalOpened} id="simModal"> 
               <IonCard id="modalContainer">
                <IonCardTitle id="modalTitle">Create new simulation</IonCardTitle>
                <IonCardContent>
                <AddSimulationComp openClose={openCloseAddModal} updateSimulations={getAllSim}/>
                </IonCardContent>
                </IonCard>
             </IonModal>  
           }
           { showCharts &&
           <IonModal isOpen={showCharts} id="chartModal">
            <IonCard id="chartCard">
                <IonCardTitle>{selectedSim.regionName+" - Simulation"}</IonCardTitle>
                <Line data={barData} type="line" id="lineChart"></Line>
                <div id="pieDiv">
                    <Pie data={pieData} type="pie"></Pie>
                </div>
                <IonButton color="warning" id="closeChartModalButton" onClick={() => setShowCharts(false)}>Close</IonButton>
            </IonCard>
            </IonModal>
           }
            </IonContent>
        </IonPage>
    );
}
export default SimulationComp;