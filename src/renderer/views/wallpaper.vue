<template>
    <div class="wallpaper" v-loading="loading"
         element-loading-text="正在设置桌面">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in items" :key="item.id">
                <div class="slot-item" @click="openModal(item)"
                     :style="{backgroundImage: 'url(' +item.urls.thumb+ ')'}">
                    <div class="tips" @click.stop="">
                        <a class="download" title="下载" :href="item.links.download" download><i class="el-icon-download"></i></a>
                        <a class="background" title="设置桌面" @click="setBackground(item)"><i class="el-icon-picture"></i></a>
                    </div>
                </div>
                <!--<img :src= "item.urls.custom"-->
                        <!--class="image"-->
                        <!--@click="setBackground(item)">-->
            </el-col>
        </el-row>
        <a class="load-more" @click="loadImage">换一换</a>
        <modal v-if="showModal" :item="item" @close="showModal = false" @setBackground="setBackground"></modal>
    </div>
</template>

<script>
import os from 'os'
import wallpaper from 'wallpaper'
import fs from 'fs'
import path from 'path'
import Unsplash, { toJson } from 'unsplash-js'
import modal from '../components/details.vue'
const unsplash = new Unsplash({
  applicationId:
    '',
  secret: '',
  callbackUrl: 'http://unsplash-js.herokuapp.com'
})
export default {
  name: 'wallpaper',
  data () {
    return {
      width: window.screen.width,
      height: window.screen.height,
      items: [],
      item: {},
      loading: false,
      showModal: false
    }
  },
  computed: {
    size () {
      return this.width + 'x' + this.height
    }
  },
  components: {
    modal
  },
  created () {
    this.loadImage()
  },
  methods: {
    loadImage () {
      unsplash.photos
        .getRandomPhoto({ width: 1920, height: 1080, count: 20 })
        .then(toJson)
        .then(json => {
          this.items = json
          //  console.log(this.items)
        })
    },
    openModal (item) {
      this.showModal = true
      this.item = item
    },
    setBackground (item) {
      this.loading = true
      let self = this
      const request = require('request')
      let picturePath = path.join(os.homedir(), '/Pictures', 'background.jpg')
      picturePath = path.normalize(picturePath)
      request(item.urls.custom, function () {
        wallpaper.set(picturePath, { scale: 'stretch' }).then(() => {
          self.loading = false
          self.$electron.ipcRenderer.send('setWallpaperSuccessful')
        })
      }).pipe(fs.createWriteStream(picturePath))
    }
  }
}
</script>

<style lang="less">
.wallpaper {
  overflow: auto;
  width: 100%;
  height: 760px;
  position: relative;
    .el-loading-mask {
        position: fixed;
    }
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    .slot-item {
      position: relative;
      width: 100%;
      height: 126px;
      margin-bottom: 20px;
      cursor: pointer;
      background-color: #f2f4f6;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
        .tips {
            position: absolute;
            width: 100%;
            background: rgba(255,255,255,.8);
            opacity: 0;
            bottom: 0;
            left: 0;
            a {
                float: right;
                margin-right: 10px;
            }
        }
      &:hover {
        box-shadow: rgba(148, 140, 125, 0.2) 0 2px 2px,
          rgba(148, 140, 125, 0.2) 0 4px 4px,
          rgba(148, 140, 125, 0.2) 0 8px 8px,
          rgba(148, 140, 125, 0.2) 0 16px 16px;
        .tips {
          opacity: 0.95;
          -webkit-transition: all 0.2s ease-in-out;
          -moz-transition: all 0.2s ease-in-out;
          -o-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }
  .load-more {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translate(-50%);
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    color: #409eff;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
    border: 1px solid #409eff;
    &:hover {
      color: #fff;
      background-color: #409eff;
    }
  }
}
</style>