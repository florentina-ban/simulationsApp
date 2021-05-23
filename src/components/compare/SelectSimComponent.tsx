import { IonButton, IonCard, IonCardTitle, IonFabButton, IonIcon, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { playOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { SimulationProps } from "../view/SimulationComp";
import './style/selectSim.css'

export interface SimsAndSelected{
    allSims: SimulationProps[],
    selectedSims: SimulationProps[],
    updateSelectedSims: (a: SimulationProps[]) => void;
    compare: () =>void;
}

const SelectSimComponent: React.FC<SimsAndSelected> = ({allSims, selectedSims, updateSelectedSims, compare}) => {
    const addIds = (e: any) => {
        updateSelectedSims([...e.detail.value])
    }
    
    return(
        <div id="selectSimRoot">
        <IonCardTitle className="title">Select simulations</IonCardTitle>
        <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} multiple={true}
         onIonChange={e => addIds(e)}>
            {allSims?.map(sim=>{
                return <IonSelectOption key={sim.id} value={sim}> 
                    {sim.regionName} - {sim.startInf}
                    </IonSelectOption>
            })}
        </IonSelect>
        <IonItem id="compareButton">
            <IonFabButton slot="end" size="small" color="warning" 
            onClick={compare} disabled={selectedSims.length==0}>
                <IonIcon icon={playOutline}></IonIcon>
            </IonFabButton>
        </IonItem>
        </div>            
    )
}
export default SelectSimComponent;