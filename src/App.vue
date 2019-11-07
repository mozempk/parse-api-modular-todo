<template>
  <v-app>
    <v-app-bar app>
      <v-row>
        <v-col cols="8" class="ml-4">
          <v-row justify="start">
            <router-link :to="user ? '/todos':'/'" style="text-decoration: none">
              <v-btn large icon>
                <v-icon x-large>
                  mdi-home
                </v-icon>
              </v-btn>
            </router-link>
          </v-row>
        </v-col>
        <v-col col="2" v-show="showLoginButton">
          <v-row justify="end">
            <v-dialog v-model="userDialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn large icon v-on="on" >
                  <v-icon x-large :color="user?'primary':''">
                    {{user?'mdi-account':'mdi-login-variant'}}
                  </v-icon>
                </v-btn>                
              </template>
              
              <Login v-show="!user"/>
              <v-card v-if="user">
                <v-container v-show="user">
                  <v-col cols="12">
                    <div class="text-center headline mb-4">{{user.get('username')}}</div>
                    <v-btn block color="primary" @click.stop="logout">Logout</v-btn>
                  </v-col>
                </v-container>
              </v-card>

            </v-dialog>
          </v-row>
        </v-col>
        <v-col col="2" >
          <v-row justify="center" v-if="user" :key="user.get('username')">
            <v-dialog v-model="create" width="500">
              <template v-slot:activator="{ on }">
                <v-btn large icon color=secondary v-on="on">
                    <v-icon large>mdi-plus-circle</v-icon>
                </v-btn>
              </template>
              
              <v-card style="border-radius: 20px">
                <TodoForm/>
              </v-card>
              
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>

      
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <v-snackbar top v-model="snackbar" absolute :color="error ? 'error' : 'success'" >
        <v-row justify="center">
          {{error !== undefined ? error.message : success !== undefined? success.message : ''}}
        </v-row>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import store from './store/'
import TodoForm from './components/TodoForm'
import Login from './components/Login'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    TodoForm,
    Login
  },
  data: () => ({
      userDialog: false
  }),
  computed: {
    ...mapGetters([
      'loading',
      'error',
      'success',
      'displayLogin',
      'displayLogout',
      'user',
      'creating'
    ]),
    snackbar: {
      get() {
        return this.error || this.success
      },
      set(v){
        return v
      }
    },
    create: {
      get() {
        return this.creating
      },
      set() {
        if (this.user) {
          store.dispatch('setCreating',true)
          return this.creating
          }
        else {
          this.$router.push('/')
          return false
        }
      }
    },
    showLoginButton(){
      if(this.$router.currentRoute.name != "landing"
          && this.$router.currentRoute.name != "login"
            && this.$router.currentRoute.name != "signup") return true 
      return false
    }
  },
  methods: {
    logout() {
      store.dispatch('logout')
      this.userDialog = false
    }
  },
  watch: {
    success() {
        if (this.success && this.success.message == 'Bye!') this.$router.push('/')
    }
  },
  created() {
    store.dispatch('restore')
  }
};
</script>
