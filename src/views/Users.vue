<template>
  <admin-table @delete="handleDelete" v-if="data.body.length > 0" :tableData='data' />
  <loading v-else />
</template>

<script>
import { reactive } from '@vue/reactivity';
import AdminTable from '../components/AdminTable.vue';
import fetchUsers from '../composition/fetchUsers';
import deleteUsers from '../composition/deleteUsers';
import { onMounted } from '@vue/runtime-core';
import Loading from '../components/Loading.vue';

export default {
    name: 'Users',
    components: {
        AdminTable,
        Loading
    },
    setup() {
        const data = reactive({
            headers: [
                {title: '#', name: 'index', style: {width: '5%', textAlign: 'center'}},
                {title: 'Name', name: 'name', style: {width: '35%'}},
                {title: 'Permission', name: 'role', style: {width: '10%'}},
                {title: 'Join Date', name: 'date', style: {width: '10%'}},
                {title: 'Email', name: 'email', style: {width: '35%'}},
                {title: '', name: 'check', style: {width: '5%'}},
            ],
            body: []
        });

        const convertDate = (string) => {
            const date = new Date(string);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${year}-${month < 10 ? '0'+ month : month}-${day < 10 ? '0' + day : day}`;
        }

        onMounted(() => {
            fetchUsers((userList) => {
                const userListFormatted = userList.map((user) => {
                    return {
                        ...user, date: convertDate(user.date)
                    }
                });
                data.body = userListFormatted;
            });
        });

        const handleDelete = (user) => {
            if(user.length > 0) {
                deleteUsers({user: user}, (res) => {
                    if(res.message === 'success') {
                        fetchUsers((userList) => {
                            const userListFormatted = userList.map((user) => {
                                return {
                                    ...user, date: convertDate(user.date)
                                }
                            });
                            data.body = userListFormatted;
                        });
                    }
                })
            } else {
                alert('Something went wrong')
            }
        }

        return {
            data,
            handleDelete
        }
    }
}
</script>

<style>

</style>