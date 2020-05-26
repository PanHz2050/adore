<template>
  <div class="search-wrapper">
    <div class="search">
      <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音" />
    </div>
    <div 
      class="search-content" 
      ref="search"
      v-show="keyword">
      <ul>
        <li 
          class="search-item border-bottom"
          v-for="item of list" :key="item.id"
          @click="handleCityClick(item.name)"
        >
          <!-- 搜索页面城市 -->
          {{item.name}}
        </li>
        <li 
          class="search-item border-bottom"
          v-show="hasNoData"
          >
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'

export default {
  name: "CitySearch",
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  watch: {
    // 监听keyword值得改变
    keyword () {
      // 做节流处理
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if ( value.spell.indexOf(this.keyword) > -1 || 
            value.name.indexOf(this.keyword)> -1) {
              result.push(value)
            }
          })
        }
        // list存储了包含按键输入的城市内容
        this.list = result
        // console.log(this.list)
      }, 100)
    }
  },
  methods: {

    handleCityClick (city) {
      this.$store.commit('changeCity', city)
      // 每个组件里都有这个$router这样一个实例属性,方法
      // 来进行页面的跳转
      this.$router.push('/')
      this.keyword = ''
    },

    // 高级写法
    // handleCityClick (city) {
    //   this.changeCity('city')
    //   this.$router.push('/')
    //   this.keyword = ''
    // },
    // ...mapMutations(['changeCity'])

  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.search
  height: .72rem
  padding: 0 .1rem
  background: $bgColor
  .search-input
    box-sizing: border-box
    width: 100%
    height: .62rem
    padding: 0 .1rem
    line-height: .62rem
    text-align: center
    border-radius: .06rem
    color: #666
.search-content
  z-index: 1
  overflow: hidden
  position: absolute
  top: 1.58rem
  left: 0
  right: 0
  bottom: 0
  background: #eee
  // background: green
  .search-item
    line-height: .62rem
    padding-left: .2rem
    background: #fff
    color: #666
</style>
