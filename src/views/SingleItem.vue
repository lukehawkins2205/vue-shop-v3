<template>
    <v-container>
      <v-row>
        <v-col 
          xs='12'
          md='6'>
          <v-img 
          height="50%"
          contain
          :src="product.img">
          </v-img>
        </v-col>
        <v-col 
          xs='12'
          md='6'>
         <v-card-title>
          {{product.name}}
        </v-card-title>

        <v-card-subtitle>
          {{product.price}}
        </v-card-subtitle>

        <v-btn
        color="black lighten-2"
        text
        
      >
        BUY NOW
      </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

export default {
  props: ['id'],
    name: 'SingleItem',
    computed:{
        product(){
            return this.$store.getters.loadedProduct(this.id)
        }
    },
}
</script>