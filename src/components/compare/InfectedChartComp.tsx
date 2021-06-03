import { chartColors, getCartData, getdaysList } from '../../utils/utils'
import { SimulationDayProps, SimulationProps } from '../view/SimulationComp'
import { Bar, Line } from "react-chartjs-2";
import './style/deepComp.css'
import { IonFabButton, IonIcon, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import { analyticsOutline, barChartOutline, saveOutline } from 'ionicons/icons';
export interface ListOfListOfDays{
    list: SimulationDayProps[][]
    sims: SimulationProps[]
}

const InfectedChartComponent: React.FC<ListOfListOfDays> = ({list, sims}) => {{
    console.log(sims)
    console.log("-----------")
    const lengts: number[] =list.map(list=>list.length).sort();
    const noDaysMax: number = lengts[lengts.length-1]
    const days = getdaysList(noDaysMax);
    //0=line
    //1=bar
    const [type, setType] = useState(0)

    const infectedData = {
            labels: days,
            datasets: list.map((days, indx)=>getCartData(days,sims[indx].regionName+" - "+sims[indx].startInf, indx))
    }
    const lineoptions = {
        options:{
            responsive: true,
            }
    }    
    const downloadChart = () => {
    }
    console.log('type: '+type)
    return (
        <div >
            {list.length>0 &&
            <div className="mainDeepComp">
                <div id="infectedChart">
                    {type==0 &&
                    <Line className="my" data={infectedData} type="line" options={lineoptions}></Line>
                    }
                    { type==1 &&
                    <Bar className="my" data={infectedData} type="bar" options={lineoptions}></Bar>
                    }
                </div>
                <div id="rightDataDiv">
                    <table>
                        <thead>
                            <th></th>
                            <th className="upperTh">Total Infected</th>
                            <th className="upperTh">%</th>
                        </thead>
                        <tbody>
                            {sims.map((sim, indx)=>{
                                const proc = ((sim.noInfUsers/sim.noUsers)*100).toFixed(2);
                                return <tr>
                                    <td><div className="colorDiv" style={{backgroundColor: chartColors[indx]}}></div></td>
                                    <td>{sim.noInfUsers}</td>
                                    <td>{proc}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <IonItem id="buttonsDivDeep">
                        <IonFabButton onClick={downloadChart} slot="start" download="chartImg.jpg" size="small" color="warning"><IonIcon icon={saveOutline}></IonIcon></IonFabButton>
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