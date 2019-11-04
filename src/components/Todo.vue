<template>
<v-expand-x-transition>
  <v-card raised class="mb-8">
      <v-row align="center">
          <v-col cols="10">
              <v-row justify="center">
                <div class="display-1">
                    {{title}}
                </div>
              </v-row>
          </v-col>
          <v-col cols="2" class="pl-1">
              <v-row justify="center">
                <v-btn icon>
                    <v-icon x-large :color="complete ? 'secondary' :'' ">mdi-check-circle-outline</v-icon>
                </v-btn>
              </v-row>
          </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
          <v-col cols="10" class="pr-4 pl-6">
            <v-btn block color="secondary">
                <v-icon >mdi-pencil-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" class="pl-1 pr-6">
            <v-btn block color="error">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>          
      </v-row>
  </v-card>
</v-expand-x-transition>
</template>

<script>
export default {
    props: [
        'title',
        'author',
        'complete'
    ]
}
</script>

<style>

</style>