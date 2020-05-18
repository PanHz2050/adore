<template>
	<me-scroll :scrollbar="false">
		<ul class="tab">
			<li
				class="tab-item"
				:class="{ 'tab-item-active': item.id === curId }"
				v-for="(item, index) in items"
				:key="index"
				@click="switchTab(item.id)"
			>
				{{ item.name }}
			</li>
		</ul>
	</me-scroll>
</template>

<script>
	import MeScroll from 'base/scroll';
	import { categoryNames } from './config';

	export default {
		name: 'CategoryTab',
		components: {
			MeScroll
		},
		data() {
			return {
				curId: ''
			};
		},
		created() {
      this.init();
      // 默认是点击之后触发 但是进来就默认被点中一个li的激活状态
      this.switchTab(this.items[0].id);
		},
		methods: {
			init() {
				// 获取tab数据 填充html
				this.items = categoryNames;
			},
			// 当点击tab的item时,会传一个id进来
			switchTab(id) {
				// 先判断 如果等于当前id说明 此时点在当前item上
				if (this.curId === id) {
					return;
				}
				this.curId = id;
				// 等于当前itemId,往外触发事件,把id传出去
				this.$emit('switch-tab', id);
			}
		}
	};
</script>

<style lang='scss' scoped>
	@import '~assets/scss/mixins';

	$tab-item-height: 46px;

	.tab {
    width: 100%;

		&-item {
			height: $tab-item-height;
			border-right: 1px solid $border-color;
			border-bottom: 1px solid $border-color;
			font-size: $font-size-l;
			font-weight: bold;
			text-align: center;
			line-height: $tab-item-height;
			@include ellipsis();
			color: #080808;
			background-color: #fff;

			&:last-child {
				border-bottom: none;
			}
		}

		&-item-active {
			background: none;
			border-right: none;
			color: #f23030;
		}
	}
</style>