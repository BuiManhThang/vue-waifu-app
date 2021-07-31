<template>
    <loading v-if="loading" />
    <h1 v-else-if="error" > {{error}} </h1>
    <anime-infor v-else :anime="anime" />
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';

import AnimeInfor from '../components/AnimeInfor.vue';
import Loading from '../components/Loading.vue';
export default {
    components: {
        AnimeInfor,
        Loading
    },
    props: ['id'],
    setup(props) {
        const anime = ref({});
        const waifuList = ref([]);
        const error = ref(null);
        const loading = ref(true);

        axios.get(`http://localhost:3000/anime/${props.id}`)
        .then(res => {
            anime.value = res.data.anime;
            waifuList.value = res.data.waifuList;
            loading.value = false;
        })
        .catch(err => {
            error.value = err.message;
            loading.value = false;
        });

        return { anime, waifuList, error, loading };
    }
}
</script>

<style>

</style>