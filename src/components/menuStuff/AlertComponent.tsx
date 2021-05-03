import { IonIcon, IonModal, IonText } from "@ionic/react"
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import React, { useEffect} from "react";
import "../../pages/Home.css"

export interface AlertProps{
    message: string,
    errorMes: boolean,
    updateMessage: (mes:string) => void
}

const AlertComponent: React.FC<AlertProps> = ({message, errorMes, updateMessage}) => {
    const removeAlert = ()=> {
        if (message.length>0){
            const removeTimer = setTimeout( 
                () => {
                    updateMessage("")
                }, 
                2000);
        }
    }
    useEffect(removeAlert,[message]);

    return(
       
        <IonModal cssClass={"alertModal"} isOpen={message.length>0} id="alertModal">
            { errorMes  &&
            <div id="alertDivError">
                <IonText className={"alertText"}>{message}</IonText>
                <IonIcon className={"alertIcon"} size={"large"} icon={closeCircleOutline}></IonIcon>
            </div>
            }
             { !errorMes  &&
            <div id="alertDivOk">
                <IonText className={"alertText"}>{message}</IonText>
                <IonIcon className={"alertIcon"} size={"large"} icon={checkmarkCircleOutline}></IonIcon>
            </div>
            }
        </IonModal> 
      
    );
}
export default AlertComponent;