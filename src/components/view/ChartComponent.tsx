import { IonFabButton, IonIcon } from "@ionic/react";
import { Chart } from "chart.js";
import { saveOutline } from "ionicons/icons";
import React, { useRef, useState } from "react"
import { Line } from "react-chartjs-2";
import { download } from "../../utils/downLoad";
import { getCartData } from "../../utils/utils";
import { SimulationFull } from "./SimulationComp";
import './style/simulation.css'

const ChartsComp: React.FC<SimulationFull> = ({days}) => { 
    const [dataSet, setDataSet] = useState(0)
    const chartRef0 = useRef<Chart>(null)
    const chartRef1 = useRef<Chart>(null)
    const chartRef2 = useRef<Chart>(null)

    const dataCurrInf = getCartData(days, 'Current Cases',1,'currentInf')
    const dataTotalInf = getCartData(days, 'Total Cases',3,'totalInf')
    const dataNewInf = getCartData(days, 'New Cases',4,'newInf')

    const barDataCurrInf = {
        labels: days.map(d=> d.dayNo),
        datasets: [ dataCurrInf ], 
    }
    const barDataTotalInf = {
        labels: days.map(d=> d.dayNo),
        datasets: [ dataTotalInf ], 
    }
    const barDataNewInf = {
        labels: days.map(d=> d.dayNo),
        datasets: [ dataNewInf ], 
    }
    console.log("----------->")
    console.log(dataTotalInf.data)

    const maxYAxisC: number = Math.ceil((Math.max(...days.map(simD=>simD.infNo)))/100)*100
    const maxYAxisT: number =  Math.ceil((Math.max(...dataTotalInf.data))/100)*100
    const maxYAxisN: number =  Math.ceil((Math.max(...dataNewInf.data))/100)*100

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
            suggestedMax: dataSet==0 ? maxYAxisC : dataSet==1 ? maxYAxisN : maxYAxisT,
            max: dataSet==0 ? maxYAxisC : dataSet==1 ? maxYAxisN : maxYAxisT,
        }
    },
}

const downloadChart = () => {
    const image = dataSet==0 ? chartRef0.current?.toBase64Image() : dataSet==1? chartRef1.current?.toBase64Image() : chartRef2.current?.toBase64Image();
    download(image, "view_chart.jpg",'image/gif')
}
    return( 
        <div id="chartComponent">
            <div className="controlChart">
                {dataSet==0 &&
                <Line data={barDataCurrInf} ref={chartRef0} type="line" options={lineOptions} className="lineChart"></Line>
                }
                {dataSet==1 &&
                <Line data={barDataNewInf} ref={chartRef1} type="line" options={lineOptions} className="lineChart"></Line>
                }
                {dataSet==2 &&
                <Line data={barDataTotalInf} ref={chartRef0} type="line" options={lineOptions} className="lineChart"></Line>
                }
            </div>
            <div className="chartButtonsDiv">
                <IonFabButton size="small" color="warning" onClick={()=>setDataSet(0)}>Def</IonFabButton>
                <IonFabButton size="small" color="warning" onClick={()=>setDataSet(2)}>T</IonFabButton>
                <IonFabButton size="small" color="warning" onClick={()=>setDataSet(1)}>New</IonFabButton>
                <IonFabButton size="small" color="warning" onClick={downloadChart}><IonIcon icon={saveOutline}/></IonFabButton>
            </div>
            <div className="controlChart">
                <Line data={barDataImmMo} type="line" className="lineChart"></Line>
            </div>
        </div> )
}

export default ChartsComp;
