<template>
  <tr> 
      <td > {{index + 1}} </td>
      <td v-for="property, index in propertyArray" :key="index" > {{rowData[property.name]}} </td>
      <td class="check-cell" >
          <input type="checkbox" v-model="isCheck" @change="handleCheck" />
      </td>
      <td v-if="btnEdit" class="btnEdit" @click="handleEdit" > <i class="fas fa-edit"></i> </td>
  </tr>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
export default {
    name: 'TableRow',
    props: {
        rowData: Object,
        index: Number,
        headers: Array,
        btnEdit: Boolean
    },
    setup(props, {emit}) {
        const propertyArray = computed(() => {
            const result = props.headers.filter((header) => {
                return header.name !== 'index' && header.name !== 'check';
            })
            return result;
        });

        const isCheck = ref(false);

        const handleCheck = () => {
            if(isCheck.value) {
                emit('user-changed', props.rowData._id, true);
            } else {
                emit('user-changed', props.rowData._id, false);
            }
        }

        const handleEdit = () => {
            emit('edit-click', props.rowData._id);
        }

        return {
            propertyArray,
            isCheck,
            handleCheck,
            handleEdit
        }
    },
    emits: ['user-changed', 'edit-click']
}
</script>

<style scoped>
    .btnEdit {
        width: 40px;
        cursor: pointer;
    }
    .btnEdit:hover > i {
        color: rgb(98, 210, 238);
    }
    i {
        color: #333;
        transition: all 0.3s ease;
    }
    td {
        border: #333 1px solid;
        text-align: start;
        padding: 5px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .check-cell {
        padding: 0;
        text-align: center;
    }
</style>