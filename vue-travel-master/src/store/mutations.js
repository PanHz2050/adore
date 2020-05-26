export default {
   // state公用数据
   changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (error) {}
  }
}