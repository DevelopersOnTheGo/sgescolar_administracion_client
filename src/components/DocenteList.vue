<template>
  <v-flex xl8 lg6 md6 sm12 xs12>
    <v-layout row wrap>
      <v-flex xl3 lg4 md6 sm12 sx12 v-for="(docente,index) in docentes" :key="index">
        <v-list three-line>
          <v-list-tile avatar @click="cargarDocenteEditar(docente)">
            <v-list-tile-content>
              <v-list-tile-title>{{docente.nombre}} {{docente.apellido}}</v-list-tile-title>
              <v-list-tile-sub-title>{{docente.edad}} años - {{docente.codigo}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="eliminarDocente(docente.id)">
                <v-icon color="red lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  import * as firebase from 'firebase';
  import {
    mapState,
  } from 'vuex';

  const db = firebase.database();
  export default {
    name: 'v-docenteList',
    created() {
      db.ref('docentes/').on('value', res => this.cargarDocente(res.val()));
    },
    data: () => ({}),
    methods: {
      cargarDocente(docentes) {
        this.$store.state.docentes = [];
        for (const key in docentes) {
          if ({}.hasOwnProperty.call(docentes, key)) {
            this.$store.state.docentes.push({
              nombre: docentes[key].nombre,
              apellido: docentes[key].apellido,
              edad: docentes[key].edad,
              codigo: docentes[key].codigo,
              id: key,
            });
          }
        }
        this.docentes.reverse();
      },
      eliminarDocente(id) {
        db.ref(`/docentes/${id}`).remove();
      },
      cargarDocenteEditar(docente) {
        this.docente.nombre = docente.nombre;
        this.docente.apellido = docente.apellido;
        this.docente.edad = docente.edad;
        this.docente.codigo = docente.codigo;
        this.docente.id = docente.id;
      },
    },
    computed: mapState({
      docentes: state => state.docentes,
      docente: state => state.docente,
    }),
  };
</script>

<style scoped>

</style>
