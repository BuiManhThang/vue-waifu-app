<template>
  <section>
      <div>
        <slot></slot>
      </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped >
    section {
        display: grid;
        grid-template-columns: 195px repeat(12, 1fr);
        grid-template-rows: 70px 1fr;
        grid-gap: 5px;
        padding-right: 5px;
        padding-left: 5px;
        min-height: calc(100vh - 100px);
    }
    div {
        grid-column: 2 / 12;
        grid-row: 2 / 3;
    }
    @media screen and (max-width: 991px) {
        div {
            grid-column: 2 / 13;
        }
    }
    @media screen and (max-width: 767px) {
        div {
            grid-column: 2 / 14;
        }
    }
    @media screen and (max-width: 575px) {
        div {
            grid-column: 1 / 14;
            grid-row: 1 / 3;
        }
    }
</style>