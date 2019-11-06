<template :key="todoCount">
  <v-container>
    <v-col cols="12" xs="12">
            
      <v-row class="mt-8 mb-4" justify="center">
        <div class="display-2 font-weight-bold">{{user.get('username')}}'s todos</div>
        <v-col class="mt-8" cols="12" xs="12">
          <v-row justify="center" v-if="fetching">
            <v-progress-circular indeterminate ></v-progress-circular>
          </v-row>

          <p v-if="todoCount == 0" :key="updated" class="text-center display-4 font-weight-bold">WOW! Such Empty!</p>

          <v-slide-x-transition group v-if="!fetching">
            <Todo v-for="(todo,index) in todos" :key="index" :todo="todo"/>
          </v-slide-x-transition>
        </v-col>
      </v-row>
    </v-col>
    <v-footer fixed color="#555555" padless class="px-2 mt-2">
      <v-row>
        <v-col cols="6">
          <v-btn large block color=primary @click.stop="checkAll" :disabled="todoCount == 0 ? true : false">
            <v-progress-circular indeterminate v-if="updating"></v-progress-circular>
            <v-icon v-if="!updating" large>mdi-file-document-box-check-outline</v-icon>
          </v-btn>          
        </v-col>
        <v-col cols="6">
          <v-btn large block color="accent" @click.stop="deleteAll" :disabled="todoCount == 0 ? true : false">
            <v-progress-circular indeterminate v-if="deleting"></v-progress-circular>
            <v-icon large v-if="!deleting" >mdi-delete-sweep-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import store from '../store'
import {mapGetters} from 'vuex'
import Todo from './Todo'
// import TodoForm from './TodoForm'
export default {
  data: () => ({
    title: undefined,
    complete: false
  }),
  components:{
    Todo,
    // TodoForm
  },
  computed:{
    ...mapGetters([
      'todos',
      'user',
      'creating',
      'fetching',
      'deleting',
      'updating',
      'todoCount'
    ]),
    updated() {
      if(this.success) return 'updated'
      return 'not updated'
    }
  },
  methods:{
    create(){
      store.dispatch('setCreating',true)
    },
    checkAll(){
      for (let t in this.todos){
        store.dispatch('edit',{todo: this.todos[t],prop:'complete',value:true})
      }
    },
    deleteAll(){
       for (let t in this.todos){
        store.dispatch('delete',this.todos[t])
      }     
    },
  },
  created() {
    store.dispatch('get')
  }
};
</script>
