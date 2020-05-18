<template>
  <me-scroll>
    <img src="./cart.png" alt="">
  </me-scroll>
</template>

<script>
  import MeScroll from 'base/scroll';

  export default {
    name: 'Cart',
    components: {
      MeScroll
    }
  }
</script>

<style lang="scss" scoped>

  img {
    width: 100%;
    height: 100%;
  }

</style>