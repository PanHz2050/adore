<template>
	<div class="mine-loading" :class="{ 'mine-loading-inline': inline }">
		<!-- 文字和指示器并不一定需要总出现的 通过v-if来控制 -->
		<span class="mine-loading-indicator" v-if="indicator === 'on'">
			<slot> <img src="./loading.gif" alt="loading" /> </slot>
		</span>
		<span class="mine-loading-text" v-if="loadingText">
			{{ loadingText }}
		</span>
	</div>
</template>

<script>
	export default {
		name: 'MeLoading',
		props: {
			indicator: {
				type: String,
				default: 'on',
				validator(value) {
					return ['on', 'off'].indexOf(value) > -1;
				}
			},
			text: {
				type: String,
				default: '加载中...'
			},
			inline: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				loadingText: this.text
			}
		},
		watch: {
			text() {
				this.loadingText = text;
			}
 		},
		methods: {
			setText(text) {
				this.loadingText = text;
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import '~assets/scss/mixins';

	.mine-loading {
		overflow: hidden;
		width: 100%;
		height: 100%;
		@include flex-center(column);

		&.mine-loading-inline {
			flex-direction: row;

			.mine-loading-indicator ~ .mine-loading-text {
				margin-top: 0;
        margin-left: 8px;
			}
		}
	}

	// 它们两都要存在才会生效
	.mine-loading-indicator ~ .mine-loading-text {
		margin-top: 8px;
	}
</style>