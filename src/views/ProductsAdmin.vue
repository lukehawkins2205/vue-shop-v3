<template>
<v-container>
    <v-row>
       <v-col>
           <h1>Products Administration</h1>
       </v-col>
    </v-row>
    <v-row>
       <v-col>
           <ProductsAdminList />
       </v-col>
    </v-row>
</v-container>
</template>


<script>
import ProductsAdminList from "@/components/ProductsAdmin/ProductsAdminList.vue";

export default {
    name: 'ProductsAdmin',
    components: {
        ProductsAdminList
    }
}
</script>