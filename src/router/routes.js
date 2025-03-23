const routes = [
  {
    path: "/",
    component: () => import("pages/AccPaper.vue"),
  },

  {
    path: "/cooperation",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CooperationPage.vue") },
    ],
  },

  {
    path: "/rules",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/info/RulesPage.vue") },
    ],
  },

  {
    path: "/rules/instruction",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/info/InstructionPage.vue") },
    ],
  },

  {
    path: "/rules/files",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/info/FilesRequirementsPage.vue"),
      },
    ],
  },

  {
    path: "/rules/specs/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/info/ProductSpecsPage.vue"),
      },
    ],
  },

  {
    path: "/about",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/info/AboutPage.vue") },
    ],
  },

  {
    path: "/contact",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/info/ContactInfoPage.vue") },
    ],
  },

  {
    path: "/prices",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/info/PricesPage.vue") },
    ],
  },

  {
    path: "/material",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/MaterialPage.vue") },
    ],
  },

  {
    path: "/canvas/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/CanvasPage.vue") },
    ],
  },
  {
    path: "/banner/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/BannerPage.vue") },
    ],
  },
  {
    path: "/film/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/FilmPage.vue") },
    ],
  },
  {
    path: "/film_running/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/FilmRunningPage.vue") },
    ],
  },
  {
    path: "/stand/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/StandPage.vue") },
    ],
  },
  {
    path: "/wallpaper/:id?",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/material/WallpaperPage.vue") },
    ],
  },

  {
    path: "/test",
    component: () => import("layouts/AppLayout.vue"),
    children: [{ path: "", component: () => import("pages/TestPage.vue") }],
  },

  {
    path: "/cart",
    component: () => import("layouts/AppLayout.vue"),
    children: [{ path: "", component: () => import("pages/CartPage.vue") }],
  },
  {
    path: "/order",
    component: () => import("layouts/AppLayout.vue"),
    children: [{ path: "", component: () => import("pages/CreateOrder.vue") }],
  },
  {
    path: "/order/:id/bill",
    component: () => import("layouts/PrintLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/print/PrintableBillPage.vue"),
      },
    ],
  },
  {
    path: "/payment/success",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/payment/SuccessPaymentPage.vue"),
      },
    ],
  },
  {
    path: "/payment/error",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/payment/ErrorPaymentPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/user/UserLogin.vue") },
    ],
  },
  {
    path: "/registration",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/user/UserRegistration.vue") },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/user/privateCabinet/OrdersPage.vue"),
      },
    ],
  },
  {
    path: "/session-expired",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/user/UserSessionExpiredPage.vue"),
      },
    ],
  },
  {
    path: "/order-details/:id",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/user/privateCabinet/OrderDetails.vue"),
      },
    ],
  },
  {
    path: "/print/order-details/:id",
    component: () => import("layouts/PrintLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/user/privateCabinet/print/PrintOrderDetails.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
