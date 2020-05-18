<template>
  <!-- 包一层transition来实现显示隐藏动画效果 -->
	<transition name="mine-backtop">
		<a
			href="javascript:;"
			class="mine-backtop"
			v-show="visible"
			@click="backToTop"
		>
			<i class="iconfont icon-backtop"></i>
		</a>
	</transition>
</template>

<script>
	export default {
		name: 'MeBacktop',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			backToTop() {
				this.$emit('backtop');
			}
		}
	};
</script>

<style lang='scss' scoped>
	@import '~assets/scss/mixins';

	.mine-backtop {
		overflow: hidden;
		@include flex-center();
		width: 45px;
		height: 45px;
		border: none;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.6);

		.iconfont {
			color: #fff;
			font-size: 38px;
		}
  }
  
  // 动画效果
  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    // 设置初始值
    &-enter, 
    &-leave-to {
      opacity: 0;
    }
  }
</style>