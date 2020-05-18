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
		// 接收recommend
		data() {
			return {
				recommends: [],
				isBacktopVisible: false,
				isHeaderTransition: false
			};
		},
		methods: {
			updateScroll() {
				// console.log('updateScroll');
			},
			getRecommends(recommends) {
				this.recommends = recommends;
				// console.log('getRecommends');
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
			// scroll手拖动的时候会触发
			scroll(translate) {
				this.changeHeaderStatus(translate);
			},
			// 滑动滚动条控制什么时候显示隐藏
			// scrollEnd(translate, scroll)这里面的是形参
			scrollEnd(translate, scroll, pulling) {
				// 如果pulling不存在 不在加载的时候执行
				if (!pulling) {
					this.changeHeaderStatus(translate);
				}
				// 滚过一屏的高度显示(可视区的高度)
				this.isBacktopVisible = translate < 0 && -translate > scroll.height;
				// 滚动完成之后还需要改变一下header状态
			},
			// 解决下拉刷新加载过程中,header显示的问题
			// 实现下拉刷新时,header部分隐藏
			pullDownTransitionEnd() {
				// 上拉刷新加载完成之后显示header部分
				this.$refs.header.show();
			},
      // 点击返回顶部按钮返回顶部
      backToTop() {
        // 获取滚动条看看它存不存在 存在就调用scrollToTop
        //  这是之前提供的api 专门用来返回顶部的
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
			},
			// 显示隐藏header头部的状态,translate滚动条滚动的距离
			changeHeaderStatus(translate) {
				// 表示正在上拉
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