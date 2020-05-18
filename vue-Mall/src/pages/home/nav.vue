<template>
	<nav class="nav">
		<ul class="nav-list">
			<li class="nav-item" v-for="(item, index) in navs" :key="index">
				<a :href="item.linkUrl" class="nav-link">
					<img :src="item.picUrl" class="nav-pic" />
					<span>{{ item.text }}</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
  import { navItems } from './config';

	export default {
    name: 'HomeNav',
    // 需要变化或者响应的数据适合放data中 
    // navs一般只需要渲染一次 所以可以不用放data中
    // created不能响应变化
    created() {
      this.navs = navItems;
    }
	};
</script>

<style lang='scss' scoped>
  @import "~assets/scss/mixins";

  .nav {
    margin-top: 15px;
    width: 100%;
    background-color: #fff;

    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      width: 20%;
      margin: 15px 0;
    }

    &-link {
      @include flex-center(column);
    }

    &-pic {
      width: 60%;
      margin-bottom: 8px;
    }
  }

</style>