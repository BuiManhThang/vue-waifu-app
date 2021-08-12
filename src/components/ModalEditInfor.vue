<template>
    <div class="modal-content">
        <form-control @form-submit="formSubmitHandler" class='form-container' :form="form"/>
    </div>
</template> 

<script>
import { reactive } from '@vue/reactivity';
import FormControl from '../components/FormControl.vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name: 'ModalEditInfor',
    components: {
        FormControl
    },
    setup(props, {emit}) {
        const form = reactive({
            title: 'Edit infor',
            inputs: [
                {
                    id: 'input-edit-infor-name',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Type your name',
                    check: ['required'],
                    type: 'text',
                    error: null
                },
                {
                    id: 'input-edit-infor-avata',
                    name: 'avata',
                    label: 'Avata',
                    placeholder: '',
                    type: 'file',
                    error: null
                },
            ]
        })

        const store = useStore();

        const formSubmitHandler = (data) => {
            const formData = new FormData();
            formData.append('avata', data.avata);
            formData.append('name', data.name);
            formData.append('userid', store.state.user._id);
            axios.post('http://localhost:3000/user/update', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            .then(() => {
                store.dispatch('fetchUser');
                emit('cancel-modal');
            })
            .catch((err) => {
                console.log(err);
            })
        }

        return {
            form,
            formSubmitHandler
        }
    },
    emits: ['cancel-modal']
}
</script>

<style scoped>
    .modal-content {
        background-color: #eee;
        border-radius: 10px;
        margin: 20vh auto 0 auto;
        width: 50%;
        padding: 20px;
    }

    @media screen and (max-width: 757px) {
        .modal-content {
            margin: 15vh auto 0 auto;
            width: 80%;
        }
    }
</style>