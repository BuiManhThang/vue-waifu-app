import axios from 'axios';
import { ref } from '@vue/reactivity';

export default function fetchGenre() {
    const genreList = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const formErrors = ref(null);

    const getGenre = () => {
        axios.get('http://localhost:3000/genre/list')
        .then(res => {
            genreList.value = res.data;
            loading.value = false;
        })
        .catch((err) => {
            console.log(err);
            error.value = err;
            loading.value = false;
        })
    }

    const createGenre = (dataGenre, toggleModal) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/genre/create',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            data: dataGenre
        })
        .then(res => {
            if(res.data.errors) {
                formErrors.value = res.data.errors[0].msg;
            } else {
                genreList.value.push(res.data);
                toggleModal();
            }
        })
        .catch((err) => {
            error.value = err;
            console.log(err);
            toggleModal();
        })
    }

    const deleteGenre = (idList) => {
        loading.value = true;
        for(let i = 0; i < idList.length; i++) {
            axios.delete(`http://localhost:3000/genre/${idList[i]}`, {
                withCredentials: true
            })
            .then(res => {
                genreList.value = genreList.value.filter(genre => {
                    return genre._id !== res.data._id;
                })
                loading.value = false;
            })
            .catch((err) => {
                error.value = err;
                console.log(err);
                loading.value = false;
            })
        }
    }

    const updateGenre = (id, data, nameError, toggleModal) => {
        loading.value = true;
        axios.put(`http://localhost:3000/genre/${id}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.data.errors) {
                nameError.inputs[0].error = res.data.errors[0].msg;
                loading.value = false;
            } else {
                genreList.value = genreList.value.map(genre => {
                    if(genre._id === res.data._id) {
                        return res.data;
                    } else {
                        return genre;
                    }
                });
                loading.value = false;
                toggleModal();
            }
        })
        .catch((err) => {
            error.value = err;
            console.log(err);
            loading.value = false;
        })
    }

    return {getGenre, genreList, loading, error, formErrors, createGenre, deleteGenre, updateGenre};
}