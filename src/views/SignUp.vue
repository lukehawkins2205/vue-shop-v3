<template>
<v-container>
    <v-row>
        <v-col xs='12' md='6'>

            <v-form
                ref="form"
                lazy-validation
                @submit.prevent="onSignUp"
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

                <v-text-field
                v-model="confirmPassword"
                :rules="[comparePasswords]"
                label="confirmPassword"
                required
                type="password"
                ></v-text-field>

                <v-btn type="submit">
                    Sign Up
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
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        comparePasswords(){
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
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
        onSignUp(){
            console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
            this.$store.dispatch('signUpUser', {email: this.email, password: this.password})
            this.$refs.form.reset()
        }
    }
}
</script>