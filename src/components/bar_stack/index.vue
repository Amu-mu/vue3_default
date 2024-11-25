<script setup lang='ts'>
import * as echarts from 'echarts';
import {getScale} from '@/utils/util'
import type { ArgumentsType } from '@vueuse/core';

interface ChartData {
    name: string,
    realy?: number,
    surplus?: number,
    [x: string]: any
}

interface LegendItem {
    name: string,
    prop: string,
    unit?:string
}

const prop = withDefaults(defineProps<{
    width?: number,
    height?: number,
    title?: string,
    chartData: ChartData[],
    legend: LegendItem[],
    unit?:string
}>(), {
    title: "文本标题",
    width: 600,
    height: 400,
    unit:''
})

let scale = getScale();

watch(() => prop.width, (newVal: number) => {
    if (myChart) {
        myChart.resize({
            width: newVal
        })
    }
})

watch(() => prop.height, (newVal: number) => {
    if (myChart) {
        myChart.resize({
            height: newVal
        })
    }
})


type EChartsOption = echarts.EChartsOption;

let barStackMain = ref();
let option: EChartsOption;

let myChart: echarts.ECharts;

const setOption = () => {
    // if (myChart)
    //     myChart.dispose()
    let yAxisTitle = prop.chartData.map((item) => {
        return item.name;
    })
    let rawData = reactive<number[][]>([]);

    for (let i = 0; i < prop.legend.length; i++) {
        let arr = prop.chartData.map((item) => {
            return item[prop.legend[i].prop];
        }) as number[];
        rawData.push(arr);
    }

    const totalData: number[] = [];
    for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
    }

    const grid = {
        left: 80*scale,
        right: 20,
        top: 30,
        bottom: 20*scale
    };

    const seriesLegend = prop.legend.map(item => item.name);

    const series: echarts.BarSeriesOption[] = [...seriesLegend].map(
        (name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '96%',
                barCategoryGap: "50%",
                label: {
                    show: true,
                    formatter: (params: any) => {
                        const value = Math.round(params.value * 1000) / 10;
                        let seriesName =()=>{
                           if(params.seriesName == '实际使用' || params.seriesName == '实际使用库'){
                            return 'black'
                           }else{
                            return 'white'
                           }
                        }
                        let color = seriesName();
                        if(value >=80 && params.seriesName == '实际使用'){
                            return `{${color}|${rawData[sid][params.dataIndex]}${prop.chartData[params.dataIndex].unit??prop.unit}} {danger| ${value}%}`
                        }

                        if (value > 20 || value < -20) {
                            // console.log(params.seriesName,prop.chartData[params.dataIndex],'bar_stack');
                            return `{${color}|${rawData[sid][params.dataIndex]} ${prop.chartData[params.dataIndex].unit??prop.unit}  ${value}%}`;
                        }
                        if (value !=0) {
                            return `{${color}|${value}%}`;
                        } else {
                            return '';
                        }
                    },
                    textStyle: {
                        fontSize: 18 *scale * 0.88
                    },
                    color: 'white',
                    rich:{
                        black:{
                            color:'black'
                        },
                        white:{
                            color:'white'
                        },
                        danger:{
                            color:'red'
                        }
                    }
                },
                data: rawData[sid].map((d, did) => totalData[did] <= 0 ? 0 : d / totalData[did]
                )
            };
        }
    );

    option = reactive({
        animation: true,
        animationEasing: "backInOut",
        animationDelay: function (idx) {
            return idx * 1;
        },
        backgroundColor: '',
        color: ['#00d7f8', '#1b9cff'],
        legend: {
            selectedMode: true,
            textStyle: {
                fontSize:12*scale * 0.88,
                color: "#e3e1e1"
            }
        },
        grid,
        yAxis: {
            type: 'category',
            data: yAxisTitle,
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize:12*scale * 0.88,
                color: "#e3e1e1",
                align:'right',
                margin:6
            }
        },
        xAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                fontSize:15*scale *0.88,
                formatter: (params) => {
                    return params * 100 + '%';
                },
                color: "white"
            }
        },
        series
    });

    if (myChart == null) {
        myChart = echarts.init(barStackMain.value, 'dark');
    }
    option && myChart.setOption(option, false);
}

watch(() => prop.chartData, (newVal, oldVal) => {
    setOption();
}, {
    deep: true
})

onMounted(() => {
    setOption();
})
</script>

<template>
    <div>
        <p class="bar-title">
            {{ prop.title }}</p>
        <div class="chart-pie" ref="barStackMain"></div>
    </div>
</template>

<style lang='less' scoped>
.bar-title {
    color: white;
    font-size: 20px;
    display: block;
    line-height: 20px;
    text-align: center;
    padding-bottom: 10px;
}

.chart-pie {
    width: 580px;
    height: 400px;
    margin: 0 auto;
}
</style>