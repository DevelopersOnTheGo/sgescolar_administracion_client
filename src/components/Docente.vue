<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <router-view ></router-view>
      <router-view name="list"></router-view>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'v-docente',
    created() {},
    data: () => ({

    }),
  };
</script>

<style scoped>

</style>
