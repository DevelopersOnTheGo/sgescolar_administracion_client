<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer class="hello" persistent v-model="drawer" enable-resize-watcher right app>
        <v-list dense>
          <v-list>
            <v-list-tile valu e="true" v-for="(item, i) in items" :key="i">
              <v-list-tile-action>
                <v-icon light v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <es-menu></es-menu>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="pink" dark fixed app>
        <v-spacer></v-spacer>
        <v-toolbar-title>Registro de Asistencia</v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar>
      <main>
        <v-content>
          <v-container fluid>
            <v-layout justify-center align-center>
              <router-view></router-view>
            </v-layout>
          </v-container>
        </v-content>
      </main>
      <v-footer color="pink" app>
        <v-spacer></v-spacer>
        <span class="white--text">&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
  <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
  <!--  <router-view></router-view>-->
</template>

<script>
  import Menu from '@/components/Menu';

  export default {
    components: {
      'es-menu': Menu,
    },
    data: () => ({
      type: true,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
    }),
    props: {
      source: String,
    },
  };
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
</style>
