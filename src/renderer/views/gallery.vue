<template>
    <div class="gallery">
        <waterfall :line-gap="200">
            <!-- each component is wrapped by a waterfall slot -->
            <waterfall-slot
                    v-for="(item, index) in numberOfImage"
                    :width="200"
                    :height="100"
                    :order="index"
                    :key="index"
            >
                <img
                        :src="'https://source.unsplash.com/random/' + size + '?sig=' + item"
                        class="image"
                        @click="setAsBackground">
            </waterfall-slot>
        </waterfall>
    </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import os from 'os'
  import wallpaper from 'wallpaper'
  import fs from 'fs'
  import path from 'path'
  export default {
    name: 'gallery',
    data () {
      return {
        numberOfImage: 10,
        width: window.screen.width,
        height: window.screen.height
      }
    },
    components: {
      Waterfall, WaterfallSlot
    },
    computed: {
      size () {
        return this.width + 'x' + this.height
      }
    },
    methods: {
      convertToBase64 (img) {
        let canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        let context = canvas.getContext('2d')
        context.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL('image/jpg')
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
      },
      setAsBackground (event) {
        let base64Image = this.convertToBase64(event.target)
        let picturePath = path.join(os.homedir(), '/Pictures', 'background.jpg')
        picturePath = path.normalize(picturePath)
        fs.writeFile(picturePath, base64Image, 'base64', () => {
          wallpaper.set(picturePath, {scale: 'stretch'})
            .then(() => {
              console.log(path.resolve(picturePath))
              this.$snackbar.open('Done !')
            })
        })
      }
    }
  }
</script>

<style lang="less">
    .gallery {
        width: 100%;
        .image {
            width: 100%;
            height: auto;
        }
    }
</style>