<template>
    <loading v-if="loading" />
    <div v-else-if="error" >
        Something went wrong
    </div>
    <admin-table v-else :tableData="data" :btnAdd="true" :btnEdit="true" @edit-click="handleEditClick" @create-click="handleCreateClick" @delete="handleDeleteClick"/>
    <teleport to="body" >
        <div class="my-modal" v-if="openModal" @click="handleClickOutline" >
            <form-control :form="form" class="my-form" :formData="formData" @input-ontype="handleInputType" @form-submit="handleFormSubmit" />
        </div>
    </teleport>
</template>

<script>
import fetchGenre from '../composition/fetchGenre';
import AdminTable from '../components/AdminTable.vue';
import Loading from '../components/Loading.vue';
import FormControl from '../components/FormControl.vue';

import {reactive, ref} from '@vue/reactivity'; 
import { computed, watch } from '@vue/runtime-core';

export default {
  components: { Loading, AdminTable, FormControl },
    name: 'Genre',
    setup() {
        const {getGenre, genreList, loading, error, formErrors, createGenre, deleteGenre, updateGenre} = fetchGenre();
        const openModal = ref(false);

        getGenre();

        const formattedGenreList = computed(() => {
            const result = genreList.value.map(genre => {
                return {...genre, waifu: genre.waifu.length};
            })
            return result;
        })

        const data = reactive({
            headers: [
                {title: '#', name: 'index', style: {width: '5%', textAlign: 'center'}},
                {title: 'Title', name: 'name', style: {width: '77%'}},
                {title: 'Waifu', name: 'waifu', style: {width: '7%'}},
                {title: '', name: 'check', style: {width: '5%'}},
                {title: '', name: 'check', style: {width: '5%'}},
            ],
            body: formattedGenreList
        });

        const form = reactive({
            title: 'Genre',
            inputs: [
                {
                    id: 'genre-input-name',
                    name: 'name',
                    label: 'Name',
                    check: ['required'],
                    type: 'text',
                    placeholder: 'Type the genre name',
                    error: null
                }
            ]
        });

        const formData = ref(null)

        const handleClickOutline = (e) => {
            if(e.target === document.querySelector('.my-modal')) {
                toggleModal();
            }
        }

        const toggleModal = () => {
            openModal.value = !openModal.value;
        }

        const handleInputType = () => {
            form.inputs[0].error = null;
        }

        const handleEditClick = (id) => {
            console.log(id);
            const theGenre = genreList.value.find(genre => {
                return genre._id === id;
            })
            formData.value = {
                name: theGenre.name,
                _id: id
            };
            toggleModal();
        }

        const handleCreateClick = () => {
            console.log('create click');
            formData.value = null;
            toggleModal();
        }

        const handleDeleteClick = (idList) => {
            if(idList.length > 0) {
                deleteGenre(idList);
            } else {
                alert('You have not chose a genre yet');
            }
        }

        const handleFormSubmit = (dataGenre, id) => {
            if(!id) {
                createGenre(dataGenre, toggleModal);
            } else {
                updateGenre(id, dataGenre, form, toggleModal);
            }
        }

        watch(formErrors, () => {
            form.inputs[0].error = formErrors;
        })
        
        return {
            loading,
            error,
            data,
            handleEditClick,
            handleCreateClick,
            handleDeleteClick,
            openModal,
            toggleModal,
            handleClickOutline,
            form,
            formData,
            handleInputType,
            handleFormSubmit
        }
    }
}
</script>

<style scoped>
    .my-modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
    .my-form {
        width: 80%;
        margin: 20vh auto;
        background-color: #eee;
        border-radius: 10px;
        padding: 20px;
    }
</style>