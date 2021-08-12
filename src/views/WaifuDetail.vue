<template>
    <loading v-if="loading" />
    <waifu-infor v-else :waifuInfor="waifuInfor" @like="handlLike" />
</template>

<script>
import {onBeforeRouteUpdate, useRoute} from 'vue-router';
import axios from 'axios';
import { ref } from '@vue/reactivity';

import WaifuInfor from '../components/WaifuInfor.vue';
import Loading from '../components/Loading.vue';
export default {
    name: 'WaifuDetail',
    components: {
        WaifuInfor,
        Loading
    },
    setup() {
        const route = useRoute();        
        const waifuInfor = ref({});
        const loading = ref(true);
        axios.get(`http://localhost:3000/waifu/${route.params.id}`)
        .then(data => {
            waifuInfor.value = data.data;
            loading.value = false;
        })
        .catch(err => console.log(err));

        onBeforeRouteUpdate((to, from, next) => {
            if(to.name === 'WaifuDetail') {
                axios.get(`http://localhost:3000/waifu/${to.params.id}`)
                .then(data => {
                    waifuInfor.value = data.data;
                    loading.value = false;
                })
                .catch(err => console.log(err));
            }
            next();
        });

        const handlLike = () => {
            axios.get(`http://localhost:3000/waifu/${route.params.id}`)
            .then(data => {
                waifuInfor.value = data.data;
                loading.value = false;
            })
            .catch(err => console.log(err));
        }

        return {waifuInfor, loading, handlLike};
    }
}
</script>

<style>

</style>