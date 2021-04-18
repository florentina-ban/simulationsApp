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

