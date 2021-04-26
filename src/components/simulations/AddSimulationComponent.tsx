import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText} from "@ionic/react"
import React, { useContext, useState } from "react"
import { AuthContext } from "../login/AuthProvider";
import { startSim } from "../../utils/ServerApi";
import "./simulation.css";

interface AddSimFunc{
    openClose: (isOpen: boolean)=>void;
    updateSimulations: () => void;
}

const AddSimulationComp: React.FC<AddSimFunc> = ({openClose, updateSimulations}) => {  

    const [startWithInf, setStartWithInf] = useState(0);
    const [noOfDays, setNoOfDays] = useState(0);
    const {token} = useContext(AuthContext)

    const startSimulation = () => {
        if (startWithInf>0 && noOfDays>0){
            openClose(false);
            startSim(token,noOfDays,startWithInf).then(val=>{
                if (val=="ok"){
                    updateSimulations();
                }
            })
        }
    }
    

return(
            <IonList is="setBackground">
                <IonItem id="regionItem" className="simItem">
                    <IonLabel>Region</IonLabel>
                    <IonText>Cluj-Napoca</IonText>
                </IonItem>
                <IonItem id="noInfItem" className="simItem">
                    <IonLabel className="labelChild">Start infected no.</IonLabel>
                    <IonInput slot="end" className="inputNo" typeof="number" value={startWithInf}  onIonChange={(e)=> setStartWithInf(+e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem id="simDaysItem"className="simItem">
                    <IonLabel className="labelChild">Simulation days</IonLabel>
                    <IonInput slot="end" className="inputNo" value={noOfDays} onIonChange={(e)=> setNoOfDays(+e.detail.value!)}></IonInput>
                </IonItem>
                <div id="modalButtons"> 
                <IonButton color="warning" onClick={() => openClose(false)}>Cancel </IonButton>
                <IonButton color="warning" onClick={() => startSimulation()}>Start Simulation </IonButton>
                </div>
            </IonList>
)
}

export default AddSimulationComp