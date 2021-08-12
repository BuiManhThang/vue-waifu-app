<template>
    <button v-bind="$attrs" @click="toggleModal" class="edit-infor" > {{text}} 
        <slot name="text"></slot>
    </button>
    <teleport to="body">
        <div @click="toggleModalOutLine" v-if="openModal" class="my-modal">
            <slot></slot>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'ModalButton',
    props: {
        text: String,
        openModal: Boolean
    },
    inheritAttrs: false,
    setup(props, {emit}) {
        

        const toggleModal = () => {
            emit('toggle-modal')
        }

        const toggleModalOutLine = (e) => {
            if(e.target === document.querySelector('.my-modal')) {
                emit('toggle-modal')
            }
        }

        return {
            toggleModal,
            toggleModalOutLine
        }
    },
    emits: ['toggle-modal']
}
</script>

<style scoped>
    .edit-infor {
        width: max-content;
    }
    .my-modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
</style>