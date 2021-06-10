import { IonItem, IonLabel } from "@ionic/react";
import { Bar } from "react-chartjs-2";
import { chartColors, getImmuneDecData } from "../../utils/prepareData";
import { ListOfListOfDays } from "./InfectedChartComp";

import './style/deepComp.css'

const ResultsComponent: React.FC<ListOfListOfDays> = ({list, sims}) => {
    const immDecData = {
        labels: ['immune', 'decesed'],
        datasets: list.map((days, indx)=>getImmuneDecData(days,sims[indx].name, indx))
    }
    const lineoptions = {
        options:{
        responsive: true,
        }
    }    
   
    return (
            <div className="otherDeepComp">
                {list.length>0 &&
                    <div className="flexDivRedsults">
                        <div id="otherChart">
                            <Bar className="my" data={immDecData} type="bar" options={lineoptions}></Bar>
                        </div>
                        <div id="summaryDiv">
                            <div>Summary: </div>
                            <table id="summaryTable">
                                <thead>
                                    <tr>
                                        <th className="smallerTH"></th>
                                        <th className="smallTH">Total infected</th>
                                        <th className="smallerTH">%</th>
                                        <th className="smallTH">Total immune</th>
                                        <th className="smallerTH">%</th>
                                        <th className="smallTH">Total decesed</th>
                                        <th className="smallerTH">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                       sims.map((s,indx)=>{
                                            const procInf = ((s.noInfUsers/s.noUsers)*100).toFixed(2)
                                            const simDays = list[indx]
                                            const totalDead = simDays[simDays.length-1].noDeadUsers
                                            const totalImmune =  simDays[simDays.length-1].noImuneUsers
                                            const procDead = ((totalDead/s.noUsers)*100).toFixed(2)
                                            const procImm = ((totalImmune/s.noUsers)*100).toFixed(2)
                                            console.log("simulation : "+indx)
                                            console.log(s)
                                            return(
                                               <tr>
                                                   <td><div style={{backgroundColor: chartColors[indx]}} className="colorDiv"></div></td>
                                                   <td>{s.noInfUsers}</td>
                                                   <td>{procInf}</td>
                                                   <td>{totalImmune}</td>
                                                   <td>{procImm}</td>
                                                   <td>{totalDead}</td>
                                                    <td>{procDead}</td>
                                               </tr>
                                           )
                                       })
                                   }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
            )
     }

export default ResultsComponent