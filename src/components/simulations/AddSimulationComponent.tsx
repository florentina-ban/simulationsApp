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
    {id:3, name: "Shops", checked: true},
    {id:4, name: "Restaurants", checked: true}
]
}
interface AddSimFunc{
    openClose: (isOpen: boolean)=>void;
    updateSimulations: (value?: number) => void;
    updateAlertComp: (message: string, isError: boolean) => void
}

const AddSimulationComp: React.FC<AddSimFunc> = ({openClose, updateSimulations, updateAlertComp}) => {  
    const firstList: string[] = ["1234"]
    const [startWithInf, setStartWithInf] = useState(0);
    const [noOfDays, setNoOfDays] = useState(0);
    const {token} = useContext(AuthContext)
    const [simType, setSimType] = useState(placeTypes);
    const [simTypeList, setSimtypeList] = useState(firstList);
    const [school, setSchool] = useState(true)
    const [univ, setUniv] = useState(true)
    const [shop, setShop] = useState(true)
    const [restaurants, setRestaurants] = useState(true)

    const startSimulation = () => {
        if (startWithInf>0 && noOfDays>0){
            openClose(false);
            startSim(token,noOfDays,startWithInf, simTypeList).then(val=>{
                console.log("++++++++++++="+val)
                if (val==0){
                    console.log("equals")
                    updateAlertComp("Simulation stared", false)
                    updateSimulations(0);
                }
                else{
                    updateAlertComp("Cannot simulate", true)
                    updateSimulations(-1)
                }
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

    const addSimType = () => {
        var sim=""
        sim = school? sim+"1": sim;
        sim = univ? sim+"2": sim;
        sim = shop? sim+"3": sim;
        sim = restaurants? sim+"4" : sim;
        console.log("inside add function: "+sim)
        sim = sim.length==0 ? "0" : sim
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
                <IonItem>
                    <div>
                    <IonLabel>Options</IonLabel>
                    {simTypeList.map(list => 
                        <div className="flexDivRowCustom">
                        <IonText className="inlineDiv smallTopMargin smallSize"> - 
                        {list.split("").map((val)=> { 
                            switch (val){
                                case "0": return "Every thing is closed"
                                case "1": return "Schools "
                                case "2": return "Universities "
                                case "3": return "Shops "
                                case "4": return "Restaurants"
                            }
                        }
                        )}
                        </IonText>
                        <IonButton size="small" color="warning" onClick={()=>{removeSymType(list)}}><IonIcon icon={closeOutline}></IonIcon></IonButton>
                    </div>
                     )}
                    </div>
                </IonItem>
                    <IonLabel className="convertLabel">Select open intitutions</IonLabel>
               
                <div className="flexDivRow">
                <div className="flexDiv">
                    <div className="inlineDiv block">
                        <IonCheckbox checked={school} onIonChange={(e)=>setSchool(e.detail.checked)}/>
                        <IonLabel className="smallSize">Schools</IonLabel>
                    </div>
                    <div className="inlineDiv block">
                        <IonCheckbox  checked={univ} onIonChange={(e)=>setUniv(e.detail.checked)}/>
                        <IonLabel className="smallSize">Universities</IonLabel>
                    </div>
                </div>
                <div className="flexDiv">
                    <div className="inlineDiv block">
                        <IonCheckbox checked={shop} onIonChange={(e)=>setShop(e.detail.checked)}/>
                        <IonLabel className="smallSize">Shops</IonLabel>
                    </div>
                    <div className="inlineDiv block">
                        <IonCheckbox checked={restaurants} onIonChange={(e)=>setRestaurants(e.detail.checked)}/>
                        <IonLabel className="smallSize">Restaurants</IonLabel>
                    </div>
                </div>
                </div>
                     <IonItemDivider/>
                <IonFabButton onClick={addSimType} size="small" color="warning" slot="end"><IonIcon  icon={addOutline}></IonIcon></IonFabButton>
                <div id="modalButtons"> 
                <IonButton color="warning" onClick={() => openClose(false)}>Cancel </IonButton>
                <IonButton color="warning" onClick={() => startSimulation()}>Start Simulation </IonButton>
                </div>
            </IonList>
)
}

export default AddSimulationComp