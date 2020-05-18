<template>
  <me-navbar class="header">
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
    name: 'CategoryHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    methods: {
      // 获取输入框的值
      getQuery(query) {
        console.log(query);
      },
      // 点击输入框,跳转search页面
      goToSearch() {
        this.$router.push('/search');
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      width: 100%;
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
  
</style>