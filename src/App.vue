<template>
  <nav-bar :activeSidebar="activeSideBar" @active-sidebar="activeSideBar = !activeSideBar" />
  <side-bar @link-active="activeSideBar = !activeSideBar" :activeSidebar="activeSideBar"/>
  <main-content>
    <router-view></router-view>
  </main-content>
  <footer-app></footer-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import MainContent from './components/MainContent.vue';
import FooterApp from './components/FooterApp.vue';
import { ref } from '@vue/reactivity';
import { watch, watchEffect } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  components: { 
    NavBar, SideBar, MainContent, FooterApp
  },
  setup() {
    const store = useStore();
    const activeSideBar = ref(false);
    const route = useRoute();
    watch(activeSideBar, () => {
      if(activeSideBar.value === true) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'auto';
      }
    })

    store.dispatch('fetchUser');

    watchEffect(() => {
      if(route.path) {
        store.dispatch('fetchUser');
      } 
    })

    return {
      activeSideBar
    }
  },
  
}
</script>


<style>
#app {
  font-family: 'Roboto', sans-serif;
  background-color: #eee;
  min-height: 100vh;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #000;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(95, 94, 94);
  width: 100%;
  border-radius: 5px;
}
</style>
