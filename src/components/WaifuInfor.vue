<template>
    <div class="waifu-container" >
        <div class="waifu-infor">
            <img :src="waifuInfor.thumbnail" :alt="waifuInfor.name">
            <div class="waifu-detail">
                <h2>{{waifuInfor.name}} </h2>
                <p><strong>Birthday:</strong> {{birthday}} </p>
                <p><strong>Detail:</strong> {{waifuInfor.detail}} </p>
                <p><strong>In Anime: </strong> 
                    <router-link :to="{name: 'AnimeDetail', params: {id: waifuInfor.anime._id}}" > {{waifuInfor.anime.name}} </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    name: 'WaifuInfor',
    props: {
        waifuInfor: Object
    },
    setup(props) {
        const birthday = computed(() => {
            const date = new Date(props.waifuInfor.birthday);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
        });
        return {birthday};
    }
}
</script>

<style scoped>
    .waifu-container {
        padding: 20px 20px 0 20px;
    }
    .waifu-infor {
        display: grid;
        grid-template-columns: 1fr 2fr;
        border-bottom: #333 1px solid;
        padding-bottom: 20px;
        column-gap: 20px;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    h2 {
        font-size: 30px;
        font-weight: 700;
        color: #333;
    }
    p {
        font-size: 18px;
        color: #333;
    }

    @media screen and (max-width: 575px) {
        .waifu-infor {
            grid-template-columns: 1fr;
        }
        img {
            margin-bottom: 20px;
        }
    }
</style>