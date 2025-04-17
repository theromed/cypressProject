const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://tree.taiga.io/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
