<template>
  <div class="btn__group">
    <modal-button :openModal="openModal" @toggle-modal="toggleModal" class="btn btn-danger" :style="{flexGrow: 'unset'}" text="Delete">
            <template v-slot:default>
                <div class="mess-delete__container">
                    <h2 class="mess-delete__title">Do you want to Delete?</h2>
                    <div class="mess-delete__group-btn">
                        <button @click="handleDelete" class="mess-delete__btn btn btn-primary">Confirm</button>
                        <button @click="toggleModal" class="mess-delete__btn btn btn-danger">Cancel</button>
                    </div>
                </div>
            </template>
        </modal-button>
  <button v-if="btnAdd" :style="{flexGrow: 'unset'}" class="btn btn-primary ms-3" @click="$emit('create-click')" >Create</button>
  </div>
  <table>
      <colgroup>
        <col v-for="header in tableData.headers" :key="header.name" :style="header.style"/>
        <col v-if="btnEdit" class="btnEdit">
      </colgroup>
      <thead>
          <tr>
              <th v-for="header in tableData.headers" :key="header.name"> {{header.title}} </th>
          </tr>
      </thead>
      <tbody>
          <table-row v-for="rowData, index in tableData.body" :key="index" :rowData="rowData" :index="index" :headers="tableData.headers" @user-changed="handleCheck" :btnEdit="btnEdit" @edit-click="handleEdit" />
      </tbody>
  </table>
</template>

<script>
import { ref } from '@vue/reactivity';
import TableRow from './TableRow.vue';
import ModalButton from './ModalButton.vue';
export default {
    name: 'AdminTable',
    components: {
        TableRow,
        ModalButton
    },
    props: {
        tableData: Object,
        btnAdd: {Boolean, default: false},
        btnEdit: {Boolean, default: false}
    },
    setup(props, {emit}) {
        const users = ref([]);
        const openModal = ref(false);

        const toggleModal = () => {
            openModal.value = !openModal.value;
        }

        const handleCheck = (id, isCheck) => {
            if(isCheck) {
                users.value.push(id);
            } else {
                users.value.splice(users.value.indexOf(id), 1);
            }
        }

        const handleDelete = () => {
            emit('delete', users.value);
            openModal.value = !openModal.value;
        }

        const handleEdit = (id) => {
            emit('edit-click', id);
        }

        return {
            users,
            handleCheck,
            handleDelete,
            openModal,
            toggleModal,
            handleEdit
        }
    },
    emits: ['delete', 'edit-click', 'create-click']
}
</script>

<style scoped>
    .btnEdit {
        width: 40px;
        padding: 0 5px;
    }
    th {
        border: #333 1px solid;
    }
    table {
        display: block;
        table-layout: auto;
        border-collapse: collapse;
        width: 100%;
        padding: 20px;
    }
    th {
        text-align: center;
    }
    .btn__group {
        display: flex;
        margin: 20px;
        margin-bottom: 0;
        justify-content: flex-end;
    }
    .mess-delete__container {
        background-color: #eee;
        padding: 20px;
        border-radius: 10px;
        width: max-content;
        margin: 20vh auto;
    }
    .mess-delete__group-btn {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .mess-delete__btn {
        width: 48%;
    }
    .mess-delete__title {
        color: #333;
    }
</style>