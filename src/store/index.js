import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
require('firebase/auth')

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedProducts: [
            {name: 'yeezy 320', img: 'http://www.flightclub.com/media/catalog/product/2/0/201536_1.jpg', price: 1299, id: '1', cat: 'shoe'},
            {name: 'Jordan Black', img: 'https://media.gq-magazine.co.uk/photos/5ea070e01027960008de3b4a/master/w_1920,c_limit/20200422-jordan-19.jpg', price: 679, id: '2', cat: 'shoe'},
            {name: 'Nike Vapormax', img: 'https://cdn.shopify.com/s/files/1/0013/3074/1303/products/Nike_Air_Vapormax_Flyknit_3_White_600x.jpg?v=1554149189', price: 399, id: '3', cat: 'running'}
        ],
        user: null
    },
    mutations: {
        displayProduct(state, payload){
            state.user.loadedProductId = payload.id
        },
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        signUpUser({commit}, payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                        }
                    commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        signInUser({commit}, payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                        }
                    commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
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
        }
    }
})