<template>
	<!-- 滚动的内容 ref="swiper" -->
	<swiper :options="swiperOption" ref="swiper">
		<!-- 下拉刷新功能 -->
		<div class="mine-scroll-pull-down" v-if="pullDown">
			<me-loading :text="pullDownText" inline ref="pullDownLoading" />
		</div>
		<swiper-slide>
			<slot></slot>
		</swiper-slide>
		<!-- 上拉加载功能 -->
		<div class="mine-scroll-pull-up" v-if="pullUp">
			<me-loading :text="pullUpText" inline ref="pullUpLoading" />
		</div>
		<!-- 控制滚动条 swiper scrollbar -->
		<div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import MeLoading from 'base/loading';
	import {
		// 下拉
		PULL_DOWN_HEIGHT,
		PULL_DOWN_TEXT_INIT,
		PULL_DOWN_TEXT_START,
		PULL_DOWN_TEXT_ING,
		PULL_DOWN_TEXT_END,
		// 上拉
		PULL_UP_HEIGHT,
		PULL_UP_TEXT_INIT,
		PULL_UP_TEXT_START,
		PULL_UP_TEXT_ING,
		PULL_UP_TEXT_END
	} from './config';

	export default {
		name: 'MeScroll',
		components: {
			swiper,
			swiperSlide,
			MeLoading
		},
		props: {
			scrollbar: {
				type: Boolean,
				default: true
			},
			// home index.vue 
			// <me-scroll :data="recommends">
			data: {
				type: [Array, Object]
			},
			pullDown: {
				type: Boolean,
				default: false
			},
			pullUp: {
				type: Boolean,
				default: false
			}
		},

		// data() {
		// 	return {

		// 	};
		// },

		// 监控滚动条变化
		watch: {
			data() {
				this.update();
			}
		},
		// init created生命周期钩子
		created() {
			this.init();
		},

		methods: {
			// 更新滚动条
			update() {
				// swiper官方api
				// <swiper :options="swiperOption" ref="swiper">
				// 通过添加ref
				// console.log(this.$refs.swiper);
				// this.$refs.swiper && this.$refs.swiper.swiper.update();
				// 为了保证能正确渲染数据,防止数据准备完,dom没有渲染好的情况
				this.$nextTick(() => {
					this.$refs.swiper && this.$refs.swiper.swiper.update();
				})
			},
			//滚动条 返回到轮播图 api
			scrollToTop(speed, runCallbacks) {
				this.$refs.swiper &&
					this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
			},
			// 初始化方法
			init() {
				this.pulling = false;
				this.pullDownText = PULL_DOWN_TEXT_INIT;
				this.pullUpText = PULL_DOWN_TEXT_INIT;
				this.swiperOption = {
					direction: 'vertical',
					slidesPerView: 'auto',
					freeMode: true,
					setWrapperSize: true,
					scrollbar: {
						el: this.scrollbar ? '.swiper-scrollbar' : null,
						hide: true
					},
					// 触发swiper-slide事件
					on: {
						// 滑动----下拉刷新 scroll 自定义方法
						sliderMove: this.scroll,
						// 滑动结束---松手刷新 touchEnd methods
						touchEnd: this.touchEnd,
						// 滑动结束
						transitionEnd: this.scrollEnd
					}
				};
			},
			// scroll 滚动 下拉--刷新
			scroll() {
				// this.$refs.swiper.swiper 第二个swiper是实例对象
				// swiper实例对象里有它的属性方法
				const swiper = this.$refs.swiper.swiper;

				// 滚动时需要触发scroll事件 将translate swiper传出去
				// 滚动的时候需要时刻监听 让返回顶部的按钮显示隐藏
				this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);

				if (this.pulling) {
					return;
				}

				// 下拉超过一定区域 提示性文字
				if (swiper.translate > 0) {
					if (!this.pullDown) {
						// 下拉
						return;
					}
					if (swiper.translate > PULL_DOWN_HEIGHT) {
						this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
					} else {
						this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
					}
				} else if (swiper.isEnd) {
					// 上拉
					if (!this.pulling) {
						return;
					}
					// 是否达到上拉触发条件
					// Math.abs吧数转换为绝对值
					// swiper.$warpperEl表示可滚动区域的外层元素
					// css（）是swiper插件提供的一个方法， 作用就是获取或设置元素的CSS样式
					const isPullUp =
						Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
						parseInt(swiper.$wrapperEl.css('height'));

					if (isPullUp) {
						this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
					} else {
						this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
					}
				}
			},
			// 滚动条滑动结束
			scrollEnd() {
				this.$emit(
					'scroll-end',
					this.$refs.swiper.swiper.translate,
					this.$refs.swiper.swiper,
					// 把pulling homeindex接收
					this.pulling
				);
			},
			// 滚动结束之后
			touchEnd() {
				if (this.pulling) {
					return;
				}

				const swiper = this.$refs.swiper.swiper;

				// 下拉 满足的条件
				if (swiper.translate > PULL_DOWN_HEIGHT) {
					// 可以下拉了
					if (!this.pullDown) {
						return;
					}

					this.pulling = true;
					// 这里调用swiper的api
					swiper.allowTouchMove = false; // 禁止触摸
					swiper.setTransition(swiper.params.speed);
					swiper.setTranslate(PULL_DOWN_HEIGHT);
					swiper.params.virtualTranslate = true; // 定住不给回弹
					this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
					// 基础组件 不加载数据
					// pull-down home_index
					this.$emit('pull-down', this.pullDownEnd);
				}

				// 上拉 是否满足条件 通过 else if
				// 是否到 底部
				else if (swiper.isEnd) {
					const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
					const isPullUp =
						Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
						totalHeight;
					// 上拉
					if (isPullUp) {
						if (!this.pullUp) {
							return;
						}
						this.pulling = true;
						swiper.allowTouchMove = false; // 禁止触摸
						swiper.setTransition(swiper.params.speed); // 回弹
						swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height)); // 回弹
						swiper.params.virtualTranslate = true; // 定住不给回弹
						this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING); // 正在下拉
						this.$emit('pull-up', this.pullUpEnd); // 开发一个事件
					}
				}
			},
			// this.$emit('pull-down', this.pullDownEnd);
			// pullDownEnd 加载完成后
			pullDownEnd() {
				const swiper = this.$refs.swiper.swiper;

				this.pulling = false;
				this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
				swiper.params.virtualTranslate = false;
				swiper.allowTouchMove = true;
				swiper.setTransition(swiper.params.speed);
				swiper.setTranslate(0);
				// 下拉滑动完成, header显示
				setTimeout(() => {
					this.$emit('pull-down-transition-end');
				}, swiper.params.speed);
			},
			// this.$emit('pull-up', this.pullUpEnd);
			// pullUpEnd 加载完成后
			pullUpEnd() {
				const swiper = this.$refs.swiper.swiper;

				this.pulling = false;
				this.$refs.pullDownLoading.setText(PULL_UP_TEXT_END);
				swiper.params.virtualTranslate = false;
				swiper.allowTouchMove = true;
			}
		}
	};
</script>

<style lang='scss' scoped>
	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		height: auto;
	}

	// 下拉刷新 默认看不到
	.mine-scroll-pull-down {
		position: absolute;
		left: 0;
		bottom: 100%;
		width: 100%;
		height: 80px;
	}

	// 上拉加载更多
	.mine-scroll-pull-down,
	.mine-scroll-pull-up {
		position: absolute;
		left: 0;
		width: 100%;
	}

	.mine-scroll-pull-down {
		bottom: 100%;
		height: 80px;
	}

	.mine-scroll-pull-up {
		top: 100%;
		height: 30px;
	}
</style>