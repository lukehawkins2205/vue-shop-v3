import {store} from '../store'

export default (to, from, next) => {
    console.log('AUTH-GUARD TRIGGERED', store.getters.users)
    if(store.getters.users){
       next()
    }else{
        next('/signin')
    }
}