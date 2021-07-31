<template>
<div>
  <form :class="[searchActive ? 'active' : '']" >
    <input type="text" autocomplete="false" placeholder="Search..." />
    <button class="btn btn-primary">Search</button>
  </form>
  <button @click="searchActive = !searchActive" :class="['search', searchActive ? 'active' : '']" >
    <i class="fas fa-search"></i>
  </button>
</div>
</template>

<script>
export default {
  data() {
    return {
      searchActive: false
    }
  }
};
</script>

<style scoped>
div {
  flex-grow: 1;
  margin: 0 100px;
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
  div {
    margin: 0 50px;
  }
}

@media screen and (max-width: 575px) {
  div  {
    flex-grow: unset;
    margin: 0;
  }
  form {
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
  form.active {
    top: 30px;
  }
  .search.active {
    color: #0d6efd;
  }
}
</style>