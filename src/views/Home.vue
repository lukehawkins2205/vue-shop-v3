<template>
        <v-container>
            <v-layout row wrap> 
                <v-flex xs12>
                    <v-carousel
                        cycle
                        height="400"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item
                        v-for="slide in slides"
                        :key="slide.id"
                        v-bind:src="slide.imgUrl"
                        >

                        <div class="title">{{slide.title}}</div>
                        

                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>

</template>

<script>
export default {
    name: 'Home',
    data(){
        return{
            slides:[
                {imgUrl: 'https://i.pinimg.com/originals/b5/b3/fc/b5b3fcbdb8205e22ea4e6a8b2380608f.png', id: '187678687', title: '10% Off for Students'},
                {imgUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F02%2Fbest-sneaker-releases-february-week-2-air-jordan-1-neutral-grey-trophy-room-6-carmine-stussy-nike-air-huarache-01.jpg?q=90&w=1400&cbr=1&fit=max', id: '2hhjkhjk', title: '20% Off for Students'},
                {imgUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F02%2Fdrake-ovo-nike-air-force-1-collab-teaser-first-look-info-001.jpg?q=90&w=1400&cbr=1&fit=max', id: '30980909', title: '30% Off for Students'},
                {imgUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F02%2Fmalaysia-kreko-publisher-attack-on-titan-underwear-censor-info-1.jpg?q=90&w=1400&cbr=1&fit=max', id: '44323424', title: '40% Off for Students'}
            ]
        }
    }
}
</script>

<style scoped>
.title{
    position: absolute;
    bottom: 50px;
    color: red;
}
</style>