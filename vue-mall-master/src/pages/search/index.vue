<template>
	<transition name="search">
		<div class="search">
			<header class="g-header-container">
				<search-header @query="getQuery"/>
			</header>
			<div class="g-content-container">
        <me-scroll ref="scroll">
          <search-hot 
            v-show="!query"
            @loaded="updateScroll"
          />
          <!-- 历史记录 -->
          <search-history 
            v-show="!query" 
            @show-confirm="showConfirm" 
            ref="history" 
            @remove-item="updateScroll"
          />
          <!-- 搜索结果 -->
          <search-result 
            :query="query" 
            v-show="query"
          />
        </me-scroll>
      </div>
      <!-- 弹框组件 -->
      <me-confirm
        msg="确定要清空吗?"
        ref="confirm"
        @confirm="clearAllSearchHistorys"
      />
		</div>
	</transition>
</template>

<script>
  import SearchHeader from './header';
  import MeScroll from 'base/scroll';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import MeConfirm from 'base/confirm';
  import SearchResult from './result';

	export default {
    name: 'Search',
    components: {
      SearchHeader,
      MeScroll,
      SearchHot,
      SearchHistory,
      MeConfirm,
      SearchResult
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      // 获取搜索框输入的值
      getQuery(query) {
        this.query = query;
      },
      // 点击弹出确认框
      showConfirm() {
        this.$refs.confirm.show();
      },
      // 点击确定,清除全部历史记录
      clearAllSearchHistorys() {
        // history子组件提供接口
        this.$refs.history.clear();
        // 删完,更新数据
        this.$refs.history.update();
      },
      // 更新滚动条,解决拉不动的问题
      updateScroll() {
        this.$refs.scroll.update();
      }
    },
	};
</script>

<style lang="scss" scoped>
	@import '~assets/scss/mixins';

	.search {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: $search-z-index;
		background-color: $bgc-theme;
  }
  
  // 动画效果 
	.search-enter-active,
	.search-leave-active {
		transition: all 0.3s;
	}
	.search-enter,
	.search-leave-to {
		transform: translate3d(100%, 0, 0);
  }
  
</style>