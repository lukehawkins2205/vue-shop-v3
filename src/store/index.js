import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/firestore')


Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedProducts: [
            {name: 'yeezy 320', img: 'http://www.flightclub.com/media/catalog/product/2/0/201536_1.jpg', price: 1299, id: '1', cat: 'shoe'},
            {name: 'Jordan Black', img: 'https://media.gq-magazine.co.uk/photos/5ea070e01027960008de3b4a/master/w_1920,c_limit/20200422-jordan-19.jpg', price: 679, id: '2', cat: 'shoe'},
            {name: 'Nike Vapormax', img: 'https://cdn.shopify.com/s/files/1/0013/3074/1303/products/Nike_Air_Vapormax_Flyknit_3_White_600x.jpg?v=1554149189', price: 399, id: '3', cat: 'running'}
        ],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        addProduct(state, payload){
            state.loadedProducts.push(payload)
        },
        displayProduct(state, payload){
            state.user.loadedProductId = payload.id
        },
        setUser(state, payload){
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        }
    },
    actions: {
        addProductToDB({commit}, payload){
            const product = {
                name: payload.name,
                price: payload.price,
                img: payload.img,
                cat: payload.cat
            }
            firebase.firestore().collection("products").add(product)
                .then((docRef) => {
                    commit('addProduct', product)
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

        },
        signUpUser({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                        }
                    commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signInUser({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        console.log('store - user', user)
                        console.log('store - userUID', user.user.uid)
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                        }
                    commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signOutUser({commit}){
            firebase.auth().signOut()
                .then(
                    () => {
                        commit('setUser', null)
                    }
                )
                .then(
                    error => {
                        console.log(error)
                    }
                )
        },
        autoSignInUser({commit}, payload){
            commit('setUser', {id: payload.uid})
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters: {
        loadedProducts(state){
            return state.loadedProducts.sort((itemA, itemB) => {
                return itemA.price > itemB.price
            })
        },
        featuredProducts(_, getters){
            return getters.loadedProducts.slice(0, 3);
        },
        loadedProduct(state){
            return (selectedProductId) => {
                return state.loadedProducts.find((item) => {
                    return item.id == selectedProductId 
                })
            }
        },
        user(state){
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }
    }
})