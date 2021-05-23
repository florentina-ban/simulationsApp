import { IonFabButton, IonIcon, IonItem } from "@ionic/react";
import { arrowDownOutline, arrowForwardOutline } from "ionicons/icons";
import React, { useState } from "react";
import { decodeLocationType } from "../../utils/utils";
import { SimulationProps } from "../view/SimulationComp";
import './style/shallow.css'

export interface SelectedSims{
    sims: SimulationProps[]
}
const ShalowCompare: React.FC<SelectedSims> = ({sims}) => {
    const [showTable , setShowTable] = useState(false);
    const [showOpenLoc, setShowOpenLoc] = useState(false);
    const [showLimits, setShowLimits] = useState(false)

    return (
        <div>
            <div id="subtitleDiv">Data on simulation start</div>
            <IonItem className="smallerForScrollBar">
                <IonFabButton size="small" color="none" onClick={()=>{
                    setShowLimits(false)
                    setShowOpenLoc(false)
                    setShowTable(!showTable)}}> 
                    { !showTable && 
                        <IonIcon icon={arrowForwardOutline}></IonIcon>}
                    { showTable && 
                        <IonIcon icon={arrowDownOutline}></IonIcon>}
                </IonFabButton>Start info
            </IonItem>
            { showTable &&
            <table className="shallowTable">
            <thead>
            <tr key="thead">
                <th key="region">Region</th>
                <th key="infStart">Infected start</th>
                <th key="populations">Population</th>
                <th key="days">Time(Days)</th>
                <th key="immunity">Immunity</th>
                <th key="mortality">Mortality</th>
                <th key="maskEff">Mask efficiency</th>
            </tr>
            </thead>
            <tbody>
            {sims.map(sim=>{
                return (
                    <tr key={sim.id}>
                        <td key={"region"+sim.id}>{sim.regionName}</td>
                        <td key={"infStart"+sim.id}>{sim.startInf}</td>
                        <td key={"populations"+sim.id}>{sim.noUsers}</td>
                        <td key={"days"+sim.id}>{sim.noDays}</td>
                        <td key={"immunity"+sim.id}>{sim.immunity}</td>
                        <td key={"mortality"+sim.id}>{sim.mortality}</td>
                        <td key={"maskEff"+sim.id}>{sim.maskEfficiency}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            }   
            <IonItem className="smallerForScrollBar">
                <IonFabButton size="small" color="none" onClick={()=>{
                    setShowTable(false)
                    setShowLimits(false)
                    setShowOpenLoc(!showOpenLoc)}}> 
                    { !showOpenLoc && 
                        <IonIcon icon={arrowForwardOutline}></IonIcon>}
                    { showOpenLoc && 
                        <IonIcon icon={arrowDownOutline}></IonIcon>}
                </IonFabButton>Opened Locations
            </IonItem>
            { showOpenLoc &&
                <table className="shallowTable">    
                    <thead>
                        <th className="smallerCell">Region</th>
                        <th>Green</th>
                        <th>Yellow</th>
                        <th>Red</th>
                    </thead>
                    <tbody>
                        {sims.map(sim=>{
                            return (
                            <tr>
                                <td className="smallerCell">{sim.regionName }</td>
                                <td className="locations">{decodeLocationType(sim.greens)} </td>
                                <td className="locations">{decodeLocationType(sim.greens)} </td>
                                <td className="locations">{decodeLocationType(sim.reds)}</td>
                            </tr> )
                        })}
                    </tbody>
                </table>
            }
            <IonItem className="smallerForScrollBar">
                <IonFabButton size="small" color="none" onClick={()=>{
                    setShowTable(false)
                    setShowOpenLoc(false)
                    setShowLimits(!showLimits)}}> 
                    { !showLimits && 
                        <IonIcon icon={arrowForwardOutline}></IonIcon>}
                    { showLimits && 
                        <IonIcon icon={arrowDownOutline}></IonIcon>}
                </IonFabButton>Scenario Limits
            </IonItem>
            { showLimits &&
                <table className="shallowTable lastTable">
                    <thead>
                        <th className="smallerCell">Region</th>
                        <th>Green (&#8240;)</th>
                        <th>Yellow (&#8240;)</th>
                        <th>Red (&#8240;)</th>
                    </thead>
                    <tbody>
                        {sims.map(sim=>{
                            return (
                            <tr>
                                <td className="smallerCell">{sim.regionName }</td>
                                <td >{sim.greenl} </td>
                                <td >{sim.yellowl} </td>
                                <td >{sim.redl}</td>
                            </tr> )
                        })}
                    </tbody>
                       
                </table>
            }
        </div>
    )
}
export default ShalowCompare