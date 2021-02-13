<template>
    <v-container class="grey lighten-5">
    <v-row>
      <v-col sm='4' v-for="item in items" :key='item.id'>
        <Card :price='item.price' :name='item.name' :img='item.img' :id='item.id'/>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import Card from '@/components/Card.vue';

export default {
    name: 'CardDeck',
    components: {Card},
    computed: {
        items(){
            return this.$store.getters.featuredProducts
        }
    },
    methods: {
        onLoadProduct(){

        }
    }
}
</script>