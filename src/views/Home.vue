<template>
  <template v-if="isAdmin" >
    <waifu-list-admin @delete-waifu="handleDeleteWaifu" @create-waifu="handleCreateWaifu" v-model:sortBy="sortBy" v-if="waifuList.length" :waifuList="waifuList" />
    <loading v-else />
  </template>
  <template v-else >
    <waifu-list v-if="waifuList.length" :waifuList="waifuList" v-model:sortBy="sortBy" />
    <loading v-else />
  </template>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import WaifuList from '../components/WaifuList.vue';
import Loading from '../components/Loading.vue';
import WaifuListAdmin from '../components/WaifuListAdmin.vue';
import { computed, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  components: {
    WaifuList,
    Loading,
    WaifuListAdmin
  },
  setup() {
    const waifuList = ref([]);
    const store = useStore();
    const sortBy = ref('name');

    const isAdmin = computed(() => {
      if(store.state.user === null) {
        return false;
      } else {
        if(store.state.user.role === 'user') {
          return false;
        } else {
          return true;
        }
      }
    });

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

    watch(sortBy, () => {
      sort(sortBy.value);
    });

    axios.get('http://localhost:3000/waifu/list')
    .then(data => {
      waifuList.value = data.data;
      waifuList.value.forEach((waifu, index) => {
        waifuList.value[index].like = waifu.user.length;
      })
      sort('name');
    })
    .catch(err => console.log(err));

    const handleCreateWaifu = () => {
      axios.get('http://localhost:3000/waifu/list')
      .then(data => {
        waifuList.value = data.data;
        waifuList.value.forEach((waifu, index) => {
        waifuList.value[index].like = waifu.user.length;
      })
      sort('name');
      })
      .catch(err => console.log(err));
    }

    const handleDeleteWaifu = (id) => {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/waifu/delete',
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
        data: {
          waifuId: id
        }
      })
      .then(data => {
        waifuList.value = data.data;
        waifuList.value.forEach((waifu, index) => {
        waifuList.value[index].like = waifu.user.length;
      })
      sort('name');
      })
      .catch(err => console.log(err));
    }

    return { waifuList, isAdmin, sortBy, handleCreateWaifu, handleDeleteWaifu };
  },
}
</script>

<style>
  
</style>