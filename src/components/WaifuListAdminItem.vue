<template>
  <li class="item">
      <span class="item__index"> {{index + 1}} </span>
      <img class="item__thumbnail" :src="waifu.thumbnail" :alt="waifu.name">
      <router-link :to="{name: 'WaifuDetail', params: {id: waifu._id}}"> {{waifu.name}} </router-link>
      <span class="item__like">Likes: {{waifu.user.length}} </span>
      <div class="item__group-btn">
          <button @click="$emit('update-waifu', waifu._id)" :style="buttonStyle" class="btn btn-primary" >
                <i class="fas fa-edit"></i>
          </button>
          <modal-button :openModal="openModal" @toggle-modal="toggleModal" :style="buttonStyle" class="btn btn-danger">
              <template v-slot:text >
                <i class="fas fa-trash-alt"></i>
              </template>
              <template v-slot:default >
                <div class="mess-delete__container">
                    <h2 class="mess-delete__title">Do you want to Delete her?</h2>
                    <div class="mess-delete__group-btn">
                        <button @click="handleDelete" class="mess-delete__btn btn btn-primary">Confirm</button>
                        <button @click="toggleModal" class="mess-delete__btn btn btn-danger">Cancel</button>
                    </div>
                </div>
              </template>
          </modal-button>
      </div>
  </li>
</template>

<script>
import { ref } from '@vue/reactivity';
import ModalButton from '../components/ModalButton.vue';

export default {
    name: 'WaifuListAdminItem',
    props: {
        waifu: Object,
        index: Number
    },
    components: {
        ModalButton
    },
    setup(props, {emit}) {
        const buttonStyle = {
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }

        const openModal = ref(false);

        const toggleModal = () => {
            openModal.value = !openModal.value;
        }

        const handleDelete = () => {
            emit('delete-waifu');
        }

        return {
            buttonStyle,
            openModal,
            toggleModal,
            handleDelete
        }
    },
    emits: ['delete-waifu', 'update-waifu']
    
}
</script>

<style scoped>
    .mess-delete__container {
        background-color: #eee;
        padding: 20px;
        border-radius: 10px;
        width: max-content;
        margin: 20vh auto;
    }
    .mess-delete__group-btn {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .mess-delete__btn {
        width: 48%;
    }
    .mess-delete__title {
        color: #333;
    }

    .item {
        display: flex;
        border-bottom: #333 1px solid;
        border-left: #333 1px solid;
        border-right: #333 1px solid;
    }
    .item:nth-child(odd) {
        background-color: rgb(211, 208, 208);
    }
    .item:first-child {
        border-top: #333 1px solid;
    }
    .item__thumbnail {
        width: 70px;
        height: 70px;
        object-fit: cover;
        margin-right: 20px;
    }
    a {
        display: block;
        flex-grow: 1;
        font-size: 18px;
        color: #333;
        line-height: 70px;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 70px;
        height: 70px;
    }
    .item__group-btn {
        align-self: center;
        margin-right: 10px;
    }
    i {
        font-size: 14px;
    }
    .item__index {
        padding: 10px;
        font-size: 18px;
        font-weight: 500;
        color: #333;
        align-self: center;
    }
    .item__like {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
        align-self: center;
    }
</style>