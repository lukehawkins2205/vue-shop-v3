import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')


Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedProducts: [],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        addProduct(state, payload){
            state.loadedProducts.push(payload)
        },
        updateProduct(state, payload){
            const product = state.loadedProducts.find(product => {
                return product.id === payload.id
            })
            if(payload.name){
                product.name = payload.name
            }
            if(payload.price){
                product.price = payload.price
            }
            if(payload.img){
                product.img = payload.img
            }
            if(payload.cat){
                product.cat = payload.cat
            }
            if(payload.description){
                product.description = payload.description
            }
        },
        deleteProduct(state, payload){
            state.loadedProducts.splice(payload, 1)
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
        loadProducts({commit}){
            firebase.firestore().collection("products")
                .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const product = {
                                ...doc.data(),
                                id: doc.id
                            }                
                            commit('addProduct', product)
                        });
                        console.log('vuex STATE Loaded Products', this.state.loadedProducts)
            });
        },
        deleteProductOnDB({commit}, payload){
            firebase.firestore().collection("products").doc(payload)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    commit('deleteProduct', payload)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateProductOnDB({commit}, payload){
            const product = {}
            if(payload.name){
                product.name = payload.name
            }
            if(payload.price){
                product.price = payload.price
            }
            if(payload.img){
                product.img = payload.img
            }
            if(payload.cat){
                product.cat = payload.cat
            }
            if(payload.description){
                product.description = payload.description
            }
            if(payload.id){
                product.id = payload.id
            }

            firebase.firestore().collection("products").doc(product.id)
                .update(product)
                .then(() => {
                    console.log("Document successfully updated!");
                    commit('updateProduct', product)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addProductToDB({commit}, payload){
            const product = {
                name: payload.name,
                price: payload.price,
                cat: payload.cat,
                description: payload.description
            }

            let imageURL;
            let key;

            firebase.firestore().collection("products")
                .add(product)
                .then((docRef) => {
                    key = docRef.id
                    return key    
                })
                .then(key => {
                    const filename = payload.img.name
                    const ext = filename.slice(filename.lastIndexOf('.')) //this includes the . and should be changed to not include . and alter the ref below to incldue a .
                    return firebase.storage().ref('products' + key + ext).put(payload.img) //this returns a promise as all firebase methods do as used in angular for different comp
                })
                .then(fileData => {
                    return fileData.ref.getDownloadURL()
                })
                .then((ImgURL) => {
                    imageURL = ImgURL
                    return firebase.firestore().collection("products").doc(key).update({img: imageURL})
                })
                .then(() => {
                    commit('addProduct', {
                        ...product,
                        img: imageURL,
                        id: key 
                    })
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