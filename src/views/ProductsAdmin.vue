<template>
<v-container>
    <v-row>
        <v-col>
                <h2>Products Admin</h2>
        </v-col>
    </v-row>
    <v-row v-if="error">
        <v-col>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-col>
    </v-row>
    <v-row>
        <v-col xs='12' md='6'>

            <v-form
                ref="form"
                lazy-validation
                @submit.prevent="onAddProduct"
            >

                <v-text-field
                v-model="name"
                label="name"
                required
                ></v-text-field>

                <v-text-field
                v-model="price"
                label="price"
                required
                ></v-text-field>

                <v-text-field
                v-model="img"
                label="image"
                required
                ></v-text-field>

                <v-text-field
                v-model="cat"
                label="Catagory"
                required
                ></v-text-field>

                <v-btn
                type="submit"
                :loading="loading"
                class="ma-1"
                plain
                >
                Add Product
                </v-btn>

            </v-form>

        </v-col>
    </v-row>
</v-container>
</template>


<script>
export default {
    name: 'ProductsAdmin',
    data(){
        return{
            name: '',
            price: '',
            img: '',
            cat: ''
        }
    },
    computed: {
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    watch: {
        
    },
    methods: {
        onAddProduct(){
            const product = {
                name: this.name,
                price: this.price,
                img: this.img,
                cat: this.cat 
            }
            this.$store.dispatch('addProductToDB', product)
            this.$refs.form.reset()
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    }
}
</script>