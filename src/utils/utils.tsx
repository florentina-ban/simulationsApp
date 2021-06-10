import { PlaceType } from "../components/create/AddSimulationComponent";

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
