<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = ref(zhCn);
</script>
<style lang="less">
@import "@/assets/styles/style.less";
@import "@/assets/styles/golbal.less";
</style>
