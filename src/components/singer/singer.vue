<template>
  <div class="singer">
    <list-view @select="selectSinger" :data ="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({ //路由编程式
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer) // 相当于对mutations的一个提交
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          console.log('获取歌手列表数据', this.singers)
        }
      })
    },
    // 格式化拿到的歌手数据 方便渲染
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name           
          }))
        }

        // key 为歌手的姓 => 字母
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid, //该字段用来拼出图片地址
          name: item.Fsinger_name
        }))
      })
      // 为了得到有序列表，我们需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      // 排序a-z
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret) //拼接成为一维数组
    },
    ...mapMutations({
      setSinger: 'SET_SINGER' // 将 `this.setSinger()` 映射为 `this.$store.commit('SET_SINGER')`

    })
  }
}
</script>
<style lang="scss" scoped>
.singer {
  position: fixed; //better-scroll的父容器要固定好，子容器的内容撑开
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
