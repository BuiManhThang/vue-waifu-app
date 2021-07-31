<template>
    <gallery> 
        <anime-card v-for="anime in animeList" :key="anime._id" :anime="anime" />
    </gallery>
</template>

<script>
import AnimeCard from './AnimeCard.vue';
import Gallery from './Gallery.vue';

export default {
    components: {
        AnimeCard,
        Gallery
    },
    props: {
        animeList: Array
    }
}
</script>

<style>

</style>