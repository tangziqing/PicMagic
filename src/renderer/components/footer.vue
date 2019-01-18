<template>
    <div class="footer-bar">
        <span>By 唐松</span>
    </div>
</template>

<script>
  export default {
    name: 'footer-bar',
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
    .footer-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        line-height: 40px;
        text-align: center;
        span {
            font-size: 16px;
        }
    }
</style>