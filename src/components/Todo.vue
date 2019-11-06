<template>
<v-expand-x-transition>
  <v-card raised class="mb-8" :key="updated">
      <v-row align="center">
          <v-col cols="10">
            
            <v-dialog v-model="zoom" width="500">
              <template v-slot:activator="{ on }">
                <v-row justify="center" align="center" v-if="!editMode" @click.stop="zoom = true">
                    <div :key="updated" :class="['containAndTruncate','headline','font-wight-light','pt-1',todo.get('complete')? 'crossed' : '']">
                        {{todo.get('title')}}
                    </div>
                </v-row>
              </template>

              <v-card max-height="300" style="border-radius: 20px; overflow-y: hidden; overflow-x: hidden">
                  <v-container>
                    <v-row>
                        <v-col cols="10">
                            <v-row justify="center" align="center">
                                <div :key="updated" :class="['headline','font-wight-light','pt-1','pl-6',todo.get('complete')? 'crossed' : '','containAndOverflow']">
                                    {{todo.get('title')}}
                                </div>
                            </v-row>
                        </v-col>
                        <v-col cols="2" align="center">
                            <v-row justify="center" align="center" v-if="!editMode">
                                <v-btn icon @click.stop="setComplete" >
                                    <v-icon v-if="!(updating && updating.todo.id == todo.id)" x-large :key="updated" :color="todo.get('complete') ? 'primary' : '' ">mdi-check-circle-outline</v-icon>
                                    <v-progress-circular indeterminate v-if="updating && updating.todo.id == todo.id"></v-progress-circular>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                  </v-container>
                  <v-divider/>
                  <v-card-actions class="pa-0">
                      <v-container>
                        <v-row>
                            <!-- class="pr-4 pl-6" -->
                            <v-col cols="10" >

                                <v-btn block :color="editMode? 'primary' : 'secondary'" @click.stop="editor">
                                    <v-icon v-if="!editMode">mdi-pencil-outline</v-icon>
                                    <v-icon v-if="editMode">mdi-send</v-icon>
                                </v-btn>

                            </v-col>
<!-- class="pl-1 pr-6" -->
                            <v-col cols="2" >
                                <v-btn block color="accent" @click.stop="editMode? editMode=!editMode : remove ">
                                    <v-icon v-if="!(deleting && deleting.id == todo.id) && !editMode">mdi-delete</v-icon>
                                    <v-icon v-if="editMode">mdi-cancel</v-icon>
                                    <v-progress-circular indeterminate v-if="deleting && deleting.id == todo.id"></v-progress-circular>
                                </v-btn>
                            </v-col>          
                        </v-row>
                      </v-container>
                  </v-card-actions>
              </v-card>
              
            </v-dialog>

                <v-row v-show="editMode" justify="center" align="center">
                    <v-text-field autofocus v-model="newTitle" :error="txtFieldError" type="text" outlined class="pl-6 pr-5"/>
                </v-row>
          
          </v-col>
          <v-col cols="2">
              
              <v-row justify="center" v-if="!editMode">
                <v-btn icon @click.stop="setComplete" class="pr-6">
                    <v-icon v-if="!(updating && updating.todo.id == todo.id)" x-large :key="updated" :color="todo.get('complete') ? 'primary' : '' ">mdi-check-circle-outline</v-icon>
                    <v-progress-circular indeterminate v-if="updating && updating.todo.id == todo.id"></v-progress-circular>
                </v-btn>
              </v-row>
              
              <v-row justify="center" v-if="editMode">
                  <v-switch inset color="accent" hint="Set complete" v-model="newComplete" class="pb-5"/>
              </v-row>
              
          </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
          <v-col cols="10" class="pr-4 pl-6">

            <v-btn block :color="editMode? 'primary' : 'secondary'" @click.stop="editor">
                <v-icon v-if="!editMode">mdi-pencil-outline</v-icon>
                <v-icon v-if="editMode">mdi-send</v-icon>
            </v-btn>

          </v-col>

          <v-col cols="2" class="pl-1 pr-6">
            <v-btn block color="accent" @click.stop="remove">
                <v-icon v-if="!(deleting && deleting.id == todo.id) && !editMode">mdi-delete</v-icon>
                <v-icon v-if="editMode">mdi-cancel</v-icon>
                <v-progress-circular indeterminate v-if="deleting && deleting.id == todo.id"></v-progress-circular>
            </v-btn>
          </v-col>          
      </v-row>
  </v-card>
</v-expand-x-transition>
</template>

<script>
/* eslint-disable no-console */
import store from '../store'
import { mapGetters } from 'vuex'
export default {
    props: [
        'todo',
        'index'
    ],
    data:() => ({
        editMode: false,
        newComplete: undefined,
        newTitle: undefined,
        txtFieldError: undefined,
        zoom: false
    }),
    computed: {
        ...mapGetters([
            'todos',
            'success',
            'updating',
            'deleting'
        ]),
        updated() {
            if(this.success) return true
            return false
        }
    },
    methods: {
        remove(){
            if(!this.editMode) store.dispatch('delete',this.todo)
            this.editMode = false
        },
        setComplete(){
            store.dispatch('edit',{todo: this.todo,prop:'complete',value: !this.todo.get('complete')})
        },
        editor() {
            if (this.zoom) this.zoom=false
            if (this.editMode){
                if(this.newTitle !== '' && this.newTitle !== undefined) {
                    store.dispatch('edit',{todo: this.todo,prop:'complete',value: this.newComplete})
                    store.dispatch('edit',{todo: this.todo,prop:'title',value: this.newTitle})
                    this.editMode = false    
                }
                else this.txtFieldError = true
            }
            else {
                this.editMode = true
                this.newComplete = this.todo.get('complete')
                this.newTitle = this.todo.get('title')
            }
        }
    },
    watch:{
        // newTitle() {
        //     if (this.txtFieldError) !this.txtFieldError
        // }
    }

}
</script>

<style>
.crossed{
    text-decoration: line-through;
}
.containAndTruncate{
    white-space: nowrap;
    max-width: 90%;
    height: 45px;
    overflow-y: hidden;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
.containAndOverflow{
    /* white-space: nowrap; */
    max-width: 100%;
    height: 175px;
    overflow-y: auto;
    overflow-x: hidden;
    /* text-overflow: ellipsis; */
}
</style>