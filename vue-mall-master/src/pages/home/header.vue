<template>
  <me-navbar class="header" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <!-- 搜索框 -->
    <me-search-box
      placeholder="开学季有礼,好货5折起"
      slot="center"
      fake
      @query="getQuery"
      @click.native="goToSearch"
    />
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    // 控制显示隐藏
    data() {
      return {
        visible: true
      }
    },
    methods: {
      // 控制header显示隐藏
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      // 获取输入框的值
      getQuery(query) {
        console.log(query);
      },
      // 点击输入框,跳转search页面
      goToSearch() {
        this.$router.push('/search');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  // header提高优先级
  .header {
    &.mine-navbar {
      background-color: transparent;
      // 开启背景颜色渐变效果
      transition: background-color 0.5s;
      // background-color: $header-bgc-translucent;
    }
    &.header-transition {
      background-color: $header-bgc-translucent;
    }
    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>