import { IonButton, IonCard, IonCardContent, IonContent, IonInput, IonItem, IonList, IonNote, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext,  useState } from 'react';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import Region from './RegionProps';
import { MyRouteMap } from '../map/MapComponent';
import { sendBoundaries } from '../../services/ServerApi';
import { AuthContext } from '../authentification/AuthProvider';

export interface OrderedSimpleCoordProps {
  lat: number,
  lng: number, 
  order: number
}

interface ContainerProps { }
//46.765582,23.623961
const RegionComponent: React.FC<ContainerProps> = () => {
    var bound: OrderedSimpleCoordProps[] = []
    const [boundaries, setBoundaries] = useState(bound);
  const [name, setName] = useState("Cluj")
  const [population, setPop] = useState(1000)
const {token} = useContext(AuthContext);
  const [latitude, setlatitude] = useState(46.0);


const options: PositionOptions = {enableHighAccuracy: true}
const saveRegion = ()=> {
    const region: Region = {name, population, boundaries}
    sendBoundaries(region, token)
}

const saveBoundary = (e: any) =>{
    const value: OrderedSimpleCoordProps = {lat: e.latLng.lat(), lng: e.latLng.lng(), order: boundaries.length }
    boundaries.splice(boundaries.length, 0, value)
    setBoundaries(boundaries)
    setlatitude(e.latLng.lat())
    console.log("boundaries: "+JSON.stringify(boundaries))
}

  return (
    <IonPage>
      <ToolbarComponent/>
      <IonContent>
        <IonCard id="monitorContainerCard">
          <IonTitle>You are here</IonTitle>
          <IonCardContent>
              <IonList>
                <IonItem id="position">
                  <IonNote>Name: </IonNote>
                  <IonInput value={name} onIonChange={e => setName(e.detail.value ? e.detail.value  : name)}/>
                  <IonNote>Population: </IonNote> 
                  <IonInput value={population} onIonChange={e => setPop(e.detail.value? +e.detail.value : population)}/>
                </IonItem>
                <div id="monitorList">
                  <IonButton onClick={saveRegion} color="success">Save Region</IonButton>
                </div>
              </IonList>
          </IonCardContent>
        </IonCard>
       
     
          <div id="mapContainer">
            <MyRouteMap route={boundaries} lat={latitude} markPosition={true} onMapClick={saveBoundary}/>
          </div>
        </IonContent>
        </IonPage>
  );
};

export default RegionComponent;
