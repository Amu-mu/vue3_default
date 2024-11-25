<script setup lang='ts'>
import { gsap } from 'gsap';


const prop = withDefaults(defineProps<{
  bg: string | boolean,
  borderCom?:Object
  title: string,
  num?:number,

}>(), {
  bg: 'src/assets/1.jpg',
  title: '文本标题',
})
let num  = reactive({
  count:0,
  value:0
})

onMounted(()=>{
  if(prop.num)
  num.count = prop.num
})

watch(()=>prop.num,(newValue,oldValue)=>{
    gsap.to(num,{
      duration:1,
      count:newValue
    })
})
</script>

<template>
  <div>
    <component :is="prop.borderCom">
      <div class="sf-tl" style="">
          <div class="sf-tl-card" :style="{ backgroundImage: `url(${prop.bg})` }">
            <p>{{ prop.title }}</p>
            <div class="sf-tl-card-content">
              <div v-if="prop.num">{{ num.count.toFixed(0) }}</div>
              <slot></slot>
            </div>
          </div>  
        </div>
    </component>
  </div>
</template>

<style lang="less" scoped>

.sf-tl {
  padding:20px;
  width: 100%;
  height: 100%;
}

.sf-tl-card {
  width: 100%;
  height: 100%;
  font-size: 26px;
  color: white;
  display: inline-grid;
  // align-content: space-between;
  justify-content: center;

  >p{
    font-size: 28px;
    margin-top: 20px;
  }

  &-content div{
    font-size: 40px;
  }
}

.sf-tl-card p:first-child {
  font-size: 22px;
}
</style>