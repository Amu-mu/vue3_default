<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { BorderBox8 } from "@kjgl77/datav-vue3"
import { config } from "@/product.config"

interface Tabs {
  label: string,
  prop: string
}

const prop = withDefaults(defineProps<{
  tabs: Tabs[],
  width: number,
  height: number
}>(), {
  width: 1000,
  height: 400
})

const arr = prop.tabs.map(item => item.prop)
let index = 0;

const activeName = ref(arr[0])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.index)
    index = parseInt(tab.index)
}

let tabsInt = setInterval(() => {
  activeName.value = arr[index++ % arr.length]
}, config.tabsChangeTime * 1000)
</script>

<template>
  <BorderBox8>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <transition-group >
        <el-tab-pane :label="item.label" :name="item.prop" v-for="item in prop.tabs" :key="item.prop"
          v-bind::key="item.prop">
          <slot v-if="activeName === item.prop" :name="item.prop"></slot>
        </el-tab-pane>
      </transition-group>
    </el-tabs>
  </BorderBox8>
</template>

<style lang="less" scoped>
.el-tabs {
  --el-color-primary: white;
  --el-text-color-primary: #1b9cff;
}

.demo-tabs{
  padding: 20px;
  width: 100%;
}

.demo-tabs>.el-tabs__content {
  /* padding: 32px; */
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs :deep( .el-tabs__nav-wrap::after) {
  background-color: transparent;
}


.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.6;
  transform: translateX(-10px);
}
</style>