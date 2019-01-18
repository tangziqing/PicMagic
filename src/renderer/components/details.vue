<template>
    <transition name="modal">
        <div class="modal-mask"  @click="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop="">

                    <div class="modal-header">
                        <slot name="header">

                          </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <div class="item-detail"
                                 :style="{backgroundImage: 'url(' +item.urls.custom+ ')'}">
                            </div>
                          </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <a class="download" title="下载" :href="item.links.download" download>下载</a>
                            <a class="background" title="设置桌面" @click="setBackground(item)">设置桌面</a>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'modal',
    data () {
      return {}
    },
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      setBackground (item) {
        this.$emit('setBackground', item)
      }
    }
  }
</script>

<style lang="less">
    .modal-mask {
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(180,188,197,.95);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 80%;
        height: auto;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        transition: all .3s ease;
        .item-detail {
            position: relative;
            width: 100%;
            height: 560px;
            background-color: #f2f4f6;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-footer {
        width: 80%;
        position: absolute;
        bottom: 40px;
        text-align: center;
        a {
            display: inline-block;
            width: 100px;
            height: 36px;
            line-height: 36px;
            border: 1px solid #2385ff;
            border-radius: 4px;
            color: #2385ff;
            text-align: center;
            cursor: pointer;
            margin: 0  10px;
            &:hover {
                color: #fff;
                background: #2385ff;
            }
        }
    }
</style>