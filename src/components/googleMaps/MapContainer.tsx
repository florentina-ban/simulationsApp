import React, { useContext, useEffect, useState } from 'react';
import { mapsApiKey } from './MyMapKey'
//import { GoogleMap, useLoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { RouteComponentProps, useLocation } from 'react-router';
import { CurrentLocationContext } from '../currentLocationProvider';
import { compose, lifecycle, withProps } from 'recompose';
interface MyMapProps {
  lat: number;
  lng: number;
  markPosition: boolean
  // onMapClick?: (e: any) => void,
  // onMarkerClick?: (e: any) => void,
}
const mapStyles = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 26,
  lng: 40
}
const lib: Libraries = ['places']

export const MyMap = compose<MyMapProps, any>(
  withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%`, width: '100%'}} />,
      mapElement: <div style={{ height: `100%` }} />,
      googleMapsApiKey: mapsApiKey,
      
  }),
  withScriptjs,
  withGoogleMap,
  // lifecycle({
  //     componentDidMount() {
          // const DirectionsService = new google.maps.DirectionsService();

          // DirectionsService.route({
          //     origin: new google.maps.LatLng(45.29233869999999, -70.06117489999997),
          //     destination: new google.maps.LatLng(45.3570637, -70.06257679999999),
          //     travelMode: google.maps.TravelMode.DRIVING,
          // }, (result, status) => {
          //     if (status === google.maps.DirectionsStatus.OK) {
          //         this.setState({
          //             directions: result,
          //         });
          //     } else {
          //         console.error(`error fetching directions ${result}`);
          //     }
          // });
  //     }
  // })
)(props => (
  <GoogleMap
      zoom={12}
      center={ {lat: props.lat? props.lat : 10, lng: props.lng ? props.lng : 20} }
  >
      { props.markPosition && 
        <Marker position={ { lat: props.lat, lng: props.lng } }/>
      }
  </GoogleMap> 
))

const MapContainer: React.FC<MyMapProps> = ({lat, lng}) => {  
  const {haveCurrentLocation, currentLocationError, currentLocation} = useContext(CurrentLocationContext);
 
  const [latitude, setLat ] = useState(lat);
  const [longitude, setLng ]= useState(lng);
 console.log("lat: "+lat+" lng: "+lng)
  if (currentLocation){
  console.log(JSON.stringify(currentLocation)+"__________");
  }
  else {
    console.log("no current Location")
  }
//  const {isLoaded, loadError} = useLoadScript({
//    googleMapsApiKey: mapsApiKey,
//    libraries: lib
//  });

  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition((response)=>{
  //     setLat(response.coords.latitude)
  //     setLng(response.coords.longitude)
  //     setLocation( { lat: response.coords.latitude, lng: response.coords.longitude})
     
  //   });
  // }

  return(
    <MyMap lat={lat} lng={lng} />
  )
}

export default MapContainer;