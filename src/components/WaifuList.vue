<template>
  <gallery>
      <waifu v-for="waifu in waifuList" :key="waifu.id" :waifu="waifu" />
  </gallery>
</template>

<script>
import Waifu from './Waifu.vue';
import Gallery from './Gallery.vue';
export default {
    components: {
        Waifu,
        Gallery
    },
    props: {
        waifuList: Array
    }
}
</script>
