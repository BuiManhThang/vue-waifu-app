<template>
  <div :class="['side-bar', activeSidebar ? 'active' : '']">
    <ul class="side-bar__list">
      <side-bar-item @link-active="$emit('link-active')" v-for="item in items" :key="item.name" :item="item" ></side-bar-item>
    </ul>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue';
import { computed, onMounted, watchEffect } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  props: {
    activeSidebar: Boolean
  },
  components: {
    SideBarItem
  },
  setup() {
    const store = useStore();
    
    const items = computed(() => {
      return store.state.items;
    })

    watchEffect(() => {
      if(!store.state.user) {
        store.dispatch('fetchSideBarUser');
      }
      else {
        if(store.state.user.role === 'user') {
          store.dispatch('fetchSideBarUser')
        }
        else {
          store.commit('setSideBarAdmin')
        }
      }
    })

    onMounted(() => {
      if(!store.state.user)
        store.dispatch('fetchSideBarUser');
      else {
        if(store.state.user.role === 'user')
          store.dispatch('fetchSideBarUser')
        else
          store.commit('setSideBarAdmin')
      }
    })

    return {items};
  }
  
};
</script>
<style scoped >
.side-bar {
  background-color: #333;
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 70px;
  z-index: 1;
}
ul {
  list-style: none;
  padding: 20px;
  margin: 0;
}

@media screen and (max-width: 575px) {
  .side-bar {
    transition: all 0.3s ease;
    left: -100%;
    width: 100%;
  }
  .side-bar.active {
    left: 0;
  }
}

</style>