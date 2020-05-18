// 复用代码
import storage from 'assets/js/storage';
import {
  SEARCH_HISTORY_KEYWORD_KEY
} from 'pages/search/config';

export const searchMixin = {
  methods: {
    // 历史记录缓存 $_selectItem表示私有的方法
    $_selectItem(keyword) {
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);

      if (keywords.length !== 0) {
        // filter数组过滤
        keywords = keywords.filter(val => val !== keyword)
      }

      // 从头开始添加
      keywords.unshift(keyword);

      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      //跳到淘宝的搜索页

    }
  }
}
