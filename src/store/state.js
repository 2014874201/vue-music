import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'
const state = {
  // 歌手信息 Object{ id name avatar }
  singer: {},
  // 播放状态 Boolean
  playing: false,
  // 播放器全屏 Boolean
  fullScreen: false,
  // 当前歌曲播放列表 Array
  playList: [],
  // 顺序歌曲播放列表 Array
  sequenceList: [],
  // 播放模式 Object
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 推荐列表详情 Object
  disc: {},
  // 排行榜列表 Object
  topList: {},
  // 本地搜索历史 Array
  searchHistory: loadSearch(),
  // 播放历史 Array
  playHistory: loadPlay(),
  // 用户中心
  favoriteList: loadFavorite(),
  // 是否默认隐藏侧边栏
  isShowAsideMenu: false,//默认隐藏起来的

  skinColor: localStorage.skinColor || '#B72712',

  isShowAbout: false//关于的页面
}

export default state