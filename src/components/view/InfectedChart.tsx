import { IonFabButton, IonIcon } from "@ionic/react";
import { Chart } from "chart.js";
import { expandOutline, saveOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react"
import { Line } from "react-chartjs-2";
import { download } from "../../utils/downLoad";
import linearRegression from "../../utils/regression";
import { getAllDataForChart } from "../../utils/prepareData";
import { SimulationFull } from "./SimulationComp";
import './style/simulation.css'

const regressionColor = '#7b916e';

export interface MyDataset{
    label: string,
    // labels: number[],
    data: number[],
    fill: boolean,
    pointBackgroundColor: (string | undefined)[],
    pointBorderColor: string,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    pointBorderWidth: number,
    pointRadius: number,
    hoverBackgroundColor: string,
}

export interface BarData {
    labels: number[],
    datasets: MyDataset[]
}

interface ChartState{
    currentView: number,
    regression: boolean,
    predictionNo: number,
    barDataInfo: BarData[],
    options: object[],
}

const InfectedChart: React.FC<SimulationFull> = ({days, population}) => { 
    const [currentState, setCurrentState] = useState<ChartState>({currentView: 0, regression: false, predictionNo: 14, options:[], barDataInfo: []})
    const chartRef0 = useRef<Chart>(null)
    const chartRef1 = useRef<Chart>(null)
    useEffect(()=>{
        const data = getAllDataForChart(days, population)
       setCurrentState({...currentState, barDataInfo: data.barData,
            options: data.options 
            })
           
    }, [])

    // useEffect(()=>{
    //     if (currentState.barDataInfo.length>0){
    //     console.log("bar0: ")
    //     console.log(currentState.barDataInfo[currentState.currentView].datasets[0].data)
    //     console.log(currentState.barDataInfo[currentState.currentView].labels)
    //     console.log(currentState.barDataInfo[currentState.currentView].datasets[0].pointBackgroundColor)
    //     }
    // },[currentState])
    
    const downloadChart = () => {
        const image =  chartRef0.current?.toBase64Image() 
        download(image, "view_chart.jpg",'image/gif')
    }

    const addRegression = () => {
        const { barDataInfo, regression } = currentState;
        const len = barDataInfo[0].datasets[0].data.length;
        if (!regression){
            const da: number[] = days.map(d=> +d.dayNo);
            const color: string[] = []
            for (var i=0; i<currentState.predictionNo; i++)
                color.push(regressionColor)
            for (var i=0; i<4; i++){
                var my_regression;
                if (len>14)
                    my_regression = linearRegression(da.slice(-14), barDataInfo[i].datasets[0].data.slice(-14), currentState.predictionNo);
                else
                    my_regression = linearRegression(da, barDataInfo[i].datasets[0].data, currentState.predictionNo);

                barDataInfo[i].datasets[0].data.push(...my_regression.y)
                barDataInfo[i].labels.push(...my_regression.x)
                barDataInfo[i].datasets[0].pointBackgroundColor.push(...color)
                }
            setCurrentState({...currentState, regression: true, barDataInfo: [...barDataInfo]})
            return           
            }
        else{
            for (var i=0; i<4; i++){
                barDataInfo[i].datasets[0].data.splice(len-currentState.predictionNo, currentState.predictionNo)
                barDataInfo[i].labels.splice(len-currentState.predictionNo, currentState.predictionNo)
                barDataInfo[i].datasets[0].pointBackgroundColor.splice(len-currentState.predictionNo, currentState.predictionNo)
            }
            setCurrentState({...currentState, regression: false, barDataInfo: [...barDataInfo]})

        }
    }
   
    return (
        
        <>
        <div className="controlChart">
            { !currentState.regression &&
            <Line data={currentState.barDataInfo[currentState.currentView]} ref={chartRef0} type="line" options={currentState.options[currentState.currentView]} className="lineChart"></Line>
            }
            { currentState.regression &&
            <Line data={currentState.barDataInfo[currentState.currentView]} ref={chartRef1} type="line" options={currentState.options[currentState.currentView]} className="lineChart"></Line>
            }   

        </div>
        <div className="chartButtonsDiv">
            <IonFabButton size="small" color="warning" onClick={()=>setCurrentState({...currentState, currentView: 0})}>Def</IonFabButton>
            <IonFabButton size="small" color="warning" onClick={()=>setCurrentState({...currentState, currentView: 2})}>T</IonFabButton>
            <IonFabButton size="small" color="warning" onClick={()=>setCurrentState({...currentState, currentView: 1})}>New</IonFabButton>
            <IonFabButton size="small" color="warning" onClick={()=>setCurrentState({...currentState, currentView: 3})}>&#8240;</IonFabButton>
            <IonFabButton size="small" color="warning" onClick={addRegression}><IonIcon icon={expandOutline}/></IonFabButton>
            <IonFabButton size="small" color="warning" onClick={downloadChart}><IonIcon icon={saveOutline}/></IonFabButton>

        </div>
        </>
    )
}

export default InfectedChart