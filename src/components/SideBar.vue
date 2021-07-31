<template>
  <div :class="['side-bar', activeSidebar ? 'active' : '']">
    <ul class="side-bar__list">
      <side-bar-item v-for="item in items" :key="item.name" :item="item" ></side-bar-item>
    </ul>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue';

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
        {name: 'Genre', submenu: [
          {name: 'Yandere'},
          {name: 'Tsundere '},
          {name: 'Deredere'},
          {name: 'Kamidere'},
        ]},
        {name: 'Anime', path: '/anime'},
      ],
      sideBar: false,
    };
  },
  methods: {
    clickGenre() {
      this.sideBar = !this.sideBar;
    },
  },
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