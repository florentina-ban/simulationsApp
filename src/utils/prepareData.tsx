import { BarData, MyDataset } from "../components/view/InfectedChart";
import { SimulationDayProps } from "../components/view/SimulationComp";

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
  
  function getIncidence(dayList: SimulationDayProps[], population: number){
    return dayList.map(d=> {
      const val = (d.infNo*1000/population).toFixed(3)
      return +val;
    })
  }
  
  export function getCartData(daysList: SimulationDayProps[], label: string, indx: number, type: string, population: number): MyDataset{
    const data = type==='currentInf' ? 
      daysList.map(sim=>sim.infNo) : (type==='totalInf') ? 
      getTotalInf(daysList) :  (type==='incidence') ? getIncidence(daysList, population) : getNewInfected(daysList)
    return(
      { label: label,
        // labels: daysList.map(day=> day.dayNo),
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
  
  export function getAllDataForChart(days: SimulationDayProps[], population: number): {barData: BarData[], options: object[]}{
  
      const dataCurrInf: MyDataset = getCartData(days, 'Current Cases',1,'currentInf', population)
      const dataTotalInf: MyDataset = getCartData(days, 'Total Cases',3,'totalInf', population)
      const dataNewInf: MyDataset = getCartData(days, 'New Cases',4,'newInf', population)
      const dataIncidence: MyDataset = getCartData(days, 'Incidence of current cases (&#8240;)',2,'incidence', population)
  
      const barDataCurrInf: BarData = {
          labels: days.map(d=> d.dayNo),
          datasets: [ dataCurrInf ], 
      }
      const barDataTotalInf: BarData = {
          labels: days.map(d=> d.dayNo),
          datasets: [ dataTotalInf ], 
      }
      const barDataNewInf: BarData = {
          labels: days.map(d=> d.dayNo),
          datasets: [ dataNewInf ], 
      }
      const barDataIncidence = {
          labels: days.map(d=> d.dayNo),
          datasets: [ dataIncidence ], 
      }
  
      const maxYAxisC: number = Math.ceil((Math.max(...days.map(simD=>simD.infNo)))/100)*100
      const maxYAxisT: number =  Math.ceil((Math.max(...dataTotalInf.data))/100)*100
      const maxYAxisN: number =  Math.ceil((Math.max(...dataNewInf.data))/100)*100
      const maxYAxisIn: number =  20
      const lineOptions0 = { responsive: true,
          scales: {
             y: {
                  suggestedMax: maxYAxisC, 
                  max: maxYAxisC 
              }
          }}
      const lineOptions1 = { responsive: true,
          scales: {
             
              y: {
                  suggestedMax: maxYAxisN, 
                  max: maxYAxisN
              }
          }}
      const lineOptions2 = { responsive: true,
          scales: {
            y: {
                  suggestedMax: maxYAxisT, 
                   max: maxYAxisT 
              }
              
          }}
      const lineOptions3 = { responsive: true,
          scales: {
            y: {
                  suggestedMax: maxYAxisIn, 
                  max: maxYAxisIn
              }
          }}
      return ({barData: [barDataCurrInf, barDataNewInf, barDataTotalInf, barDataIncidence],
        options: [lineOptions0, lineOptions1, lineOptions2, lineOptions3]
      })
  
  }