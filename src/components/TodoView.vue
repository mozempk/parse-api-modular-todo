<template>
<v-container>
  <v-row >
    <v-col class="pl-1" cols="8" xs="8" sm="8" md="8" lg="8" xl="8">
      <v-btn large block color=secondary @click.stop="create">
        <v-icon large>mdi-plus-circle</v-icon>
      </v-btn>
    </v-col>
    <v-col class="pl-1" cols="2" xs="2" sm="2" md="2" lg="2" xl="2">
      <v-btn large block color=primary>
        <v-icon color="secondary" large>mdi-file-document-box-check-outline</v-icon>
      </v-btn>
    </v-col>
    <v-col class="pl-1" cols="2" xs="2" sm="2" md="2" lg="2" xl="2">
      <v-btn large block color="error">
        <v-icon large>mdi-delete-sweep-outline</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  
  <v-row class="mt-8" justify="center">
    <div class="display-2">{{user.get('username')}}'s todos</div>
    <v-col class="mt-8" cols="12" xs="12">
      
      <v-slide-x-transition group>
        <Todo v-for="todo in todos" :key="todo.id" :title="todo.get('title')" :complete="todo.get('complete')" :author="todo.get('author')"/>
      </v-slide-x-transition>
      
    </v-col>
  </v-row>
</v-container>


</template>

<script>
import store from '../store'
import {mapGetters} from 'vuex'
import Todo from './Todo'
export default {
  data: () => ({

  }),
  components:{
    Todo
  },
  computed:{
    ...mapGetters([
      'todos',
      'user'
    ])
  },
  methods:{
    create(){
      const payload = {title:"fromApp", complete:false}
      store.dispatch('new',payload)
    }
  },
  created() {
    store.dispatch('get')
  }
};
</script>
