import { Router } from '@vaadin/router';

const router = new Router();

const routes = [
  // { path: '/', component: 'kusama-home' },
  {
    path: '/',
    component: 'layout',
    children: [
      { path: '/', component: 'kusama-home' },
      { path: '/debug', component: 'evees-orbitdb-set-debugger' },
      { path: '/reader', component: 'evees-reader' },
      { path: '/council', component: 'council-space' },
      { path: '/account', component: 'account-space' },
      { path: '/account/:homeId', component: 'account-space' },
    ],
  },
];

export { router, routes };
