<template>
  <li class="side-bar__item">
      <template v-if="item.submenu" >
        <button @click="clickItem"> {{item.name}}
            <i :class="['fas fa-chevron-right', active ? 'active' : '']"></i>
        </button>
        <submenu :active="active" :subItems="item.submenu" />
      </template>
      <template v-else>
        <router-link :to="item.path"> {{item.name}} </router-link>
      </template>
    </li>
</template>

<script>
import Submenu from './Submenu.vue';
export default {
    data() {
        return {
            active: false
        }
    },
    props: {
        item: Object
    },
    components: {
        Submenu
    },
    methods: {
        clickItem() {
            this.active = !this.active;
        }
    }
}
</script>

<style scoped >
    li {
        position: relative;
        border-radius: 5px;
        transition: background 0.3s ease;
    }
    a, button {
        background-color: transparent;
        outline: none;
        border: none;
        display: block;
        width: 100%;
        height: 100%;
        color: #eee;
        text-decoration: none;
        font-size: 18px;
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
    }
    .router-link-active {
        background-color: #0d6efd;
    }
    li:hover {
        background-color: #0d6efd;
    }
    i {
        transform: rotate(90deg);
        transition: all 0.3s ease;
    }
    i.active {
        transform: rotate(0);
    }
    @media screen and (max-width: 575px) {
        li:hover {
            background-color: #333;
        }
        a, button {
            height: 50px;
            font-size: 25px;
        }

    }
</style>