<template>
    <loading v-if="loading" />
    <h1 v-else-if="error" > {{error}} </h1>
    <template v-else>
        <anime-infor :anime="anime" />
        <div class="gallery-header">
            <h2 class="gallery-title">Waifu</h2>
        </div>
        <waifu-list :waifuList="waifuList" />
    </template>

</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';

import AnimeInfor from '../components/AnimeInfor.vue';
import Loading from '../components/Loading.vue';
import WaifuList from '../components/WaifuList.vue';

export default {
    components: {
        AnimeInfor,
        Loading,
        WaifuList
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

<style scoped>
    .gallery-header {
        border-bottom: #333 2px solid;
    }
    .gallery-title {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #333;
    }
</style>