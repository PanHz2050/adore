<template>
  <div class="product">
    <header class="g-header-container">
      <category-header/>
    </header>
    <img src="./productList.png" alt="">
  </div>
</template>

<script>
  import CategoryHeader from './header';

  export default {
    name: 'Product',
    components: {
      CategoryHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

 .product {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
  
  div img {
    width: 100%;
    height: 100%;
  }

</style>