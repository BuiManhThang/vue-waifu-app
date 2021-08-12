<template>
    <div class="waifu-container" >
        <div class="waifu-infor">
            <img :src="waifuInfor.waifu.thumbnail" :alt="waifuInfor.waifu.name">
            <div class="waifu-detail">
                <h2>{{waifuInfor.waifu.name}} </h2>
                <p><strong>Birthday:</strong> {{birthday}} </p>
                <p><strong>Detail:</strong> {{waifuInfor.waifu.detail}} </p>
                <p><strong>In Anime: </strong> 
                    <router-link :to="{name: 'AnimeDetail', params: {id: waifuInfor.waifu.anime._id}}" > {{waifuInfor.waifu.anime.name}} </router-link>
                </p>
                <p v-if="waifuInfor.waifu.genre" ><strong>Tag: </strong>
                    <router-link v-for="(tag, index) in waifuInfor.waifu.genre" :key="tag.id" :to="{name: 'GenreDetail', params: {id: tag._id}}" > #{{tag.name}} <span v-if="index < waifuInfor.waifu.genre.length - 1" >,</span> </router-link>
                </p>
                <div class="like">
                    <span> {{waifuInfor.like}} </span>
                    <i @click="like" v-if="isLike" class="fas fa-heart"></i>
                    <i @click="like" v-else class="far fa-heart"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    name: 'WaifuInfor',
    props: {
        waifuInfor: Object
    },
    setup(props, {emit}) {
        const store = useStore();
        const router = useRouter();

        const isLike = computed(() => {
            let result = false;
            store.state.user?.waifu.forEach(waifu => {
                if(props.waifuInfor.waifu._id === waifu) {
                    result = true;
                }
            })
            if(result) {
                return true;
            } else {
                return false;
            }
        })

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
                    waifuId: props.waifuInfor.waifu._id
                }
            })
            .then(() => {
                store.dispatch('fetchUser');
                emit('like');
            })
            .catch((err) => {
                console.log(err);
            })
        }

        const birthday = computed(() => {
            const date = new Date(props.waifuInfor.waifu.birthday);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
        });
        return {birthday, isLike, like};
    },
    emits: ['like']
}
</script>

<style scoped>
    .like {
        display: flex;
        align-items: center;
    }
    .like span{
        color: #333;
        font-size: 18px;
        font-weight: 700;
        margin-right: 5px;
    }
    .like i {
        color: hotpink;
        font-size: 25px;
    }
    .far:hover {
        font-weight: 600;
    }
    .waifu-container {
        padding: 20px 20px 0 20px;
    }
    .waifu-infor {
        display: grid;
        grid-template-columns: 2fr 3fr;
        border-bottom: #333 1px solid;
        padding-bottom: 20px;
        column-gap: 20px;
    }
    img {
        display: block;
        width: 100%;
        height: 450px;
        object-fit: cover;
    }
    h2 {
        font-size: 30px;
        font-weight: 700;
        color: #333;
    }
    p {
        font-size: 18px;
        color: #333;
    }

    @media screen and (max-width: 757px){
        img {
            height: 300px;
        }
        .waifu-infor {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media screen and (max-width: 575px) {
        .waifu-infor {
            grid-template-columns: 1fr;
        }
        img {
            margin-bottom: 20px;
            height: 300px;
        }
    }
</style>