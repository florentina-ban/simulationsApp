import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonNote, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { CoordonatesProps } from '../interfaces/CoordonatesProps';
import { addListToStorage, clearCoords, getListFromStorage } from '../../utils/LocalStorageApi';
import {BackgroundGeolocation, BackgroundGeolocationEvents} from '@ionic-native/background-geolocation'
import './Monitor.css';
import { CurrentLocationContext } from './currentLocationProvider';
import { MyMap } from '../myRoutes/MapContainer';
import MenuComponent from '../menuStuff/MenuComponent';
import ToolbarComponent from '../menuStuff/ToolbarComponent';
import { MenuContext } from '../menuStuff/MenuProvider';
import { sendLocations } from '../../utils/ServerApi';
import { AuthContext } from '../login/AuthProvider';
import InfectedComponent from '../menuStuff/InfectedComponent';


interface ContainerProps { }
//46.765582,23.623961
const MonitorComponent: React.FC<ContainerProps> = () => {
  const [latitude, setlatitude] = useState(0)
  const [longitude, setLongitute] = useState(0)
  const [altitude, setAltitude] = useState(0)
  const [timeStamp, setTimeStamp] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [showCoordList, setShowCoordList] = useState(false)
  const [showMap, setShowMap] = useState(false);
  const [listSoFar, setListSoFar] = useState<CoordonatesProps[]>([])

  const { isMenuOpened, updateMenuState} = useContext(MenuContext)
  const {updateCurrentLocation}= useContext(CurrentLocationContext)
  const { token } = useContext(AuthContext)

  
const monitorFunctionBack = () => {
  BackgroundGeolocation.configure({
    desiredAccuracy: 10,
    stationaryRadius: 10,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false
  })
  BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe(location => {
    setlatitude(location.latitude)
    setLongitute(location.longitude)
    setAltitude(location.altitude || 0)
    setTimeStamp(location.time)
    setAccuracy(location.accuracy)
    if (updateCurrentLocation){
    updateCurrentLocation( { accuracy: location.accuracy,
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: location.time,
          altitude: location.altitude,
          coord: "POINT("+location.latitude+" "+location.longitude+");"
      })
    }
    getListFromStorage('coordList').then(list => {
      const size = list.myValue.length;
        console.log("diferent from before or empty list" )
        addListToStorage('coordList',
          { accuracy: accuracy, 
            location: 
              { lat: location.latitude, 
                lng: location.longitude,
                alt: location.altitude,
                time: location.time,
                coord: "POINT("+location.latitude+" "+location.longitude+");"
              }
          })
      })
  })
}
const options: PositionOptions = {enableHighAccuracy: true}

const monitorFunction = () => {
  navigator.geolocation.watchPosition(value=>{
    getListFromStorage('coordList').then(list => {
        const size = list.myValue.length;
        addListToStorage('coordList',
          { accuracy: accuracy, 
            latitude: value.coords.latitude, 
            longitute: value.coords.longitude,
            altiude: value.coords.altitude? value.coords.altitude : 0,
            timestamp: Math.ceil(value.timestamp/1000)
          })
         if (size>1){
           sendLocations(list.myValue, token).then(()=>{clearCoords()})
         } 
      })
      setlatitude(value.coords.latitude)
      setLongitute(value.coords.longitude)
      setAltitude(value.coords.altitude || 0)
      setTimeStamp(Math.ceil(value.timestamp/1000))
      setAccuracy(value.coords.accuracy)

      console.log("timestamp: "+Math.ceil(value.timestamp/1000))

      if (updateCurrentLocation){
        console.log("inside update")
        updateCurrentLocation( { accuracy: value.coords.accuracy,
              latitude:value.coords.latitude,
              longitude: value.coords.longitude,
              timestamp: Math.ceil(value.timestamp/1000),
              altitude: 0,
              coord: "POINT("+value.coords.latitude+" "+value.coords.longitude+");"
          })
        }
        else
        console.log("update function is null")
  },()=>{}, options)
}

const showListFunc = () => {
  if (showMap){
    setShowMap(false);
  }
  if (!showCoordList){
    console.log("!showList")
    getListFromStorage('coordList').then(list => {
      setListSoFar(list.myValue)
      setShowCoordList(true)
    })
  }
  else 
    setShowCoordList(false)
}
const showMapFunc = () => {
  if (showCoordList){
    setShowCoordList(false)
  }
  if (!showMap){
    setShowMap(true);
  }
  else {
    setShowMap(false);
  }
}

useEffect(monitorFunction,[]);

  return (
    <IonPage>
      <ToolbarComponent/>
      <MenuComponent/>
      <InfectedComponent/>
      <IonContent>
        <IonCard id="monitorContainerCard">
          <IonTitle>You are here</IonTitle>
          <IonCardContent>
              <IonList>
                <IonItem id="position">
                  <IonNote>Latitude: </IonNote>
                  <IonText>{latitude}</IonText>
               
                  <IonNote>Longitute: </IonNote>
                  <IonText>{longitude}</IonText>
                </IonItem>
                <div id="monitorList">
                  <IonButton onClick={showListFunc} color="warning">Show list</IonButton>
                  <IonButton onClick={showMapFunc} color="warning">Show on Map</IonButton>
                </div>
              </IonList>
          </IonCardContent>
        </IonCard>
        {showCoordList &&
          <IonList id="coordsList">
            {listSoFar.map( (coord) => <IonItem key={coord.timestamp.toString()}>
                <IonNote>lat: </IonNote><IonText>{coord.latitude}</IonText>
                <IonNote>lng: </IonNote><IonText>{coord.longitude}</IonText>
                <IonNote>time: </IonNote><IonText>{coord.timestamp}</IonText>
            </IonItem>)}
          </IonList>
        }
        {showMap &&
          <div id="mapContainer">
            <MyMap lat={latitude} lng={longitude} markPosition={true}/>
          </div>
        }
        </IonContent>
        </IonPage>
  );
};

export default MonitorComponent;
