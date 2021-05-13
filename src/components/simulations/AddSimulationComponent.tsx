import { IonButton, IonCard, IonCardSubtitle, IonCardTitle,IonContent, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonRange, IonText} from "@ionic/react"
import React, { useContext, useState } from "react"
import { AuthContext } from "../login/AuthProvider";
import { startSim } from "../../utils/ServerApi";
import "./simulation.css";
import ToolbarComponent from "../menuStuff/ToolbarComponent";
import AlertComponent from "../menuStuff/AlertComponent";
import { addOutline, saveOutline } from "ionicons/icons";
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface PlaceType{
    id: number,
    name: string,
    checked: boolean
}

var placeTypes: PlaceType[] = [
    {id:0, name: "Administrative", checked: true},
    {id:1, name: "Schools", checked: true},
    {id:2, name: "Universities", checked: true},
    {id:3, name: "Food Stores", checked: true},
    {id:4, name: "Restaurants", checked: true},
    {id:5, name: "Churches", checked: true},
    {id:6, name: "Other Stores", checked: true},
    {id:7, name: "Relaxation", checked: true},
    {id:8, name: "Medical", checked: true},
    {id:9, name: "Transportation", checked: true},
    {id:10, name: "Lodging", checked: true},
]
var scenarioGreen: PlaceType[] = [
    {id:0, name: "Administrative", checked: true},
    {id:1, name: "Schools", checked: true},
    {id:2, name: "Universities", checked: true},
    {id:3, name: "Food Stores", checked: true},
    {id:4, name: "Restaurants", checked: true},
    {id:5, name: "Churches", checked: true},
    {id:6, name: "Other Stores", checked: true},
    {id:7, name: "Relaxation", checked: true},
    {id:8, name: "Medical", checked: true},
    {id:9, name: "Transportation", checked: true},
    {id:10, name: "Lodging", checked: true},
]

var scenarioYellow: PlaceType[] = [
    {id:0, name: "Administrative", checked: true},
    {id:1, name: "Schools", checked: true},
    {id:2, name: "Universities", checked: true},
    {id:3, name: "Food Stores", checked: true},
    {id:4, name: "Restaurants", checked: false},
    {id:5, name: "Churches", checked: true},
    {id:6, name: "Other Stores", checked: false},
    {id:7, name: "Relaxation", checked: false},
    {id:8, name: "Medical", checked: true},
    {id:9, name: "Transportation", checked: true},
    {id:10, name: "Lodging", checked: true},
]
var scenarioRed: PlaceType[] = [
    {id:0, name: "Administrative", checked: true},
    {id:1, name: "Schools", checked: false},
    {id:2, name: "Universities", checked: false},
    {id:3, name: "Food Stores", checked: true},
    {id:4, name: "Restaurants", checked: false},
    {id:5, name: "Churches", checked: false},
    {id:6, name: "Other Stores", checked: false},
    {id:7, name: "Relaxation", checked: false},
    {id:8, name: "Medical", checked: true},
    {id:9, name: "Transportation", checked: false},
    {id:10, name: "Lodging", checked: false},
]

interface AddSimFunc{
    updateSimulations: (value?: number) => void;
}

const AddSimulationComp: React.FC<AddSimFunc> = ({updateSimulations}) => {  
    const [openPlaces, setOpenPlaces] = useState(placeTypes)
    const [message, setMessage] = useState("");
    const [someError, setSomeError] = useState(false);
    const [showScenarios, setShowScenarios] = useState(false)
    const [showLimits, setShowLimits] = useState(false)


    const [startWithInf, setStartWithInf] = useState(0);
    const [noOfDays, setNoOfDays] = useState(0);
    const {token} = useContext(AuthContext)

    const [ mortality, setMortality] = useState(0);
    const [ immunity, setImmunity] = useState(80);
    const [ maskEff, setMaskEff ] =  useState(50);

    const [green, setGreen] = useState (scenarioGreen)
    const [yellow, setYellow] = useState(scenarioYellow)
    const [red, setRed] = useState(scenarioRed)

    const [greenL, setGreenL] = useState (1)
    const [yellowL, setYellowL] = useState(2)
    const [redL, setRedL] = useState(3)

    // const codeTypes = ()=>{
    //     var list: string[] = []
    //     simTypeList.forEach(oneSimType=>{
    //         var type: string=""
    //         oneSimType.type.forEach(ty => {
    //             type = ty.checked ? type+ty.id.toString() : type 
    //         })
    //         type = type.length==0 ? "0" : type
    //         list.push(type)
    //     })
    //     return list;
    // }

    const updateAlertComp = (mess: string, isErr: boolean) => {
        setMessage(mess)
        setSomeError(isErr)
    }

    const startSimulation = () => {
        if (startWithInf>0 && noOfDays>0){
            startSim(token,noOfDays,startWithInf,mortality, immunity, maskEff).then(val=>{
                console.log("++++++++++++="+val)
                if (val==0){
                    console.log("equals")
                    updateAlertComp("Simulation stared",false)
                    // updateSimulations(0);
                }
                else{
                    updateAlertComp("Cannot simulate", true);
                    //updateSimulations(-1)
                }
            }, ()=>{
                updateAlertComp("Cannot simulate", true);
            })
        }
        else{
            if (startWithInf==0)
                updateAlertComp("Add infected no", true)
            else {
                updateAlertComp("Add simulation days", true)
            }
        }
    }

    const changeScenarios = () => {

    }
    
    const changeLimits = () => {

    }

    const changeRed = (id: number, checked: boolean) => {
        var place=red.find(x=>x.id==id)
        console.log(place)
        place!.checked=checked
        setRed([...red])      
    }
    const changeYellow = (id: number, checked: boolean) => {
        var place=yellow.find(x=>x.id==id)
        console.log(place)
        place!.checked=checked
        setYellow([...yellow])      
    }
    const changeGreen = (id: number, checked: boolean) => {
        var place=green.find(x=>x.id==id)
        console.log(place)
        place!.checked=checked
        setGreen([...green])      
    }
    // const addSimType = () => {
    //     simTypeList.splice(0,0,{type: [...openPlaces]});
    //     setSimtypeList([...simTypeList]);
    //     const newOpenPlaces = openPlaces.map(place => {return {...place} })
    //     setOpenPlaces(newOpenPlaces)
    // }

    const updateMessage = (mes:string) =>{
        setMessage("")
    }

return(
    <IonPage>
        <ToolbarComponent/>
        <AlertComponent message={message} errorMes={someError} updateMessage={updateMessage}/> 
        <IonContent>
            <div id="flez" >
            <IonCard id="createSimCard">
                <IonCardTitle className="title">Create new simulation</IonCardTitle>
                <IonList>
                    <IonItem key="regionItem" id="regionItem" className="simItem">
                        <IonLabel>Region</IonLabel>
                        <IonText>Cluj-Napoca</IonText>
                    </IonItem>
                    <IonItem key="noInfItem" id="noInfItem" className="simItem">
                        <IonLabel className="labelChild">Infected</IonLabel>
                        <IonInput slot="end" className="inputNo" typeof="number" value={startWithInf}  onIonChange={(e)=> setStartWithInf(+e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem key="simDaysItem" id="simDaysItem"className="simItem">
                        <IonLabel className="labelChild">Days</IonLabel>
                        <IonInput slot="end" className="inputNo" value={noOfDays} onIonChange={(e)=> setNoOfDays(+e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem key="dead" className="simItem">
                        <IonLabel>Mortality</IonLabel>
                        <IonRange slot="end" className="inputNo" value={mortality} pin={true} step={1} min={0} max={10} onIonChange={(e)=>setMortality(e.detail.value? +e.detail.value : 0)}>
                        <IonLabel slot="start">0%</IonLabel>
                        <IonLabel slot="end">10%</IonLabel>
                        </IonRange>
                    </IonItem>
                    <IonItem key="immune" className="simItem">
                        <IonLabel>Immunity</IonLabel>
                        <IonRange slot="end" className="inputNo" value={immunity} pin={true} step={5} min={0} max={100} onIonChange={(e)=>setImmunity(e.detail.value? +e.detail.value : 0)}>
                        <IonLabel slot="start">0%</IonLabel>
                        <IonLabel slot="end">100%</IonLabel>
                        </IonRange>
                    </IonItem>
                    <IonItem key="maskEfficiency" id="maskEfficiency"className="simItem">
                        <IonLabel className="labelChild">Mask Efficiency</IonLabel>
                        <IonRange slot="end" className="inputNo" value={maskEff} pin={true} step={5} min={0} max={100} onIonChange={(e)=>setMaskEff(e.detail.value? +e.detail.value : 0)}>
                        <IonLabel slot="start">0%</IonLabel>
                        <IonLabel slot="end">100%</IonLabel>
                        </IonRange>
                    </IonItem>
                
                <IonItem id="modalButtons"> 
                    <IonButton color="warning" size="default" slot="end" onClick={() => startSimulation()}>Start Simulation </IonButton>
                </IonItem>
            </IonList>
            </IonCard>
            <IonCard id="optionsCart">
                <IonCardTitle className="title">Other options</IonCardTitle>
                <IonCardSubtitle className="subtitle1" onClick={()=>setShowScenarios(!showScenarios)}>Open locations based on scenarios</IonCardSubtitle>
               { showScenarios && 
                <div className="flexDivRow" >
                    <div>
                    { openPlaces.map( op => 
                        <IonList className="placesList">
                            <IonItem key={op.name} className="location">{op.name}
                            <div slot="end">
                            <div className="inl green" onClick={() =>changeGreen(op.id, true)}></div>
                            <div className="inl yellow" onClick={() =>changeYellow(op.id, true)}></div>
                            <div className="inl red" onClick={() =>changeRed(op.id, true)}></div>
                            </div>
                            </IonItem>
                        </IonList>  ) }   
                        </div>
                     <div className="setDimensionsList"> 
                     <h2>Green</h2>
                        <div className="swapCard"> 
                                { green.filter(op => op.checked).map( op => 
                                <div className="smallItem" onClick={() => {changeGreen(op.id,false)}}>{op.name}
                                    {/* <IonLabel className="smallSize swapElement">{op.name}</IonLabel> */}
                                </div>
                            ) }
                        </div>
                        <h2>Yellow</h2>
                        <div className="swapCard"> 
                                { yellow.filter(op => op.checked).map( op => 
                                <div className="smallItem" onClick={() => {changeYellow(op.id, false)}}>{op.name}
                                    {/* <IonNote className="smallSize swapElement"></IonNote> */}
                                </div>
                            ) }
                        </div>
                        <h2>Red</h2>
                        <div className="swapCard"> 
                                { red.filter(op => op.checked).map( op => 
                                <div className="smallItem" onClick={() => {changeRed(op.id, false)}}>{op.name}
                                    {/* <IonNote className="smallSize swapElement">{op.name}</IonNote> */}
                                </div>
                            ) }
                        </div>
                        <IonFabButton onClick={changeScenarios} className="saveScenButton" size="small" color="warning" slot="end"><IonIcon  icon={saveOutline}></IonIcon></IonFabButton>
                    </div> 
                    </div>
                }
                <IonCardSubtitle className="subtitle1" onClick={()=>setShowLimits(!showLimits)}>Infected limits</IonCardSubtitle>
                { showLimits &&
                    <div >
                        <IonList>
                            < IonItem key="greenLimits">
                                <IonLabel>Green Scenario</IonLabel>
                                <IonRange slot="end" className="inputNo" value={greenL} pin={true} step={1} min={0} max={5} onIonChange={(e)=>setMortality(e.detail.value? +e.detail.value : 0)}>
                                <IonLabel slot="start">0&#8240;</IonLabel>
                                <IonLabel slot="end">5&#8240;</IonLabel>
                                </IonRange>
                            </IonItem>
                            < IonItem key="yellowLimits">
                                <IonLabel>Yellow Scenario</IonLabel>
                                <IonRange slot="end" className="inputNo" value={yellowL} pin={true} step={1} min={0} max={5} onIonChange={(e)=>setMortality(e.detail.value? +e.detail.value : 0)}>
                                <IonLabel slot="start">0&#8240;</IonLabel>
                                <IonLabel slot="end">5&#8240;</IonLabel>
                                </IonRange>
                            </IonItem>
                            < IonItem key="redLimits">
                                <IonLabel>Red Scenario</IonLabel>
                                <IonRange slot="end" className="inputNo" value={redL} pin={true} step={1} min={0} max={5} onIonChange={(e)=>setMortality(e.detail.value? +e.detail.value : 0)}>
                                <IonLabel slot="start">0&#8240;</IonLabel>
                                <IonLabel slot="end">5&#8240;</IonLabel>
                                </IonRange>
                            </IonItem>
                            <IonFabButton onClick={changeLimits} className="saveScenButton" size="small" color="warning" slot="end"><IonIcon  icon={saveOutline}></IonIcon></IonFabButton>

                            </IonList> 
                    </div>
                }
            </IonCard>
            </div>
            </IonContent>
            </IonPage>
)
}

export default AddSimulationComp