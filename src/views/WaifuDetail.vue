<template>
    <loading v-if="loading" />
    <waifu-infor v-else :waifuInfor="waifuInfor" />
</template>

<script>
import {useRoute} from 'vue-router';
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

        return {waifuInfor, loading};
    }
}
</script>

<style>

</style>