<template>
    <div class="anime-infor">
        <h1> {{anime.name}} </h1>
        <img :src="anime.thumbnail" :alt="anime.name" class="anime-thumbnail">
        <p><strong>Release: </strong> {{release}} </p>
        <p><strong>MLA: </strong> {{anime.mla}} </p>
        <p><strong>Eps: </strong> {{anime.eps}} </p>
    </div>
</template>

<script>
import {computed} from 'vue';

export default {
    props: {
        anime: Object
    },
    setup(props) {
        const release = computed(() => {
            const date = new Date(props.anime.release);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        });

        return {release};
    }
}
</script>

<style scoped>
    .anime-infor {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    img {
        display: block;
        width: 75%;
        height: auto;
        object-fit: cover;
        margin-bottom: 20px;
    }
    p {
        width: 75%;
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
    }
    h1 {
        font-size: 40px;
        color: #333;
        font-weight: 700;
    }
</style>