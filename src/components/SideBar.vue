<template>
  <div :class="['side-bar', activeSidebar ? 'active' : '']">
    <ul class="side-bar__list">
      <side-bar-item @link-active="$emit('link-active')" v-for="item in items" :key="item.name" :item="item" ></side-bar-item>
    </ul>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue';
import axios from 'axios';

export default {
  props: {
    activeSidebar: Boolean
  },
  components: {
    SideBarItem
  },
  data() {
    return {
      items: [
        {name: 'Home', path: '/'},
        {name: 'Genre', submenu: []},
        {name: 'Anime', path: '/anime'},
      ],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/genre/list')
    .then(res => {
      this.items[1].submenu = res.data;
    })
    .catch((err) => {
      this.items[1].submenu = [{name: err.message}];
    })
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