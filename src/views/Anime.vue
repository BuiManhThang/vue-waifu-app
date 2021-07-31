<template>
  <loading v-if="loading" />
  <h1 v-else-if="err"> {{err}} </h1>
  <anime-list v-else :animeList="animeList" />
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import AnimeList from '../components/AnimeList.vue';
import Loading from '../components/Loading.vue';
export default {
  components: {
    AnimeList,
    Loading
  },
  setup() {
    const animeList = ref([]);
    const err = ref(null);
    const loading = ref(true);

    axios.get('http://localhost:3000/anime/list')
    .then(res => {
      animeList.value = res.data;
      loading.value = false;
    })
    .catch(error => {
      err.value = error.message;
      loading.value = false;
    });

    return {animeList, err, loading};
  }
}
</script>

<style>

</style>