import React from 'react';
import { mapsApiKey } from './MyMapKey'
import { Circle, GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { compose, withProps } from 'recompose';
import { CoordonatesProps } from '../../utils/CoordonatesProps';
interface MyRouteProps {
  route: CoordonatesProps[]
  markPosition: boolean
  forSimulation: boolean
  onMapClick?: (e: any) => void
  currentDay: number
  onMarkerClick?: (e: any) => void,
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

)(props => {
  console.log("contactPointsSize: "+ props.route.length)
  if (props.route.length>100){
    props.route.sort((a,b)=>{return a.noEncouters!-b.noEncouters!})
  }
  return(
    
  <GoogleMap
      zoom={12}
      center={center}
      onClick={props.onMapClick}
  >  
  { props.route &&  props.route.length>0 && props.forSimulation==false &&
    props.route.slice(0,100).map( ({latitude, longitude}) => { 
      const a: google.maps.LatLng = new google.maps.LatLng({lat: latitude, lng: longitude})
      return <Circle key={latitude+'_'+longitude} center={a} defaultRadius={15} defaultOptions={ {fillColor:"red", strokeColor: "red"}} /> } ) }

      {
        props.route &&  props.route.length>0 && props.forSimulation &&
        props.route.map( ({latitude, longitude, noEncouters, coord_id}) => { 
          const a: google.maps.LatLng = new google.maps.LatLng({lat: latitude, lng: longitude})
          return <Circle key={coord_id} center={a} defaultRadius={noEncouters!>150 ? 150 : noEncouters} onClick={() => {props.onMarkerClick!(noEncouters)}} defaultOptions={ {fillColor:"red", strokeColor: "red"}} /> } ) }
    
  </GoogleMap> 
)})

const Routes: React.FC<MyRouteProps> = ({route, markPosition}) => {  
 
  return(
    <MyRouteMap route={route} markPosition={true}/>
  )
}

export default Routes;