// 封装jsonp 然后再到api home.js 发送请求
import jsonp from 'jsonp';

/* 
parseParam 需要将json数据
{
  page: 1,
  psize: 20
} 
转化成 page=1&psize=20 这样的字符串
*/
const parseParam = param => {
  let params = [];
  // 遍历对象
  for (const key in param) {
    params.push([key, param[key]]);
    // [[page, 1], [psize, 20]]
  }

  return params.map(value => value.join('=')).join('&');
  // [[page, 1], [psize, 20]] 就转化成了
  // 第一个 join[page=1, psize=20] 第二个 page=1&psize=20;
}

export default (url, data, options) => {
  // 判断url后面有没有问号
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);
  
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}