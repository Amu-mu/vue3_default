import axios from 'axios';
import { formatDateTime } from '@/utils/util'
import type {TlCard,pieData,TablesD,TablesArrive,BarUsed,StockQty} from './types'

const Authorization = '1f479c5f-92af-40e8-8f79-8d60a66f9006'

//获取库存统计分析
export const getTlCard = async (daily?: Date | string): Promise<TlCard> => {
    const response = await axios.get('/x3xapi/stock/analysisList', {
        headers: {
            Authorization
        },
        params: {
            daily: daily ? formatDateTime(new Date(daily), 'yyyy-MM-dd') : formatDateTime(new Date(), 'yyyy-MM-dd')
        }
    }).then(res => res.data);
    return response.data;
}

//获取库存统计分析
export const getPie = async (daily?: Date | string): Promise<pieData[]> => {
    const response = await axios.get('/x3xapi/stock/analysisList2', {
        headers: {
            Authorization
        },
        params: {
            daily: daily ? formatDateTime(new Date(daily), 'yyyy-MM-dd') : formatDateTime(new Date(), 'yyyy-MM-dd')
        }
    }).then(res => res.data);
    return response.data;
}

enum TypeQtyLabel {
    '成品'='prod',
    '容量'='raw'
}

//获取成品/原料库容量
export const getBarStack = async (label:TypeQtyLabel,year:number):Promise<StockQty[]> => {
    const response = await axios.get(`/x3xapi/stock/stockQtyList`, {
        headers: {
            Authorization
        },
        params: {
            label,
            year
        }
    }).then(res => res.data);
    return response.data
}

enum Typedue {
    '效期' = 0,
    '呆滞' = 1
}

//获取库存效期或呆滞
export const getTableData = async (type: Typedue, type2: number): Promise<TablesD[]> => {
    const response = await axios.get(`/x3xapi/stock/prodDueList`, {
        headers: {
            Authorization
        },
        params: {
            type: type,
            type2: type2
        }
    }).then(res => res.data);
    return response.data
}

enum Typearrive {
    '到货' = 0,
    '发货' = 1
}

//获取到货/发货预估信息
export const getTableArrive = async (type: Typearrive, daily?: Date | string): Promise<TablesArrive[]> => {
    const response = await axios.get(`/x3xapi/stock/arriveList`, {
        headers: {
            Authorization
        },
        params: {
            type: type,
            daily: daily ? formatDateTime(new Date(daily), 'yyyy-MM-dd') : formatDateTime(new Date(), 'yyyy-MM-dd')
        }
    }).then(res => res.data);
    return response.data
}

enum TypeUsed {
    '成品' = 0,
    '原料' = 1
}

//获取库容使用量
export const getUsed = async (type: TypeUsed, daily?: Date | string): Promise<BarUsed[]> => {
    const response = await axios.get(`/x3xapi/stock/stockUsedList`, {
        headers: {
            Authorization
        },
        params: {
            type: type,
            daily: daily ? formatDateTime(new Date(daily), 'yyyy-MM-dd') : formatDateTime(new Date(), 'yyyy-MM-dd')
        }
    }).then(res => res.data);
    return response.data
}