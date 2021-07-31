<template>
  <nav-bar :activeSidebar="activeSideBar" @active-sidebar="activeSideBar = !activeSideBar" />
  <side-bar :activeSidebar="activeSideBar"/>
  <main-content>
    <router-view></router-view>
  </main-content>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import MainContent from './components/MainContent.vue';

export default {
  components: { 
    NavBar, SideBar, MainContent 
  },
  data() {
    return {
      activeSideBar: false
    }
  },
  watch: {
    activeSideBar() {
      if(this.activeSideBar) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'auto';
      }
    }
  }
}
</script>


<style>
#app {
  font-family: 'Roboto', sans-serif;
  background-color: #eee;
  min-height: 100vh;
}
</style>
