<template>
    <div class="waifu-list__controller">
        <label class="form-label" for="sort">Sort by</label>
        <select name="sort" id="sort" class="btn btn-primary" :value="sortBy" @change="$emit('update:sortBy', $event.target.value)">
            <option value="name">Name</option>
            <option value="birthday">Birthday</option>
        </select>
    </div>
  <gallery>
      <waifu v-for="waifu in waifuList" :key="waifu._id" :waifu="waifu" />
  </gallery>
</template>

<script>
import Waifu from './Waifu.vue';
import Gallery from './Gallery.vue';
export default {
    components: {
        Waifu,
        Gallery,
    },
    props: {
        waifuList: Array,
        sortBy: String
    },
    emits: ['update:sortBy']
}
</script>

<style scoped>
    .waifu-list__controller {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        align-items: center;
    }
    .form-label {
        color: #333;
        font-size: 18px;
        margin-right: 5px;
    }
</style>
