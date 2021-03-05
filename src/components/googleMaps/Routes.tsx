import React, { useContext, useEffect, useState } from 'react';
import { mapsApiKey } from './MyMapKey'
//import { GoogleMap, useLoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { Circle, GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { compose, lifecycle, withProps } from 'recompose';
import { SimpleCoordProps } from '../interfaces/SimpleCoordProps';
import { type } from 'os';
interface MyRouteProps {
  route: SimpleCoordProps[]
  markPosition: boolean
  // onMapClick?: (e: any) => void,
  // onMarkerClick?: (e: any) => void,
}
const mapStyles = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 46.767,
  lng: 23.600
}
const lib: Libraries = ['places']

export const MyRouteMap = compose<MyRouteProps, any>(
   
  withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%`, width: '100%'}} />,
      mapElement: <div style={{ height: `100%` }} />,
      googleMapsApiKey: mapsApiKey,
      
  }),
  withScriptjs,
  withGoogleMap,

)(props => (
    
  <GoogleMap
      zoom={15}
      center={props.route.length>0? { lat: props.route[0].lat, lng: props.route[0].lng} : center}
  >  
  { props.route &&   
    props.route.map( ({lat, lng }) => { 
      return <Circle center={{lat: lat, lng: lng}} defaultRadius={15} /> } ) }
  </GoogleMap> 
))

const Routes: React.FC<MyRouteProps> = ({route, markPosition}) => {  
 
  return(
    <MyRouteMap route={route} markPosition={true}/>
  )
}

export default Routes;