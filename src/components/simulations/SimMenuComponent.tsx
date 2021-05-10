import { IonCard, IonCardTitle, IonInput, IonItem, IonList, IonNote } from "@ionic/react";
import React, { useState } from "react";
import './sim.css'
export const SimMenuComponent: React.FC = () => {
    const [ mortality, setMortality] = useState(0);
    const [immunity, setImmunity ] = useState(80);

    return(
        <IonCard id="simMenu">
            <IonCardTitle>New Simulation</IonCardTitle>
            <IonList>
                <IonItem key="mi">
                    <IonNote>Mortality</IonNote>
                    <IonInput></IonInput>
                    <IonNote>Immunity</IonNote>
                    <IonInput></IonInput>
                    
                </IonItem>
            </IonList>
        </IonCard>

    )

}

export default SimMenuComponent;

