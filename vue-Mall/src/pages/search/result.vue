<template>
  <div class="result">
    <!-- loading 选择是否显示 -->
    <div class="loading-container" v-show="loading">
      <me-loading/>
    </div>
    <!-- 结果列表 没有loading且results有值时显示 -->
    <ul class="g-list" v-show="!loading && results.length">
      <li 
        class="g-list-item"
        v-for="(item, index) in results" :key="index"
        @click="$_selectItem(item[0])"
      >
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchResult',
    components: {
      MeLoading
    },
    // searchindex变量
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        results: [],
        loading: false
      }
    },
    mixins: [searchMixin],
    watch: {
      query(query) {
        this.getResults(query);
      }
    },
    methods: {
      getResults(keyword) {
        if (!keyword) {
          return;
        }
        // 获取数据时显示loading
        this.loading = true;
        // 获取数据,html填充数据
        getSearchResult(keyword).then(data => {
          if (data) {
            this.results = data;
            this.loading = false;
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  // @import '~assets/scss/mixins';

  .g-list {
    background-color: #fff;
    padding-left: 0;

    &-item {
      padding-left: 15px;
    }
  }

</style>
