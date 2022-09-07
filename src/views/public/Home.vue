<template>
  <el-main class="FlexCenter RouterPage HomePage">
     <img
      @click="$router.push('/')"
      src="@/assets/image/home.png"
      ref="myImage"
    />
    <div class="Publics FlexRow FlexCenter">
      <span>Vite ^2.8.0</span>
      <span>Vue ^3.2.25</span>
      <span>Vue-Router ^4.0.13</span>
      <span>Pinia ^2.0.11</span>
      <span>Axios ^0.26.0</span>
      <span>Element-Plus ^2.0.4</span>
    </div>
    <span class="HomeText">可以开始撸页面了</span>
        <div>
    
    </div>
  </el-main>
</template>
<script setup>
import { ref,onMounted } from "vue";
let myImage = ref(null);
onMounted(()=>{
  console.log(myImage.value);
})
</script>
<style lang="less" scoped>
.HomePage {
  height: 100%;
  img {
    width: 300px;
    pointer-events: none;
  }
  .Publics {
    margin: 20px 0px 30px 0px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: linear-gradient(to right, #1daeae, #ebf8f8);
      padding: 5px 15px;
      font-size: 16px;
      font-weight: 600;
      margin: 0px 20px;
    }
  }
  .HomeText {
    margin-top: 5px;
    font-size: 32px;
  }
}
</style>
