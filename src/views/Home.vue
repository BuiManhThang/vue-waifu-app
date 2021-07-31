<template>
  <waifu-list v-if="waifuList.length" :waifuList="waifuList" />
  <loading v-else />
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import WaifuList from '../components/WaifuList.vue';
import Loading from '../components/Loading.vue';
export default {
  components: {
    WaifuList,
    Loading
  },
  setup() {
    const waifuList = ref([]);

    axios.get('http://localhost:3000/waifu/list')
    .then(data => waifuList.value = data.data)
    .catch(err => console.log(err));

    return { waifuList };
  },
}
</script>

<style>
  
</style>