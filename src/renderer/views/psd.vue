<template>
    <div
            id="upload-area"
            :class="{ 'is-dragover': dragover }" @drop.prevent="onDrop" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
    >
        <div id="upload-dragger" @click="openUplodWindow">
            <i class="el-icon-upload"></i>
            <div class="upload-dragger__text">
                将文件拖到此处，或 <span>点击上传</span>
            </div>
            <input type="file" id="file-uploader" @change="onChange" multiple>
        </div>
    </div>
</template>

<script>
  import { remote } from 'electron'
  const { app } = remote
  export default {
    name: 'upload',
    data () {
      return {
        dragover: false
      }
    },
    methods: {
      onDrop (e) {
        this.dragover = false
        this.ipcSendFiles(e.dataTransfer.files)
      },
      openUplodWindow () {
        document.getElementById('file-uploader').click()
      },
      onChange (e) {
        this.ipcSendFiles(e.target.files)
        document.getElementById('file-uploader').value = ''
      },
      ipcSendFiles (files) {
        let sendFiles = []
        Array.from(files).forEach((item, index) => {
          let obj = {
            name: item.name,
            path: item.path
          }
          sendFiles.push(obj)
        })
        this.psdReader(sendFiles)
      },
      psdReader (sendFiles, callback) {
        let PSD = require('psd')
        PSD.open(sendFiles[0].path).then(function (psd) {
          let count = 0
          let nodes = psd.tree().descendants()

          let i = 0

          const saveNode2PNG = function () {
            function next () {
              i++
              if (i < nodes.length) {
                saveNode2PNG()
              } else {
                if (callback) {
                  setTimeout(function () {
                    callback()
                  }, 1000)
                }
              }
            }
            let node = nodes[i]
            if (node.isGroup() || node.width > 5120) {
              next()
              return
            }
            let fileName = app.getPath('pictures') + '/PicMagic/'
            let url = app.getPath('pictures') + '/PicMagic/' + count++ + '.png"'
            let fs = require('fs')
            if (!fs.existsSync(fileName)) {
              fs.mkdirSync(fileName)
            }
            node.saveAsPng(url).then(function () {
              next()
            })
          }

          if (nodes.length > 0) {
            saveNode2PNG()
          }
        }).then(function () {
          console.log('Finished!')
        })
      }
    }
  }
</script>

<style lang="less">
    #upload-area {
        height: 220px;
        border: 2px dashed #dddddd;
        border-radius: 8px;
        text-align: center;
        width: 420px;
        position: relative;
        left: 50%;
        top: 200px;
        transform: translate(-50%);
        color: #dddddd;
        cursor: pointer;
        transition: all .2s ease-in-out;
        .is-dragover {
            border: 2px dashed #A4D8FA;
            background-color: rgba(164, 216, 250, 0.3);
            color: #fff;
        }
        &:hover {
            border: 2px dashed #A4D8FA;
            background-color: rgba(164, 216, 250, 0.3);
            color: #fff;
        }
        #upload-dragger {
            height: 100%;
            i {
                font-size: 66px;
                margin: 50px 0 16px;
                line-height: 66px

            }
            span {
                color: #409EFF;
            }
            #file-uploader {
                display: none;
            }
        }

    }
</style>