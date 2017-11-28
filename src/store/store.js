import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nombre: 'soy german',
    docentes: [],
    docente: {
      nombre: null,
      apellido: null,
      edad: null,
      codigo: null,
    },
  },
});

export default store;
