<template>
  <div>
    <city-header/>
    <city-search :cities="cities"/>
    <city-list 
      :city="city" 
      :cities="cities" 
      :hotCities="hotCities"
      :letter="letter"/>
    <!-- 监听alphabet传过来的事件 --> 
    <city-alphabet 
      :cities="cities" 
      @change="handleLetterChange" 
    />
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'

export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data() {
    return {
      // curCity: '深圳',
      city: '',
      cities: {},
      hotCities: [],
      // 这里letter作为中间数据
      letter: ''
    }
  },
  mounted () {
    this.getCityInfo()
  },
  methods: {
    getCityInfo() {
      axios.get('/static/mock/city.json')
        .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.city = data.city
        this.hotCities = data.hotCities
        this.cities = data.cities
        // console.log(data)
      }
    },
    // 这个方法是子组件alphabet
    handleLetterChange (letter) {
      this.letter = letter
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
