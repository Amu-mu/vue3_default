import mock from 'mockjs'

let series = ['茶浓缩液', 'I其他', 'H果汁果酱', 'G罐头', 'F糖浆', 'E小料', 'D植脂末', 'C自产粉体', 'B植物基系列', 'A茶叶系列']
let series2 = ['茶浓缩液', 'I其他', 'H果汁果酱', 'G罐头', 'F糖浆', 'E小料', 'D植脂末', 'C自产粉体', 'B植物基系列', 'A茶叶系列']
mock.Random.extend({
    proSeries: function (data) {
        let value = series.shift() as string;
        series.push(value);
        return this.pick(value)
    }
})

mock.mock('/x3xapi/getProduct', 'get', {
    'data|10-10': [
        {
            'name': '@proSeries',
            'realy|0-1000': 12,
            'surplus|0-1000': 14
        }
    ],
    'code|200-500': 200
})