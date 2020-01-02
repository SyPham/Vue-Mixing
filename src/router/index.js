import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/components/Default'
import ExampleIndex from '@/components/example/Index'
import ExampleView from '@/components/example/View'
import StudentIndex from '@/components/student/Index'
import StudentCreateOrUpdate from '@/components/student/CreateOrUpdate'
import Login from '@/components/system/Login'
import Auth from '../components/system/Auth'
import Layout from '../components/views/Layout'
import MachineIndex from '../components/machine/Index'
import MachineDetail from '../components/machine/Detail'
import MachineCreate from '../components/machine/Create'
import MachineUpdate from '../components/machine/Update'
import LocationCreateOrUpdate from '../components/localtion/CreateOrUpdate'

Vue.use(Router)

const routes = [
  // { 
  //   path: '/', 
  //   name: 'Default', 
  //   component: Default 
  
  // },

  { path: '/example', name: 'ExampleIndex', component: ExampleIndex },
  { path: '/example/:id', name: 'ExampleView', component: ExampleView },
  
  // { path: '/students/', name: 'StudentIndex', component: StudentIndex },


  //add page
  { 
    path: '/machines/add', 
    name: 'MachineCreate', 
    component: Layout,
    children: [
      {
        path: "/machines/add",
        component: MachineCreate
      }
    ] 
  },

  { 
    path: '/location/add', 
    name: 'LocationCreate', 
    component: Layout,
    children: [
      {
        path: "/location/add",
        component: LocationCreateOrUpdate
      }
    ] 
  },

  //edit page
  { 
    path: '/machines/:id/edit', 
    name: 'MachineEdit', 
    component: Layout,
    children: [
      {
        path: "/machines/:id/edit",
        component: MachineUpdate 
      }
    ]
  
  },
  // { path: '/authentication/logout', name: 'Logout', component: Login }

  //login page
  {
    path: "/login",
    component: Auth,
    children: [
      {
        path: "/login",
        component: Login,
        //meta: { requiresGuest: true }
      }
    ]
  },

  //main page
  {
    path: "/",
    component: Layout,
    redirect: '/',
    children: [
      {
        path: "/",
        component: MachineIndex,
        //meta: { requiresGuest: true }
      }
    ]
  },

  //list page
  {
    path: "/students/",
    component: Layout,
    redirect: '/students/',
    children: [
      {
        path: "/students/",
        component: StudentIndex,
        //meta: { requiresGuest: true }
      }
    ]
  },

  //list machine
  {
    path: "/machines/",
    component: Layout,
    redirect: '/machines/',
    children: [
      {
        path: "/machines/",
        component: MachineIndex,
        //meta: { requiresGuest: true }
      }
    ]
  },

  //edit page
  { 
    path: '/machines/:id/detail/', 
    component: Layout,
    children: [
      {
        path: "/machines/:id/:start/:end/detail",
        component: MachineDetail 
      }
    ]
  
  }
  
]
export default new Router({
  routes
})
