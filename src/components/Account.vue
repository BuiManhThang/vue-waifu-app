<template>
  <div class="avata" >
        <img v-if="user" :src="user.img" alt="user">
        <button v-else class="btn btn-primary" >Log In</button>
  </div>
</template>

<script>

export default {
    data() {
        return {
            user: {img: 'https://genk.mediacdn.vn/2018/3/15/remanime-152109809170177152965.png', name: 'Test'}
        }
    }
}
</script>

<style scoped>
.avata {
    overflow: hidden;
    cursor: pointer;
}

img {
    display: block;
    height: 60px;
    width: 60px;
    border: #eee 2px solid;
    border-radius: 50%;
    object-fit: cover;
}

@media screen and (max-width: 575px) {
  img {
      width: 32px;
      height: 32px
  }
}

</style>