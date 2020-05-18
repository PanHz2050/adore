<template>
	<!-- :key="keyId" 改变组件上的key值组件会随时更新 解决更新slider时 无缝滚动出现的bug -->
	<swiper :options="swiperOption" :key="keyId">
		<slot></slot>
		<div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
	</swiper>
</template>

<script>
	import { swiper } from 'vue-awesome-swiper';

	export default {
		name: 'MeSlider',
		components: {
			swiper
		},
		props: {
			direction: {
				type: String,
				default: 'horizontal',
				// validator 验证
				validator(value) {
					return ['horizontal', 'vertical'].indexOf(value) > -1;
				}
			},
			interval: {
				type: Number,
				default: 3000,
				validator(value) {
					return value >= 0;
				}
			},
			// 无缝滚动
			loop: {
				type: Boolean,
				default: true
			},
			// 分页器
			pagination: {
				type: Boolean,
				default: true
			},
			// 这里data和home slider有关
			data: {
				type: Array,
				// 数组不是基本类型 返回来的是个引用
				default() {
					return [];
				}
			}
		},
		// 数据
		data() {
			return {
				keyId: Math.random()
			};
		},
		watch: {
			// 检测数据 一旦发生了变化 就可以修改key值了
			data(newData) {
				// 做临界值的判断
				if (newData.length === 0) {
					return;
				}
				// 当刷出>=1张幻灯片时 恢复无缝滚动
				this.swiperOption.loop = newData.length === 1 ? false : this.loop;
				// key值改变 触发生命函数 钩子
				this.keyId = Math.random();
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.swiperOption = {
					watchOverflow: true,
					direction: this.direction,
					autoplay: this.interval
						? {
								delay: this.interval,
								disableOnInteraction: false
						  }
						: false,
					slidesPerView: 1,
					// 判断无缝滚动 如果一张的时候 就关闭
					loop: this.data.length <= 1 ? false : this.loop,
					pagination: {
						el: this.pagination ? '.swiper-pagination' : null
					}
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	// @import '~assets/scss/mixins';
	.swiper-container {
		width: 100%;
		height: 100%;
	}
</style>
