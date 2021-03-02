import { Plugins } from '@capacitor/core';
import { CoordonatesProps } from './interfaces/CoordonatesProps';
const { Storage } = Plugins;


interface FromStorage{
  myValue: CoordonatesProps[]
}

// Saving ({ key: string, value: string }) => Promise<void>
export async function addToStorage (key: string, coordToStore: any) {
  getListFromStorage(key).then( fromStorageObj => {
      console.log("got from storage: "+JSON.stringify(fromStorageObj))
      fromStorageObj.myValue.splice(fromStorageObj.myValue.length, 0, coordToStore)
      console.log("after push: "+JSON.stringify(fromStorageObj))
      Storage.set({
        key: key,
        value: JSON.stringify(
        { myValue: fromStorageObj.myValue }
      )
    })
  })
}

  export async function getFromStorage(key: string){
    //clear()
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


//  Clear storage () => Promise<void>   
export async function clear() {
  return await Storage.clear();
};