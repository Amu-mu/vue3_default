export type TlCard = {
    in: number,
    out: number,
    planIn: number,
    planOut: number,
    [t: string]: number
}

export type pieData = {
    maxValue:number,
    title:string,
    value:number,
    [t: string]: any
}

export type TablesD = {
    prodNum: string,
    prodName: string,
    standard: string,
    qty: string,
    warehouse: string,
    day: number
}

export type TablesArrive = {
    prodNum: string,
    prodName: string,
    standard: string,
    qty: string,
    warehouse: string,
    arriveDate: number
}

export type  BarUsed={
    surplus: number,
    realy: number,
    name:string
}

export type StockQty ={
    id:string,
    type:string,
    arerage:number,
    available:number,
    control:number,
    real:number,
}