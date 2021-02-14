<template>
   <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" @click="onLogOut">
            <v-list-item-icon>
              <v-icon>mdi-forum</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

    </v-navigation-drawer>

    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/#" tag="span">My Shop</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
  computed: {
      items(){
        let items = [ 
            { title: 'Home', icon: 'mdi-view-dashboard', link: '/#' },
            { title: 'About', icon: 'mdi-forum', link: '/about' },
            { title: 'Products', icon: 'mdi-forum', link: '/products' },
            { title: 'Sign Up', icon: 'mdi-forum', link: '/signUp' },
            { title: 'Sign In', icon: 'mdi-forum', link: '/login' },
          ]
        if(this.userIsAuthenticated){
          items = [
            { title: 'Home', icon: 'mdi-view-dashboard', link: '/#' },
            { title: 'Overview', icon: 'mdi-forum', link: '/admin/overview' },
            { title: 'Orders', icon: 'mdi-forum', link: '/admin/Orders' },
            { title: 'Products', icon: 'mdi-forum', link: '/admin/products' },
          ]
        }
        return items
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogOut(){
        this.$store.dispatch('signOutUser')
        this.$router.push('/')
      }
    }
};
</script>


