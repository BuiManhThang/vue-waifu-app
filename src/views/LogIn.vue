<template>
    <form-control class="form-container" :form="form" @form-submit="formSubmitHandler" />
</template>

<script>
import { reactive } from '@vue/reactivity';
import FormControl from '../components/FormControl.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'LogIn',
    components: {
        FormControl
    },
    setup() {
        const form = reactive({
            title: 'Log In',
            inputs: [
                {
                    id: 'input-signin-email',
                    name: 'email',
                    label: 'Email',
                    required: true,
                    type: 'email',
                    placeholder: 'Type your email'
                },
                {
                    id: 'input-signin-password',
                    name: 'password',
                    label: 'Password',
                    required: true,
                    type: 'password',
                    placeholder: 'Type your password'
                }
            ]
        });
        const store = useStore();
        const router = useRouter();

        const formSubmitHandler = (data) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/login',
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: data
            })
            .then((res) => {
                if(res.data.errors) {
                    res.data.errors.forEach(error => {
                        form.inputs.forEach(input => {
                            if(input.name === error.param) {
                            input.error = error.msg;
                            }
                        })
                    })
                } else {
                    store.dispatch('fetchUser');
                    router.push('/');
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        return {
            form,
            formSubmitHandler
        }
    }
}
</script>

<style scoped>
    .form-container {
        width: 50%;
        margin: 100px auto 0 auto;
        padding: 20px;
    }
</style>