import { Plugins } from '@capacitor/core';
import { CoordonatesProps } from '../components/interfaces/CoordonatesProps';
const { Storage } = Plugins;

interface FromStorage{
  myValue: CoordonatesProps[]
}

export async function addListToStorage (key: string, coordToStore: any) {
  getListFromStorage(key).then( fromStorageObj => {
    console.log("inside add to storage")
    if (key=='coordList' && fromStorageObj.myValue.length>0){
      const lastPoint = fromStorageObj.myValue[fromStorageObj.myValue.length-1]
      console.log("lastpoint: "+JSON.stringify(lastPoint))
      console.log("newPoint: "+JSON.stringify(coordToStore))

      if (lastPoint.timestamp != coordToStore.timestamp)
        fromStorageObj.myValue.splice(fromStorageObj.myValue.length, 0, coordToStore)
    }
    else {
      fromStorageObj.myValue.splice(fromStorageObj.myValue.length, 0, coordToStore)
    }
      Storage.set({
        key: key,
        value: JSON.stringify(
        { myValue: fromStorageObj.myValue }
      )
    })
  })

  // getListFromStorage(key).then( fromStorageObj => {
  //   if (key=='coordList' && fromStorageObj.myValue.length>0){
  //     console.log("-----------------------------------")
  //     const lastPoint = fromStorageObj.myValue[-1];
  //     console.log("last point from storage "+ JSON.stringify(lastPoint))
  //     console.log("new point to store "+ JSON.stringify(coordToStore))
  //     if (lastPoint.timestamp != coordToStore.timestamp){
  //       console.log("----------------------------------->")
  //       fromStorageObj.myValue.splice(fromStorageObj.myValue.length, 0, coordToStore)
  //       console.log("after push: "+JSON.stringify(fromStorageObj))
  //       Storage.set({
  //         key: key,
  //         value: JSON.stringify(
  //         { myValue: fromStorageObj.myValue }
  //     )
  //   })
  //   } }
  //   else 
  //   Storage.set({
  //     key: key,
  //     value: JSON.stringify(
  //     { myValue: fromStorageObj.myValue }
  // )
  // })
//})
}

export async function addValueToStorage (key: string, val: any) {
      Storage.set({
        key: key,
        value: JSON.stringify(
        { myValue: val }
      )
    })
    console.log("after push: "+JSON.stringify({ myValue: val }))
}

  export async function getFromStorage(key: string){
    const x = await Storage.get({key : key });
    return x;
  }
      
export async function getListFromStorage (key: string): Promise<FromStorage> {
  const stringFromStorage =  (await getFromStorage(key)).value;
  const val: FromStorage = stringFromStorage? JSON.parse(stringFromStorage) : {myValue: []}
  return val;
}

// Removing value by key, ({ key: string }) => Promise<void>
export async function removeFromStorage(key: string) {
  await Storage.remove({ key: key });
    //console.log('Keys found after remove', await Storage.keys());
}

export async function clear(){
  Storage.clear();
}


//  Clear storage () => Promise<void>   
export async function clearCoords() {
  return await Storage.set({
    key: "coordList",
    value: JSON.stringify({
      myValue: []})});
};