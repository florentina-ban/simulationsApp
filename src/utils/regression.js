function linearRegression(x,y,nrPoints){
    const rezX=[]
    const rezY=[]
    // console.log('y: ')
    // console.log(y)
    const n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i]*y[i]);
        sum_xx += (x[i]*x[i]);
        sum_yy += (y[i]*y[i]);
    } 
    // y=ax+b
    // console.log(n+ " "+ sum_x+" "+sum_y+" "+sum_xy + " " +sum_xx + " "+sum_yy)
    const a = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    const b = (sum_y - a * sum_x)/n;
    // console.log("a, b: "+a+" "+b)
    const r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
    var lastPoint = x[x.length-1]
    for (var i=0; i<nrPoints; i++){
        let x1=lastPoint+i+1;
        let y1=+(a*x1+b).toFixed(0)
        if (y1<0)
            y1=0;
        rezX.push(x1)
        rezY.push(y1)
    }
    return {x: rezX, y:rezY};
}
export default linearRegression;