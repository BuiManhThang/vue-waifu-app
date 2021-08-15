<template>
    <div v-if="user" class="infor-container">
        <div class="infor-avata">
            <img :src="user.avata" :alt="user.name">
        </div>
        <div class="infor-content">
            <p class="infor-text"> <strong>Name: </strong> {{user.name}} </p>
            <p class="infor-text"> <strong>Email: </strong> {{user.email}} </p>
            <p class="infor-text"> <strong>Join date: </strong> {{userJoinDate}} </p>
            <modal-button :openModal="openModal" @toggle-modal="openModal = !openModal" text="Edit Infor" class="btn btn-primary">
                <modal-edit-infor @cancel-modal="openModal = !openModal" />
            </modal-button>
        </div>
    </div>
    <loading v-else />

</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import Loading from '../components/Loading.vue';
import ModalButton from '../components/ModalButton.vue';
import ModalEditInfor from '../components/ModalEditInfor.vue';
export default {
    name: 'Infor',
    components: {
        Loading,
        ModalButton,
        ModalEditInfor
    },
    setup() {
        const store = useStore();
        const user = computed(() => {
            return store.state.user;
        })
        const openModal = ref(false);

        const userJoinDate = computed(() => {
            const date = new Date(user.value.date);
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
        })

        return {
            openModal,
            user,
            userJoinDate
        }
    }
}
</script>

<style scoped>
    .infor-container {
        display: flex;
        padding: 20px;
    }
    img {
        height: 200px;
        width: 200px;
        object-fit: cover;
        border: #333 2px solid;
        border-radius: 10px;
    }
    .infor-content {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .infor-text {
        font-size: 20px;
        color: #333;
    }


    @media screen and (max-width: 757px) {
        .infor-container {
            flex-direction: column;
        }
        .infor-avata {
            display: flex;
            justify-content: center;
        }
        .infor-content {
            margin-left: 0;
            margin-top: 20px;
        }
    }
</style>