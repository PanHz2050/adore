<template>
	<div class="slider-wrapper">
		<!-- !sliders.length 没有图片的时候 -->
		<me-loading v-if="!sliders.length"/>
		<me-slider
			:data="sliders"
			:direction="direction"
			:interval="interval"
			:loop="loop"
			:pagination="pagination"
			v-else
		>
			<swiper-slide
				v-for="(item, index) in sliders"
				:key="index"
			>
				<a :href="item.linkUrl" class="slider-link">
					<img :src="item.picUrl" alt="" class="slider-img">
				</a>
			</swiper-slide>
		</me-slider>
	</div>
</template>

<script>
	// 引入基础组件slider 包装一层填充相关数据 业务组件
	import MeSlider from 'base/slider';
	import { swiperSlide } from 'vue-awesome-swiper';
	import { sliderOptions } from './config';
	import { getHomeSlider } from '../../api/home';
	import MeLoading from 'base/loading';
	

	export default {
		name: 'HomeSlider',
		components: {
			MeSlider,
			MeLoading,
			swiperSlide
		},
		data() {
			return {
				// 配置文件config.js
				direction: sliderOptions.direction,
				loop: sliderOptions.loop,
				interval: sliderOptions.interval,
				pagination: sliderOptions.pagination,
				sliders: []
			};
		},
		created() {
			this.getSliders();
		},
		methods: {
			// API 提供外部接口
			update() {
				return this.getSliders();
			},

			getSliders() {
				return getHomeSlider().then(data => {
					this.sliders = data;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.slider-wrapper {
		height: 183px;
	}

	.slider-link {
		display: block;
	}

	.slider-link, 
	.slider-img {
		width: 100%;
		height: 100%;
	}
</style>