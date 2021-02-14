<template>
<v-container>
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

                <v-btn
                type="submit"
                :loading="loading"
                class="ma-1"
                plain
                >
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
            confirmPassword: '',
        }
    },
    computed: {
        comparePasswords(){
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        user(){
            return this.$store.getters.user
        },
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
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
            this.$store.dispatch('signUpUser', {email: this.email, password: this.password})
            this.$refs.form.reset()
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    }
}
</script>