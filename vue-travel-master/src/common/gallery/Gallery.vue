<template>
  <div class="contaniner" @click="handleGalleryClick">
    <div class="wrapper">
      <!-- swiper容器 -->
      <swiper :options="swiperOption">
        <!-- swiper-slide每一项 -->
        <swiper-slide
          v-for="(item, index) in imgs" :key="index"
          >
          <img class="gallery-img" :src="item"/>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonGallery",
  props: {
    // 从外部接收imgs的属性
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: ".swiper-pagination",
        paginationType: 'fraction',
        observer:true,
        observeParents:true,
      }
    };
  },
  methods: {
    handleGalleryClick () {
      this.$emit('close')
    }
  }
};
</script>

<style lang="stylus" scoped>
.contaniner >>> .swiper-container 
  overflow inherit
.contaniner
  display flex
  flex-direction column
  justify-content center
  position fixed
  z-index 99
  top 0
  bottom 0
  left 0
  right 0
  background #000
  .wrapper
    // overflow hidden
    width 100%
    height 0
    padding-bottom 100%
    background #fff
    .gallery-img
      width 100%
    .swiper-pagination
      bottom -1rem
      color #fff
</style>
