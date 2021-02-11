<template>
    <v-container class="grey lighten-5">
    <v-row>
      <v-col sm='4'>
        <Card />
      </v-col>
      <v-col sm='4'>
        <Card />
      </v-col>
      <v-col sm='4'>
        <Card />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import Card from '@/components/Card.vue';

export default {
    name: 'CardDeck',
    components: {Card},
    data(){
        return{
            items: [
                {img: 'http://www.flightclub.com/media/catalog/product/2/0/201536_1.jpg', price: 1299, id: '1'},
                {img: 'https://media.gq-magazine.co.uk/photos/5ea070e01027960008de3b4a/master/w_1920,c_limit/20200422-jordan-19.jpg', price: 679, id: '2'},
                {img: 'https://cdn.shopify.com/s/files/1/0013/3074/1303/products/Nike_Air_Vapormax_Flyknit_3_White_600x.jpg?v=1554149189', price: 399, id: '3'}
            ]
        }
    }
}
</script>