<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
    div {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 20px;
    }
</style>