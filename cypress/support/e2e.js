// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import "@shelex/cypress-allure-plugin";
import "cypress-grep";

//Cypress.on("log:added", (options) => {
//  if (options.message.includes(Cypress.env("CYPRESS_PASSWORD"))) {
//    return false; // 👈 Убираем запись пароля в логах
//  }
//});

Cypress.on("uncaught:exception", (err) => {
  if (err.message && err.message.includes("ckeditor-duplicated-modules")) {
    // Возвращаем false, чтобы не завершать тест при возникновении этой ошибки
    return false;
  }
});
