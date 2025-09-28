// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/vue-form-test/",
    head: {
      link: [{ rel: "icon", href: "/vue-form-test/favicon.ico" }],
    },
  },

  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: ["~/assets/css/main.css"],
  icon: {
    provider: "none",
    clientBundle: {
      scan: true,
      icons: [
        "lucide:chevron-down", // used by USelect
        "lucide:check", // used by UCheckbox, USelect, etc.
      ],
    },
  },
});
