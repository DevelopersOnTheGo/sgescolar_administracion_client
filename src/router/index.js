import Vue from 'vue';
import Router from 'vue-router';
import Docente from '@/components/Docente';
import DocenteForm from '@/components/DocenteForm';
import DocenteList from '@/components/DocenteList';
import Especialidad from '@/components/Especialidad';
import Notification from '@/components/Notification';

Vue.use(Router);

const listMenu = [
  {
    path: '/',
    text: 'Docente',
    icon: 'keyboard_arrow_up',
    icon_alt: 'keyboard_arrow_down',
    component: Docente,
    children: [
      {
        path: '/',
        text: 'Crud',
        icon: 'list',
        components: {
          default: DocenteForm,
          list: DocenteList,
        },
      },
    ],
  },
  {
    path: '/especialidad',
    text: 'Especialidad',
    name: 'Especialidad',
    icon: 'bubble_chart',
    component: Especialidad,
  },
  {
    path: '/notification',
    name: 'notification',
    text: 'Notificationes',
    icon: 'bubble_chart',
    component: Notification,
  },
];

const routes = new Router({
  routes: listMenu,
});

export { routes, listMenu };
