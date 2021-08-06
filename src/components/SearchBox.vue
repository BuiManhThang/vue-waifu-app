<template>
<div class="search-box">
  <div :class="['search-container', searchActive ? 'active' : '']">
    <div>
      <form>
        <input type="text" autocomplete="false" placeholder="Search..." v-model="text"/>
        <button class="btn btn-primary">Search</button>
      </form>
    </div>
    <search-field @active-link="activeLinkHandler" :loading="loading" :error="error" :waifuList="listWaifu" />
  </div>
      <button @click="searchActive = !searchActive" :class="['search', searchActive ? 'active' : '']" >
        <i class="fas fa-search"></i>
      </button>
</div>
</template>

<script>
import axios from 'axios';
import SearchField from './SearchField.vue';

export default {
  components: {
    SearchField
  },
  data() {
    return {
      searchActive: false,
      text: '',
      listWaifu: [],
      loading: false,
      error: null
    }
  },
  watch: {
    text(newText) {
      if(newText === '') {
        this.listWaifu = [];
        return;
      }
      this.loading = true;
      axios.get(`http://localhost:3000/search`, {params: {waifu: newText}})
      .then(res => {
        this.listWaifu = res.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = err;
      })
    }
  },
  methods: {
    activeLinkHandler() {
      this.searchActive = !this.searchActive;
      this.text = '';
      this.listWaifu = [];
    }
  }
};
</script>

<style scoped>
.search-box {
  flex-grow: 1;
  margin: 0 100px;
}
.search-container {
  position: relative;
}
form {
  display: flex;
  height: min-content;
  
}
input {
  margin-right: 5px;
  background-color: rgb(70, 69, 69);
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  flex-grow: 1;
}

.search {
  display: none;
  background-color: #333;
  border: none;
  outline: none;
  color: #eee;
  font-size: 18px;
}

@media screen and (max-width: 767px) {
  .search-box {
    margin: 0 50px;
  }
}

@media screen and (max-width: 575px) {
  .search-box  {
    flex-grow: unset;
    margin: 0;
  }
  .search-container {
    position: fixed;
    top: -100%;
    left: 50%;
    width: 100%;
    padding: 0 20px;
    transform: translateX(-50%);
    transition: all 0.3s ease;
  }
  .search {
    display: block;
  }
  .search-container.active {
    top: 30px;
  }
  .search.active {
    color: #0d6efd;
  }
}
</style>