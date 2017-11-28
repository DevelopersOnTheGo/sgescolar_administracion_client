<template>
  <v-flex xl4 lg6 md6 sm12 xs12>
    <v-card color="pink darken" class="white--text">
      <v-container fluid grid-list-lg>
        <h4>{{titulo}}</h4>
      </v-container>
    </v-card>
    <v-card dark color="white">
      <v-container fluid grid-list-lg>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Nombres" v-model="docente.nombre" :rules="nameRules" :counter="30" required type="text"></v-text-field>
          <v-text-field label="Apellidos" v-model="docente.apellido" :rules="nameRules" :counter="30" required type="text"></v-text-field>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="Edad" v-model="docente.edad" :rules="edadRules" type="number" :counter="2" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Codigo" v-model="docente.codigo" :rules="codigoRules" type="number" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn @click="submit" :disabled="!valid">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import * as firebase from 'firebase';
  import { mapState } from 'vuex';
  import '../firebase';

  const db = firebase.database();
  export default {
    name: 'v-docenteForm',
    data: () => ({
      titulo: 'Crear Docentes',
      valid: false,
      codigoRules: [
        v => !!v || 'Campo Obligatorio ',
        v => (v && v.length) === 8 || 'Revise que haya 8 digitos',
      ],
      edadRules: [
        v => !!v || 'Campo Obligatorio ',
        v => (v && v.length) <= 2 || 'No mas de 2 caractéres',
      ],
      nameRules: [
        v => !!v || 'Este campo es obigatorio',
        v => (v && v.length) <= 30 || 'No mas de 30 Caracteres',
      ],
    }),
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          if (this.docente.id) {
            db.ref(`/docentes/${this.docente.id}`).update({
              nombre: this.docente.nombre,
              apellido: this.docente.apellido,
              edad: this.docente.edad,
              codigo: this.docente.codigo,
            }).then(() => {
              this.clear();
            });
          } else {
            db.ref('docentes/').push({
              nombre: this.docente.nombre,
              apellido: this.docente.apellido,
              edad: this.docente.edad,
              codigo: this.docente.codigo,
            }).then(() => {
              this.clear();
            });
          }
        }
      },
      clear() {
        this.$refs.form.reset();
        this.docente.id = '';
      },
    },
    computed: mapState({
      docente: state => state.docente,
    }),
  };
</script>

<style scoped>

</style>
