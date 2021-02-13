<template>
<v-container>
    <v-row>
        <v-col xs='12' md='6'>

            <v-form
                ref="form"
                lazy-validation
                @submit.prevent="onSignIn"
            >

                <v-text-field
                v-model="email"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                label="password"
                required
                type="password"
                ></v-text-field>

                <v-btn type="submit">
                    Sign In
                </v-btn>

            </v-form>

        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: 'SignUp',
    data(){
        return{
            email: '',
            password: '',
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        }
    },
    watch: {
        user(value){
            if(value !== null && value !== undefined){
                this.$router.push('/admin/overview')
            }
        }
    },
    methods: {
        onSignIn(){
            console.log({email: this.email, password: this.password})
            this.$store.dispatch('signInUser', {email: this.email, password: this.password})
            this.$refs.form.reset()
        }
    }
}
</script>