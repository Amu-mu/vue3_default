import { getSS, setSS, clearSS } from "./sessionStorage"
import { getLoc, setLoc, clearLoc } from "./localStorage"

//表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&');
};
export const getObjType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};
export const getViewDom = () => {
    return window.document.getElementById('avue-view').getElementsByClassName('el-scrollbar__wrap')[0]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + ' grayMode';
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
    document.body.className = name;
}

/**
 * 加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params;
    let result = JSON.parse(JSON.stringify(data));
    if (type == 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        })
    } else if (type == 'Aes') {
        param.forEach(ele => {
            result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
        })

    }
    return result;
};


/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
    function listen() {
        callback()
    }
    document.addEventListener("fullscreenchange", function () {
        listen();
    },{passive:true});
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    },{passive:true});
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    },{passive:true});
    document.addEventListener("msfullscreenchange", function () {
        listen();
    },{passive:true});
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
    return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length != 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id == id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length != 0) {
                        return findParent(menu[i].children[j].children, id);
                    }
                }
            }
        }
    }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) { /*  判断不是对象  */
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
}

export const SearchDataDetail = value => {
    let dataList = {};
    const allData = Object.getOwnPropertyNames(value);
    for (let i = 0; i < allData.length - 1; i++) {
        if (value[allData[i]].length > 0) {
            this.$set(dataList, allData[i], value[allData[i]].join())
        }
    }
    console.log(dataList, "SearchDataDetail");
    return dataList;
}

/**对Avue的search数据进行格式化
 * @return {list} 
 * 去掉值等于null,undefined,""，以及数组长度=0的属性
 * 返回数组类型格式为join(',')后的数据
 * @param data ps:data数组类型的字段名需要包含date,返回start与end字段
*/
export const doData = data => {
    let list = {};
    Object.keys(data).forEach((item) => {
        if (data[item] !== null && data[item] !== undefined && data[item] !== "") {
            // console.log(Object.prototype.toString.call(data[item]),item);
            switch (Object.prototype.toString.call(data[item])) {
                case '[object Array]':
                    let invalid = new Date(data[item][0]);
                    if (invalid == 'Invalid Date') {
                        if (data[item].length > 0) {
                            list[item] = data[item].join(',')
                        }
                    } else {
                        list[`start${item}`] = data[item][0];
                        list[`end${item}`] = data[item][1];
                    }
                    break;
                default:
                    list[item] = data[item];
                    break;
            }
        }
    })
    return list;
}

/**
 * 对日期进行格式化
 * 年yyyy月MM日dd 时HH分mm秒ss
 * @return String
*/
export const formatDateTime = (time, format) => {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? "0" : "") + i;
    };
    return format.replace(/YY|yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case "YY":
                return tf(t.getFullYear());
            case "yyyy":
                return tf(t.getFullYear());
            case "MM":
                return tf(t.getMonth() + 1);
            case "mm":
                return tf(t.getMinutes());
            case "dd":
                return tf(t.getDate());
            case "HH":
                return tf(t.getHours());
            case "ss":
                return tf(t.getSeconds());
        }
    });
}

//  判断是否为移动端
export function hasMobile() {
    let isMobile = false;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        // console.log('移动端');
        isMobile = true;
    }
    if (document.body.clientWidth < 800) {
        isMobile = true;
    }
    return isMobile
}

//防抖
let time;
function antiShake(fn, millisecond) {
    clearTimeout(time);
    time = setTimeout(() => {
        fn();
        time = null;
    }, millisecond)
}


/**
 * @description 获取当前Url中的指定参数
 * @param {String} name 参数的名字
 * @return {string} 返回该参数的值 
*/
function getUrlKey(name) {
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
 * @description 获取Date多少日期前的日期
 * @param {Date} date 传入的日期参数
 * @param {Number} value 前面多少天/月/年
 * @param {String} type 日期类型，year|month|day|date
 * @return {string} 返回的日期 
*/
function lastDate(date, value, type = "day" ,format = "yyyy-MM-dd") {
    let _date = date?formatDateTime(date,format):formatDateTime(new Date(),format)
    let setDate = new Date();
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

    return formatDateTime(setDate,format)
}

function getQuarter(date,link = "-"){
    const month = new Date(date).getMonth()+1;
    const year = new Date(date).getFullYear();
    // console.log("month",!!month);
    switch (!!month) {
        case month <= 3:
            return ""+year +link +1
        case month <=6:
            return ""+year +link +2
        case month <=9:
            return ""+year +link +3
        case month <=12:
            return ""+year +link +4
        default:
            return "error: "+date
    }
}

export {
    getSS,
    setSS,
    clearSS,
    getLoc,
    setLoc,
    clearLoc,
    antiShake,
    getUrlKey,
    lastDate,
    getQuarter
}
