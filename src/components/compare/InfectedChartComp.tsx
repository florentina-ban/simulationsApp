import { chartColors, getCartData, getdaysList } from '../../utils/utils'
import { SimulationDayProps, SimulationProps } from '../view/SimulationComp'
import { Bar, Line } from "react-chartjs-2";
import './style/deepComp.css'
import { IonFabButton, IonIcon, IonItem, IonSpinner } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { analyticsOutline, barChartOutline, saveOutline } from 'ionicons/icons';
import { Chart} from 'chart.js';
import { download } from '../../utils/downLoad';
export interface ListOfListOfDays{
    list: SimulationDayProps[][]
    sims: SimulationProps[]
}

const InfectedChartComponent: React.FC<ListOfListOfDays> = ({list, sims}) => {{
    const lengts: number[] =list.map(list=>list.length).sort();
    const noDaysMax: number = lengts[lengts.length-1]
    const days = getdaysList(noDaysMax);
    const chartRef = useRef<Chart>(null);
    //0=line
    //1=bar
    const [type, setType] = useState(0)

    const infectedData = {
            labels: days,
            datasets: list.map((days, indx)=>getCartData(days,sims[indx].name, indx, "currentInf"))
    }
    
    const lineoptions = {
        options:{
            responsive: true,
            }
    }    
    const downloadChart = () => {
        const image =  chartRef.current?.toBase64Image();
        download(image, "compare_chart.jpg",'image/gif')
    }
    const maxInfPerday = list.map(val=>{
        const allNumbers = val.map(elem=>elem.noNewInfected)
        const max=Math.max(...allNumbers)
        console.log("numbers: "+JSON.stringify(allNumbers))
        return { maxNewInf: max };

    })
    return (
        <div>
            {list.length>0 &&
            <div className="mainDeepComp">
                <div id="infectedChart">
                    {type==0 &&
                    <Line className="my" ref={chartRef} data={infectedData} type="line" options={lineoptions}></Line>
                    }
                    { type==1 &&
                    <Bar className="my" data={infectedData} type="bar" options={lineoptions}></Bar>
                    }
                </div>
                <div id="rightDataDiv">
                    <table>
                        <thead>
                            <th></th>
                            <th className="upperTh">Max infected/day</th>
                            <th className="upperTh">%</th>
                        </thead>
                        <tbody>
                            {sims.map((sim, indx)=>{
                                const proc = ((sim.noInfUsers/sim.noUsers)*100).toFixed(2);
                                return <tr>
                                    <td><div className="colorDiv" style={{backgroundColor: chartColors[indx]}}></div></td>
                                    <td>{maxInfPerday[indx].maxNewInf}</td>
                                    <td>{proc}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <IonItem id="buttonsDivDeep">
                        <IonFabButton onClick={downloadChart} slot="start" size="small" color="warning"><IonIcon icon={saveOutline}></IonIcon></IonFabButton>
                        { type==0 &&
                        <IonFabButton slot="end" size="small" color="warning" onClick={()=>{
                                        console.log("insideSetChart")
                                        setType(1)
                                        }}><IonIcon icon={barChartOutline}></IonIcon></IonFabButton>
                        } 
                        { type==1 &&
                        <IonFabButton slot="end" size="small" color="warning" onClick={()=>{
                                        console.log("insideSetChart")
                                        setType(0)
                                        }}><IonIcon icon={analyticsOutline}></IonIcon></IonFabButton>
                        } 
                    </IonItem>
                </div>
            </div>
            }
        </div>
        )
 }
}

export default InfectedChartComponent
