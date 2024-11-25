<script setup lang='ts'>
import { ref } from 'vue'
import * as echart from 'echarts'
import { getScale } from '@/utils/util'

const prop = withDefaults(defineProps<{
  title?: string,
  chartData: {
    title: string,
    value: number,
    maxValue: number,
    [x: string]: string | number | boolean | object | undefined
  },
  width?: number,
  height?: number
}>(), {
  title: '文本标题',
  chartData: () => ({
    title: '处理率',
    value: 33,
    maxValue: 120,
  }),
  width: 400,
  height: 400
})

let scale = getScale() * 0.88;

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


let chartPanel = ref();

// 绘制图表
let option = reactive<echart.EChartsOption>({
  backgroundColor: '#ffffff00',
  title: [{
    text: prop.chartData.title,
    //@ts-ignore
    x: 'center',
    top: '58%',
    textStyle: {
      color: '#fff',
      fontSize: 20 * scale,
      fontWeight: 100,
    },
  },
  {
    text: `${prop.chartData.maxValue != 0 ? (prop.chartData.value / prop.chartData.maxValue * 100).toFixed(2) + '%' : '∞'}`,
    //@ts-ignore
    x: 'center',
    top: '38%',
    textStyle: {
      fontSize: 30 * scale,
      color:`${(prop.chartData.value / prop.chartData.maxValue * 100) >100?'#ce1313':'#00f0ff'}`
    }
  },
  ],
  polar: {
    radius: ['44%', '50%'],
    center: ['50%', '50%'],
  },
  angleAxis: {
    max: prop.chartData.maxValue,
    show: false,
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [{
    type: 'pie',
    startAngle: 90,
    radius: ['83%', '90%'],
    center: ['50%', '50%'],
    data: [{
      // hoverOffset: 1,
      value: prop.chartData.value, //value
      name: '',
      itemStyle: {
        color: '#00f0ff',
      },
      label: {
        show: false,
      },
      labelLine: {
        smooth: true,
        lineStyle: {
          width: 0,
        },
      },
      emphasis: {
        scale: false
      }
    },
    {
      label: {
        show: false,
      },
      labelLine: {
        smooth: true,
        lineStyle: {
          width: 0,
        },
      },
      value: prop.chartData.maxValue - prop.chartData.value, //maxValue - value
      emphasis: {
        scale: true
      },
      itemStyle: {
        color: 'rgba(251, 200, 79, 0)',
      },
    },
    ],
  },
  {
    name: '',
    type: 'pie',
    startAngle: 90,
    radius: '80%',
    emphasis: {
      scale: false
    },
    center: ['50%', '50%'],
    itemStyle: {
      color: new echart.graphic.RadialGradient(0.5, 0.5, 1, [{
        offset: 1,
        color: 'rgba(55,70,130, 1)',
      },
      {
        offset: 0,
        color: 'rgba(55,70,130, 0)',
      },
      ]),
      shadowBlur: 10,
      // shadowColor: 'rgba(55,70,130, 1)'
    },
    data: [{
      value: 100,
    },],
  },
  ],
})


watch(() => prop.chartData, (newVal) => {
  if(option.title && option.series){
    //@ts-ignore
    option.title[0].text = newVal.title;
    //@ts-ignore
    option.title[1].text = `${prop.chartData.maxValue != 0 ? (prop.chartData.value / prop.chartData.maxValue * 100).toFixed(2) + '%' : '∞'}`;
    //@ts-ignore
    option.title[1].textStyle.color = `${(prop.chartData.value / prop.chartData.maxValue * 100) >100?'#ce1313':'#00f0ff'}`;
  
    //@ts-ignore
    option.series[0].data[0].value = newVal.value;
    //@ts-ignore
    option.series[0].data[1].value = newVal.maxValue - newVal.value;
    setOption(option);
  }


}, {
  deep: true,
})

onMounted(() => {
  if (option && typeof option === 'object') {
    setOption(option);
  }
})

let myChart: echart.ECharts

const setOption = (newOption: any) => {
  // if(myChart)
  // myChart.dispose()
  if (myChart == null) {
    myChart = echart.init(chartPanel.value)
  }

  if (newOption && typeof newOption === 'object') {
    myChart.setOption(newOption, true);
  }
}
</script>

<template>
  <div>
    <p
      style="color: white;font-size: 0.1rem;display: block;line-height: 0.1rem;text-align: center;padding-bottom: 0.05rem;">
      {{ prop.title }}</p>
    <div id="chart-panel" class="chart-panel" ref="chartPanel">
    </div>
  </div>
</template>

<style lang='less' scoped>
.chart-panel {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
</style>