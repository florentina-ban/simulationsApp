import { IonButton, IonCheckbox, IonFabButton, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonText} from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../login/AuthProvider";
import { startSim } from "../../utils/ServerApi";
import "./simulation.css";
import { addOutline, closeOutline } from "ionicons/icons";

interface PlaceType{
    id: number,
    name: string,
    checked: boolean
}
interface OneSimType{
    type: PlaceType[]
}
var placeTypes: OneSimType = { type: [
    {id:1, name: "Schools", checked: true},
    {id:2, name: "Universities", checked: true},
    {id:3, name: "Shopping", checked: true},
    // {id:4, name: "Restaurants"},
    // {id:5, name: "Churches"}
]
}
interface AddSimFunc{
    openClose: (isOpen: boolean)=>void;
    updateSimulations: (value?: number) => void;
}

const AddSimulationComp: React.FC<AddSimFunc> = ({openClose, updateSimulations}) => {  
    const firstList: string[] = ["123"]
    const [startWithInf, setStartWithInf] = useState(0);
    const [noOfDays, setNoOfDays] = useState(0);
    const {token} = useContext(AuthContext)
    const [simType, setSimType] = useState(placeTypes);
    const [simTypeList, setSimtypeList] = useState(firstList);
    const [school, setSchool] = useState(true)
    const [univ, setUniv] = useState(true)
    const [shop, setShop] = useState(true)

    const startSimulation = () => {
        if (startWithInf>0 && noOfDays>0){
            openClose(false);
            const types: number[] = simType.type.map( ({id, name, checked}) =>{
                if (checked)
                    return id
                else
                    return 0
            })
            startSim(token,noOfDays,startWithInf, types).then(val=>{
                if (val=="ok"){
                    updateSimulations(0);
                }
                else
                    updateSimulations(-1)
            })
        }
    }

    const addSimType = () => {
        var sim=""
        sim = school? sim+"1": sim;
        sim = univ? sim+"2": sim;
        sim = shop? sim+"3": sim;
        console.log("inside add function: "+sim)
        
        simTypeList.push(sim);
        setSimtypeList([...simTypeList]);
    }

    const removeSymType = (type: string) => {
        const indx = simTypeList.indexOf(type);
        simTypeList.splice(indx,1);
        setSimtypeList([...simTypeList])
    }

    useEffect(()=>{
        console.log(simType)
    },[simType])
    useEffect(()=>{
        console.log(JSON.stringify(simTypeList))
    },[simTypeList])
    useEffect(()=>{
        console.log(school.valueOf())
    },[school])

return(
            <IonList >
                <IonItem id="regionItem" className="simItem">
                    <IonLabel>Region</IonLabel>
                    <IonText>Cluj-Napoca</IonText>
                </IonItem>
                <IonItem id="noInfItem" className="simItem">
                    <IonLabel className="labelChild">Infected.</IonLabel>
                    <IonInput slot="end" className="inputNo" typeof="number" value={startWithInf}  onIonChange={(e)=> setStartWithInf(+e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem id="simDaysItem"className="simItem">
                    <IonLabel className="labelChild">Days</IonLabel>
                    <IonInput slot="end" className="inputNo" value={noOfDays} onIonChange={(e)=> setNoOfDays(+e.detail.value!)}></IonInput>
                </IonItem>
                {simTypeList.map(list => 
                    <div className="flexDivRowCustom">
                    <IonText className="inlineDiv smallTopMargin">
                    {list.split("").map((val)=> { 
                        switch (val){
                            case "1": return "Schools "
                            case "2": return "Universities "
                            case "3": return "Shops "
                        }
                    }
                    )}
                    </IonText>
                    <IonButton size="small" color="warning" onClick={()=>{removeSymType(list)}}><IonIcon icon={closeOutline}></IonIcon></IonButton>
                    
                    </div>
                )}
                
                <div className="flexDivRow">
                <div className="inlineDiv block">
                    <IonCheckbox slot="end" checked={school} onIonChange={(e)=>setSchool(e.detail.checked)}/>
                    <IonLabel>Schools</IonLabel>
                </div>
                <div className="inlineDiv block">
                    <IonCheckbox slot="end" checked={univ} onIonChange={(e)=>setUniv(e.detail.checked)}/>
                    <IonLabel>Universities</IonLabel>
                </div>
                <div className="inlineDiv block">
                    <IonCheckbox slot="end" checked={shop} onIonChange={(e)=>setShop(e.detail.checked)}/>
                    <IonLabel>Shops</IonLabel>
                </div>
                </div>
                <IonFabButton onClick={addSimType} size="small" color="warning" slot="end"><IonIcon  icon={addOutline}></IonIcon></IonFabButton>
                <div id="modalButtons"> 
                <IonButton color="warning" onClick={() => openClose(false)}>Cancel </IonButton>
                <IonButton color="warning" onClick={() => startSimulation()}>Start Simulation </IonButton>
                </div>
            </IonList>
)
}

export default AddSimulationComp