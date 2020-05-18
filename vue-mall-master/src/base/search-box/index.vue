<template>
	 <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i> 
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>
    <!-- v-model用双向绑定数据 -->
    <input
      class="mine-search-box"
      type="text"
      title="搜索框"    
      :placeholder="placeholder" 
      ref="input"
      v-model="query"
      v-if="!fake"
    >
    <!-- 关闭输入内容按钮 -->
    <i
      class="iconfont icon-close"   
      v-show="query"   
      @click="reset"
    ></i>
  </div>
</template>

<script>
  import {debounce} from 'assets/js/util';

	export default {
    name: 'MeSearchBox',
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      fake: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
        // 定义query,默认为空
        query: ''
      };
    },
    watch: {
      // 监听query,向外发送事件
      // debounce节流函数,防止每输入一次就发送请求
      query: debounce(function () {
        this.$emit('query', this.query);
      })
    },
    methods: {
      // 清除和获取焦点
      focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      // 清除input框输入的内容
      clear() {
        this.query = '';
      },
      // this指向
      reset() {
        this.clear(); 
        this.focus();
      }
    },
	};
</script>

<style lang='scss' scoped>
 @import "~assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
  }

  .iconfont {
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .mine-search-box {
    flex: 1;
    background: none;
    border: none;
    margin: 0 6px;
    color: #666;
    line-height: 1.5;
  }
</style>