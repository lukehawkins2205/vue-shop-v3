<template>
<v-container>
    <v-row>
       <v-col>
           <h1>Products Administration</h1>
       </v-col>
    </v-row>
    <v-row>
       <v-col>
           <ProductsAdminAdd />
       </v-col>
    </v-row>
</v-container>
</template>


<script>
import ProductsAdminAdd from "@/components/ProductsAdmin/ProductsAdminAdd.vue";

export default {
    name: 'ProductsAdmin',
    components: {
        ProductsAdminAdd
    }
}
</script>