import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonNote, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { CoordonatesProps } from './interfaces/CoordonatesProps';
import { addToStorage, getListFromStorage } from './LocalStorageApi';
import {BackgroundGeolocation, BackgroundGeolocationEvents} from '@ionic-native/background-geolocation'
import './Monitor.css';
import { CurrentLocationContext } from './currentLocationProvider';
import { MyMap } from './myRoutes/MapContainer';
import MenuComponent from './menuStuff/MenuComponent';
import ToolbarComponent from './menuStuff/ToolbarComponent';
import { MenuContext } from './menuStuff/MenuProvider';


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
      location: {
          lat: location.latitude,
          lng: location.longitude,
          time: location.time,
          alt: location.altitude
      }})
    }
    getListFromStorage('coordList').then(list => {
      const size = list.myValue.length;
      if ( size==0 || location.latitude != list.myValue[size-1].location.lat || location.longitude != list.myValue[size-1].location.lng ){
        console.log("diferent from before or empty list" )
        addToStorage('coordList',
          { accuracy: accuracy, 
            location: 
              { lat: location.latitude, 
                lng: location.longitude,
                alt: location.altitude,
                time: location.time
              }
          })
        }
      })
  })
}
const options: PositionOptions = {enableHighAccuracy: true}
const monitorFunction = () => {
  navigator.geolocation.watchPosition(value=>{
    getListFromStorage('coordList').then(list => {
        const size = list.myValue.length;
        if ( size==0 || value.coords.latitude != list.myValue[size-1].location.lat || value.coords.longitude != list.myValue[size-1].location.lng ){
          console.log("diferent from before or empty list" )
          addToStorage('coordList',
            { accuracy: accuracy, 
              location: 
                { lat: value.coords.latitude, 
                  lng: value.coords.longitude,
                  alt: value.coords.altitude,
                  time: value.timestamp
                }
            })
          }
        })
      setlatitude(value.coords.latitude)
      setLongitute(value.coords.longitude)
      setAltitude(value.coords.altitude || 0)
      setTimeStamp(value.timestamp)
      setAccuracy(value.coords.accuracy)

      if (updateCurrentLocation){
        console.log("inside update")
        updateCurrentLocation( { accuracy: value.coords.accuracy,
          location: {
              lat:value.coords.latitude,
              lng: value.coords.longitude,
              time: value.timestamp,
              alt: 0
          }})
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
                  <IonButton onClick={showListFunc} color="success">Show list</IonButton>
                  <IonButton onClick={showMapFunc} color="success">Show on Map</IonButton>
                </div>
              </IonList>
          </IonCardContent>
        </IonCard>
        {showCoordList &&
          <IonList id="coordsList">
            {listSoFar.map( (coord) => <IonItem key={coord.location.time.toString()}>
                <IonNote>lat: </IonNote><IonText>{coord.location.lat}</IonText>
                <IonNote>lng: </IonNote><IonText>{coord.location.lng}</IonText>
                <IonNote>time: </IonNote><IonText>{coord.location.time}</IonText>
            </IonItem>)}
          </IonList>
        }
        {showMap &&
          <div id="mapContainer">
            <MyMap lat={latitude} lng={longitude} markPosition={true}/>
          </div>
        }
        {isMenuOpened &&
          <MenuComponent/>
        }
        </IonContent>
        </IonPage>
  );
};

export default MonitorComponent;
