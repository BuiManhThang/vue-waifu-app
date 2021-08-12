import {createStore} from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            user: null,
            err: null,
            items: [
                {name: 'Home', path: '/'},
                {name: 'Genre', submenu: []},
                {name: 'Anime', path: '/anime'},
            ],
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setError(state, err) {
            state.err = err;
        },
        setSideBarUser(state, items) {
            state.items = items
        },
        setSideBarAdmin(state) {
            state.items = [
                {name: 'Waifu', path: '/'},
                {name: 'Users', path: '/users'},
                {name: 'Genre', path: '/genre'},
                {name: 'Anime', path: '/anime'},
            ]
        }
    },
    actions: {
        fetchUser({commit}) {
            axios.get('http://localhost:3000/user/infor', {
                withCredentials: true
            })
            .then(res => {
                if(res.data.message === 'forbidden') {
                    commit('setUser', null);
                    commit('setError', 'Forbidden access');
                } else {
                    commit('setUser', res.data);
                    commit('setError', null);
                }
            })
            .catch((err) => {
                commit('setError', err);
                commit('setUser', null);
            })
        },
        fetchSideBarUser({commit}) {
            const items = [
                {name: 'Home', path: '/'},
                {name: 'Genre', submenu: []},
                {name: 'Anime', path: '/anime'},
            ];
            axios.get('http://localhost:3000/genre/list')
            .then(res => {
                items[1].submenu = res.data;
            })
            .catch((err) => {
                items[1].submenu = [{name: err.message}];
            })
            commit('setSideBarUser', items);
        }
    }
})

export default store;