<template>
  <ul class="list">
    <li
      class="item"
      v-for="item in letters"
      :key="item"
      :ref="item"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="hanleLetterClick"
    >
      <!-- 右侧26个字母 -->
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object
  },
  data() {
    return {
      // 定义表示类
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  updated() {
    // 当页面数据被更新完成渲染的时候,updated就会执行
    this.startY = this.$refs["A"][0].offsetTop;
  },
  computed: {
    //
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters; // ['A', 'B', 'C', ...]
    }
  },
  methods: {
    hanleLetterClick(e) {
      // 当点击对应字母,传给list组件,然后让list对应的区块显示出来
      // 这时候就要做个兄弟组件的传值,可以先传给父组件,然后父组件传给子组件
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // 获取A元素距离顶部的距离,需要滑动才有效果
          // const startY = this.$refs['A'][0].offsetTop
          // A到搜索框的距离
          const touchY = e.touches[0].clientY - 79;
          // index手指滑动的位置对应字母的下标
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            // 触发滚动事件,滚动右侧字母左侧显示对应区域的城市内容
            this.$emit("change", this.letters[index]);
          }
        }, 8);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
      // console.log('3333')
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
  display flex
  flex-direction column
  justify-content center
  position absolute
  top 1.58rem
  right 0
  bottom 0
  width .5rem
  // background red
  .item
    line-height .4rem
    text-align center
    color $bgColor
</style>
