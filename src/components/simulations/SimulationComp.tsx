import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonModal, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../login/AuthProvider";
import MenuComponent from "../menuStuff/MenuComponent";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import { MyRouteMap } from "../myRoutes/Routes";
import { deleteSim, getAllSimulations, getSimulationDays } from "../../utils/ServerApi";
import { Line, Pie } from 'react-chartjs-2';

import "./simulation.css";
import "./sim.css"
import "./mapCmpCss.css";
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
    noImuneUsers: number,
    noNewInfected: number,
}

export interface SimulationFull{
    days: SimulationDayProps[]
    options: string
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

    
    // const getClosedInstitusions = (options: string) => {
    //     const closed = options.split("")
    //     var myString: string = "";
    //     myString = closed.indexOf("1")<0 ? myString+"Schools " : myString
    //     myString = closed.indexOf("2")<0 ? myString+"Universities ": myString
    //     myString = closed.indexOf("3")<0 ? myString+"Shops ": myString
    //     myString = closed.indexOf("4")<0 ? myString+"Restaurants ": myString
        
    //     myString = myString.length==0 ? "Everything opened" : "Closed places: "+myString
    //     return myString;
    // }

    const maxYAxis: number = Math.ceil((Math.max(...simulationDays.map(simD=>simD.infNo)))/100)*100
    console.log("maxY: "+maxYAxis);
    const lineOptions = {
        responsive: true,
        scales: {
            y: {
                suggestedMax: maxYAxis,
                max: maxYAxis
            }
        },
        lineAtIndex: 6,
            legend: {
              display: false
            }
    }

    const getBarData = () => {
        return {
            labels: simulationDays.map(d=> d.dayNo),
            datasets: [
                {label: "Infected",
                data: simulationDays.map(sim=>sim.infNo),
                backgroundColor: '#f08d13',
                borderColor: '#f01313',
                borderWidth: 1,
                pointBorderWidth: 1,
                pointRadius: 1,
                hoverBackgroundColor: '#f2f531',
            },
            {label: "Immune",
                data: simulationDays.map(sim=>sim.noImuneUsers),
                backgroundColor: '#0990e3',
                borderColor: '#04127d',
                borderWidth: 1,
                pointRadius: 1,
                hoverBackgroundColor: '#07e3df',
                hoverBorderColor: '#0990e3',
            },
        ], 
        }}
    const barData = getBarData();
    
    const reducer = (acc: number, val: number) => acc + val;
    const infections = simulationDays.map(simD=>simD.noNewInfected).reduce(reducer,0)
    const immunes = simulationDays.map(simD=>simD.noImuneUsers).reduce(reducer,0)
    const healthies = selectedSim.noUsers - infections - immunes
    
    const pieData={ 
        labels: ['Infected','Healthy','Immune'],
        datasets: [
            {data: [infections, healthies, immunes],
            backgroundColor: ['#f08d13','#05e30c','#0990e3'],
            borderColor: ['#f01313','#046107','#04127d'],
            borderWidth: 2,
            hoverBackgroundColor: '#f2f531',
        }],
    }


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
        getAllSimulations(token).then(sims =>{
            console.log("sims: " +sims)
            if (sims){
                setMessage("Got simulations")
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

    const updateAlertComponent = (message: string, isError: boolean) => {
        setSomeError(isError)
        setMessage(message)
    }

    useEffect(getAllSim, [])

    const viewSimulation = () => {
        getSimulationDays(token, selectedSim.id).then(sim=>{
            if (sim){
            setSimulationDays(sim)
            setCurrentDay(0)
            setStateUpdated(!stateUpdated)
            updateAlertComponent("Got simulation", false)
            }
            else{
                updateAlertComponent("Get simulation failed", true)
            }
        })
    }

    const goForward = () => {
        if (selectedSim.id>0 && currentDay+1<simulationDays.length){
            console.log(JSON.stringify(simulationDays[currentDay+1]))
            setCurrentDay(currentDay+1)
        }
        else 
            updateAlertComponent("No more days", true)
    }

    const goBackward = () => {
        if (selectedSim.id>0 && currentDay>0){
            console.log(JSON.stringify(simulationDays[currentDay-1]))
            setCurrentDay(currentDay-1)
        }
        else
            updateAlertComponent("First day", true)
    }

    const delSim = () => {
        if (selectedSim.id>0)
            deleteSim(token, selectedSim.id).then(sims =>{
                if (sims){
                    setAllSim(sims)
                    setSelectedSim(emptySim)
                    setCurrentDay(0)
                    updateAlertComponent("Simulation deleted", false)
                }
                else{
                    updateAlertComponent("Cannot delete simulation", true)
                }
            })
    }

     const openCloseAddModal = (isOpened: boolean) => {
        setIsModalOpened(isOpened);
    }

    const updateMessage = (mes:string) =>{
        setMessage(mes)
    }
    const infRate = (simulationDays[currentDay]) ? ((simulationDays[currentDay].infNo/selectedSim.noUsers)*100) : Infinity 
    const infRateReal = isFinite(infRate) ? infRate.toFixed(2) : "--";
    
    return(
        <IonPage>
        <ToolbarComponent/>
        <MenuComponent/>
        <AlertComponent message={message} errorMes={someError} updateMessage={updateMessage}/> 
        <IonContent>
        <IonCard id="simMenu">
            <IonCardTitle>Choose simulation</IonCardTitle>
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
                </div>
            </IonCard>
        { simulationDays.length>0 &&
            <IonCard id="mapDiv">
                <div className="daysDiv">
                        <div className="dayButtons">
                            <IonFabButton color="warning" size="small" onClick={goBackward}><IonIcon icon={arrowBack}></IonIcon></IonFabButton>
                            <div className="textBoxSmallMargin">
                                <IonText><em><strong>{currentDay+1}</strong></em></IonText>
                            </div>
                            <IonFabButton color="warning" size="small" onClick={goForward}><IonIcon icon={arrowForward}></IonIcon></IonFabButton>
                        </div>
                    </div>
                <div id="infectedDiv">
                        <div>
                            <IonNote className="block">Infected</IonNote>
                            <div className="textBox">
                            <IonText className="centerText"><em><strong>{
                                simulationDays[currentDay].infNo}</strong></em></IonText>
                            </div>
                        </div>
                        <div className="flexDiv">
                            <IonNote className="block">Inf. Rate</IonNote>
                            <IonText className="block textBox centerText"><em><strong>{infRateReal}</strong></em></IonText>
                        </div>
                        <IonFabButton size="small" color="warning" onClick={()=>{
                            console.log("insideSetChart")
                            setShowCharts(true)
                            }}><IonIcon icon={barChartOutline}></IonIcon></IonFabButton>
                    </div>
                <MyRouteMap forSimulation={true} currentDay={currentDay} route={simulationDays[currentDay].contactPoints.map(cp=> {return {latitude: cp.lat, longitude: cp.lng, timestamp: 0, noEncouters:cp.noEncouters}; })} markPosition={true} />
            </IonCard>
        }
         { simulationDays.length>0 &&
        <IonCard id="chartCard">
                <div className="controlChart">
                    <Line data={barData} type="line" options={lineOptions} className="lineChart"></Line>
                </div>
                    {/* <div id='pieDiv'>
                        <Pie data={pieData} type="pie"></Pie>
                    </div> */}
        </IonCard>  }
        </IonContent>
        </IonPage>
    );
}
export default SimulationComp;