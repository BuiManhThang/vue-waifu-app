<template>
  <div class="waifu">
      <router-link :to="`/waifu/${waifu._id}`" >
        <img class="waifu-img" :src="waifu.thumbnail" :alt="waifu.name">
        <p class="waifu-name"> {{waifu.name}} </p>
      </router-link>
  </div>
</template>

<script>
export default {
    props: {
        waifu: Object
    },
}
</script>

<style scoped >
    a {
        text-decoration: none;
    }
    div {
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
        background-color: #333;
        transition: box-shadow 0.3s ease;
    }
    div:hover {
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.7);
    }
    img {
        width: 100%;
        height: 160px;
        object-fit: cover;
    }
    p {
        color: #eee;
        font-size: 18px;
        text-align: center;
        margin: 0;
        padding: 5px;
    }
</style>