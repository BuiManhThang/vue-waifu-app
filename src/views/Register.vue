<template>
  <form-control class='form-container' @form-submit="formSubmitHandler" :form="form" @input-ontype="inputOnTypeHandler"/>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useStore} from 'vuex';
import FormControl from '../components/FormControl.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'Register',
    components: {
      FormControl
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const form = reactive({
        title: 'Register',
        inputs: [
          {
            id: 'input-register-email',
            label: 'Email',
            name: 'email',
            required: true,
            placeholder: 'Type your email',
            type: 'email',
            error: null,
            check: ['email', 'required']
          },
          {
            id: 'input-register-password',
            label: 'Password',
            name: 'password',
            required: true,
            placeholder: 'Type your password',
            type: 'password',
            error: null,
            check: ['password', 'required']
          },
          {
            id: 'input-register-confirm-password',
            label: 'Confirm your password',
            name: 'confirmPassword',
            required: true,
            placeholder: 'Type your password',
            type: 'password',
            error: null,
            check: ['confirmPassword']
          },
        ]
      });


      const formSubmitHandler = (data) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/user/register',
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
        })
        .catch((err) => console.log(err));
      }

      const inputOnTypeHandler = (inputId) => {
        form.inputs.forEach(input => {
          if(input.id === inputId) {
            input.error = null;
          }
        })
      }

      return {
        form,
        formSubmitHandler,
        inputOnTypeHandler
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