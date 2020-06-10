<template>
	<div class="home">
		<!-- 顶部内容 nav -->
		<header class="g-header-container">
			<home-header :class="{'header-transition': isHeaderTransition}" ref="header"/>
		</header>
		<!-- me-scroll 滚动条 -->
		<!-- @pull-down @pull-up 监听事件 -->
		<me-scroll
			:data="recommends"
			pullDown
			pullUp
			@pull-down="pullToRefresh"
			@pull-up="pullToLoadMore"
			@scroll="scroll"
			@scroll-end="scrollEnd"
			@pull-down-transition-end="pullDownTransitionEnd"
      ref="scroll"
		>
			<!-- slider轮播图 -->
			<home-slider ref="slider" />
			<!-- 导航栏面板 -->
			<home-nav />
			<!-- 热卖推荐 父组件 -->
			<home-recommend @loaded="getRecommends" ref="recommend" />
		</me-scroll>
		<!-- 返回顶部按钮内容 -->
		<div class="g-backtop-container">
			<me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import MeScroll from 'base/scroll';
	import HomeHeader from './header';
	import HomeSlider from './slider';
	import HomeNav from './nav';
	import HomeRecommend from './recommend';
	import MeBacktop from 'base/backtop';
	import {HEADER_TRANSITION_HEIGHT} from './config';

	export default {
		name: 'Home',
		components: {
			MeScroll,
			HomeHeader,
			HomeSlider,
			HomeNav,
			HomeRecommend,
			MeBacktop
		},
		data() {
			return {
				recommends: [],
				isBacktopVisible: false,
				isHeaderTransition: false
			};
		},
		methods: {
			updateScroll() {
			},
			getRecommends(recommends) {
				this.recommends = recommends;
			},
			pullToRefresh(end) {
				// setTimeout(() => {
				//   console.log('下拉刷新');
				//   end();
				// }, 1000)
				this.$refs.slider.update().then(end);
				// console.log(end);
			},
			pullToLoadMore(end) {
				// this.$refs.recommend.update() 是promise对象
				// update() 在recommend.vue中
				this.$refs.recommend
					.update()
					.then(end)
					.catch(err => {
						if (err) {
							console.log(err);
						}
						end();
						// 处理没有更多数据的情况
						// 禁止继续加载更多数据
						// 替换上拉时的loading, 改为没有更多数据
					});
				// console.log(end);
			},
			// scroll手拖动触发
			scroll(translate) {
				this.changeHeaderStatus(translate);
			},
			// 滑动滚动条控制什么时候显示隐藏
			// scrollEnd(translate, scroll)这里面的是形参
			scrollEnd(translate, scroll, pulling) {
				if (!pulling) {
					this.changeHeaderStatus(translate);
				}
				this.isBacktopVisible = translate < 0 && -translate > scroll.height;
			},
			pullDownTransitionEnd() {
				this.$refs.header.show();
			},
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
			},
			changeHeaderStatus(translate) {
				if (translate > 0) {
					this.$refs.header.hide();
					return;
				}
				this.$refs.header.show();	
				this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~assets/scss/mixins';

	.home {
		overflow: hidden;
		width: 100%;
		height: 100%;
		background-color: $bgc-theme;
	}
</style>