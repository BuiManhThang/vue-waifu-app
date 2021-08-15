<template>
    <loading v-if="loading" />
    <h1 v-else-if="error" > {{error}} </h1>
    <template v-else >
        <h1> {{genre.name}} </h1>
        <waifu-list :waifuList="waifuList" v-model:sortBy="sortBy" />
    </template>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import WaifuList from '../components/WaifuList.vue';
import Loading from '../components/Loading.vue';
import { watchEffect, watch } from '@vue/runtime-core';
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
        const sortBy = ref('name');

        const sort = (by) => {
            let length = waifuList.value.length;
            for(let i = 0; i < length-1; i++) {
                for(let j = i; j < length; j++) {
                    if(waifuList.value[i][by] > waifuList.value[j][by]) {
                        let temp = waifuList.value[i];
                        waifuList.value[i] = waifuList.value[j];
                        waifuList.value[j] = temp;
                    }
                }
            }
        }


        axios.get(`http://localhost:3000/genre/${route.params.id}`)
        .then(res => {
            genre.value = res.data.genre;
            waifuList.value = [...res.data.waifuList];
            waifuList.value.forEach((waifu, index) => {
                waifuList.value[index].like = waifu.user.length;
            })
            sort(sortBy.value);
            loading.value = false;
        })
        .catch(err => {
            error.value = err.message;
            loading.value = false;
        });

        watch(sortBy, () => {
            sort(sortBy.value);
        });

        watchEffect(() => {
            if(route.path.split('/')[1] === 'genre') {

                axios.get(`http://localhost:3000/genre/${route.params.id}`)
                .then(res => {
                    genre.value = res.data.genre;
                    waifuList.value = [...res.data.waifuList];
                    waifuList.value.forEach((waifu, index) => {
                        waifuList.value[index].like = waifu.user.length;
                    })
                    sort(sortBy.value);
                    loading.value = false;
                })
                .catch(err => {
                    error.value = err.message;
                    loading.value = false;
                });
            }
        })

        return { genre, waifuList, error, loading, sortBy, sort };
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