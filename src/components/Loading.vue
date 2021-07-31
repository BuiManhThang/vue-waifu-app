<template>
  <div class="loading-container">
      <div class="loading-icon" >

      </div>
  </div>
</template>
<style scoped>
    .loading-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .loading-icon {
        height: 70px;
        width: 70px;
        background-color: #eee;
        border-radius: 50%;
        border-top: #333 5px solid;
        border-bottom: #333 5px solid;
        border-left: transparent 5px solid;
        border-right: transparent 5px solid;
        animation-name: loading;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
    }
    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>