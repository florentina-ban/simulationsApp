import { PlaceType } from "../components/create/AddSimulationComponent";
import { SimulationDayProps } from "../components/view/SimulationComp";

export interface ResponseProps<T> {
    data: T;
  }
  
export function withLogs<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    console.log(`${fnName} - started`);
    return promise
      .then(res => {

        console.log(`${fnName} - succeeded`);
        return Promise.resolve(res.data);
      })
      .catch(err => {
        console.log(`${fnName} - failed`);
        console.log(err.toString())
        return Promise.reject(err);
      });
  }
  export const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }

  export function mapCoord<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    console.log(`${fnName} - started`);
    return promise
      .then(res => {
        console.log(`${fnName} - succeeded`);
        return Promise.resolve(res.data);
      })
      .catch(err => {
        console.log(`${fnName} - failed`);
        return Promise.reject(err);
      });
  }

  export function decodeLocationType (list: string){
    const arr: string[] = []
    console.log(list)
      const types = list.split(',').forEach(type=>{
        if (type.length>0){
          const placeType = placeTypes.filter(t=>t.id==(+type))[0];
          arr.push(placeType.name)
        }
      })
      return arr.join(', ');
  }

  export const placeTypes: PlaceType[] = [
    {id:0, name: "Administrative", checked: true},
    {id:1, name: "Schools", checked: true},
    {id:2, name: "Universities", checked: true},
    {id:3, name: "Food Stores", checked: true},
    {id:4, name: "Restaurants", checked: true},
    {id:5, name: "Churches", checked: true},
    {id:6, name: "Other Stores", checked: true},
    {id:7, name: "Relaxation", checked: true},
    {id:8, name: "Medical", checked: true},
    {id:9, name: "Transportation", checked: true},
    {id:10, name: "Lodging", checked: true},
]

export function getdaysList(maxNo: number){
  var list: number[] = []
  for (var i=1; i<=maxNo; i++)
    list.push(i)
  return list;
}

export const chartColors = ["rgb(0, 250, 250,0.4)","rgb(0, 117, 250,0.4)","rgb(153, 0, 255,0.4)",
          "rgb(255, 0, 230,0.4)","rgb(125, 121, 124,0.4)","rgb(82, 0, 61,0.4)"]

function getTotalInf(daysList: SimulationDayProps[]){
  const data: number[] = [];
  let sum=0;
  for (var i=0; i<daysList.length; i++){
    sum +=daysList[i].noNewInfected;
    data.push(sum)
  }
  return data
}

function getNewInfected(dayList: SimulationDayProps[]){
  return dayList.map(d=>d.noNewInfected)
}

export function getCartData(daysList: SimulationDayProps[], label: string, indx: number, type: string){
  const data = type==='currentInf' ? daysList.map(sim=>sim.infNo) : (type==='totalInf') ? getTotalInf(daysList) : getNewInfected(daysList)
  return(
    { label: label,
      labes: daysList.map(day=> day.dayNo),
      data: data,
      fill: true,
      pointBackgroundColor: daysList.map( sim=> {
        if(sim.scenario==1) {
          return '#05a308'
        }
        if (sim.scenario==2) {
          return '#e8d500'
        }
        if (sim.scenario==3){
          return '#e81405'
        }
        if(sim.scenario<1 || sim.scenario>3) {
          return '#05a308';
        }
    }),
    pointBorderColor: chartColors[indx],
    backgroundColor: chartColors[indx],
    borderColor: chartColors[indx],
    borderWidth: 1,
    pointBorderWidth: 1,
    pointRadius: 4,
    hoverBackgroundColor: '#f2f531',
  }) 
}
export function getImmuneDecData(daysList: SimulationDayProps[], label: string, indx: number){
  const imm = daysList[daysList.length-1].noImuneUsers;
  const dead = daysList[daysList.length-1].noDeadUsers;
  return(
    { label: label,
      labes: ['immune', 'dead'],
      data: [imm, dead],
      fill: true,
      
    backgroundColor: chartColors[indx],
    borderColor: chartColors[indx],
    borderWidth: 1,
    hoverBackgroundColor: '#f2f531',
  }) 
}