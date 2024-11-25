import {getLoc,setLoc,clearLoc} from './storage/localStorage'
import {getSS,setSS,clearSS} from './storage/sessionStorage'
import {useDateFormat,useWindowSize} from '@vueuse/core'

/**
 * @description 时间日期格式化
 * @param time 时间
 * @param format 如:'YY-MM-dd HH:mm:ss'
 * @returns string
 */
export const formatDateTime = (time: Date, format: string): string => {
    let t = new Date(time);
    let tf = function (i: number) { return (i < 10 ? '0' : '') + i };
    return format.replace(/YY|yyyy|MM|dd|HH|mm|ss/g, function (mat: string) {
        switch (mat) {
            case 'YY':
                return tf(t.getFullYear());
            case 'yyyy':
                return tf(t.getFullYear());
            case 'MM':
                return tf(t.getMonth() + 1);
            case 'mm':
                return tf(t.getMinutes());
            case 'dd':
                return tf(t.getDate());
            case 'HH':
                return tf(t.getHours());
            case 'ss':
                return tf(t.getSeconds());
            default:
                return mat;
        }
    })
}

/**
 * @description 获取Date多少日期前的日期
 * @param {Date} date 传入的日期参数
 * @param {Number} value 前面多少天/月/年
 * @param {String} type 日期类型，year|month|day|date
 * @return {string} 返回的日期 
*/
export function lastDate(date: Date, value: number, type = "day", format = "yyyy-MM-dd") {
    let _date = date ? useDateFormat(date, format).value : useDateFormat(new Date(), format).value
    let setDate: any = new Date();
    switch (type) {
        case 'month':
            setDate = new Date(_date).setMonth(new Date(date).getMonth() - value)
            break;
        case 'year':
            setDate = new Date(_date).setFullYear(new Date(date).getFullYear() - value)
            break;
        case ('day' || 'date'):
            setDate = new Date(_date).setDate(new Date(date).getDate() - value)
            break;
        default:
            setDate = new Date();
            break;
    }

    return useDateFormat(setDate, format).value
}

/**
 * @description 获取当前Url中的指定参数
 * @param {String} name 参数的名字
 * @return {string} 返回该参数的值 
*/
function getUrlKey(name: string) {
    //获取url 参数
    return (
        decodeURIComponent(
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                location.href
            ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
    );
}

/**
 * 获取时间日期是哪个季度
 * @param date 时间日期
 * @param link 链接字符串
 * @returns {string} 'year link month'
 */
export function getQuarter(date: Date, link = "-") {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    switch (!!month) {
        case month <= 3:
            return "" + year + link + 1
        case month <= 6:
            return "" + year + link + 2
        case month <= 9:
            return "" + year + link + 3
        case month <= 12:
            return "" + year + link + 4
        default:
            return "error: " + date
    }
}


let time: number | null;
/**
 * 防抖功能
 * @param fn 回调函数
 * @param millisecond 防抖时间 
 */
export function antiShake(fn: Function, millisecond: number) {
    if (time)
        clearTimeout(time);
    time = setTimeout(() => {
        fn();
        time = null;
    }, millisecond)
}

/**
 * 判断是否是移动端
 * @returns boolean
 */
export function hasMobile() {
    let isMobile = false;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        isMobile = true;
    }
    if (document.body.clientWidth < 800) {
        isMobile = true;
    }
    return isMobile
}


/**
 * 表单序列化
 * @param data 对象
 * @returns string
 */
const serialize = (data:{[key:string]:any}) => {
    let list:unknown[] = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&');
};

/**
 * 针对flexable 进行的1920及3840适配
 * returns {number} 1 or 2
 */
export function getScale() {
    const ratio = window.devicePixelRatio;
    const {width,height} = useWindowSize();
    let i = width.value >1920? 2 :1;
    let x:number;
    if(ratio){
        x=i/ratio*1.2
    }else{
        x=i
    }
    return x;
}

export {getUrlKey,serialize}
export {getLoc,setLoc,clearLoc,getSS,setSS,clearSS}
