const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
require("dotenv").config(); // Подключаем .env

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://tree.taiga.io/",
    specPattern: "cypress/e2e/**/*.cy.js", // 👈 Указываем путь ко всем тестам
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Регистрируем Allure

      // 👇 Фильтрация чувствительных данных перед отправкой в отчет
      on("task", {
        hideSensitiveData(step) {
          if (step.includes("password") || step.includes("CYPRESS_PASSWORD")) {
            return null; // 👈 Полностью убираем шаг из отчёта
          }
          return step;
        },
      });


      return config;
    },
  },
  env: {
    CYPRESS_USERNAME: process.env.CYPRESS_USERNAME || "romedtestuser",
    CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD || "qwerty",
    CYPRESS_EMAIL:    process.env.CYPRESS_EMAIL || "romedtestuser@getnada.com",
    CYPRESS_PROJECT_SLUG: process.env.CYPRESS_PROJECT_SLUG || "romed-testpilot-ui-api-autotests"
  },
});

