import { IonIcon, IonModal, IonText } from "@ionic/react"
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import React, { useEffect} from "react";
import "./alert.css"

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
        <span>
       { errorMes && 
            <IonModal cssClass={"alertModal error"} isOpen={message.length>0} id="alertModal">
                <div className="alertDiv">
                    <IonText className={"alertText"}>{message}</IonText>
                    <IonIcon className={"alertIcon"} size={"large"} icon={closeCircleOutline}></IonIcon>
                </div>
            </IonModal>
        }
        { !errorMes  &&
            <IonModal cssClass={"alertModal ok"} isOpen={message.length>0} id="alertModal">
            <div className="alertDiv">
                <IonText className={"alertText"}>{message}</IonText>
                <IonIcon className={"alertIcon"} size={"large"} icon={checkmarkCircleOutline}></IonIcon>
            </div>
            </IonModal> 

        }
      </span>
    );
}
export default AlertComponent;