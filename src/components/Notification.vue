<template>
  <v-layout>
    <v-flex xl8 lg6 md6 sm12 xs12>
      <v-layout row wrap>
        <v-flex xl8 lg10 md10 sm12 sx12 v-for="(info,i)  in notificaciones" :key="i">
          <v-list three-line>
            <v-list-tile avatar @click="">
              <v-list-tile-action>
                <v-btn icon ripple @click="">
                  <v-icon color="red lighten-1"></v-icon>{{i+1}}
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="info.method"></v-list-tile-title>
                <v-list-tile-sub-title v-html="info.url"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="info.date"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="">
                  <v-icon color="red lighten-1">check</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

  import {
    mapState,
  } from 'vuex';
  import * as firebase from 'firebase';

  const db = firebase.database();

  export default {
    data: () => ({
      notificaciones: [],
    }),
    created() {
      db.ref('/notifications/').on('value', res => this.cargarNotificacion(res.val()));
    },
    methods: {
      cargarNotificacion(info) {
        this.notificaciones = [];
        for (const key in info) {
          if ({}.hasOwnProperty.call(info, key)) {
            this.notificaciones.push({
              method: info[key].method,
              url: info[key].url,
              date: info[key].date,
              id: key,
            });
          }
        }
        this.notificaciones.reverse();
      },
    },
    computed: mapState({
      nombre: state => state.docente,
    }),
  };
</script>

<style scoped>

</style>
