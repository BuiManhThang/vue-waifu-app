<template>
    <div>
        <h2>{{form.title}}</h2>
        <form @submit.prevent="onSubmit">
            <div v-for="input in form.inputs" :key="input.id" class="form-group mb-3" >
                <label class="form-label" :for="input.id"> {{input.label}} </label>
                <textarea v-if="input.type === 'textarea'" @blur="blurHandler(input.name)" @input="onInput(input.id, input.name)" :ref="input.name" class="form-control" v-model="data[input.name]" :type="input.type" :name="input.name" :id="input.id" :required="input.required" :placeholder="input.placeholder" cols="20" rows="5"></textarea>
                <div v-else-if="input.type === 'checkbox'" class="check-field">
                    <div v-for="check in input.checkList" :key="check.id" class="form-check">
                        <input class="form-check-input" v-model="data[input.name]" :value="check.id" :type="input.type" :name="input.name" :id="check.id">
                        <label class="form-check-label" :for="check.id">
                            {{check.label}}
                        </label>
                    </div>
                </div>
                <select v-else-if="input.type === 'select'" class="form-control" v-model="data[input.name]" :name="input.name" :id="input.id" >
                    <option v-for="option in input.options" :value="option.id" :key="option.id"> {{option.name}} </option>
                </select>
                <input v-else @blur="blurHandler(input.name)" @input="onInput(input.id, input.name)" :ref="input.name" class="form-control" v-model="data[input.name]" :type="input.type" :name="input.name" :id="input.id" :required="input.required" :placeholder="input.placeholder" />
                <p v-if="errors[input.name]" class="form-error" > {{errors[input.name]}} </p>
                <p v-else-if="input.error" class="form-error" > {{input.error}} </p>
            </div>
            <button type="submit" class="btn btn-primary" > Confirm </button>
        </form>
    </div>
</template>


<script>
import { ref } from '@vue/reactivity';
export default {
    props: {
        form: Object,
        formData: {type: Object, default: null}
    },
    name: 'FormControl',
    setup(props, {emit}) {
        const data = ref({});
        const errors = ref({});
        const avata = ref(null);
        
        props.form.inputs.forEach(input => {
            data.value[input.name] = '';
            if(input.type === 'checkbox') {
                data.value[input.name] = [];
            }
            if(input.type === 'select') {
                data.value[input.name] = input.options[0].id;
            }
            errors.value[input.name] = null;
        })

        if(props.formData) {
            props.form.inputs.forEach(input => {
                data.value[input.name] = props.formData[input.name];
                if(input.type === 'checkbox') {
                    if(input.name === "genre") {
                        data.value[input.name] = props.formData[input.name];
                    }
                }
                errors.value[input.name] = null;
            })
        }

        const onSubmit = () => {
            if(data.value.avata) {
                data.value.avata = avata.value.files[0];
            }
            if(props.formData) {
                emit('form-submit', data.value, props.formData._id);
            } else {
                emit('form-submit', data.value);
            }
            props.form.inputs.forEach(input => {
                data.value[input.name] = null;
                if(input.type === 'checkbox') {
                    data.value[input.name] = [];
                }
                if(input.type === 'select') {
                    data.value[input.name] = input.options[0].id;
                }
                errors.value[input.name] = null;
            })
        }

        const onInput = (inputId, inputName) => {
            errors.value[inputName] = null;
            emit('input-ontype', inputId);
        }

        const blurHandler = (inputName) => {
            props.form.inputs.forEach(input => {
                if(input.name === inputName) {
                    if(input.check) {
                        input.check.forEach(rule => {
                            if(rule === 'required') {
                                if(!data.value[input.name]) {
                                    errors.value[input.name] = `This field is required`;
                                }
                            }
                            if(rule === 'email') {
                                const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                if(!emailRegex.test(data.value[input.name])){
                                    errors.value[input.name] = 'Your email is invalid';
                                }
                            }  
                            if(rule === 'password') {
                                const passwordRegex = /^(?=[a-z|A-Z])(?=.*[0-9]).{6,}/;
                                if(!passwordRegex.test(data.value[input.name])) {
                                    errors.value[input.name] = 'Password must have at least 6 characters and include a number';
                                }
                            }
                            if(rule === 'confirmPassword') {
                                if(data.value.password !== data.value[input.name]) {
                                    errors.value[input.name] = 'Your password is not matched';
                                }
                            }
                        })
                    }
                }
            })
        }

        return {
            data,
            errors,
            avata,
            onSubmit,
            blurHandler,
            onInput
        }
    },
    emits: ['input-ontype', 'form-submit']
}
</script>

<style scoped>
    h2 {
        font-size: 30px;
        color: #333;
        text-align: center;
        font-weight: 700;
    }
    .form-label {
        color: #333;
        font-size: 18px;
        font-weight: 500;
    }
    button {
        display: block;
        margin: 0 auto;
        width: 100%;
    }
    .form-error {
        color: red;
        margin-top: 5px;
    }
    .check-field {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 767px) {
        .form-container {
            width: 100%;
        }
    }
    @media screen and (max-width: 575px) {
        .check-field {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>