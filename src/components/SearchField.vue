<template>
    <div class="search-filed-container">
        <loading v-if="loading" />
        <div v-else-if="error" >
            <p> {{error}} </p>
        </div>
        <div v-else>
            <ul>
                <li v-for="waifu in waifuList" :key="waifu.id" >
                    <router-link @click="$emit('active-link')" :to="{name: 'WaifuDetail', params: {id: waifu._id}}" >
                        <div class="search-result" >
                            <img :src="waifu.thumbnail" :alt="waifu.name" class="search-result__img">
                            <p class="search-result__name"> {{waifu.name}} </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Loading from './Loading.vue';
export default {
    components: {
        Loading
    },
    props: {
        loading: Boolean,
        waifuList: Array,
        error: Object
    }
}
</script>

<style scoped>
    .search-filed-container {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        background-color: #333;
    }
    .search-result__img {
        display: block;
        height: 50px;
        width: 50px;
        object-fit: cover;
    }
    a {
        text-decoration: none;
    }
    .search-result {
        display: flex;
        padding: 5px;
        border-bottom: #eee 1px solid;
    }
    .search-result__name {
        color: #eee;
        font-size: 18px;
    }
    @media screen and (max-width: 575px) {
        .search-filed-container {
            padding: 0 20px;
        }
    }
</style>