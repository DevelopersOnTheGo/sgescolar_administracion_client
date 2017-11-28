<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xl4 lg6 md6 sm12 xs12>
        <v-card color="pink darken" class="white--text">
          <v-container fluid grid-list-lg>
            <h4>{{title}}</h4>
          </v-container>
        </v-card>
        <v-card dark color="white">
          <v-container fluid grid-list-lg>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field label="Nombre" v-model="especialidad.nombre" :rules="nameRules" :counter="30" required></v-text-field>
              <v-text-field multi-line label="Descripcion" v-model="especialidad.descripcion" :counter="200" :rules="descripcionRules" required></v-text-field>
              <v-card-actions>
                <v-btn @click="submit" :disabled="!valid">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xl8 lg6 md6 sm12 xs12>
        <v-layout row wrap>
          <v-flex xl3 lg4 md6 sm12 sx12 v-for="(especialidad,index)  in especialidades" :key="index">
            <v-list three-line>
              <v-list-tile avatar @click="cargarEditar(especialidad)">
                <v-list-tile-content>
                  <v-list-tile-title v-html="especialidad.nombre"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="especialidad.descripcion"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple @click="eliminarEspecialidad(especialidad.id)">
                    <v-icon color="red lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase';

  const db = firebase.database();

  export default {
    name: 'v-curso',
    created() {
      db.ref('/especialidad/').on('value', res => this.cargarEspecialidad(res.val()));
    },
    data: () => ({
      title: 'Crear especialidades',
      especialidades: [],
      especialidad: {
        nombre: null,
        descripcion: null,
        key: null,
      },
      valid: false,
      nameRules: [
        v => !!v || 'Campo Obligatorio ',
        v => (v && v.length) <= 30 || 'No mas de 30 caractéres',
      ],
      descripcionRules: [
        v => !!v || 'Campo Obligatorio ',
        v => (v && v.length) <= 200 || 'No mas de 200 caractéres',
      ],
    }),
    methods: {
      cargarEspecialidad(especialidades) {
        this.especialidades = [];
        for (const key in especialidades) {
          if ({}.hasOwnProperty.call(especialidades, key)) {
            this.especialidades.push({
              nombre: especialidades[key].nombre,
              descripcion: especialidades[key].descripcion,
              id: key,
            });
          }
        }
        this.especialidades.reverse();
      },
      submit() {
        if (this.$refs.form.validate()) {
          if (this.especialidad.id) {
            db.ref(`/especialidad/${this.especialidad.id}`).update({
              nombre: this.especialidad.nombre,
              descripcion: this.especialidad.descripcion,
            }).then(() => {
              this.clear();
            });
          } else {
            db.ref('especialidad/').push({
              nombre: this.especialidad.nombre,
              descripcion: this.especialidad.descripcion,
            }).then(() => {
              this.clear();
            });
          }
        }
      },
      clear() {
        this.$refs.form.reset();
        this.especialidad.id = '';
      },
      cargarEditar(especialidad) {
        this.especialidad.nombre = especialidad.nombre;
        this.especialidad.descripcion = especialidad.descripcion;
        this.especialidad.id = especialidad.id;
      },
      eliminarEspecialidad(key) {
        db.ref(`/especialidad/${key}`).remove();
      },
    },
  };
</script>

<style scoped>

</style>
