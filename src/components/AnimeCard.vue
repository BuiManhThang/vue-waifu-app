<template>
  <div class="anime-card" >
    <router-link :to="{ name: 'AnimeDetail', params: {id: anime._id} }">
      <div class="anime-thumbnail">
        <img :src="anime.thumbnail" :alt="anime.name" class="anime-img">
        <p class="anime-mla"> {{anime.mla}} </p>
      </div>
      <p class="anime-name"> {{anime.name}} </p>
    </router-link>
  </div>
</template>

<script>
export default {
    props: {
        anime: Object
    }
}
</script>

<style scoped >
  a {
    text-decoration: none;
  }
  .anime-card {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
    background-color: #333;
    transition: box-shadow 0.3s ease;
  }
  .anime-card:hover {
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 1);
  }
  img {
    display: block;
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  .anime-thumbnail {
    position: relative;
  }
  .anime-mla {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0;
    padding: 2px 4px;
    background-color: #dc3545;
    color: #eee;
    border-radius: 4px 0 0 0;
  }
  .anime-name {
    color: #eee;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    margin: 0;
    padding: 5px;
  }
</style>