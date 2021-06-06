import { IonButton, IonCard, IonCardTitle, IonFabButton, IonIcon, IonItem, IonSelect, IonSelectOption, IonSpinner } from "@ionic/react";
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
    const [selectSpinner, setSelectSpinner] = useState(false)
    
    const addIds = (e: any) => {
        updateSelectedSims([...e.detail.value])
    }
    const compareData = () => {
        setSelectSpinner(true)
        compare()
        setSelectSpinner(false)
    }
    
    return(
        <div id="selectSimRoot">
        <IonCardTitle className="title">Select simulations</IonCardTitle>
        <IonSelect class="simulationSelector" placeholder={"Choose Simulation"} multiple={true}
         onIonChange={e => addIds(e)}>
            {allSims?.map(sim=>{
                return <IonSelectOption className="selectOption" key={sim.id} value={sim}> 
                    {sim.name}
                    </IonSelectOption>
            })}
        </IonSelect>
        <IonItem id="compareButton">
            {(allSims.length==0 || selectSpinner) &&
                <IonSpinner name="dots" color="warning" className="addMargins"/>
            }
            <IonFabButton slot="end" size="small" color="warning" 
            onClick={compareData} disabled={selectedSims.length==0}>
                <IonIcon icon={playOutline}></IonIcon>
            </IonFabButton>
        </IonItem>
        </div>            
    )
}
export default SelectSimComponent;