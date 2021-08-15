<template>
    <div class="waifu-list__container">
        <div class="waifu-list__controller">
            <div class="me-3" >
                <label class="form-label" for="sort">Sort by</label>
                <select name="sort" id="sort" class="btn btn-primary" :value="sortBy" @change="$emit('update:sortBy', $event.target.value)">
                    <option value="name">Name</option>
                    <option value="birthday">Birthday</option>
                    <option value="like">Like</option>
                </select>
            </div>
            <modal-button :openModal="openModal" @toggle-modal="toggleModal" class="btn btn-primary" text="Add">
                <form-control :formData="dataWaifu" @form-submit="handlSubmit" class="form-container" :form="form" />
            </modal-button>
        </div>
        <ul class="waifu-list__list">
            <waifu-list-admin-item @update-waifu="handleUpdateWaifu" v-for="waifu, index in waifuList" @delete-waifu="$emit('delete-waifu', waifu._id)" :key="waifu._id" :waifu="waifu" :index="index" />
        </ul>
    </div>
</template>

<script>
import WaifuListAdminItem from '../components/WaifuListAdminItem.vue';
import ModalButton from '../components/ModalButton.vue';
import { reactive, ref } from '@vue/reactivity';
import FormControl from '../components/FormControl.vue';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    name: 'WaifuListAdmin',
    props: {
        waifuList: Array,
        sortBy: String
    },
    components: {
        WaifuListAdminItem,
        ModalButton,
        FormControl,
    },
    setup(props, {emit}) {
        const openModal = ref(false);

        const form = reactive({
            title: 'Add new Waifu',
            inputs: [
                {
                    id: 'add-waifu-name',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Type the name',
                    check: ['required'],
                    type: 'text',
                    error: null
                },
                {
                    id: 'add-waifu-birthday',
                    name: 'birthday',
                    label: 'Birthday',
                    placeholder: '',
                    check: ['required'],
                    type: 'date',
                    error: null
                },
                {
                    id: 'add-waifu-detail',
                    name: 'detail',
                    label: 'Desctibe',
                    placeholder: 'Type about her',
                    check: ['required'],
                    type: 'textarea',
                    error: null
                },
                {
                    id: 'add-waifu-thumbnail',
                    name: 'avata',
                    label: 'Thumbnail',
                    placeholder: '',
                    check: ['required'],
                    type: 'file',
                    error: null
                },
                {
                    name: 'genre',
                    label: 'Genre',
                    type: 'checkbox',
                    error: null,
                    checkList: []
                },
                {
                    id: 'add-waifu-anime',
                    label: 'Anime',
                    name: 'anime',
                    type: 'select',
                    error: null,
                    options: []
                },
            ]
        });

        const dataWaifu = ref(null);

        const toggleModal = () => {
            openModal.value = !openModal.value;
            dataWaifu.value = null;
            form.inputs.forEach(input => {
                input.error = null;
            })
        }

        onMounted(() => {
            axios.get('http://localhost:3000/anime/list')
            .then(res => {
                const animeList = res.data;
                form.inputs[5].options = animeList.map((anime) => {
                    return {
                        id: anime._id,
                        name: anime.name
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get('http://localhost:3000/genre/list')
            .then(res => {
                const genreList = res.data;
                form.inputs[4].checkList = genreList.map((genre) => {
                    return {
                        id: genre._id,
                        label: genre.name
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
        });

        const handlSubmit = (data, waifuId) => {
            const formData = new FormData();
            formData.append('name', data.name); 
            formData.append('birthday', data.birthday);
            formData.append('detail', data.detail);
            formData.append('thumbnail', data.avata);
            formData.append('genre', data.genre);
            formData.append('anime', data.anime);
            if(!waifuId) {
                axios.post('http://localhost:3000/waifu/create', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    if(res.data.errors) {
                        res.data.errors.forEach(err => {
                            form.inputs.forEach(input => {
                                if(err.param === input.name) {
                                    input.error = err.msg;
                                }
                            })
                        })
                    } else {
                        openModal.value = !openModal.value;
                        emit('create-waifu');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            } else {
                formData.append('_id', waifuId);
                axios.post('http://localhost:3000/waifu/update', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    if(res.data.errors) {
                        res.data.errors.forEach(err => {
                            form.inputs.forEach(input => {
                                if(err.param === input.name) {
                                    input.error = err.msg;
                                }
                            })
                        })
                    } else {
                        openModal.value = !openModal.value;
                        emit('create-waifu');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        };

        const convertDate = (string) => {
            const date = new Date(string);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${year}-${month < 10 ? '0'+ month : month}-${day < 10 ? '0' + day : day}`;
        }

        const handleUpdateWaifu = (id) => {
            toggleModal();
            const foundWaifu = props.waifuList.find((waifu) => {
                return waifu._id === id;
            });
            foundWaifu.birthday = convertDate(foundWaifu.birthday);
            dataWaifu.value = foundWaifu;
        }

        return {
            openModal,
            toggleModal,
            form,
            handlSubmit,
            handleUpdateWaifu,
            dataWaifu
        }
    },
    emits: ['update:sortBy', 'create-waifu', 'delete-waifu']
}
</script>

<style scoped>
    .waifu-list__container {
        padding: 20px;
    }
    .waifu-list__list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .waifu-list__controller {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
        padding: 10px 0;

    }
    .form-label {
        color: #333;
        font-size: 18px;
        margin-right: 5px;
    }
    .form-container {
        width: 70%;
        background-color: #eee;
        padding: 20px;
        border-radius: 10px;
        margin: 7vh auto;
        max-height: 90vh;
        overflow: auto;
    }

    @media screen and (max-width: 575px){
        .form-container {
            width: 95%;
        }
    }
</style>