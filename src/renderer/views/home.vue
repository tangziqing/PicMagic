<template>
    <div class="main-container">
        <div class="fake-title-bar">
            PicMagic - {{ version }}
            <div class="handle-bar">
                <i class="el-icon-minus icon" title="最小化" @click="minimizeWindow"></i>
                <i class="el-icon-close icon" title="关闭" @click="closeWindow"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-left">
                <el-menu
                        class="pic-magic-sidebar"
                        :default-active="defaultActive"
                        @select="handleSelect"
                >
                    <el-menu-item index="wallpaper">
                        <i class="el-icon-news"></i>
                        <span slot="title">桌面壁纸</span>
                    </el-menu-item>
                    <el-menu-item index="image">
                        <i class="el-icon-upload"></i>
                        <span slot="title">图片压缩</span>
                    </el-menu-item>
                    <el-menu-item index="compress">
                        <i class="el-icon-picture-outline"></i>
                        <span slot="title">批量压缩</span>
                    </el-menu-item>
                    <el-menu-item index="webp">
                        <i class="el-icon-picture"></i>
                        <span slot="title">批量转webp</span>
                    </el-menu-item>
                    <el-menu-item index="psd">
                        <i class="el-icon-printer"></i>
                        <span slot="title">PSD切图</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="col-right">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
  import { remote } from 'electron'
  const { BrowserWindow } = remote
  export default {
    name: 'main-page',
    data () {
      return {
        version: '1.0.0',
        defaultActive: 'wallpaper'
      }
    },
    created () {
      this.$router.push({
        name: this.defaultActive
      })
    },
    methods: {
      handleSelect (index) {
        this.$router.push({
          name: index
        })
      },
      minimizeWindow () {
        const window = BrowserWindow.getFocusedWindow()
        window.minimize()
      },
      maximizeWindow () {
        const window = BrowserWindow.getFocusedWindow()
        window.maximize()
      },
      closeWindow () {
        const window = BrowserWindow.getFocusedWindow()
        window.close()
      }
    }
  }
</script>

<style lang="less">
    .main-container {
        overflow: hidden;
        height: 800px;
        .fake-title-bar {
            -webkit-app-region: drag;
            height: 40px;
            width: 100%;
            text-align: center;
            font-size: 16px;
            line-height: 40px;
            position: fixed;
            z-index: 100;
            background: #fff;
            .handle-bar {
                position: absolute;
                top: 0;
                right: 0;
                width: 86px;
                z-index: 10000;
                -webkit-app-region: no-drag;
                .icon {
                    padding: 12px;
                    &:hover {
                        background-color: #f2f4f6;
                    }
                }
            }
        }
        .row {
            padding-top: 40px;
            .col-left {
                width: 20%;
                float: left;
            }
            .col-right{
                width: 80%;
                float: left;
            }
        }
        .pic-magic-sidebar {
            border-right: none;
        }
    }
</style>