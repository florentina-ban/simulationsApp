import { IonButton, IonButtons, IonCard, IonCardTitle, IonContent, IonFabButton, IonIcon, IonItem, IonList, IonPage } from "@ionic/react"
import { arrowBack, arrowForward, barChart, expandOutline, playForward, playOutline, saveOutline } from "ionicons/icons"
import React from "react"
import ToolbarComponent from "../toolbar/ToolbarComponent"
import './help.css'

const HelpComp: React.FC = () => { 

    return (
        <IonPage>
            <ToolbarComponent/>
            <IonContent>
                <div id="rootDiv">
                <IonCard className="comp" id="new">
                    <IonCardTitle className="title">Create new Simulation</IonCardTitle>
                    <IonList>
                    <IonItem>Set scenarios</IonItem>
                    <IonItem>Hit save button <IonFabButton slot="end" size="small" color="warning"><IonIcon icon={saveOutline}></IonIcon></IonFabButton></IonItem>
                    <IonItem>Set scenarios' limits</IonItem>
                    <IonItem>Hit save button <IonFabButton slot="end" size="small" color="warning"><IonIcon icon={saveOutline}></IonIcon></IonFabButton></IonItem>
                    <IonItem>Set simulation's properties</IonItem>
                    <IonItem>Hit Start Simulation button <IonButton color="warning" size="default" slot="end">Start Simulation </IonButton></IonItem>
                    </IonList>
                </IonCard>
                    
                
                <IonCard className="comp" id="view">
                    <IonCardTitle className="title">View Results</IonCardTitle>
                    <IonList>
                    <IonItem>Choose Simulation</IonItem>
                    <IonItem>Observe simulation's parameters</IonItem>
                    <IonItem>View Results<IonButton size="small" slot="end" color="warning">View</IonButton></IonItem>
                    <IonItem>View contact points on map</IonItem>
                        <IonItem className="sublist1">Change days <IonButtons slot="end">
                        <IonFabButton color="warning" size="small"><IonIcon icon={arrowBack}/></IonFabButton>
                        <IonFabButton color="warning" size="small"><IonIcon icon={arrowForward}/></IonFabButton>
                        </IonButtons> </IonItem>
                        <IonItem>Click on red circles</IonItem>
                    <IonItem>View infected chart</IonItem>
                        <IonItem className="sublist1">Currently infected<IonFabButton size="small" color="warning" slot="end">Def</IonFabButton></IonItem>
                        <IonItem className="sublist1">New infected<IonFabButton size="small" color="warning" slot="end">New</IonFabButton></IonItem>
                        <IonItem className="sublist1">Total infected<IonFabButton size="small" color="warning" slot="end">T</IonFabButton></IonItem>
                        <IonItem className="sublist1">Show regression<IonFabButton size="small" color="warning" slot="end"><IonIcon icon={expandOutline}/></IonFabButton></IonItem>
                        <IonItem className="sublist1">Incidence<IonFabButton size="small" color="warning" slot="end">&#8240;</IonFabButton></IonItem>
                        <IonItem className="sublist1">Save chart as image<IonFabButton size="small" color="warning" slot="end"><IonIcon icon={saveOutline}/></IonFabButton></IonItem>
                    <IonItem>View decesed and imune chart</IonItem>
                    <IonItem>Delete simulation<IonButton slot="end" color="warning">Delete</IonButton></IonItem>
                    </IonList>
                </IonCard>
                
                <IonCard className="comp" id="compare">
                    <IonCardTitle className="title">Compare Simulations</IonCardTitle>
                    <IonList>
                    <IonItem>Choose simulations</IonItem>
                    <IonItem>Compare start parameters <IonFabButton slot="end" size="small" color="none"><IonIcon icon={arrowForward}/></IonFabButton></IonItem>
                    <IonItem>Hit compare button <IonFabButton slot="end" size="small" color="warning"><IonIcon icon={playOutline}></IonIcon></IonFabButton></IonItem>
                    <IonItem>View current infected comparison</IonItem>
                    <IonItem className="sublist1">View as bar chart <IonFabButton slot="end" size="small" color="warning"><IonIcon icon={barChart}></IonIcon></IonFabButton></IonItem>
                    <IonItem className="sublist1">Save chart as image <IonFabButton color="warning" size="small" slot="end"><IonIcon icon={saveOutline}/> </IonFabButton></IonItem>
                    <IonItem>View imune and decesed comparison</IonItem>
                    <IonItem>View summary table</IonItem>
                
                    </IonList>
                </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default HelpComp
