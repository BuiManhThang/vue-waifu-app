<template>
  <div class="waifu">
      <router-link :to="`/waifu/${waifu._id}`" >
        <div class="waifu-img__container">
            <img class="waifu-img" :src="waifu.thumbnail" :alt="waifu.name">
        </div>
        <p class="waifu-name"> {{waifu.name}} </p>
      </router-link>
      <i @click="like" v-if="isLike" class="fas fa-heart"></i>
      <i @click="like" v-else class="far fa-heart"></i>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
// import { ref } from '@vue/reactivity'
export default {
    props: {
        waifu: Object
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();

        const isLike = computed(() => {
            let inList = false;
            store.state.user?.waifu.forEach(my_waifu => {
                if(my_waifu === props.waifu._id) {
                    inList = true;
                }
            });
            if(inList) {
                return true;
            } else {
                return false;   
            }
        });

        const like = () => {
            if(!store.state.user) {
                router.push('/login');
                return;
            }
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/like',
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    waifuId: props.waifu._id
                }
            })
            .then(() => {
                store.dispatch('fetchUser');
            })
            .catch((err) => {
                console.log(err);
            })
        }

        return {
            isLike,
            like,
        }
    }
}
</script>

<style scoped >
    a {
        text-decoration: none;
    }
    .waifu {
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
        background-color: #333;
        transition: box-shadow 0.3s ease;
        position: relative;
    }
    .waifu:hover {
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.7);
    }
    .waifu-img__container {
        width: 100%;
        height: 160px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        color: #eee;
        font-size: 18px;
        text-align: center;
        margin: 0;
        padding: 5px;
    }
    i {
        position: absolute;
        bottom: 40px;
        right: 5px;
        font-size: 25px;
        color: hotpink;
        cursor: pointer;
    }
    .far:hover {
        font-weight: 600;
    }
</style>