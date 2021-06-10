import React, { useRef, useState } from "react"
import { Line } from "react-chartjs-2";
import InfectedChart from "./InfectedChart";
import { SimulationFull } from "./SimulationComp";
import './style/simulation.css'

const ChartsComp: React.FC<SimulationFull> = ({days, population}) => { 
    
const barDataImmMo =  {
    labels: days.map(d=> d.dayNo),
    datasets: [
        {label: "Immune",
        data: days.map(sim=>sim.noImuneUsers),
        backgroundColor: '#0990e3',
        borderColor: '#04127d',
        borderWidth: 1,
        pointRadius: 4,
        hoverBackgroundColor: '#07e3df',
        hoverBorderColor: '#0990e3',
         },
        {label: "Decesed",
         data: days.map(sim=>sim.noDeadUsers),
         backgroundColor: '#7d807e',
         borderColor: '#393b3a',
         borderWidth: 1,
         pointRadius: 4,
         hoverBackgroundColor: '#07e3df',
         hoverBorderColor: '#0990e3',
          }  ], 
}
    console.log('render ChartComponent')
    return( 
        <div id="chartComponent">
            <InfectedChart days={days} options='' population={population}/>
            <div className="controlChart">
                <Line data={barDataImmMo} type="line" className="lineChart"></Line>
            </div>
        </div> )
}

export default ChartsComp;
