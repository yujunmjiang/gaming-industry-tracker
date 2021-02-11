<template>
    <div id="GetTopGamesContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1>List of Top Games</h1>
    </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';

export default {
    name: 'GetTopGames',
    data: function () {
        return {
            listOfTopGames: [],
        }
    },
    components: {
        topNavBarLinks,
    },
    methods: {
        fetchTopGames: function () {
            let fetchLink = 'https://api.twitch.tv/helix/games/top?first=30';

            fetch(fetchLink, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer c48mhx41pawdcqhaexawf95izt8jif',
                    'client-ID': 'eskbrit0ialjloyur6ixc7b05rplk9',
                })
            })
                .then(
                    function (response) {
                        return response.json();
                    }
                )
                .then(
                    data => {
                        console.log(data);
                    }
                );
        }
    },
    mounted () {
        this.fetchTopGames();
    }    
}
</script>

<style>

</style>