<template>
  <el-table-v2 ref="tableRef" :columns="columns" :data="tableData" :estimated-row-height="50 *i" :width="props.width" :height="props.height"
    :row-class="rowClass" />
</template>

<script setup lang="tsx">
import { ref, watchEffect, nextTick } from 'vue';
import type { Column, RowClassNameGetter, CellStyle } from 'element-plus'
import {getScale} from '@/utils/util'

export interface TableTitle {
  prop: string;
  label: string;
  width?: number;
}
interface Props {
  tableTitle: TableTitle[];
  tableData?: any;
  height?: number,
  width?: number,
  scroll?: number
}
const props = withDefaults(defineProps<Props>(), {
  height: 400,
  width: 800,
  scroll: 1
});

let i = getScale();


const columns = ref([]);
watchEffect(() => {
  nextTick(() => {
    const generateColumns = (header: TableTitle[]) =>
      Array.from({ length: header.length }).map((_, columnIndex) => ({
        ...props,
        key: `${header[columnIndex].prop}-${columnIndex}`,
        dataKey: header[columnIndex].prop,
        title: header[columnIndex].label,
        width: header[columnIndex].width || 150 * i
      }));


    const column = generateColumns(props.tableTitle);

    // 添加序号列
    column.unshift({
      key: 'column-n-1',
      width: 50 * i,
      title: 'No.',
      //@ts-ignore
      cellRenderer: ({ rowIndex }) => `${rowIndex + 1}`,
      align: 'center',
    })

    //@ts-ignore
    columns.value = column;

  })
  nextTick(() => {
    scroll();
  });

});

const rowClass = ({ columns, rowData }: Parameters<RowClassNameGetter<any>>[0]) => {
  if (rowData.day < 30) {
    return 'color-red'
  }

  if (rowData.day < 60) {
    return 'color-blue'
  }

  if (rowData.day < 90) {
    return 'color-green'
  }
}

let elTableInterVal: number

const tableRef = ref(null);
// 自动滚动
const scroll = () => {
  let isScroll = true;
  //@ts-ignore
  const scrollWrapper = tableRef.value?.$el.querySelector('.el-vl__wrapper')
    .firstChild as HTMLElement;

  // 鼠标放上去，停止滚动；移开，继续滚动
  scrollWrapper.addEventListener('mouseover', () => {
    isScroll = false;
  }, { passive: true });
  scrollWrapper.addEventListener('mouseout', () => {
    isScroll = true;
  }, { passive: true });
  elTableInterVal = setInterval(() => {
    if (isScroll) {
      scrollWrapper.scrollTop += props.scroll; // 设置滚动速度
      if (
        scrollWrapper.clientHeight + scrollWrapper.scrollTop ==
        scrollWrapper.scrollHeight
      ) {
        scrollWrapper.scrollTop = 0;
      }
    }
  }, 100);
};
</script>
<style lang="less">
.color-red> :last-child {
  color: red !important;
}

.color-green> :last-child {
  color: rgb(110, 247, 110) !important;
}

.color-blue> :last-child {
  color: rgb(23, 214, 228) !important;
}
</style>

<style lang="less" scoped>
.el-table-v2 {
  --el-bg-color: transparent;
  --el-table-row-hover-bg-color: transparent;
  --el-table-border-color: #dfdddd63;

  :deep(.el-table-v2__header-row) {
    border: none;
    background: #1b9cff;
  }

  :deep(.el-table-v2__header-cell) {
    font-size: 18px;
    color: #ffffff;
    line-height: 20px;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-weight: 500;
    border-color: transparent !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.el-table-v2__row-cell) {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    border-color: transparent !important;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 90px;

    .el-table-v2__cell-text {
      word-break: break-all;
      word-wrap: break-word;
      overflow: visible;
      text-overflow: clip;
      white-space: pre-wrap;
      line-height: 16px;
    }
  }

  @media screen and (min-width: 1920px) {
    :deep(.el-table-v2__header-cell) {
      font-size: 14px;
    }

    :deep(.el-table-v2__row-cell) {
      font-size: 14px;
    }
  }
}
</style>