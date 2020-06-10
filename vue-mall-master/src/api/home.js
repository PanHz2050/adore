import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
  SUCC_CODE,
  TIMEOUT,
  HOME_RECOMMEND_SIZE,
  jsonpOptions
} from './config';

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
    }
  }

  return arr;
};


// home slider获取幻灯片的数据--ajax
export const getHomeSlider = () => {
  return axios.get('https://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    // 返回数据之前先判断 是否有错误 // 用SUCC_CODE代替0
    if (res.data.code === SUCC_CODE) {
      let sliders = res.data.slider;
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
      // 筛选 filter会变量数组中的每一个值
      sliders = shuffle(sliders.filter(() => Math.random() <= 0.5));
      // 判断避免为零张图片
      if (sliders.length === 0) {
        sliders = slider;
      }

      return sliders;
    }

    throw new Error('没有成功获取到数据!');
  }).catch(err => {
    if (err) {
      console.log(err);
    }

    return [{
      linkUrl: '',
      picUrl: require('assets/img/404.png')
    }];
  })
  // .then(data => {
  //   // 模拟
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data);
  //     }, 1000);
  //   })
  // })
};


// 从服务器获取热门推荐数据-- jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  }

  return jsonp(url, params, jsonpOptions).then(res => {
    // code === '200'的时候才是成功 后面的就和之前做的差不多了
    if (res.code === '200') {
      return res;
    }

    throw new Error('没有成功获取到数据!');
  }).catch(err => {
    if (err) {
      console.log(err);
    }

  })
  // .then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data);
  //     }, 1000);
  //   })
  // })
}
