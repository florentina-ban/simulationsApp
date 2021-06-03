import React from "react"
import { Line } from "react-chartjs-2";
import { SimulationFull } from "./SimulationComp";
import './style/simulation.css'

const ChartsComp: React.FC<SimulationFull> = ({days}) => { 
    const  barDataInf = {
        labels: days.map(d=> d.dayNo),
        datasets: [
            {label: "Infected",
            data: days.map(sim=>sim.infNo),
            pointBackgroundColor: days.map(sim=>{
                if(sim.scenario==1) return '#05a308'
                if (sim.scenario==2) return '#e8d500'
                else return '#e81405'
            }),
            borderColor: '#f01313',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 4,
            hoverBackgroundColor: '#f2f531',
        }], 
    }
const maxYAxis: number = Math.ceil((Math.max(...days.map(simD=>simD.infNo)))/100)*100

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
const lineOptions = {
    responsive: true,
    scales: {
        y: {
            suggestedMax: maxYAxis,
            max: maxYAxis
        }
    },
}

    return( 
        <div id="chartComponent">
            <div className="controlChart">
                <Line data={barDataInf} type="line" options={lineOptions} className="lineChart"></Line>
            </div>
            <div className="controlChart">
                <Line data={barDataImmMo} type="line" className="lineChart"></Line>
            </div>
        </div> )
}

export default ChartsComp;
