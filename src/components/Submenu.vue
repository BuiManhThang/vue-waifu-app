<template>
  <ul :class="[active ? 'active' : '']" :style="styleSubmenu" >
      <li v-for="item in subItems" :key="item.name" >
          <a href="#"> {{item.name}} </a>
      </li>
  </ul>
</template>

<script>
export default {
    data() {
        return {
            styleSubmenu: {}
        }
    },
    props: {
        subItems: Array,
        active: Boolean
    },
    watch: {
        active() {
            if(window.innerWidth < 575) {
                if(this.active) {
                    this.styleSubmenu.height = 52 * this.subItems.length + 'px';
                } else {
                    this.styleSubmenu.height = 0;
                }
            } else {
                this.styleSubmenu.height = 'auto';
            }
        }
    }
}
</script>

<style scoped>
    ul {
        position: absolute;
        list-style: none;
        padding: 0;
        margin: 0;
        top: 0;
        left: 100%;
        overflow: hidden;
        background-color: #eee;
        border-radius: 5px;
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.7);
        opacity: 0;
        visibility: hidden;
        height: auto;
        transition: all 0.3s ease;
    }
    ul.active {
        opacity: 1;
        visibility: visible;
    }
    li {
        padding: 5px 0;
    }
    li:hover {
        background-color: #0d6efd;
    }
    a {
        display: block;
        color: #333;
        padding: 0 10px;
        text-decoration: none;
        font-size: 16px;
    }

    @media screen and (max-width: 575px) {
        ul {
            position: unset;
            box-shadow: none;
            background-color: #333;
            color: #eee;
            padding-left: 20px;
            border-radius: 0;
            opacity: 1;
            visibility: visible;
            height: 0;
        }
        li {
            border-bottom: #eee 1px solid;
        }
        li:first-child {
            border-top: #eee 1px solid;
        }
        li:hover {
            background-color: #333;
        }
        a {
            color: #eee;
            height: 40px;
            font-size: 23px;
            line-height: 40px;
        }
    }

</style>