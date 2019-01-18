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
      this.$electron.ipcRenderer.send('uploadChoosedFiles', sendFiles)
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
  color: #dddddd;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  .is-dragover {
    border: 2px dashed #a4d8fa;
    background-color: rgba(164, 216, 250, 0.3);
    color: #fff;
  }
  &:hover {
    border: 2px dashed #a4d8fa;
    background-color: rgba(164, 216, 250, 0.3);
    color: #fff;
  }
  #upload-dragger {
    height: 100%;
    i {
      font-size: 66px;
      margin: 50px 0 16px;
      line-height: 66px;
    }
    span {
      color: #409eff;
    }
    #file-uploader {
      display: none;
    }
  }
}
</style>