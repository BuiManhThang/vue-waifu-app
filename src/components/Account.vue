<template>
  <div class="position-relative" >
      <button @click="openMenu = !openMenu" class="btn btn-account">
          <img class="avata" v-if="user" :src="user.avata" alt="user">
          <i v-else class="fas fa-user-circle"></i>
     </button>
      <ul v-if="user" :class="['account-btn-list', openMenu ? 'active' : '']">
          <li class="account-btn-item">
              <router-link @click="openMenu = !openMenu" :to="{name: 'Infor'}" class="account-btn btn">
                  Infor
              </router-link>
              <button @click="logOut" class="account-btn btn">
                  Log Out
              </button>
          </li>
      </ul>
      <ul v-else :class="['account-btn-list', openMenu ? 'active' : '']">
          <li class="account-btn-item">
              <router-link @click="openMenu = !openMenu" :to="{name: 'LogIn'}" class="account-btn btn">
                  Log In
              </router-link>
              <router-link @click="openMenu = !openMenu" :to="{name: 'Register'}" class="account-btn btn">
                  Register
              </router-link>
          </li>
      </ul>
  </div>

  
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const openMenu = ref(false);
        const router = useRouter()

        const user = computed(() => {
            return store.state.user;
        })

        const logOut = () => {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/user/logout',
                withCredentials: true
            })
            .then(res => {
                if(res.data.message === 'success') {
                    openMenu.value = ! openMenu.value;
                    store.commit('setUser', null);
                    router.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }

        return {openMenu, user, logOut}
    }
}
</script>

<style scoped>
img {
    display: block;
    height: 100%;
    width: 100%;
    border: #eee 2px solid;
    border-radius: 50%;
    object-fit: cover;
}

.btn-account {
      font-size: 50px;
      color: #eee;
      padding: 0;
      border-radius: 50%;
      outline: none;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .account-btn-list {
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      top: calc(100% - 1px);
      right: 0;
      background-color: #333;
      border-radius: 5px;
      box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.7);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      border: #eee 1px solid;
  }
  .account-btn-list.active {
      opacity: 1;
      visibility: visible;
  }
  .account-btn-item {
      width: max-content;
  }
  .account-btn {
      color: #eee;
      font-size: 18px;
      text-align: center;
      width: 100%;
      transition: all 0.3s ease;
      border-radius: 0;
  }
  .account-btn:hover {
      background-color: #000;
  }

@media screen and (max-width: 575px) {
  img {
      width: 30px;
      height: 30px;
  }
  .btn-account {
      width: 30px;
      height: 30px;
      font-size: 30px;
  }
  .account-btn-list {
      position: fixed;
      top: unset;
      bottom: -90px;
      left: 0;
      height: 82px;
      width: 100%;
      box-shadow: 0 -5px 5px 0 rgba(0, 0, 0, 0.7);
      border-radius: 5px 5px 0 0;
      opacity: 1;
      visibility: visible;
      z-index: -1;
      border: none;
  }
  .account-btn-item {
      width: 100%;
  }
  .account-btn-list.active {
      bottom: 40px;
  }
}

</style>