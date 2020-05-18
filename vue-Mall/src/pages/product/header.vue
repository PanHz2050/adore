<template>
	<me-navbar class="header">
		<i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <div class="header-title" slot="center">
      <span>商品详情</span>
    </div>
	</me-navbar>
</template>

<script>
	import MeNavbar from 'base/navbar';

	export default {
		name: 'SearchHeader',
		components: {
			MeNavbar
		},
		data() {
			return {};
		},
		methods: {
      goBack() {
        this.$router.back();
      }
    }
	};
</script>

<style lang='scss' scoped>
	@import '~assets/scss/mixins';

  .mine-navbar {
    height: 28px;
    background-color: rgba($color: #f72323, $alpha: 0.5);
  }

	.header {
		border-bottom: 1px solid $border-color;

		.iconfont {
			color: $icon-color;
			font-size: $icon-font-size;
		}

		.mine-search-box-wrapper {
			background-color: #f7f7f7;
		}
	}

  .header-title {
    text-align: center;
    color: #fff;
  }
  .header-title span {
    margin-right: 34px;
  }
</style>