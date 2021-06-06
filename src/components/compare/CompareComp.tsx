import { IonCard, IonContent } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { getAllSimulations, getSimToCompare } from "../../services/ServerApi";
import { AuthContext } from "../authentification/AuthProvider";
import AlertComponent from "../toolbar/AlertComponent";
import ToolbarComponent from "../toolbar/ToolbarComponent";
import { SimulationDayProps, SimulationProps } from "../view/SimulationComp";
import InfectedChartComponent from "./InfectedChartComp";
import ResultsComponent from "./ResultsComp";
import SelectSimComponent from "./SelectSimComponent";
import ShallowCompare from "./ShallowCompare";
import './style/compare.css'

const CompareComp: React.FC = () => {
    const emptyDayList: SimulationDayProps[][] = [];
    const emptyList: SimulationProps[] = [];
    const emptySim: SimulationProps = {id: 0, startInf:0, regionName: "", noDays: 0, noInfUsers: 0, 
    noUsers:0, immunity:0, mortality:0, maskEfficiency:0, name: "",
    greens: "", yellows: "", reds: "", greenl: 0, yellowl: 0, redl: 0}
    const {token} = useContext(AuthContext)

    const [message, setMessage] = useState("");
    const [someError, setSomeError] = useState(false);
    
    const [allSimulations, setAllSim] = useState(emptyList)
    const [selectedSimulations, setSelectedSimulations] = useState(emptyList)
    const [simForCharts, setSimForCharts] = useState(emptyList)
    const [daysToCompare, setDaysToCompare] = useState(emptyDayList)

    const updateSelectedSims = (list: SimulationProps[]) => {
        setSelectedSimulations(list)
        setDaysToCompare(emptyDayList)
        setSimForCharts(emptyList)
    }
    
    const getAllSim = (value?: number) =>{
        getAllSimulations(token).then(sims =>{
            console.log("sims: " +sims)
            if (sims){
                updateAlertComponent("Got simulations", false)
                setAllSim(sims)
            }
            else {
                updateAlertComponent("Get Simulations failed", true)
            }   
        })
    }

    const updateAlertComponent = (message: string, isError: boolean) => {
        setSomeError(isError)
        setMessage(message)
    }
    const updateMessage = (mes:string) =>{
        setMessage(mes)
    }
    useEffect(getAllSim, [])

    const compare = () => {
        getSimToCompare(token, selectedSimulations.map(v=>v.id)).then(val=>{
            setDaysToCompare(val)
        })
        setSimForCharts(selectedSimulations)
    }
return(
    <IonContent>
        <ToolbarComponent/>
        <AlertComponent message={message} errorMes={someError} updateMessage={updateMessage}/> 
        <div className="compareRoot">
            <IonCard id="leftDivComp">
                <SelectSimComponent allSims={allSimulations} selectedSims={selectedSimulations} updateSelectedSims={updateSelectedSims} compare={compare} ></SelectSimComponent>
                <div id="shallowDiv">
                    { selectedSimulations.length>0 &&
                    <ShallowCompare sims={selectedSimulations}/>}
                </div>
            </IonCard>
            <div id="rightDiv">
            <InfectedChartComponent list={daysToCompare} sims={simForCharts} />
            <ResultsComponent list={daysToCompare} sims={simForCharts} />
            </div>
        </div>
    </IonContent>
)
}


export default CompareComp;