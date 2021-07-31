<template>
  <div class="nav__container container-fluid">
    <nav class="nav container-lg">
      <router-link to="/" class="nav__logo">
        <span>LOGO</span>
        <i class="fas fa-home"></i>
        </router-link>
      <search-box />
      <button :class="[activeSidebar ? 'active' : '']" @click="$emit('active-sidebar')" >
        <i class="fas fa-bars"></i>
      </button>
      <account/>
    </nav>
  </div>
</template>

<script>
import SearchBox from "./SearchBox.vue";
import Account from "./Account.vue";

export default {
  props: {
    activeSidebar: Boolean
  },
  components: {
    SearchBox,
    Account
  },
};
</script>

<style scoped >
.nav__container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.7);
  z-index: 10;
}
nav {
  background-color: #333;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.nav__logo {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}

button {
  background-color: #333;
  border: none;
  outline: none;
  color: #eee;
  font-size: 18px;
}

span {
  display: block;
}

.fa-bars, .fa-home {
  display: none;
}

@media screen and (max-width: 575px) {
  .nav__container {
    top: unset;
    bottom: 0;
    box-shadow: 0 -5px 7px 0 rgba(0, 0, 0, 0.7);
  }
  nav {
    height: 40px;
    padding: 0 20px;
  }
  .nav__logo {
    font-size: 18px;
  }
  span {
    display: none;
  }
  .fa-bars, .fa-home {
    display: block;
  }
  button.active {
    color: #0d6efd;
  }
}
</style>