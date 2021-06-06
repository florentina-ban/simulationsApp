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
    const [options, setOptions] = useState(-1);


    const saveOptions = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>)=>{
        if (e.type === 'click') {
            console.log('Left click');
          } else if (e.type === 'contextmenu') {
            console.log('Right click');
          }
    }

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
                <th key="region">Name</th>
                <th key="infStart">Infected start</th>
                <th key="populations">Population size</th>
                <th className="smallerCell" key="days">Time (Days)</th>
                <th key="immunity">Immunity (%)</th>
                <th key="mortality">Mortality (%)</th>
                <th key="maskEff">Mask efficiency</th>
            </tr>
            </thead>
            <tbody>
            {sims.map(sim=>{
                return (
                    <tr key={sim.id} onClick={(e)=>saveOptions(e)}>
                        <td key={"name"+sim.id}>{sim.name}</td>
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
                        <tr key="locationHead">
                            <th key="r1" className="smallerCell2">Name</th>
                            <th key="g1" >Green</th>
                            <th key="y1">Yellow</th>
                            <th key="re1">Red</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sims.map(sim=>{
                            return (
                            <tr key={"locations"+sim.id}>
                                <td key={"r1"+sim.id} className="smallerCell">{sim.name }</td>
                                <td key={"g1"+sim.id} className="locations">{decodeLocationType(sim.greens)} </td>
                                <td key={"y1"+sim.id} className="locations">{decodeLocationType(sim.yellows)} </td>
                                <td key={"re1"+sim.id} className="locations">{decodeLocationType(sim.reds)}</td>
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
                        <tr key="limitsHead">
                        <th key="r2">Name</th>
                        <th key="g2">Green (&#8240;)</th>
                        <th key="y2">Yellow (&#8240;)</th>
                        <th key="re2">Red (&#8240;)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sims.map(sim=>{
                            return (
                            <tr key={"limits"+sim.id}>
                                <td key={"r2"+sim.id} className="smallerCell">{sim.name }</td>
                                <td key={"g2"+sim.id}>{"<"}{sim.greenl} </td>
                                <td key={"y2"+sim.id}>{"<"}{sim.yellowl} </td>
                                <td key={"re2"+sim.id}>{">"}{sim.yellowl}</td>
                            </tr> )
                        })}
                    </tbody>
                       
                </table>
            }
        </div>
    )
}
export default ShalowCompare