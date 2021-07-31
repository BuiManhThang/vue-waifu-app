<template>
    <loading v-if="loading" />
    <h1 v-else-if="error" > {{error}} </h1>
    <template v-else >
        <h1> {{genre.name}} </h1>
        <waifu-list :waifuList="waifuList" />
    </template>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import WaifuList from '../components/WaifuList.vue';
import Loading from '../components/Loading.vue';
import { watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default {
    components: {
        WaifuList,
        Loading
    },
    setup() {
        const genre = ref({});
        const waifuList = ref([]);
        const error = ref(null);
        const loading = ref(true);
        const route = useRoute();

        axios.get(`http://localhost:3000/genre/${route.params.id}`)
        .then(res => {
            genre.value = res.data.genre;
            waifuList.value = res.data.waifuList;
            loading.value = false;
        })
        .catch(err => {
            error.value = err.message;
            loading.value = false;
        });

        watchEffect(() => {
            if(route.path.split('/')[1] === 'genre') {

                axios.get(`http://localhost:3000/genre/${route.params.id}`)
                .then(res => {
                    genre.value = res.data.genre;
                    waifuList.value = res.data.waifuList;
                    loading.value = false;
                })
                .catch(err => {
                    error.value = err.message;
                    loading.value = false;
                });
            }
        })

        return { genre, waifuList, error, loading };
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
        color: #333;
        font-size: 35px;
        font-weight: 700;
        margin-top: 20px;
    }
</style>