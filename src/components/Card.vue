<template>
     <v-card height="100%" @click="openSingleItemWindow(id)" >

    <v-img height="50%"
      contain
      :src="img"
    ></v-img>

    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-subtitle>
      £{{price}}
    </v-card-subtitle>

  </v-card>
</template>

<script>

export default {
    name: 'Card',
    props: ['price', 'name', 'img', 'id'],
    components: {},
    methods:{
        openSingleItemWindow(id){
            console.log('The ID is', id)
            this.$router.push('/product/' + id)
            this.$store.commit('displayProduct', {value: id})
        }
    }
}
</script>