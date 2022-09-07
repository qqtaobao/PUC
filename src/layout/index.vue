<template>
  <el-container class="Container">
    <el-header class="ContainerHeader" height="50px">
      <div class="c-logo">
        <img
          class="ContainerHeaderLogo"
          @click="$router.push('/')"
          :src="imgUrl"
        />
        <div @click="isCollapseChange()">
          <el-icon v-if="isCollapse">
            <DArrowRight  class="abc" />
            </el-icon>
          <el-icon v-else><DArrowLeft  :size="80" /></el-icon>
        </div>
      </div>

      <div class="ContainerHeaderNick">
        <div class="ContainerHeaderName">
          <span
            class="ListaliasName CopyText"
            :data-clipboard-text="userMsg.userName"
            >{{ userMsg.userName }}</span
          >
          <span @click="signOut" class="ContainerHeaderShopChange FlexRow"
            >退出</span
          >
        </div>
      </div>
    </el-header>
    <el-container class="ContainerBody">
      <el-aside
        class="ContainerLeft scrollbarAuto"
        :width="isCollapse ? '64px' : '150px'"
      >
        <div class="ContainerLeftMenu">
          <el-menu
            :collapse-transition="false"
            @select="openUrl"
            :unique-opened="true"
            :collapse="isCollapse"
            :default-active="active"
            background-color="rgb(66, 72, 90)"
            text-color="#615E5E"
          >
            <el-menu-item index="/">
              <el-icon><Star /></el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <el-sub-menu index="/setting">
              <template #title>
                <el-icon><Delete /></el-icon>
                <span>系统设置</span>
              </template>

              <el-menu-item index="/setting">
                <template #title>系统设置</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-aside>
      <router-view v-slot="{ Component }">
        <transition name="slide-right" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-container>
  </el-container>
</template>
<script setup>
import imgUrl from "@/assets/image/logo.png";
import { Star, Delete, DArrowRight,DArrowLeft } from "@element-plus/icons";
import localStorage from "store";
import { PublicStore } from "@/store/Public";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
defineProps({
  active: {
    type: String,
    default: "/",
  },
});
const store = PublicStore();
const { userMsg, isCollapse } = storeToRefs(PublicStore());
const router = useRouter();
const signOut = () => {
  localStorage.clearAll();
  router.push("/login");
};
const openUrl = (url) => {
  router.push(url).catch((data) => {
    console.log(data.name);
  });
};
const isCollapseChange = () => {
  store.setIsCollapse(!isCollapse.value);
};
</script>
<style lang="less" scoped>
.el-icon{
   font-size: 20px;
   margin-left: 15px;
 }
.Container {
  height: 100%;
  min-width: 1440px;
  flex-flow: column nowrap;
  justify-content: flex-start;
}
.ContainerBody {
  min-height: 500px;
  flex-grow: 1;
  height: 100%;
}
.ContainerHeader {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: #2a2a2d;
  padding: 0px 10px 0px 20px;
  z-index: 2001;
  .c-logo {
    display: flex;
    align-items: center;
    color: #fff;
  }
  .ContainerHeaderLogo {
    cursor: pointer;
    width: 108px;
    height: 30px;
  }
  .ContainerHeaderNick {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 14px;
    height: 100%;
    .ContainerHeaderName {
      display: flex;
      align-items: center;
      margin: 0 5px;
      padding: 0px 3px 0px 7px;
      background: #fff;
      border-radius: 17px;
      cursor: pointer;
      .ListaliasName {
        display: inline-block;
        width: 105px;
        font-size: 12px;
        padding: 7px 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #333;
      }
      .ContainerHeaderShopChange {
        width: 35px;
        height: 22px;
        background: #d3efff;
        border-radius: 11px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        color: #fff !important;
        background: #409eff;
      }
    }
  }
}
.ContainerLeft {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  background: #2a2a2d;
  .isCollapse {
    display: flex;
    background: #393939;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 30px;
    flex-shrink: 0;
    i {
      font-size: 12px;
      color: #aeb9c2;
    }
  }
}
</style>
<style lang="less">

.el-menu--vertical {
  .el-menu--popup-right-start {
    background: #2a2a2d !important;
  }
  .el-menu-item,
  .el-sub-menu__title {
    height: 40px;
    line-height: 40px;
    color: #fff !important;
    background: #2a2a2d !important;
    font-size: 12px;
    font-weight: 400;
    &:hover {
      background: #1c1c1c !important;
    }
  }
  .el-menu-item.is-active {
    color: #fff;
    background: #1799ff !important;
  }
}
.ContainerLeftMenu {
  flex-grow: 1;
  background-color: #2a2a2d;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  & > .el-menu--collapse.el-menu {
    .iconfont {
      margin-left: 3px;
    }
  }
  & > .el-menu {
    border-right: 0px;
    width: 100%;
    .iconfont {
      margin-right: 10px;
      margin-left: 10px;
      width: 24px;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      font-size: 16px;
    }
    .el-sub-menu__icon-arrow {
      top: 53%;
      color: #fff;
    }
    .el-icon-arrow-down:before {
      content: "\e790";
    }
    .el-sub-menu .el-sub-menu__title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px !important;
      color: #fff !important;
      font-size: 12px;
      -webkit-font-smoothing: antialiased;
      &:hover {
        background-color: rgb(66, 72, 90) !important;
      }
    }
    & > .el-menu-item {
      height: 40px;
      line-height: 40px;
      color: #fff !important;
      font-size: 12px;
      padding-left: 5px !important;
      &:hover {
        background-color: rgb(66, 72, 90) !important;
      }
      &.is-active .icondianpu_,
      &.is-active .icondaochufffpx {
        color: #fff !important;
      }
    }
    .el-menu--inline {
      .el-menu-item {
        padding-left: 50px !important;
        &:hover {
          background-color: #1c1c1c !important;
        }
      }
    }
    .el-sub-menu .el-menu-item {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #fff !important;
      background: #2a2a2d !important;
      -webkit-font-smoothing: antialiased;
      position: relative;
      &:hover {
        background: #1c1c1c !important;
      }
    }
    .el-sub-menu.is-opened ul li.el-menu-item.is-active,
    .el-menu-item.is-active {
      color: #fff !important;
      background: #409eff !important;
      font-weight: 400;
    }
  }
  .el-menu--collapse {
    .el-sub-menu .el-sub-menu__title {
      padding-left: 20px !important;
    }
  }
}
</style>
