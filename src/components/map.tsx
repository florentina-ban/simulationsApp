import { render } from '@testing-library/react';
import React from 'react';
import './mapbox-gl.css'


class BoxComponent extends React.Component {
    constructor(props: {} | Readonly<{}>){
        super(props)
        // this.mBox = React.createRef()
    }
   
   func() {
        
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvcmUtYmFuIiwiYSI6ImNrb2NxZWVtazBzdWMyd29kbnM1MWNvODMifQ.lOutxVzZMR0DHL33mHoFYg';
    var map = new mapboxgl.Map({
    container: 'mBoxDiv',
    style: 'mapbox://styles/mapbox/streets-v11'
    })
    }
    
    render(){
        return(
        <div id="mBoxDiv" ref="mBox">
        </div>
        )
    }
}
export default BoxComponent
