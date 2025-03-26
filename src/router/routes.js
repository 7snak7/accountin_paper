const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayouts.vue"),
    children: [
      { name: 'Home', path: "", component: () => import("@/pages/HomePage.vue") },
      { name: 'AccountingPaper', path: '/accounting_paper', component: () => import("@/pages/AccPaper.vue") },
      { name: 'SignageCalc', path: '/signage_calc', component: () => import("@/pages/SignageCalc.vue")},
      { name: 'Signage', path: '/signage', component: () => import("@/pages/SignagePage.vue")},
    ],
  },
];

export default routes;
