<template>
    <div id="HomepageContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1>Homepage</h1>
        <!-- <div id="topGames">
            <div class="topGames" v-for='topGame in listOfTopGames'
            :key='topGame.gameID'>
                <a href="">
                    <div class="topGameThumbnailContainer">
                        <img class="topGameThumbnail" :src="`${topGame.gameBoxArtURL}`" alt="">
                    </div>
                    <div class="topGameDescription">
                        {{ topGame.gameName }}
                    </div>
                </a>
            </div>
        </div> -->
    </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';

export default {
    name: 'GetHomepage',
    // data: function () {

    // },
    components: {
        topNavBarLinks,
    },
    methods: {

    }
}
</script>

<style>

</style>