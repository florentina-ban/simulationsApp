import React, { useEffect, useState } from "react";
import { Circle, DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
import { SimpleCoordProps } from "../interfaces/SimpleCoordProps";
import { mapsApiKey } from "../myRoutes/MyMapKey";
const center = {
    lat: 46.767,
    lng: 23.600
}
interface MyMapProps {
    lat: number;
    lng: number;
    markPosition: boolean
}

export const MyDirection = compose<MyMapProps, any>(
   
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%`, width: '100%'}} />,
        mapElement: <div style={{ height: `100%` }} />,
        googleMapsApiKey: mapsApiKey,
        
    }),
    withScriptjs,
    withGoogleMap,
  )
  (props => {
    const dRez: any = null; 
    const [direction, setdir] = useState(dRez)
   
    const initFunc = () => {

    const service: google.maps.DirectionsService = new google.maps.DirectionsService()
    const ori: google.maps.LatLng = new google.maps.LatLng ({lat: 46.78887189130514 , lng: 23.615502075294042})
    const dest: google.maps.LatLng = new google.maps.LatLng ({lat: 46.78707482960165 , lng: 23.622510865790687})
    const travM: google.maps.TravelMode = google.maps.TravelMode.WALKING

    const req: google.maps.DirectionsRequest = {
        origin: ori,
        destination: dest,
        provideRouteAlternatives: true,
        travelMode: travM
        }

    service.route(req, (rez) => {
      rez.routes[2].legs[0].steps.forEach(value => {
        console.log("path: "+ JSON.stringify(value.path))
      });
      console.log("noPaths: "+rez.routes[0].legs[0].steps.length)
      setdir(rez);
      })
    }

    const printFunc = () => {
      if (!direction) 
        return;

    }
    useEffect(initFunc,[]);
    useEffect(printFunc,[direction])
    const optionRed: google.maps.CircleOptions = {fillColor: "RED", strokeColor: "RED"} 
    const optionYellow: google.maps.CircleOptions = {fillColor: "YELLOW", strokeColor: "YELLOW"} 
    const optionblue: google.maps.CircleOptions = {fillColor: "BLUE", strokeColor: "BLUE"} 

    return (
      
    <GoogleMap
        zoom={15}
        center={center}
    >  
    { direction &&
      <DirectionsRenderer directions={direction}></DirectionsRenderer> 
    }

    { direction && 
      direction.routes[0].legs[0].steps[0].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionRed}/> } ) 
    }

{ direction && 
      direction.routes[0].legs[0].steps[1].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionYellow}/> } ) 
    }
    {/* { direction && 
      direction.routes[0].legs[0].steps[2].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionblue}/> } ) 
    }
     { direction && 
      direction.routes[0].legs[0].steps[3].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionRed}/> } ) 
    }
     { direction && 
      direction.routes[0].legs[0].steps[4].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionYellow}/> } ) 
    }
     { direction && 
      direction.routes[0].legs[0].steps[5].path.map( (x: any) => { 
       let cen : google.maps.LatLng = new google.maps.LatLng({ lat: x.lat(), lng: x.lng() });
      return <Circle center={cen} defaultRadius={15} options={optionblue}/> } ) 
    } */}
    </GoogleMap> 
  )
      });
   

export default MyDirection;