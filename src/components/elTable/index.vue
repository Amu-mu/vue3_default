<script setup lang='ts'>
interface TableTitle {
  label: string,
  prop: string,
  width?: number
}

interface TableData {
  [key: string]: any
}

interface TableProps {
  autoScroll?: boolean,
  tableTitle: TableTitle[],
  tableData: TableData[],
  height?: number
}

const prop = withDefaults(defineProps<
  TableProps>(), {
  autoScroll: false,
  height: 400
})

let tableData = reactive(prop.tableData)
let tableKeys = reactive<{ label: string, prop: string, width?: number }[]>(prop.tableTitle ?? Object.keys(prop.tableData[0]).map(item => {
  return {
    label: item,
    prop: item
  }
}))

const emit = defineEmits(['cellClassName'])

watch(() => prop.tableTitle, (newVal) => {
  if (newVal)
    tableKeys = newVal
}, { deep: true })

watch(() => prop.tableData, (newVal) => {
  tableData = newVal
}, { deep: true })
watch(() => prop.tableData, (newVal) => {
  tableData = newVal
}, { deep: true })

const scrollTable = ref()
let tableInterval: number | undefined = undefined
const autoScroll = (auto: boolean) => {
  nextTick(() => {
    const demo = scrollTable.value.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0]
    if (!auto) {
      clearInterval(tableInterval)
    }

    tableInterval = setInterval(() => {
      if (auto) {
        demo.scrollTop += 1
        if (demo.clientHeight + demo.scrollTop === demo.scrollHeight) {
          demo.scrollTop = 0
        }
      }
    }, 100)
  })
}



const cellClassName = ({ rowIndex, columnIndex, row, column }: { rowIndex: number, columnIndex: number, row: any, column: any }) => {
  if (columnIndex !== 6) {
    return
  }

  if(row.day <= 30){
    return 'color-red'
  }

  if(row.day <= 60){
    return 'color-yellow'
  }
  
  if(row.day <= 90){
    return 'color-green'
  }else{
    return 'color-white'
  }
}

onMounted(() => {
  autoScroll(true)

})

onBeforeUnmount(() => {
  clearInterval(tableInterval)
})


</script>

<template>
  <div>
    <el-table v-bind="$attrs" :data="tableData" :max-height="prop.height" ref="scrollTable"
      @mouseenter.native="autoScroll(false)" @mouseleave.native="autoScroll(true)" :cell-class-name="cellClassName">
      <el-table-column type="index" width="60px" label="项次"></el-table-column>
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for="item in tableKeys"
        :key="item"></el-table-column>
    </el-table>
  </div>
</template>

<style lang="less">
.color-red {
  color: red;
}

.color-blue {
  color: blue;
}

.color-yellow {
  color: yellow;
}

.color-green {
  color: greenyellow;
}

.color-orange {
  color: orange;
}

.color-white {
  color: white;
}
</style>

<style lang='less' scoped>
.el-table {
  // --el-table-border-color: transparent;
  --el-table-border-color: #dfdddd63;
  --el-table-text-color: #ffffff;
  --el-table-header-text-color: #ffffff;
  --el-table-row-hover-bg-color: transparent;
  --el-table-current-row-bg-color: transparent;
  --el-table-header-bg-color: #1b9cff;
  --el-table-bg-color: #08233a30;
  --el-table-tr-bg-color: transparent;
  --el-table-expanded-cell-bg-color: transparent;
}

.el-table :deep(.el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf) {
  border-bottom: red;
}

.el-table :deep(.el-table__header-wrapper) {
  font-size: 1rem;
}
</style>