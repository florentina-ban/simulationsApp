import { Bar } from "react-chartjs-2";
import { getImmuneDecData } from "../../utils/utils";
import { ListOfListOfDays } from "./InfectedChartComp";

const ResultsComponent: React.FC<ListOfListOfDays> = ({list, sims}) => {
    const immDecData = {
        labels: ['immune', 'decesed'],
        datasets: list.map((days, indx)=>getImmuneDecData(days,sims[indx].regionName+" - "+sims[indx].startInf, indx))
    }
    console.log(immDecData.datasets)
    const lineoptions = {
        options:{
        responsive: true,
        }
    }    
    const downloadChart = () => {
        
    }
    return (
            <div className="otherDeepComp">
                {list.length>0 &&
                <>
                <div id="otherChart">
                    <Bar className="my" data={immDecData} type="bar" options={lineoptions}></Bar>
                </div>
                <div id="chartButtons">
                    
                </div>
                </>
                }
            </div>
            )
     }

export default ResultsComponent